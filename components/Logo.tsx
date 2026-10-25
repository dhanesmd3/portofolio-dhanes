import { cn } from "@/lib/utils";

/**
 * Monogram "ᗡMD": garis tunggal dengan ujung membulat, D pertama dicerminkan
 * supaya simetris terhadap "M". Kedua "D" mengikuti
 * warna teks (currentColor), "M" di tengah memakai warna aksen. Saat halaman
 * dibuka, garisnya "tergambar" sekali (lihat .logo-stroke di globals.css).
 * Versi favicon ada di app/icon.svg (geometri sama, garis lebih tebal).
 */
export function Logo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 24"
      fill="none"
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("h-6 w-auto", className)}
    >
      <path
        className="logo-stroke stroke-current"
        pathLength={1}
        d="M18 2.5h-5.5a9.5 9.5 0 0 0 0 19H18z"
      />
      <path
        className="logo-stroke stroke-accent"
        pathLength={1}
        d="M24 21.5v-19l8 12 8-12v19"
      />
      <path
        className="logo-stroke stroke-current"
        pathLength={1}
        d="M46 2.5h5.5a9.5 9.5 0 0 1 0 19H46z"
      />
    </svg>
  );
}
