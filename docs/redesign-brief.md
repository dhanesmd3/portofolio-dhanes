# Redesign Brief — Portfolio Dhanes

Dokumen acuan buat rombak ulang portofolio. Pakai file ini sebagai konteks tiap kali nge-prompt, contoh:

> "Baca `docs/redesign-brief.md` dan `DESIGN.md`, kerjain section **3.3 Projects** sesuai brief. Jangan ubah section lain."

Kerjain **satu section per prompt**, cek hasilnya, baru lanjut.

---

## 0. Ringkasan

- **Bahasa web:** English (semua copy, metadata, label form, `<html lang="en">`).
- **Tema:** dark default, ada toggle light/dark.
- **Tujuan:** portofolio yang simple, minimalis, profesional, tapi tetap ada satu-dua detail yang bikin diinget.
- **Prinsip:** isi > dekorasi. Tiap section harus nunjukin *bukti* (project jadi, hasil, angka), bukan klaim ("fast learner").
- **Bentuk:** single page, satu kolom, scroll dari atas ke bawah, header sticky dengan anchor link.
- **Stack (tetap):** Next.js 16 (App Router), React 19, Tailwind CSS v4, Motion (`motion/react`), embla-carousel-react, lucide-react, react-icons (Simple Icons). Backend kontak: Resend + zod. Tooling: Node 24 LTS, Prettier, Vitest. Semua konten tetap dari `lib/data.ts`.

## 1. Referensi

