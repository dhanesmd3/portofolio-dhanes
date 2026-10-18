"use client";

import { useEffect, useState } from "react";

/**
 * Mengamati elemen-elemen section berdasarkan id, lalu mengembalikan
 * id section yang sedang paling dominan terlihat di viewport.
 * Return "" kalau belum ada section yang terlihat (mis. di halaman 404).
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState("");
  // Pakai string sebagai dependency supaya array baru dengan isi sama
  // tidak bikin observer dipasang ulang tiap render
  const key = ids.join(",");

  useEffect(() => {
    const elements = key
      .split(",")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        // Garis tengah viewport jadi acuan utama supaya transisi terasa pas
        rootMargin: "-35% 0px -55% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return activeId;
}
