// Semua konten website ada di file ini. Komponen cuma baca dari sini,
// jadi ganti isi di sini aja — struktur komponen tidak perlu disentuh.
//
// Yang masih placeholder ditandai "[...]" dan/atau komentar "TODO".
// Cari "TODO" atau "[" di file ini buat nemuin semuanya.

// ─── Profil ──────────────────────────────────────────────────────────────

export const profile = {
  name: "Dhanesworo Muhammad Datiputro",
  // Nama panggilan — di-highlight di hero. Harus awalan dari `name`.
  nickname: "Dhanes",
  wordmark: "Dhanesworo",
  tagline: "Informatics Student at ITB · Web Developer",
  bio: "Informatics student at Institut Teknologi Bandung who builds for the web with Next.js and React. I've shipped sites for national competitions, communities, and a hackathon — and I'm heading toward full-stack and AI next.",
  location: "Bandung, ID",
  timeZone: "Asia/Jakarta",
  timeZoneLabel: "WIB",
  email: "dhanesworo.md@gmail.com",
  cvUrl: "/cv-dhanesworo.pdf",
  // Idealnya PNG/WebP dengan background sudah dihapus (lihat DESIGN.md → Imagery).
  photoUrl: "/profile.jpg",
  availability: "Open to internships",
};

// ─── Sosial & navigasi ───────────────────────────────────────────────────

export type SocialIcon = "github" | "linkedin" | "instagram" | "mail";

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: SocialIcon;
};

export const socials: Social[] = [
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: "mail",
  },
  {
    label: "LinkedIn",
    handle: "Dhanesworo Muhammad Datiputro",
    href: "https://www.linkedin.com/in/dhanesworo-muhammad-datiputro",
    icon: "linkedin",
  },
  {
    label: "GitHub",
    handle: "dhanesmd3",
    href: "https://github.com/dhanesmd3",
    icon: "github",
  },
  {
    label: "Instagram",
    handle: "@dhanes.md",
    href: "https://instagram.com/dhanes.md",
    icon: "instagram",
  },
];

export const navLinks = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Experience", id: "experience" },
  { label: "Beyond Tech", id: "beyond" },
  { label: "Contact", id: "contact" },
] as const;

// ─── Tools ───────────────────────────────────────────────────────────────

export type ToolIcon =
  | "javascript"
  | "python"
  | "java"
  | "haskell"
  | "c"
  | "gnu"
  | "nextjs"
  | "react"
  | "tailwind"
  | "nodejs"
  | "mysql"
  | "git"
  | "github";

export type ToolGroup = {
  name: string;
  icon: "languages" | "frontend" | "backend" | "workflow";
  tools: { name: string; icon: ToolIcon }[];
};

export const toolGroups: ToolGroup[] = [
  {
    name: "Languages",
    icon: "languages",
    tools: [
      { name: "JavaScript", icon: "javascript" },
      { name: "Python", icon: "python" },
      { name: "Java", icon: "java" },
      { name: "C", icon: "c" },
      { name: "Haskell", icon: "haskell" },
      { name: "GNU Prolog", icon: "gnu" },
    ],
  },
  {
    name: "Frontend",
    icon: "frontend",
    tools: [
      { name: "Next.js", icon: "nextjs" },
      { name: "React", icon: "react" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    name: "Backend & Data",
    icon: "backend",
    tools: [
      { name: "Node.js", icon: "nodejs" },
      { name: "MySQL", icon: "mysql" },
    ],
  },
  {
    name: "Workflow",
    icon: "workflow",
    tools: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
    ],
  },
];

// ─── Projects ────────────────────────────────────────────────────────────

export type ProjectStatus = "LIVE" | "NEW" | "BETA";

export type ProjectImage = { src: string; width: number; height: number };

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  // Kalimat pertama sebaiknya langsung menyebut hasil/dampak.
  description: string;
  stack: string[];
  url: string;
  repoUrl?: string;
  // Screenshot di public/projects/. Kalau gambarnya lebih tinggi dari bingkai
  // 16:10 (screenshot full-page), preview-nya otomatis "nge-scroll" saat
  // kartu di-hover / dibuka. Kosong = tampil placeholder.
  image?: ProjectImage;
  status?: ProjectStatus;
  // true = tampil di carousel, false = masuk Archive.
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "titikatm",
    title: "titikATM",
    category: "Hackathon",
    year: "2026",
    description:
      "Finds the nearest ATM so people can avoid cross-bank withdrawal fees. Built for PIDI – DIGDAYA x Hackathon 2026, initiated by Bank Indonesia and OJK.",
    stack: ["Next.js", "Tailwind CSS", "Maps API"],
    url: "https://titikatm.dubius.id/",
    image: { src: "/projects/titikatm.jpg", width: 1280, height: 590 },
    status: "NEW",
    featured: true,
  },
  {
    id: "oggitb",
    title: "OGG FITB ITB 2026",
    category: "Competition Website",
    year: "2026",
    description:
      "Official website for the national Geography & Geoscience Olympiad by FITB ITB — competition info, timeline, gallery, and finalist announcements in one place.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://www.oggitb.com/",
    image: { src: "/projects/full/oggitb.jpg", width: 1440, height: 5400 },
    status: "LIVE",
    featured: true,
  },
  {
    id: "takooni",
    title: "Takooni",
    category: "SaaS Landing Page",
    year: "2025", // TODO: cek tahun
    description:
      "Landing page for an AI-powered SaaS that helps SEO teams find intent gaps, audit content quality, and track campaign performance over time.",
    stack: ["Next.js", "Tailwind CSS", "Motion"],
    url: "https://takooni.com/",
    image: { src: "/projects/full/takooni.jpg", width: 1440, height: 3839 },
    featured: true,
  },
  {
    id: "quacompute",
    title: "QuaCompute ID",
    category: "Community Website",
    year: "2025", // TODO: cek tahun
    description:
      "Home for an Indonesian community learning quantum computing from a software-engineering angle — roadmap, discussions, and collaboration for practitioners and researchers.",
    stack: ["Next.js", "Tailwind CSS"],
    url: "https://quacompute.id/",
    image: { src: "/projects/full/quacompute.jpg", width: 1440, height: 2184 },
    featured: true,
  },
  {
    id: "kualitas-air",
    title: "Water Quality Calculator",
    category: "Course Project",
    year: "2025", // TODO: cek tahun
    description:
      "Real-time converter for drinking-water parameters (TDS, salinity, EC, resistivity, ionic strength) checked against WHO and SNI standards.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://web-kualitas-air.vercel.app/",
    image: { src: "/projects/kualitas-air.jpg", width: 1280, height: 591 },
    featured: false,
  },
  {
    id: "city-weather",
    title: "City Weather",
    category: "Practice Project",
    year: "2025", // TODO: cek tahun
    description:
      "Search a city and get live temperature, humidity, and sky conditions from a weather API.",
    stack: ["JavaScript", "Weather API"],
    url: "https://city-weather-website2.vercel.app/",
    image: { src: "/projects/city-weather.jpg", width: 1280, height: 591 },
    featured: false,
  },
  {
    id: "kalkulator",
    title: "Simple Calculator",
    category: "Practice Project",
    year: "2025", // TODO: cek tahun
    description:
      "My first interactive UI — a calculator for practicing HTML, CSS, and JavaScript fundamentals.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://kalkulator-sederhana-two.vercel.app/",
    image: { src: "/projects/kalkulator.jpg", width: 1280, height: 586 },
    featured: false,
  },
];

