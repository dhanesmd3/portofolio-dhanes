import { z } from "zod";

// Aturan validasi form kontak. Dipakai di DUA tempat:
// - components/ContactForm.tsx → biar error langsung muncul di browser
// - app/api/contact/route.ts   → validasi ulang di server (wajib, karena
//   request bisa dikirim tanpa lewat form, mis. pakai curl)
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(80, "Name is too long (max 80 characters)."),
  email: z
    .string()
    .trim()
    .max(254, "Email is too long.")
    .pipe(z.email("Please enter a valid email address.")),
  message: z
    .string()
    .trim()
    .min(10, "Message is too short (min 10 characters).")
    .max(2000, "Message is too long (max 2000 characters)."),
});

export type ContactInput = z.infer<typeof contactSchema>;

export type ContactFieldErrors = Partial<Record<keyof ContactInput, string[]>>;

// Bentuk response JSON dari POST /api/contact
export type ContactResponse =
  { ok: true } | { ok: false; error: string; fieldErrors?: ContactFieldErrors };
