# Portfolio — Next.js + Tailwind CSS + Framer Motion

Single-page portfolio website. Lihat instruksi lengkap di pesan chat tempat
project ini dibuat, atau ringkasan singkat di bawah.

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Struktur

- `app/layout.tsx` — font (Space Grotesk, Inter, JetBrains Mono) & metadata
- `app/page.tsx` — merakit semua section
- `app/globals.css` — design token warna (Tailwind v4 `@theme`)
- `components/` — Navbar, Hero, Skills, Projects, ProjectCard, Contact, dst.
- `lib/data.ts` — **semua konten dummy ada di sini** (nama, bio, skill, project, link sosial)
- `hooks/useActiveSection.ts` — scroll-spy untuk navbar

## Sebelum publish

1. Ganti seluruh isi `lib/data.ts` dengan data asli kamu.
2. Taruh file CV asli di `public/` dan sesuaikan `cvUrl` di `lib/data.ts`.
3. Ganti `url` tiap project di `lib/data.ts` dengan link live project asli.
