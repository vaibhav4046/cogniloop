import { NextRequest, NextResponse } from "next/server";
import { chat, extractJson, wrapUntrustedNotes, readClientHints } from "@/lib/llm";
import { SYSTEM_CORE, EVALUATE_AND_NEXT, modePromptForId } from "@/lib/prompts";
import { getClientKey, rateCheck } from "@/lib/rateLimit";
import type { Round, Concept, SessionTurnResponse } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

interface TurnBody {
  topic: string;
  notes: string;
  concepts: Concept[];
  rounds: Round[];
  answer: string;
  modeId?: string;
}

export async function POST(req: NextRequest) {
  const key = getClientKey(req);
  const rl = rateCheck(key);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${Math.ceil(rl.resetMs / 1000)}s.` },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } }
    );
  }

  let body: TurnBody;
  try {
    body = (await req.json()) as TurnBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.rounds?.length) {
    return NextResponse.json({ error: "No rounds in session" }, { status: 400 });
  }
  const lastRound = body.rounds[body.rounds.length - 1];
  if (!body.answer?.trim()) {
    return NextResponse.json({ error: "Empty answer" }, { status: 400 });
  }
  if (body.answer.length > 6000) {
    return NextResponse.json({ error: "Answer too long" }, { status: 400 });
  }

  const userPayload = JSON.stringify({
    topic: body.topic,
    notes_block: wrapUntrustedNotes(body.notes.slice(0, 4000)),
    concepts: body.concepts,
    history: body.rounds.map((r) => ({
      id: r.id,
      question: r.question,
      questionType: r.questionType,
      difficulty: r.difficulty,
      answer: r.answer ?? null,
      evaluation: r.evaluation ?? null,
    })),
    currentQuestion: lastRound.question,
    currentDifficulty: lastRound.difficulty,
    learnerAnswer: body.answer.trim(),
    nextRoundId: lastRound.id + 1,
  });

  const hints = readClientHints(req);
  try {
    const raw = await chat(
      [
        { role: "system", content: SYSTEM_CORE },
        { role: "system", content: modePromptForId(body.modeId) },
        { role: "system", content: EVALUATE_AND_NEXT },
        { role: "user", content: userPayload },
      ],
      { temperature: 0.4, jsonMode: true, ...hints }
    );
    const parsed = extractJson<SessionTurnResponse>(raw);
    if (!parsed.evaluation || typeof parsed.evaluation.score !== "number") {
      throw new Error("Malformed evaluation");
    }
    if (parsed.nextRound) parsed.nextRound.createdAt = Date.now();
    return NextResponse.json(parsed, {
      headers: { "X-RateLimit-Remaining": String(rl.remaining) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: `Turn failed: ${msg}` }, { status: 502 });
  }
}
