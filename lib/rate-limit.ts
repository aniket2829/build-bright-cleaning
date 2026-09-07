import "server-only";

/**
 * A fixed-window limiter for the quote action.
 *
 * A Server Action is a public POST endpoint: anyone who can reach the site can
 * invoke `submitQuote` without going near the form. Since the action's effect
 * is "send mail to the owner's Gmail", an unguarded one is a spam relay
 * pointed at that inbox, and Gmail's free tier gives up at roughly 500
 * messages a day, so abuse costs real deliverability rather than just noise.
 *
 * Deliberately in-memory: no dependency, no infrastructure, and it holds for a
 * single long-lived server, which is what this site runs on. It is **not**
 * enough on its own for a serverless or multi-instance deployment, where each
 * instance keeps its own counters and a cold start forgets them — move the
 * counter to Redis/Upstash or put the limit at the edge or CDN there.
 */

type Window = { count: number; resetAt: number };

const WINDOW_MS = 60 * 60 * 1000; // one hour
const MAX_PER_WINDOW = 5; // a real customer sends one, maybe two
const MAX_KEYS = 5000; // bounds memory if someone rotates addresses

const windows = new Map<string, Window>();

/** Drop expired entries; if still over the cap, drop the oldest resets first. */
function evict(now: number) {
  for (const [key, w] of windows) {
    if (w.resetAt <= now) windows.delete(key);
  }
  if (windows.size <= MAX_KEYS) return;
  const byAge = [...windows.entries()].sort((a, b) => a[1].resetAt - b[1].resetAt);
  for (const [key] of byAge.slice(0, windows.size - MAX_KEYS)) windows.delete(key);
}

export type RateLimitResult = { ok: boolean; retryAfterMinutes: number };

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  evict(now);

  const existing = windows.get(key);
  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { ok: true, retryAfterMinutes: 0 };
  }

  existing.count += 1;
  if (existing.count > MAX_PER_WINDOW) {
    return {
      ok: false,
      retryAfterMinutes: Math.max(1, Math.ceil((existing.resetAt - now) / 60000)),
    };
  }
  return { ok: true, retryAfterMinutes: 0 };
}

/**
 * Best-effort client identity. `x-forwarded-for` is client-supplied and
 * trivially spoofed, so this is a speed bump for casual abuse, not an identity
 * check — behind a proxy you control, prefer the header that proxy signs.
 */
export function clientKey(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return headers.get("x-real-ip")?.trim() || "unknown";
}
