"use client";

import { useEffect, useState } from "react";

/**
 * Coba load gambar di background (di luar DOM). Return true kalau sukses.
 * Dengan ini kita gak pernah menampilkan ikon "broken image" bawaan browser —
 * kalau gambar belum ada/gagal load, tinggal tampilkan fallback sendiri.
 */
export function useImagePreload(src?: string) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!src) return;

    let cancelled = false;
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      if (!cancelled) setLoaded(true);
    };
    img.onerror = () => {
      if (!cancelled) setLoaded(false);
    };

    return () => {
      cancelled = true;
    };
  }, [src]);

  return loaded;
}