// ─── Experience & Achievements ───────────────────────────────────────────

export type ExperienceKind =
  "Education" | "Organization" | "Committee" | "Freelance";

export type Experience = {
  kind: ExperienceKind;
  role: string;
  organization: string;
  period: string;
  highlights: string[];
};

// Urutkan dari yang terbaru.
export const experiences: Experience[] = [
  {
    kind: "Education",
    role: "Informatics Engineering",
    organization: "Institut Teknologi Bandung (ITB)",
    period: "2025 — Now",
    highlights: [
      // TODO: ganti dengan fokus studi, mata kuliah relevan, atau IPK (kalau mau)
      "[Focus area, relevant coursework, or GPA]",
    ],
  },
  {
    // TODO: isi kepanitiaan (mis. tim web OGG FITB ITB 2026 — kalau memang iya)
    kind: "Committee",
    role: "[Your role]",
    organization: "[Event or committee name]",
    period: "[Year]",
    highlights: [
      "[What you built or handled, with a result if possible]",
      "[Second highlight]",
    ],
  },
  {
    // TODO: isi organisasi / unit kegiatan
    kind: "Organization",
    role: "[Your role]",
    organization: "[Organization name]",
    period: "[Year — Year]",
    highlights: ["[What you did there]"],
  },
];

export type Achievement = {
  title: string;
  issuer: string;
  year: string;
  url?: string;
};

export const achievements: Achievement[] = [
  {
    // TODO: isi hasilnya (Participant / Finalist / Winner ...)
    title: "PIDI – DIGDAYA x Hackathon 2026 · [Result]",
    issuer: "Bank Indonesia & OJK",
    year: "2026",
  },
  {
    title: "[Competition or award name]",
    issuer: "[Organizer]",
    year: "[Year]",
  },
  {
    title: "[Certificate or award name]",
    issuer: "[Issuer]",
    year: "[Year]",
  },
];

// ─── Beyond Tech ─────────────────────────────────────────────────────────

export type GalleryItem = {
  // Taruh foto di public/beyond/. Kosong = tampil placeholder.
  src?: string;
  alt: string;
  // 1–3 kata, mis. "Futsal", "Hiking", "Coffee".
  caption: string;
  // Info tipis yang muncul di bawah foto saat foto diklik.
  description: string;
  // big = 2×2, wide = 2×1, tall = 1×2, kosong = 1×1
  span?: "big" | "wide" | "tall";
};

export const beyondIntro = {
  title: "Away from the keyboard.",
  // TODO: ganti dengan 1–2 kalimat tentang kamu di luar ngoding
  body: "[One or two sentences about what you do when you're not coding — sports, places, people, things that keep you curious.]",
};

// TODO: ganti dengan 6–9 foto hobi. Urutan + span ini sudah pas tanpa lubang
// di grid 4 kolom (desktop) maupun 2 kolom (mobile).
export const gallery: GalleryItem[] = [
  {
    alt: "Hobby photo 1",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
    span: "big",
  },
  {
    alt: "Hobby photo 2",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
    span: "tall",
  },
  {
    alt: "Hobby photo 3",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
  },
  {
    alt: "Hobby photo 4",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
  },
  {
    alt: "Hobby photo 5",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
    span: "wide",
  },
  {
    alt: "Hobby photo 6",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
  },
  {
    alt: "Hobby photo 7",
    caption: "[Hobby]",
    description: "[Where, when, or why it matters — one short line.]",
  },
];
