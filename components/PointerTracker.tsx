"use client";

import { useEffect } from "react";

/**
 * Menyalin posisi kursor ke CSS variable --mx / --my pada elemen #backdrop,
 * dengan sedikit "lag" (lerp) supaya cahaya terasa mengalir.
 *
 * Penting untuk performa: variable sengaja dipasang di #backdrop, BUKAN di
 * <html>. Mengubah custom property di <html> memaksa browser menghitung
 * ulang style seluruh halaman setiap frame — itu yang dulu bikin lag.
 * Tidak me-render apa pun.
 */
export function PointerTracker() {
  useEffect(() => {
    const target = document.getElementById("backdrop");
    if (!target) return;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const goal = { x: window.innerWidth / 2, y: window.innerHeight * 0.18 };
    const current = { ...goal };
    let frame = 0;

    const apply = () => {
      target.style.setProperty("--mx", `${current.x.toFixed(1)}px`);
      target.style.setProperty("--my", `${current.y.toFixed(1)}px`);
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

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
