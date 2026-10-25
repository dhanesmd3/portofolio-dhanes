"use client";

import { useSyncExternalStore } from "react";

export type ViewMode = "full" | "compact";

// Sumber kebenaran = atribut data-view di <html> (dipasang script di
// app/layout.tsx sebelum render). Hook ini cuma "mendengarkan".
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-view"],
  });
  return () => observer.disconnect();
}

const getViewMode = (): ViewMode =>
  document.documentElement.dataset.view === "compact" ? "compact" : "full";

export function useViewMode() {
  return useSyncExternalStore(subscribe, getViewMode, () => "full" as const);
}

export function setViewMode(mode: ViewMode) {
  document.documentElement.dataset.view = mode;
  try {
    localStorage.setItem("view", mode);
  } catch {
    // Storage diblokir — tampilan tetap ganti, cuma tidak tersimpan
  }
  // Isi kedua tampilan berbeda, jadi mulai lagi dari atas
  window.scrollTo({ top: 0, behavior: "instant" });
}

/** Id section sesuai tampilan: Compact memakai prefix "c-". */
export const sectionIdFor = (id: string, mode: ViewMode) =>
  mode === "compact" ? `c-${id}` : id;
