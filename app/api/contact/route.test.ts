import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Ganti SDK Resend dengan versi palsu supaya test nggak beneran kirim email
const sendMock = vi.hoisted(() => vi.fn());
vi.mock("resend", () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

import { POST } from "./route";

let ipCounter = 0;

// Tiap request pakai IP berbeda supaya rate limit antar-test nggak saling ganggu
function makeRequest(body: unknown, ip = `10.0.0.${++ipCounter}`) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", "x-forwarded-for": ip },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

const valid = {
  name: "Dhanes",
  email: "dhanes@example.com",
  message: "Halo, mau ngobrol soal project.",
  website: "",
};

describe("POST /api/contact", () => {
  beforeEach(() => {
    vi.stubEnv("RESEND_API_KEY", "re_test");
    vi.stubEnv("CONTACT_TO_EMAIL", "me@example.com");
    sendMock.mockReset();
    sendMock.mockResolvedValue({ data: { id: "email_1" }, error: null });
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("mengirim email dan membalas 200 untuk input valid", async () => {
    const res = await POST(makeRequest(valid));

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(sendMock).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "me@example.com",
        replyTo: "dhanes@example.com",
        subject: "New message from Dhanes via portfolio",
      }),
    );
  });

  it("membalas 400 dengan error per field untuk input tidak valid", async () => {
    const res = await POST(
      makeRequest({ ...valid, email: "nope", message: "hi" }),
    );
    const body = await res.json();

    expect(res.status).toBe(400);
    expect(body.fieldErrors.email).toBeDefined();
    expect(body.fieldErrors.message).toBeDefined();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("membalas 400 untuk body yang bukan JSON", async () => {
    const res = await POST(makeRequest("bukan json"));
    expect(res.status).toBe(400);
  });

  it("diam-diam mengabaikan bot yang mengisi honeypot", async () => {
    const res = await POST(makeRequest({ ...valid, website: "spam.example" }));

    expect(res.status).toBe(200);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("membalas 429 setelah 3 pesan dari IP yang sama", async () => {
    const ip = "10.9.9.9";
    for (let i = 0; i < 3; i++) {
      expect((await POST(makeRequest(valid, ip))).status).toBe(200);
    }
    const res = await POST(makeRequest(valid, ip));

    expect(res.status).toBe(429);
    expect(res.headers.get("Retry-After")).toBeTruthy();
  });

  it("membalas 500 kalau env belum di-set", async () => {
    vi.stubEnv("RESEND_API_KEY", "");
    const res = await POST(makeRequest(valid));

    expect(res.status).toBe(500);
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("membalas 500 kalau Resend gagal", async () => {
    sendMock.mockResolvedValue({ data: null, error: { message: "boom" } });
    const res = await POST(makeRequest(valid));

    expect(res.status).toBe(500);
  });
});
