import Image from "next/image";
import { profile } from "@/lib/data";

/**
 * Foto hero: potret berbingkai (sudut membulat + garis tipis) dengan warna
 * natural yang sedikit diredam supaya serasi dengan tema. Bagian bawah
 * memudar ke latar (fade varian A) — garis bingkainya ikut memudar,
 * jadi potret terasa "tenggelam" ke halaman, bukan ditempel.
 */
export function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] lg:mr-0 lg:max-w-[400px]">
      <div
        className="pointer-events-none absolute -inset-12 dot-field"
        aria-hidden="true"
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-line bg-carbon [mask-image:linear-gradient(to_bottom,black_58%,transparent_100%)]">
        {/* scale + origin-top = fokus ke kepala & bahu dari foto persegi */}
        <Image
          src={profile.photoUrl}
          alt={`Portrait of ${profile.name}`}
          fill
          preload
          sizes="(min-width: 1024px) 480px, 400px"
          className="origin-top scale-[1.18] object-cover object-top [filter:saturate(0.9)_contrast(1.04)_brightness(0.97)]"
        />
      </div>
    </div>
  );
}
