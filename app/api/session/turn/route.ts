import { NextRequest, NextResponse } from "next/server";
import { chat, extractJson } from "@/lib/llm";
import { SYSTEM_CORE, EVALUATE_AND_NEXT } from "@/lib/prompts";
import type { Round, Concept, SessionTurnResponse } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

interface TurnBody {
  topic: string;
  notes: string;
  concepts: Concept[];
  rounds: Round[];
  answer: string;
}

export async function POST(req: NextRequest) {
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
    notes_excerpt: body.notes.slice(0, 4000),
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

  try {
    const raw = await chat(
      [
        { role: "system", content: SYSTEM_CORE },
        { role: "system", content: EVALUATE_AND_NEXT },
        { role: "user", content: userPayload },
      ],
      { temperature: 0.4, jsonMode: true }
    );
    const parsed = extractJson<SessionTurnResponse>(raw);
    if (parsed.nextRound) parsed.nextRound.createdAt = Date.now();
    return NextResponse.json(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: `Turn failed: ${msg}` }, { status: 502 });
  }
}