| Referensi | Yang diambil |
|---|---|
| [farrel.me](https://www.farrel.me/) | Isi yang padat & to the point. Project ditampilin sebagai **slide/carousel** kartu (thumbnail, tanggal, 1 kalimat, link). Deskripsi pakai hasil konkret. Badge status kecil (NEW / BETA). Section Achievements yang ringkas (nama, penyelenggara, tahun). |
| [wisee.info](https://www.wisee.info/) | Header sticky + anchor link. Hero dengan 2 CTA (lihat project + download CV) dan foto. Tech stack dikelompokin. Timeline experience bernomor. Section personal "Away from compute" berupa galeri foto dengan caption satu kata. Light/dark toggle. |

**Yang nggak diambil:** grid soft skills, efek dekoratif rame (glow gede, partikel, gradient warna-warni).

## 2. Design direction

> **Source of truth visual sekarang: [`DESIGN.md`](../DESIGN.md)** (gabungan Hyperstudio + farrel + wisee). Token warna, font, type scale, spacing, motion, dan spesifikasi tiap komponen ada di sana. Kalau di bawah ini ada yang beda sama DESIGN.md, **ikutin DESIGN.md**. Bagian Warna/Tipografi/Layout/Motion di bawah ini cuma catatan awal.

### Warna
Netral + **satu** warna aksen. Aksen cuma buat: link/CTA utama, highlight kecil, state aktif nav. Jangan dipakai buat blok gede.

Usulan awal (boleh diganti):

| Token | Dark (default) | Light |
|---|---|---|
| `bg` | `#0b0b0c` | `#fafaf9` |
| `surface` (kartu) | `#141416` | `#ffffff` |
| `border` | `#232326` | `#e7e5e4` |
| `text` | `#ededed` | `#1c1917` |
| `text-muted` | `#8a8a8f` | `#78716c` |
| `accent` | `#e3a857` (ember, warna yang sekarang) | `#b7791f` |

Semua warna didefinisikan sebagai CSS variable di `app/globals.css` (`@theme`), komponen nggak boleh hardcode hex.

### Tipografi
Font yang terlalu sering muncul di web template/AI (Inter, Geist, Space Grotesk, JetBrains Mono, Instrument Serif) **nggak dipakai**.

- **Display + body: [Schibsted Grotesk](https://fonts.google.com/specimen/Schibsted+Grotesk).** Grotesk dari dunia media berita: tegas, profesional, tapi bentuk hurufnya punya karakter. Satu family buat judul dan body. Judul pakai weight **400** (gaya Hyperstudio, hierarki dari ukuran + tracking, bukan bold), lihat DESIGN.md.
- **Mono (label kecil, tanggal, tag, nomor section): [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono)** (400, 500). Mono yang "berkarakter", kontras enak sama Schibsted.
- Dua-duanya ada di Google Fonts, load lewat `next/font/google` di `app/layout.tsx` (ganti Space Grotesk, Inter, JetBrains Mono).
- Judul besar: `letter-spacing` sedikit negatif (±`-0.02em`). Label mono: uppercase + `letter-spacing` ±`0.08em`.
- Skala: nama di hero besar (±56–72px desktop), judul section ±14px uppercase mono + judul ±28–32px, body 15–16px.

### Layout & spacing
- Lebar konten maks ±`max-w-3xl` (≈768px) buat teks, project carousel boleh lebih lebar (`max-w-5xl`).
- Jarak antar section lega (±96–128px desktop, ±64px mobile).
- Mobile-first, gutter 16–24px, nggak ada horizontal scroll (kecuali di dalam carousel).

### Motion
- Halus dan sedikit: fade + naik 8–16px saat masuk viewport, durasi 0.4–0.6s, easing `[0.22, 1, 0.36, 1]`.
- Hover kartu: angkat tipis / border jadi aksen.
- Wajib hormati `prefers-reduced-motion` (matikan animasi).

### Header

> **Update:** header sekarang pill kaca mengambang (gaya newminds.studio). Lihat DESIGN.md → Top Navigation.

- Sticky, background blur tipis saat discroll.
- Kiri: nama/inisial. Tengah/kanan: About, Projects, Experience, Beyond Tech, Contact. Kanan: toggle light/dark.
- Link aktif di-highlight sesuai section yang lagi keliatan (`hooks/useActiveSection.ts` udah ada).
- Mobile: menu jadi sheet/dropdown.

### Theme toggle
- Default **dark**. Pilihan user disimpan di `localStorage` (bungkus try/catch).
- Tema di-set lewat atribut `data-theme` di `<html>`. Token light/dark di `globals.css` ganti berdasarkan atribut itu.
- **Nggak boleh ada flash** tema salah pas reload: pasang script inline kecil di `<head>` yang baca `localStorage` sebelum halaman ke-render (tambah `suppressHydrationWarning` di `<html>`). Nggak perlu library tambahan.
- Tombol: ikon matahari/bulan (lucide), ada `aria-label` ("Switch to light theme"), transisi warna halus (±200ms).

---

## 3. Section

### 3.1 Profil (Hero) — `#about`

**Isi**
- Nama lengkap: Dhanesworo Muhammad Datiputro
- Satu baris posisi: mis. "Informatics Student at ITB · Web Developer"
- Deskripsi singkat 2–3 kalimat (lihat catatan copy di bawah)
- Lokasi: Bandung, Indonesia
- Foto (`public/profile.jpg`)
- CTA: **Download CV** (`/cv-dhanesworo.pdf`) + **View projects** (scroll ke `#projects`)
- Ikon sosial kecil: GitHub, LinkedIn, Email

**Layout**
- Desktop: teks kiri, foto kanan. Mobile: foto di atas, teks di bawah.

**Efek foto nge-fade ke background**

Efeknya: bagian bawah (atau pinggir) foto memudar pelan sampai nyatu sama warna latar, jadi foto keliatan "keluar" dari halaman, bukan kotak yang ditempel.

Cara bikinnya pakai `mask-image` di CSS. Masknya bikin piksel transparan, bukan ditimpa warna, jadi tetap nyatu walaupun tema light/dark diganti.

**Dipakai: varian A.** Varian B dan C disimpan buat referensi aja.

- **A. Fade ke bawah (DIPAKAI):** foto setengah badan, bagian bawah memudar.
  ```css
  mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
  ```
- **B. Vignette radial:** semua pinggir memudar, foto kayak muncul dari tengah.
  ```css
  mask-image: radial-gradient(ellipse 70% 70% at 50% 40%, black 50%, transparent 100%);
  ```
- **C. Fade bawah + kiri:** cocok kalau foto di kanan dan teks di kiri, jadi foto "masuk" ke area teks.
  ```css
  mask-image: linear-gradient(to bottom, black 60%, transparent),
              linear-gradient(to left, black 60%, transparent);
  mask-composite: intersect;
  ```

Tips biar hasilnya bagus:
- Paling rapi kalau **background foto dihapus dulu** (remove.bg / Photoshop), simpan sebagai PNG/WebP transparan. Kalau nggak, pakai foto yang latarnya polos dan warnanya dekat sama `bg` web.
- Opsional: `grayscale` + sedikit kontras, berubah jadi berwarna saat hover. Kesannya lebih editorial.
- Tetap pakai `next/image` (kasih `preload` karena ada di atas; `priority` sudah deprecated di Next 16). `mask-image` dipasang di wrapper atau langsung di `<Image>`.

**Catatan copy**
- Semua copy pakai English, termasuk yang sekarang masih Indonesia di `lib/data.ts` (deskripsi project, bio, dll.).
- Hindari "masih dalam proses belajar". Ganti ke apa yang dikerjain sekarang dan arahnya. Contoh:
  > "Informatics student at ITB who builds for the web with Next.js and React. Shipped sites for competitions, communities, and a hackathon, and currently exploring AI."

### 3.2 Tools — `#tools`

**Isi:** daftar tools, **dikelompokin**:
- **Languages:** JavaScript, Python, Java, C, Haskell, GNU Prolog
- **Frontend:** Next.js, React, Tailwind CSS
- **Backend & data:** Node.js, MySQL
- **Workflow:** Git, GitHub

**Tampilan**
- Chip kecil (ikon + nama) per kelompok, atau satu baris marquee yang jalan pelan dan bisa di-pause (kayak wisee).
- Nggak ada level/persen/bintang skill.

**Soft skills:** hapus section-nya. Kalau mau tetap ada, cukup satu kalimat di paragraf About, nggak usah kartu.

### 3.3 Projects — `#projects`

**Isi:** project dari `lib/data.ts` (data sekarang udah ada). Usulan pembagian:
- **Featured (di carousel):** titikATM, Takooni, OGG FITB ITB 2026, QuaCompute ID
- **Archive (list ringkas di bawah carousel / tombol "Show more"):** Kalkulator Kualitas Air, City Weather, Kalkulator Sederhana

**Kartu project (featured)**
- Screenshot (`public/projects/*.jpg`, rasio 16:10)
- Kategori + tahun (mono, kecil)
- Judul
- 1–2 kalimat: apa itu + **hasilnya** (mis. "Built for PIDI–DIGDAYA x Hackathon 2026 by Bank Indonesia & OJK.")
- Tag stack
- Badge status opsional: `LIVE`, `NEW`, `HACKATHON`
- Link: Live ↗ (+ GitHub kalau ada)

**Carousel (pakai embla-carousel-react, udah ke-install)**
- Desktop: 2–2.5 kartu kelihatan, sisanya kepotong di kanan (biar keliatan bisa digeser).
- Mobile: 1 kartu + intip kartu berikutnya.
- Kontrol: tombol prev/next, drag/swipe, keyboard (← →), indikator posisi (dots atau `01 / 04`).
- Opsional: autoplay pelan, berhenti saat hover/focus.

**Archive:** satu baris per project, isinya judul · kategori · tahun · link ↗.

**Data tambahan yang perlu ditambah di type `Project`:** `year`, `featured: boolean`, `status?`, `repoUrl?`, `highlight?` (kalimat hasil/angka).

### 3.4 Achievements & Experience — `#experience`

> **Update:** data diisi dari LinkedIn (Profile.pdf, Okt 2026). Timeline 9 entri (5 tampil + "Show earlier"), Education + Achievements di panel kaca samping. Lihat DESIGN.md → Timeline Item.


Dua blok berdampingan di desktop (kiri Experience, kanan Achievements), ditumpuk di mobile.

**Experience (timeline bernomor kayak wisee)**
- Per item: nomor (`01`, `02`), role, organisasi/kepanitiaan/tempat, periode, 1–3 bullet hasil kerja.
- Termasuk: **pendidikan (ITB Teknik Informatika '25)**, organisasi, kepanitiaan (mis. tim web OGG FITB ITB), freelance/proyek klien.

**Achievements (list ringkas kayak farrel)**
- Per item: nama penghargaan/lomba, penyelenggara, tahun, (opsional) link sertifikat.
- Kalau masih sedikit, gabung aja ke Experience dengan label "Award".

**Data:** belum ada, isi di `lib/data.ts` dengan type `Experience` dan `Achievement`.

### 3.5 Beyond Tech — `#beyond`

> **Update:** bento grid diganti **ring 3D** gaya velmax.llc ("What's going on the shelf"): berputar sendiri, bisa di-drag, dan kartu bisa dibuka untuk info. Data: `caption` + `description` per item, 8–12 item. Lihat DESIGN.md → Beyond Tech Ring.


**Isi:** hobi dan kegiatan di luar ngoding, bentuknya galeri foto.

**Tampilan**
- Grid masonry / bento (ukuran kotak campur: ada yang 2×2, 1×2, 1×1), 6–9 foto.
- Tiap foto ada caption pendek (1–3 kata, kayak wisee: "Futsal", "Hiking", "Coffee").
- Klik foto = toggle: info tipis (caption + 1 kalimat `description`) naik dari bawah foto. Satu foto terbuka dalam satu waktu. Nggak pakai lightbox.
- Satu kalimat intro di atas galeri.
- Foto disimpan di `public/beyond/`, pakai `next/image` + `sizes` biar ringan.

**Data:** `beyondTech: { src, alt, caption, span?: "wide" | "tall" | "big" }[]`

### 3.6 Let's Connect — `#contact`

**Isi**
- Judul + 1 kalimat ajakan (mis. "Open to internships, collaborations, or just a chat.")
- Link: Email, LinkedIn, GitHub, Instagram (opsional)
- **Form kirim pesan:** Nama, Email, Pesan, tombol Kirim

**Backend: Resend + Route Handler (dibikin sendiri, sekalian belajar backend)**

Alurnya:
```
Form (browser)
  → fetch POST /api/contact  { name, email, message, website }   // website = honeypot
    → app/api/contact/route.ts (jalan di server)
        1. parse JSON
        2. cek honeypot      → kalau keisi: balas 200 tapi nggak kirim apa-apa
        3. rate limit per IP → kebanyakan: 429
        4. validasi input    → nggak valid: 400 + pesan error per field
        5. kirim email via Resend SDK
        6. sukses: 200 { ok: true } | gagal: 500 { error }
  ← form nampilin state sukses / error
```

File:
- `app/api/contact/route.ts`: endpoint `POST`. Kembaliin JSON + status code yang bener (200 / 400 / 429 / 500 / 405 buat method lain).
- `lib/contact-schema.ts`: aturan validasi. Dipakai di server (wajib) dan di form (biar error langsung muncul). Pakai **zod** (satu-satunya dependency baru selain `resend`).
- `lib/rate-limit.ts`: rate limit sederhana in-memory (mis. maks 3 pesan / 10 menit per IP).
- `components/ContactForm.tsx`: client component, `fetch` ke `/api/contact`.

Aturan validasi:
- `name`: 2–80 karakter
- `email`: format email valid, maks 254
- `message`: 10–2000 karakter
- Semua di-`trim()`. Isi pesan di-escape sebelum dimasukin ke HTML email, atau kirim sebagai plain text aja.

Kirim email (paket `resend`):
- `from`: `Portfolio <onboarding@resend.dev>` (alamat testing Resend, bisa dipakai tanpa domain sendiri, tapi cuma bisa ngirim ke email akun Resend lo)
- `to`: `dhanesworo.md@gmail.com` (harus sama dengan email akun Resend)
- `replyTo`: email pengirim, jadi tinggal klik Reply di Gmail
- `subject`: `New message from {name} via portfolio`

Secret & env:
- `RESEND_API_KEY` di `.env.local` (udah ke-ignore git) dan di Environment Variables Vercel.
- `CONTACT_TO_EMAIL` juga di env, jangan hardcode.
- API key **cuma** dibaca di server. Jangan pernah pakai prefix `NEXT_PUBLIC_`.
- Bikin `.env.example` (tanpa nilai asli) biar keliatan env apa aja yang dibutuhin. `.gitignore` sekarang nge-ignore `.env*`, jadi tambahin baris `!.env.example` biar file contoh ini tetap ke-commit.

Keterbatasan yang perlu diketahui:
- Rate limit in-memory ke-reset tiap server restart, dan di Vercel tiap instance punya memori sendiri. Buat portofolio udah cukup. Versi "beneran": Upstash Redis.
- Free tier Resend punya batas harian/bulanan, jauh di atas kebutuhan portofolio.
- Nanti kalau punya domain sendiri, verifikasi di Resend biar `from` bisa `hello@domainlo.com`.

**Wajib di form**
- Validasi di client pakai schema yang sama (tapi server tetap validasi ulang, client nggak bisa dipercaya).
- Honeypot: input `website` tersembunyi (`aria-hidden`, `tabIndex={-1}`, `autoComplete="off"`).
- State: idle → sending (tombol disabled) → sukses ("Thanks! I'll get back to you soon.") / error (pesan dari server, mis. "Too many messages, try again later.").
- Aksesibel: label di tiap input, error per field pakai `aria-describedby`, status kirim di `aria-live="polite"`.

**Footer:** © tahun, "Built with Next.js", (opsional) jam lokal Bandung (WIB) / tanggal terakhir update.

---

## 4. Tambahan opsional

**Diambil sekarang: no. 7 (halaman 404).** Sisanya buat nanti.

### 4.1 Halaman 404 — `app/not-found.tsx`
- Pakai header, token warna, dan font yang sama kayak halaman utama (ikut tema light/dark).
- Isi: kode `404` besar (font display), satu kalimat ("This page doesn't exist, or it moved."), tombol **Back to home** (`/`), plus link kecil ke `#projects` dan `#contact`.
- Opsional, satu detail kecil biar nggak ngebosenin: teks gaya terminal di font mono, mis. `$ cd /this-page → no such file or directory`.
- Tetap simpel: nggak ada ilustrasi gede atau animasi berat.
- `metadata.title`: "Page not found · Dhanesworo".

### Daftar lengkap

Diurutin dari yang paling ngaruh:

1. **Education di Experience.** ITB itu kredibilitas, tampilin jelas.
2. ~~**Badge "Currently…"** di hero, mis. "Currently building X" / "Learning ML". Bikin web kerasa hidup, gampang di-update.~~ (dicoba, lalu dihapus atas permintaan)
3. **SEO & share preview.** `metadata` lengkap, OG image (gambar yang muncul kalau link dishare di WA/LinkedIn), favicon sendiri.
4. **Halaman case study** `/projects/[slug]` buat 1–2 project terbaik: masalah, peranmu, proses, hasil, screenshot.
5. **Command palette `Ctrl/⌘+K`** buat navigasi + copy email. Detail kecil yang "developer banget".
6. **GitHub activity / contribution graph** di section Tools.
7. **Halaman 404** custom yang simpel. ✅ diambil (lihat 4.1)

## 5. Konten yang harus disiapin

- [ ] Foto profil (idealnya background udah dihapus, PNG/WebP)
- [ ] CV terbaru (`public/cv-dhanesworo.pdf`)
- [ ] Deskripsi singkat 2–3 kalimat
- [ ] Per project: tahun, peranmu, 1 kalimat hasil, link repo (kalau ada), screenshot 16:10
- [ ] Experience: organisasi, kepanitiaan, freelance (role, periode, 1–3 bullet)
- [ ] Achievements: nama, penyelenggara, tahun
- [ ] 6–9 foto hobi + caption
- [ ] Link Instagram (kalau mau ditampilin)
- [ ] Akun Resend (daftar pakai `dhanesworo.md@gmail.com`) + API key

## 6. Keputusan

- [x] Bahasa web: **English**
- [x] Tema: **dark default + toggle light/dark**
- [x] Fade foto: **varian A** (fade ke bawah)
- [x] Font: **Schibsted Grotesk** (display + body) + **IBM Plex Mono**
- [x] Tambahan opsional: **halaman 404** dulu, sisanya nanti
- [x] Form kontak: **Resend + Route Handler** sendiri (`app/api/contact/route.ts`)

## 7. Aturan teknis buat AI yang ngerjain

- Konten **cuma** dari `lib/data.ts`. Komponen nggak boleh hardcode teks konten.
- Satu komponen per section di `components/`, dirakit di `app/page.tsx`.
- Warna, font, radius lewat token di `app/globals.css`. Jangan hardcode hex di komponen.
- Gambar wajib `next/image` dengan `alt` yang jelas.
- Responsif dari 360px sampai desktop lebar, tanpa horizontal scroll halaman.
- Aksesibilitas: HTML semantik (`<section>`, `<nav>`, heading berurutan), fokus keyboard kelihatan, kontras cukup, `prefers-reduced-motion`.
- Jangan nambah dependency baru tanpa alasan jelas. Carousel pakai embla, animasi pakai Motion (`motion/react`). Dependency yang udah disetujui: `resend`, `zod`, dan dev tools `prettier`, `prettier-plugin-tailwindcss`, `vitest`.
- Jalanin `npm run lint` dan `npm run build` sebelum selesai.
