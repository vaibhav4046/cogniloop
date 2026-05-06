import { NextRequest, NextResponse } from "next/server";
import { chat, extractJson } from "@/lib/llm";
import { SYSTEM_CORE, FINAL_REPORT } from "@/lib/prompts";
import { getClientKey, rateCheck } from "@/lib/rateLimit";
import type { Concept, Round } from "@/lib/types";

export const runtime = "edge";
export const maxDuration = 30;

interface ReportBody {
  topic: string;
  concepts: Concept[];
  rounds: Round[];
}

interface ReportResponse {
  headline: string;
  mastered: string[];
  shaky: string[];
  weak: string[];
  studyPlan: { concept: string; action: string; minutes: number }[];
  feynmanPrompt: string;
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

  let body: ReportBody;
  try {
    body = (await req.json()) as ReportBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const userPayload = JSON.stringify({
    topic: body.topic,
    concepts: body.concepts,
    rounds: body.rounds.map((r) => ({
      id: r.id,
      question: r.question,
      answer: r.answer,
      evaluation: r.evaluation,
    })),
  });

  try {
    const raw = await chat(
      [
        { role: "system", content: SYSTEM_CORE },
        { role: "system", content: FINAL_REPORT },
        { role: "user", content: userPayload },
      ],
      { temperature: 0.3, jsonMode: true }
    );
    const parsed = extractJson<ReportResponse>(raw);
    parsed.mastered ??= [];
    parsed.shaky ??= [];
    parsed.weak ??= [];
    parsed.studyPlan ??= [];
    parsed.feynmanPrompt ??= "Reflect on what you understood least clearly today and write 200 words explaining it to a 12-year-old.";
    return NextResponse.json(parsed, {
      headers: { "X-RateLimit-Remaining": String(rl.remaining) },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown";
    return NextResponse.json({ error: `Report failed: ${msg}` }, { status: 502 });
  }
}
