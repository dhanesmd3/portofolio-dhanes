import { describe, expect, it } from "vitest";
import { createRateLimiter } from "./rate-limit";

describe("createRateLimiter", () => {
  it("mengizinkan request sampai batas, lalu menolak", () => {
    const check = createRateLimiter({ limit: 2, windowMs: 1000 });
    expect(check("ip", 0).ok).toBe(true);
    expect(check("ip", 10).ok).toBe(true);
    expect(check("ip", 20)).toEqual({ ok: false, retryAfterSeconds: 1 });
  });

  it("reset setelah jendela waktu habis", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(check("ip", 0).ok).toBe(true);
    expect(check("ip", 500).ok).toBe(false);
    expect(check("ip", 1000).ok).toBe(true);
  });

  it("menghitung tiap key secara terpisah", () => {
    const check = createRateLimiter({ limit: 1, windowMs: 1000 });
    expect(check("a", 0).ok).toBe(true);
    expect(check("b", 0).ok).toBe(true);
    expect(check("a", 0).ok).toBe(false);
  });
});
