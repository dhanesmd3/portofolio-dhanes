import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// /sitemap.xml — daftar halaman untuk Google. Portofolio ini satu halaman.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
