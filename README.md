# Portfolio — Dhanesworo Muhammad Datiputro

Single-page portfolio. Next.js 16 · Tailwind CSS v4 · Motion · Resend.

- Desain (warna, font, komponen): [`DESIGN.md`](DESIGN.md)
- Isi & struktur section: [`docs/redesign-brief.md`](docs/redesign-brief.md)

## Menjalankan

Pakai **Node 24 LTS** (lihat `.nvmrc`).

```bash
npm install
cp .env.example .env.local   # lalu isi RESEND_API_KEY
npm run dev
```

Buka http://localhost:3000

| Script | Fungsi |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Build produksi |
| `npm run lint` | ESLint |
| `npm run typecheck` | Cek tipe TypeScript |
| `npm run format` | Rapikan kode + urutkan class Tailwind (Prettier) |
| `npm test` | Jalankan unit test (Vitest) |

## Struktur

- `app/layout.tsx` — font (Schibsted Grotesk, IBM Plex Mono), metadata, script tema
- `app/page.tsx` — merakit semua section
- `app/not-found.tsx` — halaman 404
- `app/api/contact/route.ts` — **backend form kontak** (`POST /api/contact`)
- `app/globals.css` — design token (light/dark) dari DESIGN.md
- `components/` — satu komponen per section + primitif UI di `ui.tsx`
- `lib/data.ts` — **semua konten ada di sini**
- `lib/contact-schema.ts` — aturan validasi form (dipakai di browser & server)
- `lib/rate-limit.ts` — rate limiter sederhana per IP

## Form kontak

Alur: form → `POST /api/contact` → honeypot → rate limit (3 pesan / 10 menit / IP) → validasi zod → kirim email via Resend → balas JSON.

Butuh env (lokal di `.env.local`, produksi di Environment Variables Vercel):

- `RESEND_API_KEY` — dari https://resend.com/api-keys
- `CONTACT_TO_EMAIL` — penerima pesan. Selama belum verifikasi domain di Resend, harus sama dengan email akun Resend.

## Sebelum publish

1. Cari `TODO` dan `[` di `lib/data.ts`, ganti semua placeholder.
2. Foto hero: idealnya PNG/WebP dengan background dihapus.
3. Foto Beyond Tech: taruh di `public/beyond/`, isi `src` di `gallery`.
4. Set env di Vercel, lalu tes kirim pesan dari web yang sudah live.
