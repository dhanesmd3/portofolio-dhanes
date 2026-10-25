"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";
import { sectionIdFor, useViewMode } from "@/hooks/useViewMode";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { easeOutSoft } from "./Reveal";
import { buttonStyles, labelClass } from "./ui";
import { ViewToggle } from "./ViewToggle";

// Pantau section kedua tampilan; yang sedang disembunyikan tidak akan "terlihat"
const sectionIds = navLinks.flatMap((link) => [link.id, `c-${link.id}`]);

const fullOnly = (link: (typeof navLinks)[number]) =>
  "inCompact" in link && link.inCompact === false;

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(sectionIds);
  const viewMode = useViewMode();
  const hrefFor = (id: string) => `/#${sectionIdFor(id, viewMode)}`;
  const menuLinks = navLinks.filter(
    (link) => viewMode === "full" || !fullOnly(link),
  );

  // Saat menu mobile terbuka: kunci scroll halaman + tutup dengan Esc
  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-3 z-50">
      {/* Pill kaca yang mengambang (liquid glass) */}
      <nav
        aria-label="Main"
        className="shell flex h-14 items-center justify-between gap-6"
      >
        <div className="flex h-full w-full items-center justify-between gap-6 rounded-full pr-2 pl-5 glass">
          {/* Link pakai "/#id" supaya tetap jalan dari halaman lain (mis. 404) */}
          <Link
            href={hrefFor("about")}
            onClick={closeMenu}
            className="text-lg text-fg"
          >
            {profile.wordmark}
          </Link>

          <ul className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                activeId === link.id || activeId === `c-${link.id}`;
              return (
                <li
                  key={link.id}
                  className={cn(fullOnly(link) && "compact:hidden")}
                >
                  <Link
                    href={hrefFor(link.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      labelClass,
                      "flex items-center gap-2 transition-colors duration-150 hover:text-fg",
                      isActive ? "text-fg" : "text-muted",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1 rounded-full bg-accent transition-opacity duration-150",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block">
              <ViewToggle />
            </div>
            <ThemeToggle />
            <Link
              href={hrefFor("contact")}
              className={cn(
                labelClass,
                "hidden rounded-full bg-action-bg px-4 py-2.5 text-action-fg transition-opacity duration-150 hover:opacity-90 md:inline-flex",
              )}
            >
              Let&apos;s connect
            </Link>
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className={cn(buttonStyles.icon, "lg:hidden")}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X size={18} strokeWidth={1.5} aria-hidden="true" />
              ) : (
                <Menu size={18} strokeWidth={1.5} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: easeOutSoft }}
            className="fixed inset-0 -z-10 bg-overlay pt-20 backdrop-blur-md lg:hidden"
          >
            <ul className="shell flex flex-col pt-6">
              {menuLinks.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    ease: easeOutSoft,
                    delay: 0.05 + index * 0.06,
                  }}
                  className="border-b border-line"
                >
                  <Link
                    href={hrefFor(link.id)}
                    onClick={closeMenu}
                    className="flex items-baseline gap-4 py-4 text-heading text-fg"
                  >
                    <span className={cn(labelClass, "text-accent")}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="shell mt-8 flex items-center justify-between gap-4">
              <span className={cn(labelClass, "text-muted")}>Layout</span>
              <ViewToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
