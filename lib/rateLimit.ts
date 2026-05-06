interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 30;

export function getClientKey(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  const real = req.headers.get("x-real-ip");
  const ip = fwd?.split(",")[0]?.trim() || real || "anon";
  return ip;
}

export interface RateResult {
  ok: boolean;
  remaining: number;
  resetMs: number;
}

export function rateCheck(key: string): RateResult {
  const now = Date.now();
  const b = buckets.get(key);
  if (!b || b.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, remaining: MAX_PER_WINDOW - 1, resetMs: WINDOW_MS };
  }
  if (b.count >= MAX_PER_WINDOW) {
    return { ok: false, remaining: 0, resetMs: b.resetAt - now };
  }
  b.count += 1;
  return { ok: true, remaining: MAX_PER_WINDOW - b.count, resetMs: b.resetAt - now };
}

if (typeof globalThis !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [k, v] of buckets) {
      if (v.resetAt < now - WINDOW_MS) buckets.delete(k);
    }
  }, WINDOW_MS).unref?.();
}
