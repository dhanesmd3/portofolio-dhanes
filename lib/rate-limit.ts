// Rate limiter sederhana "fixed window" yang disimpan di memori.
//
// Cara kerja: tiap key (mis. IP) punya jendela waktu. Selama jendela belum
// habis, hitung jumlah request. Kalau melewati batas → tolak sampai jendela
// berikutnya.
//
// Keterbatasan: memori ke-reset tiap server restart, dan di Vercel tiap
// instance punya memori sendiri. Untuk portofolio sudah cukup; versi
// "beneran" biasanya pakai penyimpanan bersama seperti Upstash Redis.

type Entry = { count: number; resetAt: number };

export type RateLimitResult =
  { ok: true; remaining: number } | { ok: false; retryAfterSeconds: number };

export function createRateLimiter({
  limit,
  windowMs,
}: {
  limit: number;
  windowMs: number;
}) {
  const entries = new Map<string, Entry>();

  return function check(key: string, now = Date.now()): RateLimitResult {
    // Bersihkan entry kadaluarsa sesekali supaya Map tidak tumbuh terus
    if (entries.size > 1000) {
      for (const [k, entry] of entries) {
        if (entry.resetAt <= now) entries.delete(k);
      }
    }

    const entry = entries.get(key);

    if (!entry || entry.resetAt <= now) {
      entries.set(key, { count: 1, resetAt: now + windowMs });
      return { ok: true, remaining: limit - 1 };
    }

    if (entry.count >= limit) {
      return {
        ok: false,
        retryAfterSeconds: Math.ceil((entry.resetAt - now) / 1000),
      };
    }

    entry.count += 1;
    return { ok: true, remaining: limit - entry.count };
  };
}
