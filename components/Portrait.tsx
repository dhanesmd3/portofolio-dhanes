import Image from "next/image";
import { profile } from "@/lib/data";

/** Foto hero: grayscale, memudar ke bawah (fade varian A), di atas dot field. */
export function Portrait() {
  return (
    <div className="relative mx-auto w-full max-w-[320px] lg:mr-0 lg:max-w-[440px]">
      <div
        className="pointer-events-none absolute -inset-12 dot-field"
        aria-hidden="true"
      />
      <div className="relative aspect-[4/5] overflow-hidden [mask-image:linear-gradient(to_bottom,black_55%,transparent_100%)]">
        {/* scale-125 + origin-top = zoom ke kepala & bahu dari foto persegi.
            Hapus dua class itu kalau fotonya sudah dipotong setengah badan. */}
        <Image
          src={profile.photoUrl}
          alt={`Portrait of ${profile.name}`}
          fill
          preload
          sizes="(min-width: 1024px) 550px, 400px"
          className="origin-top scale-125 object-cover object-top contrast-105 grayscale"
        />
      </div>
    </div>
  );
}
