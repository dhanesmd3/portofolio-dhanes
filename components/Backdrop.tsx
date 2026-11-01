import { BackdropGlobe } from "./BackdropGlobe";
import { PointerTracker } from "./PointerTracker";

/**
 * Latar halaman (fixed, di belakang semua konten): dua cahaya ambient biru
 * yang bergerak sangat pelan, grid "globe" 3D berputar dengan tanda "+"
 * dan debu halus (BackdropGlobe), cahaya biru yang mengikuti kursor, dan
 * butiran halus. Sengaja samar — terasa, tapi tidak bersaing dengan konten.
 *
 * Catatan performa: setiap lapisan yang bergerak punya layer GPU sendiri
 * (will-change) dan hanya diubah lewat transform — globe digambar di Web
 * Worker, cahaya kursor cuma digeser, grain digambar sekali saja.
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
        <div className="absolute -top-[35vh] left-1/2 h-[80vh] w-[110vw] -translate-x-1/2">
          <div className="size-full animate-[drift_26s_ease-in-out_infinite_alternate] will-change-transform accent-glow" />
        </div>
        <div className="absolute -right-[20vw] -bottom-[30vh] h-[70vh] w-[70vw] animate-[drift_34s_ease-in-out_infinite_alternate-reverse] opacity-60 will-change-transform accent-glow" />
        <BackdropGlobe />
        <div id="cursor-light" className="absolute top-0 left-0 cursor-light" />
        <div className="absolute inset-0 grain opacity-[0.025] will-change-transform" />
      </div>
    </>
  );
}
