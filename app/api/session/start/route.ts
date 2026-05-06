import { NextRequest, NextResponse } from "next/server";
import { chat, extractJson, wrapUntrustedNotes, readClientHints } from "@/lib/llm";
import {
  SYSTEM_CORE,
  EXTRACT_AND_FIRST_QUESTION,
  modePromptForId,
  startingDifficultyForMode,
} from "@/lib/prompts";
import { getClientKey, rateCheck } from "@/lib/rateLimit";
import type { SessionStartResponse } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  const key = getClientKey(req);
  const rl = rateCheck(key);
  if (!rl.ok) {
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${Math.ceil(rl.resetMs / 1000)}s.` },
      { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetMs / 1000)) } }
    );
  }

  let body: { topic?: string; notes?: string; modeId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const topic = (body.topic ?? "").trim();
  const notes = (body.notes ?? "").trim();
  const modeId = body.modeId ?? "exam";

  if (!topic && !notes) {
    return NextResponse.json({ error: "Provide a topic or notes." }, { status: 400 });
  }
  if (topic.length > 400) {
    return NextResponse.json({ error: "Topic too long (max 400 chars)." }, { status: 400 });
  }
  if (notes.length > 12000) {
    return NextResponse.json({ error: "Notes too long (max 12k chars)." }, { status: 400 });
  }

  const startDiff = startingDifficultyForMode(modeId);
  const userPayload = JSON.stringify({
    topic: topic || "(infer from notes)",
    notes_block: wrapUntrustedNotes(notes),
    startingDifficulty: startDiff,
  });

  const hints = readClientHints(req);
  try {
    const raw = await chat(
      [
        { role: "system", content: SYSTEM_CORE },
        { role: "system", content: modePromptForId(modeId) },
        { role: "system", content: EXTRACT_AND_FIRST_QUESTION },
        { role: "user", content: userPayload },
      ],
      { temperature: 0.5, jsonMode: true, ...hints }
    );
    const parsed = extractJson<SessionStartResponse>(raw);
    if (!parsed.concepts?.length || !parsed.firstRound?.question) {
      throw new Error("Malformed model output (missing fields)");
    }
    parsed.firstRound.createdAt = Date.now();
    parsed.firstRound.difficulty = (parsed.firstRound.difficulty ?? startDiff) as 1 | 2 | 3 | 4 | 5;
    parsed.concepts = parsed.concepts.map((c) => ({
      ...c,
      strength: "weak",
      attempts: 0,
      lastScore: 0,
    }));
    return NextResponse.json(parsed, {
      headers: { "X-RateLimit-Remaining": String(rl.remaining) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: `Session start failed: ${msg}` }, { status: 502 });
  }
}
