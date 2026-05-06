import { NextRequest, NextResponse } from "next/server";
import { chat, extractJson } from "@/lib/llm";
import { SYSTEM_CORE, EXTRACT_AND_FIRST_QUESTION } from "@/lib/prompts";
import type { SessionStartResponse } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: NextRequest) {
  let body: { topic?: string; notes?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const topic = (body.topic ?? "").trim();
  const notes = (body.notes ?? "").trim();
  if (!topic && !notes) {
    return NextResponse.json({ error: "Provide a topic or notes." }, { status: 400 });
  }
  if (topic.length > 400) {
    return NextResponse.json({ error: "Topic too long (max 400 chars)." }, { status: 400 });
  }
  if (notes.length > 12000) {
    return NextResponse.json({ error: "Notes too long (max 12k chars)." }, { status: 400 });
  }

  const userPayload = JSON.stringify({
    topic: topic || "(none provided — infer from notes)",
    notes: notes || "(none — generate from general knowledge of the topic)",
  });

  try {
    const raw = await chat(
      [
        { role: "system", content: SYSTEM_CORE },
        { role: "system", content: EXTRACT_AND_FIRST_QUESTION },
        { role: "user", content: userPayload },
      ],
      { temperature: 0.5, jsonMode: true }
    );
    const parsed = extractJson<SessionStartResponse>(raw);
    parsed.firstRound.createdAt = Date.now();
    parsed.concepts = parsed.concepts.map((c) => ({
      ...c,
      strength: "weak",
      attempts: 0,
      lastScore: 0,
    }));
    return NextResponse.json(parsed);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: `Session start failed: ${msg}` }, { status: 502 });
  }
}
