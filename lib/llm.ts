const POLLINATIONS_URL = "https://text.pollinations.ai/openai";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

interface CallOptions {
  model?: string;
  temperature?: number;
  jsonMode?: boolean;
  signal?: AbortSignal;
}

export async function chat(messages: ChatMessage[], opts: CallOptions = {}): Promise<string> {
  const body: Record<string, unknown> = {
    model: opts.model ?? "openai",
    messages,
    temperature: opts.temperature ?? 0.4,
    referrer: "cogniloop",
  };
  if (opts.jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch(POLLINATIONS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: opts.signal,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Pollinations ${res.status}: ${text.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") {
    throw new Error("Pollinations: empty response");
  }
  return content;
}

export function extractJson<T>(raw: string): T {
  const trimmed = raw.trim();
  const direct = tryParse<T>(trimmed);
  if (direct) return direct;

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fenced) {
    const inner = tryParse<T>(fenced[1].trim());
    if (inner) return inner;
  }

  const first = trimmed.indexOf("{");
  const last = trimmed.lastIndexOf("}");
  if (first !== -1 && last > first) {
    const slice = trimmed.slice(first, last + 1);
    const sliced = tryParse<T>(slice);
    if (sliced) return sliced;
  }

  throw new Error(`Failed to parse JSON from model output: ${trimmed.slice(0, 200)}`);
}

function tryParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
