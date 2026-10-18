"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { buttonStyles } from "./ui";

type Theme = "dark" | "light";

// Sumber kebenaran tema = atribut data-theme di <html> (dipasang oleh
// script di app/layout.tsx sebelum render). Komponen ini cuma "mendengarkan".
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.dataset.theme === "light" ? "light" : "dark";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getTheme,
    () => "dark" as const,
  );
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = () => {
    const root = document.documentElement;
    root.classList.add("theme-transition");
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage diblokir (mode private, dll.) — tema tetap ganti, cuma tidak tersimpan
    }
    window.setTimeout(() => root.classList.remove("theme-transition"), 250);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={buttonStyles.icon}
      aria-label={`Switch to ${next} theme`}
    >
      {/* Ikon dipilih lewat CSS supaya HTML server & client identik */}
      <Sun
        size={18}
        strokeWidth={1.5}
        className="hidden dark:block"
        aria-hidden="true"
      />
      <Moon
        size={18}
        strokeWidth={1.5}
        className="block dark:hidden"
        aria-hidden="true"
      />
    </button>
  );
}
