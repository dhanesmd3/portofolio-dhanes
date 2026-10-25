"use client";

import { setViewMode, useViewMode, type ViewMode } from "@/hooks/useViewMode";
import { cn } from "@/lib/utils";
import { labelClass } from "./ui";

// Gaya aktif diatur lewat CSS (variant compact:) — bukan state — supaya
// sudah benar sejak HTML pertama, tanpa kedip sebelum hydration.
const options: { mode: ViewMode; label: string; className: string }[] = [
  {
    mode: "full",
    label: "Full",
    className:
      "bg-fg text-canvas compact:bg-transparent compact:text-muted compact:hover:text-fg",
  },
  {
    mode: "compact",
    label: "Compact",
    className: "text-muted hover:text-fg compact:bg-fg compact:text-canvas",
  },
];

/** Segmented control Full / Compact (pill kaca). */
export function ViewToggle({ className }: { className?: string }) {
  const current = useViewMode();

  return (
    <div
      role="group"
      aria-label="Page layout"
      className={cn("inline-flex rounded-full p-1 glass-chip", className)}
    >
      {options.map(({ mode, label, className: modeClass }) => {
        const active = current === mode;
        return (
          <button
            key={mode}
            type="button"
            aria-pressed={active}
            onClick={() => !active && setViewMode(mode)}
            className={cn(
              labelClass,
              "rounded-full px-3 py-1.5 transition-colors duration-150",
              modeClass,
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
