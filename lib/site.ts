// URL dasar untuk metadata (canonical, Open Graph).
// Urutan: env manual → domain produksi dari Vercel → localhost saat dev.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
