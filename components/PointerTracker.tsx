"use client";

import { useEffect } from "react";

/**
 * Menggeser lingkaran cahaya (#cursor-light) mengikuti kursor dengan sedikit
 * "lag" (lerp) supaya terasa mengalir. Tidak me-render apa pun.
 *
 * Penting untuk performa: yang diubah hanya `transform` satu elemen kecil,
 * bukan CSS variable / gradient selayar penuh. Transform dikerjakan
 * compositor (GPU) tanpa repaint, jadi gerakan kursor tetap 60 fps.
 */
export function PointerTracker() {
  useEffect(() => {
    const light = document.getElementById("cursor-light");
    if (!light) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const goal = { x: window.innerWidth / 2, y: window.innerHeight * 0.18 };
    const current = { ...goal };
    let frame = 0;

    const apply = () => {
      light.style.transform = `translate3d(${current.x.toFixed(1)}px, ${current.y.toFixed(1)}px, 0)`;
    };

    const tick = () => {
      // Kejar target 18% per frame; berhenti kalau sudah cukup dekat
      current.x += (goal.x - current.x) * 0.18;
      current.y += (goal.y - current.y) * 0.18;
      apply();
      const settled =
        Math.abs(goal.x - current.x) < 0.5 &&
        Math.abs(goal.y - current.y) < 0.5;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onPointerMove = (event: PointerEvent) => {
      goal.x = event.clientX;
      goal.y = event.clientY;
      if (reduceMotion) {
        current.x = goal.x;
        current.y = goal.y;
        apply();
        return;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };

    apply();
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
