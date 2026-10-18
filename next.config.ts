import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Next.js (sejak versi 16) memblokir request cross-origin ke dev server
  // secara default demi keamanan — makanya akses lewat IP jaringan lokal
  // (bukan localhost) jadi kosong/blank kalau IP-nya belum didaftarkan di sini.
  // Tambahkan IP "Network" yang muncul di terminal saat `npm run dev` jalan.
  // Kalau IP kamu beda/berubah (misal pindah WiFi), update juga di sini.
  allowedDevOrigins: ["192.168.1.15"],

  images: {
    // AVIF lebih kecil dari WebP; browser yang belum support otomatis dapat WebP.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
