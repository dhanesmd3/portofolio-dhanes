// Semua konten dummy ada di sini biar gampang diganti dengan data asli kamu.
// Tinggal cari & replace nilainya, struktur komponen tidak perlu disentuh.

export const profile = {
  name: "Dhanesworo Muhammad Datiputro",
  shortName: "Dhanes",
  role: "Mahasiswa ITB Teknik Informatika '25",
  eyebrow: "// portfolio",
  greeting: "Halo, saya",
  bio: "Seorang mahasiswa yang masih dalam proses belajar, sering eksplor website developing dan dasar-dasar pemrograman buat naikin skill pelan-pelan. Punya mimpi jadi fullstack developer, dan tertarik juga dengan dunia AI kedepannya.",
  location: "Bandung, Indonesia",
  email: "dhanesworo.md@gmail.com",
  cvUrl: "/cv-dhanesworo.pdf",
  photoUrl: "/profile.jpg",
  tagline: "@dhanes.md",
};

export type HardSkillIcon =
  | "nextjs"
  | "react"
  | "javascript"
  | "tailwind"
  | "python"
  | "c"
  | "prolog"
  | "nodejs"
  | "mysql"
  | "git"
  | "github";

export type HardSkill = { name: string; icon: HardSkillIcon };

export const hardSkills: HardSkill[] = [
  { name: "Next.js", icon: "nextjs" },
  { name: "React", icon: "react" },
  { name: "JavaScript", icon: "javascript" },
  { name: "Tailwind CSS", icon: "tailwind" },
  { name: "Python", icon: "python" },
  { name: "C", icon: "c" },
  { name: "GNU Prolog", icon: "prolog" },
  { name: "Node.js", icon: "nodejs" },
  { name: "MySQL", icon: "mysql" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
];

export type SoftSkill = {
  title: string;
  description: string;
  icon: "Puzzle" | "Users" | "Clock" | "Sparkles";
};

export const softSkills: SoftSkill[] = [
  {
    title: "Problem Solving",
    description: "Memecah masalah besar jadi langkah kecil yang bisa dieksekusi satu per satu.",
    icon: "Puzzle",
  },
  {
    title: "Team Collaboration",
    description: "Terbiasa kerja dengan Git workflow dan bekerjasama dalam kelompok.",
    icon: "Users",
  },
  {
    title: "Time Management",
    description: "Terbiasa bagi waktu antara kuliah, project, dan belajar hal baru biar semuanya tetap jalan.",
    icon: "Clock",
  },
  {
    title: "Fast Learner",
    description: "Cepat beradaptasi dengan pelajaran atau tools baru sesuai kebutuhan project.",
    icon: "Sparkles",
  },
];

export type Project = {
  id: string;
  title: string;
  category: string;
  domainLabel: string;
  description: string;
  stack: string[];
  url: string;
  // Opsional. Taruh screenshot di public/projects/{nama-file-ini}, lalu
  // kartu project otomatis pakai itu sebagai preview. Belum ada file =
  // otomatis fallback ke mockup placeholder, gak akan error.
  previewImage?: string;
};

export const projects: Project[] = [
  {
    id: "titikatm",
    title: "titikATM",
    category: "Hackathon Project",
    domainLabel: "titikatm.dubius.id",
    description:
      "Website pencarian ATM terdekat yang bantu pengguna hemat biaya admin tarik tunai. Dibuat untuk kompetisi PIDI – DIGDAYA x Hackathon 2026 yang diinisiasi Bank Indonesia & OJK.",
    stack: ["Next.js", "Tailwind CSS", "Maps API"],
    url: "https://titikatm.dubius.id/",
    previewImage: "/projects/titikatm.jpg",
  },
  {
    id: "takooni",
    title: "Takooni",
    category: "SaaS Landing Page",
    domainLabel: "takooni.com",
    description:
      "Landing page produk SaaS berbasis AI yang membantu tim SEO menemukan intent gap, mengaudit kualitas konten, dan melacak performa kampanye dalam jangka panjang.",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    url: "https://takooni.com/",
    previewImage: "/projects/takooni.jpg",
  },
  {
    id: "oggitb",
    title: "OGG FITB ITB 2026",
    category: "Competition Website",
    domainLabel: "oggitb.com",
    description:
      "Website resmi Olimpiade Geografi dan Geosains (OGG) FITB ITB 2026, kompetisi nasional yang diselenggarakan FITB ITB — berisi info lomba, timeline, galeri, dan pengumuman finalis.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://www.oggitb.com/",
    previewImage: "/projects/oggitb.jpg",
  },
  {
    id: "quacompute",
    title: "QuaCompute ID",
    category: "Community Website",
    domainLabel: "quacompute.id",
    description:
      "Website komunitas belajar dan diskusi quantum computing dari sudut pandang software engineering — wadah belajar bareng, roadmap, dan kolaborasi untuk praktisi IT maupun peneliti di Indonesia.",
    stack: ["Next.js", "Tailwind CSS"],
    url: "https://quacompute.id/",
    previewImage: "/projects/quacompute.jpg",
  },
  {
    id: "kualitas-air",
    title: "Kalkulator Kualitas Air",
    category: "Course Project — PRD",
    domainLabel: "web-kualitas-air.vercel.app",
    description:
      "Kalkulator real-time untuk konversi parameter air minum (TDS, salinitas, EC, resistivitas, kekuatan ionik) berdasarkan standar WHO & SNI. Dibuat untuk tugas mata kuliah Pengenalan Rekayasa dan Desain.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://web-kualitas-air.vercel.app/",
    previewImage: "/projects/kualitas-air.jpg",
  },
  {
    id: "city-weather",
    title: "City Weather",
    category: "Practice Project",
    domainLabel: "city-weather-website2.vercel.app",
    description:
      "Aplikasi cuaca sederhana untuk latihan fetch data dari API — cari nama kota, lalu tampilkan suhu, kelembapan, dan kondisi langit secara real-time.",
    stack: ["JavaScript", "Weather API"],
    url: "https://city-weather-website2.vercel.app/",
    previewImage: "/projects/city-weather.jpg",
  },
  {
    id: "kalkulator",
    title: "Kalkulator Sederhana",
    category: "Practice Project",
    domainLabel: "kalkulator-sederhana-two.vercel.app",
    description:
      "Proyek pertama belajar membangun antarmuka interaktif — kalkulator sederhana untuk latihan dasar HTML, CSS, dan logika JavaScript.",
    stack: ["HTML", "CSS", "JavaScript"],
    url: "https://kalkulator-sederhana-two.vercel.app/",
    previewImage: "/projects/kalkulator.jpg",
  },
];

// Ganti href di bawah ini dengan akun GitHub & LinkedIn asli kamu.
export const socialLinks = [
  { label: "GitHub", href: "https://github.com/dhanesmd3", icon: "github" as const },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dhanesworo-muhammad-datiputro-38548b234/", icon: "linkedin" as const },
  { label: "Email", href: "mailto:dhanesworo.md@gmail.com", icon: "mail" as const },
];

export const navLinks = [
  { label: "About", href: "#about", index: "01" },
  { label: "Skills", href: "#skills", index: "02" },
  { label: "Projects", href: "#projects", index: "03" },
  { label: "Contact", href: "#contact", index: "04" },
];
