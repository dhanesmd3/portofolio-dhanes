"use client";

import { useEffect } from "react";

/**
 * Menyalin posisi kursor ke CSS variable --mx / --my di <html>, dengan
 * sedikit "lag" (lerp) supaya cahaya terasa mengalir, bukan menempel kaku.
 * Dipakai oleh cahaya latar (Backdrop) dan kilau panel kaca (.glass).
 * Tidak me-render apa pun.
 */
export function PointerTracker() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const target = { x: window.innerWidth / 2, y: window.innerHeight * 0.18 };
    const current = { ...target };
    let frame = 0;

    const apply = () => {
      root.style.setProperty("--mx", `${current.x.toFixed(1)}px`);
      root.style.setProperty("--my", `${current.y.toFixed(1)}px`);
    };

    const tick = () => {
      // Kejar target 18% per frame; berhenti kalau sudah cukup dekat
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      apply();
      const settled =
        Math.abs(target.x - current.x) < 0.5 &&
        Math.abs(target.y - current.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (reduceMotion) {
        current.x = target.x;
        current.y = target.y;
        apply();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
