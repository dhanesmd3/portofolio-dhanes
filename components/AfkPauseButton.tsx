"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { labelClass } from "./ui";

/**
 * Tombol Pause/Play untuk kolom foto yang bergulir. Konten yang bergerak
 * terus-menerus wajib bisa dihentikan (aksesibilitas). Cukup memasang
 * data-paused di container; CSS yang menghentikan animasinya.
 */
export function AfkPauseButton({ targetId }: { targetId: string }) {
  const [paused, setPaused] = useState(false);

  const toggle = () => {
    const next = !paused;
    setPaused(next);
    const target = document.getElementById(targetId);
    if (target) target.dataset.paused = String(next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={paused}
      aria-controls={targetId}
      className={cn(
        labelClass,
        "inline-flex items-center gap-2 self-start rounded-full px-4 py-2.5 text-fg glass-chip transition-colors duration-150 hover:border-line-strong md:self-auto",
      )}
    >
      {paused ? (
        <Play size={14} strokeWidth={1.5} aria-hidden="true" />
      ) : (
        <Pause size={14} strokeWidth={1.5} aria-hidden="true" />
      )}
      {paused ? "Play" : "Pause"}
    </button>
  );
}
