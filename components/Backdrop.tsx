import { PointerTracker } from "./PointerTracker";

/**
 * Latar halaman (fixed, di belakang semua konten): grid blueprint tipis,
 * cahaya biru yang mengikuti kursor (+ grid yang tersingkap di sekitarnya),
 * dua cahaya ambient yang bergerak sangat pelan, dan butiran halus.
 * Sengaja samar — terasa, tapi tidak bersaing dengan konten.
 *
 * Catatan performa: --mx/--my hanya di-set pada #backdrop (lihat
 * PointerTracker), cahaya ambient dipisah ke layer GPU sendiri
 * (will-change), dan grain tidak memakai blend mode.
 */
export function Backdrop() {
  return (
    <>
      <PointerTracker />
      <div
        id="backdrop"
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute inset-0 blueprint-grid" />
        <div className="absolute -top-[35vh] left-1/2 h-[80vh] w-[110vw] -translate-x-1/2">
          <div className="size-full animate-[drift_26s_ease-in-out_infinite_alternate] will-change-transform accent-glow" />
        </div>
        <div className="absolute -right-[20vw] -bottom-[30vh] h-[70vh] w-[70vw] animate-[drift_34s_ease-in-out_infinite_alternate-reverse] opacity-60 will-change-transform accent-glow" />
        <div className="absolute inset-0 cursor-light" />
        <div className="absolute inset-0 cursor-grid" />
        <div className="absolute inset-0 grain opacity-[0.025]" />
      </div>
    </>
  );
}
