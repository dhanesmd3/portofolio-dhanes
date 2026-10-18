import { Resend } from "resend";
import { z } from "zod";
import { contactSchema, type ContactResponse } from "@/lib/contact-schema";
import { createRateLimiter } from "@/lib/rate-limit";

// Endpoint: POST /api/contact
// Method lain (GET, PUT, ...) otomatis dibalas 405 oleh Next.js karena
// file ini cuma meng-export POST.

// Maks 3 pesan per 10 menit per IP
const checkRateLimit = createRateLimiter({ limit: 3, windowMs: 10 * 60_000 });

function json(body: ContactResponse, init?: ResponseInit) {
  return Response.json(body, init);
}

function getClientIp(request: Request) {
  // Di Vercel/proxy, IP asli pengunjung ada di header ini (paling kiri)
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  // 1. Parse JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // 2. Honeypot: field "website" disembunyikan dari manusia, jadi kalau
  //    terisi hampir pasti bot. Balas "sukses" biar bot-nya nggak nyoba lagi.
  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.length > 0
  ) {
    return json({ ok: true });
  }

  // 3. Rate limit per IP
  const limit = checkRateLimit(getClientIp(request));
  if (!limit.ok) {
    return json(
      { ok: false, error: "Too many messages. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limit.retryAfterSeconds) },
      },
    );
  }

  // 4. Validasi input (aturan yang sama dengan di form)
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      {
        ok: false,
        error: "Please fix the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  // Secret cuma dibaca di server. Jangan pernah pakai prefix NEXT_PUBLIC_.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error(
      "[contact] RESEND_API_KEY atau CONTACT_TO_EMAIL belum di-set",
    );
    return json(
      {
        ok: false,
        error: "Messaging is not set up yet. Please email me directly.",
      },
      { status: 500 },
    );
  }

  // 5. Kirim email. Isi dikirim sebagai plain text, jadi input pengunjung
  //    nggak bisa nyisipin HTML ke email.
  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    // onboarding@resend.dev = alamat testing Resend, tanpa perlu domain sendiri
    from: "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `New message from ${name} via portfolio`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    return json(
      { ok: false, error: "Couldn't send your message. Please try again." },
      { status: 500 },
    );
  }

  // 6. Sukses
  return json({ ok: true });
}
