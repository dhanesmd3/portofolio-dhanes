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
  bio: "Informatics student at Institut Teknologi Bandung who loves building apps, websites, and projects that are meaningful, impactful, and fun — with a real hunger for winning competitions. Next, I'm growing toward AI/ML engineering.",
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
  // inCompact: false = disembunyikan di tampilan Compact
  { label: "Beyond Tech", id: "beyond", inCompact: false },
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

export type ProjectStatus = "LIVE" | "NEW" | "BETA" | "TOP 30";

export type ProjectImage = { src: string; width: number; height: number };

export type Project = {
  id: string;
  title: string;
  category: string;
  year: string;
  // Kalimat pertama sebaiknya langsung menyebut hasil/dampak.
  description: string;
  stack: string[];
  // Link live. Kosong kalau tidak ada versi publik (app Android, situs internal).
  url?: string;
  // Hanya isi kalau repo-nya PUBLIC — repo private akan 404 untuk pengunjung.
  repoUrl?: string;
  // Catatan kecil kalau tidak ada link sama sekali, mis. "Private repository".
  note?: string;
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
    id: "ronda",
    title: "RONDA",
    category: "Hackathon · Android",
    year: "2026",
    description:
      "Android guardian app that scores every newly installed app on-device, blocks risky sideloaded APKs, and sends the decision to a trusted family member instead of the person being scammed. Top 30 at HackNusa 2026 (Human-Centric Security track), built with Axeleon and Malik.",
    stack: ["Kotlin", "Jetpack Compose", "Firebase"],
    repoUrl: "https://github.com/angseleong/RONDA",
    // Slide pilihan dari pitch deck (cover → arsitektur), disusun vertikal
    image: { src: "/projects/full/ronda.jpg", width: 1440, height: 4860 },
    status: "TOP 30",
    featured: true,
  },
  {
    id: "oskm",
    title: "OSKM ITB 2026",
    category: "Event Website",
    year: "2026",
    description:
      "Public website for ITB's 2026 student orientation — countdown, event timeline, merchandise, sponsors, and a weather overlay. I built the public shell and the home page sections inside a 28-person monorepo team (KAT ITB 2026, Information Division).",
    stack: ["React", "TanStack Router", "Tailwind CSS", "Vite"],
    note: "Private repository · site no longer online",
    image: { src: "/projects/full/oskm.jpg", width: 1440, height: 5400 },
    featured: true,
  },
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
    id: "makalah-matdis",
    title:
      "Graph and Combinatorial Analysis of Basketball Passing Networks: The Steph Curry Effect on the Golden State Warriors' Motion Offense",
    category: "Paper",
    year: "2026",
    description:
      "Discrete Mathematics paper using weighted directed graphs and combinatorics on NBA passing data (2021/22).",
    stack: ["Python", "Graph Theory"],
    url: "https://github.com/dhanesmd3/makalah-matdis-13525034",
    featured: false,
  },
  {
    id: "uno-prolog",
    title: "UNO Card Game in Prolog",
    category: "Course Project",
    year: "2026",
    description:
      "Command-line UNO-style card game for 2–4 players, written in GNU Prolog for the Computational Logic course.",
    stack: ["GNU Prolog"],
    url: "https://github.com/dhanesmd3/IF1221_G29_MacMiniHaji",
    featured: false,
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

// ─── Experience, Education & Achievements ────────────────────────────────
// Sumber: profil LinkedIn (Profile.pdf, Oktober 2026).

export type ExperienceKind =
  "Organization" | "Community" | "Committee" | "Work";

export type Experience = {
  kind: ExperienceKind;
  role: string;
  organization: string;
  period: string;
  // Boleh kosong. Isi 1–3 poin hasil kerja kalau ada.
  highlights: string[];
};

// Urutkan dari yang terbaru. Timeline menampilkan beberapa teratas dulu,
// sisanya muncul lewat tombol "Show earlier".
export const experiences: Experience[] = [
  {
    kind: "Organization",
    role: "Club and Hobbies Intern",
    organization: "Himpunan Mahasiswa Informatika (HMIF) ITB",
    period: "Sep 2026 — Now",
    highlights: [], // TODO: tambah poin kalau ada
  },
  {
    kind: "Organization",
    role: "Media Intelligence Associate",
    organization: "Inkubator IT",
    period: "Aug 2026 — Now",
    highlights: [], // TODO: tambah poin kalau ada
  },
  {
    kind: "Community",
    role: "Website Developer Explorer",
    organization: "Google Developer Groups on Campus ITB",
    period: "Jul 2026 — Now",
    highlights: [], // TODO: tambah poin kalau ada
  },
  {
    kind: "Committee",
    role: "Frontend Developer",
    organization: "OSKM ITB 2026",
    period: "Jun 2026 — Oct 2026",
    highlights: [
      "Built the public site's shell and home page sections (countdown, timeline, content) in a 28-person monorepo team.",
    ],
  },
  {
    kind: "Work",
    role: "Web Developer",
    organization: "Takooni",
    period: "Jun 2026 — Jul 2026",
    highlights: ["Built the product landing page — takooni.com."],
  },
  {
    kind: "Committee",
    role: "Social Night Division Committee",
    organization: "The Sandbox 3.0 by IEEE ITB",
    period: "Jan 2026 — May 2026",
    highlights: [], // TODO: tambah poin kalau ada
  },
  {
    kind: "Committee",
    role: "IT Division Committee",
    organization: "OGG FITB ITB 2026",
    period: "Jan 2026 — Mar 2026",
    highlights: [
      "Built and shipped the official competition website — oggitb.com.",
    ],
  },
  {
    kind: "Work",
    role: "Website Developer",
    organization: "QuaCompute.id",
    period: "Dec 2025 — Jan 2026",
    highlights: ["Built the community website — quacompute.id."],
  },
  {
    kind: "Work",
    role: "Social Media Manager",
    organization: "Dubius: Knowledge Museum",
    period: "Mar 2022 — May 2022",
    highlights: [
      "Created and managed content across Dubius' social media channels.",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  period: string;
};

export const education: Education[] = [
  {
    school: "Institut Teknologi Bandung (ITB)",
    degree: "Informatics Engineering",
    period: "2025 — 2029",
  },
  {
    school: "SMA Negeri 28 Jakarta",
    degree: "Math & Science",
    period: "2022 — 2025",
  },
];

export type Achievement = {
  title: string;
  issuer?: string;
  year: string;
  url?: string;
};

export const achievements: Achievement[] = [
  {
    title: "Absolute Winner — Indonesian National Mathematics Olympiad (INMO)",
    year: "2024",
  },
  {
    title: "1st Place, Mathematics — Olimpiade Nasional (OLNAS)",
    year: "2024",
  },
  {
    title: "Top 30 Team — HackNusa 2026",
    issuer: "Telkom University Hackathon · Human-Centric Security track",
    year: "2026",
  },
];

// ─── Beyond Tech ─────────────────────────────────────────────────────────

export type GalleryItem = {
  // Taruh foto di public/beyond/. Kosong = tampil placeholder.
  src?: string;
  alt: string;
  // 1–3 kata, mis. "Futsal", "Hiking", "Coffee".
  caption: string;
  // Info yang muncul saat kartu dibuka (1–2 kalimat).
  description: string;
};

export const beyondIntro = {
  title: "Away from the keyboard.",
  // TODO: ganti dengan 1–2 kalimat tentang kamu di luar ngoding
  body: "[One or two sentences about what you do when you're not coding — sports, places, people, things that keep you curious.]",
};

// TODO: ganti dengan foto & cerita hobi kamu. Kartu disusun melingkar
// (ring 3D), jadi 8–12 item paling bagus.
export const gallery: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
  alt: `Hobby photo ${i + 1}`,
  caption: "[Hobby]",
  description: "[Where, when, or why it matters — one or two short lines.]",
}));
