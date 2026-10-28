import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// /robots.txt — izinkan semua mesin pencari, kecuali endpoint API.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: `${siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    host: siteUrl,
  };
}
