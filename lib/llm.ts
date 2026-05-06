type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

interface CallOptions {
  temperature?: number;
  jsonMode?: boolean;
  signal?: AbortSignal;
  maxAttempts?: number;
}

interface Provider {
  id: string;
  available: () => boolean;
  call: (messages: ChatMessage[], opts: CallOptions) => Promise<string>;
}

const POLLINATIONS_URL = "https://text.pollinations.ai/openai";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";

async function callPollinations(
  messages: ChatMessage[],
  opts: CallOptions
): Promise<string> {
  const body: Record<string, unknown> = {
    model: "openai",
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
    throw new Error(`Pollinations ${res.status}: ${text.slice(0, 160)}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Pollinations: empty response");
  }
  return content;
}

async function callGroq(
  messages: ChatMessage[],
  opts: CallOptions
): Promise<string> {
  const key = process.env.GROQ_API_KEY;
  if (!key) throw new Error("GROQ_API_KEY missing");

  const body: Record<string, unknown> = {
    model: GROQ_MODEL,
    messages,
    temperature: opts.temperature ?? 0.4,
    max_tokens: 2000,
  };
  if (opts.jsonMode) body.response_format = { type: "json_object" };

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
    signal: opts.signal,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Groq ${res.status}: ${text.slice(0, 160)}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string" || !content.trim()) {
    throw new Error("Groq: empty response");
  }
  return content;
}

const PROVIDERS: Provider[] = [
  {
    id: "groq",
    available: () => !!process.env.GROQ_API_KEY,
    call: callGroq,
  },
  {
    id: "pollinations",
    available: () => true,
    call: callPollinations,
  },
];

export async function chat(
  messages: ChatMessage[],
  opts: CallOptions = {}
): Promise<string> {
  const maxAttempts = opts.maxAttempts ?? 2;
  const errors: string[] = [];

  for (const p of PROVIDERS) {
    if (!p.available()) continue;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      try {
        return await p.call(messages, opts);
      } catch (e) {
        const msg = e instanceof Error ? e.message : "unknown";
        errors.push(`${p.id} attempt ${attempt + 1}: ${msg}`);
        if (attempt < maxAttempts - 1) {
          await sleep(450 * (attempt + 1));
        }
      }
    }
  }
  throw new Error(`All LLM providers failed. ${errors.join(" | ")}`);
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
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

  throw new Error(
    `Failed to parse JSON from model output: ${trimmed.slice(0, 200)}`
  );
}

function tryParse<T>(s: string): T | null {
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}
