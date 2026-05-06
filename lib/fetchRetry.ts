import { authHeadersFor } from "./settings";

interface RetryOpts {
  attempts?: number;
  baseDelayMs?: number;
  retryOn?: number[];
  signal?: AbortSignal;
}

const DEFAULT_RETRY_STATUS = [429, 500, 502, 503, 504];

export async function fetchJson<T>(
  url: string,
  body: unknown,
  opts: RetryOpts = {}
): Promise<T> {
  const attempts = opts.attempts ?? 3;
  const base = opts.baseDelayMs ?? 600;
  const retryOn = opts.retryOn ?? DEFAULT_RETRY_STATUS;
  let lastErr: Error | null = null;

  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", ...authHeadersFor() },
        body: JSON.stringify(body),
        signal: opts.signal,
      });
      if (res.ok) return (await res.json()) as T;
      const text = await res.text().catch(() => "");
      let parsedMsg = text;
      try {
        const j = JSON.parse(text);
        parsedMsg = j?.error ?? text;
      } catch {}
      if (retryOn.includes(res.status) && i < attempts - 1) {
        const retryAfter = Number(res.headers.get("Retry-After"));
        const wait = retryAfter > 0 ? retryAfter * 1000 : base * Math.pow(2, i);
        await sleep(wait);
        lastErr = new Error(`HTTP ${res.status}: ${parsedMsg}`);
        continue;
      }
      throw new Error(`${parsedMsg || `HTTP ${res.status}`}`);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") throw e;
      lastErr = e instanceof Error ? e : new Error(String(e));
      if (i < attempts - 1) {
        await sleep(base * Math.pow(2, i));
      }
    }
  }
  throw lastErr ?? new Error("Request failed");
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}
