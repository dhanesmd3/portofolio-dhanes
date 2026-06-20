"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, profile } from "@/lib/data";
import { useActiveSection } from "@/hooks/useActiveSection";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeId = useActiveSection(navLinks.map((link) => link.href.slice(1)));

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    event.preventDefault();
    const target = document.querySelector(href);
    target?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        isScrolled
          ? "bg-ink-950/80 backdrop-blur-md border-b border-line-700"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "#about")}
          className="font-mono text-base font-medium tracking-tight text-paper-50"
        >
          <span className="text-ember-400">{"<"}</span>
          {profile.shortName}
          <span className="text-ember-400">{" />"}</span>
        </a>

        {/* Menu desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.slice(1);
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="group relative flex items-center gap-2 py-1 text-sm text-paper-300 transition-colors hover:text-paper-50"
                >
                  <span
                    className={`font-mono text-xs transition-colors ${
                      isActive ? "text-ember-400" : "text-paper-600"
                    }`}
                  >
                    {link.index}
                  </span>
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-ember-400 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                    aria-hidden="true"
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-md border border-line-700 text-paper-100 md:hidden"
          aria-label="Buka menu navigasi"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-line-700 bg-ink-950/95 backdrop-blur-md md:hidden"
          >
            {navLinks.map((link) => (
              <li key={link.href} className="border-b border-line-700/60 last:border-none">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 px-6 py-4 text-sm text-paper-200"
                >
                  <span className="font-mono text-xs text-ember-400">{link.index}</span>
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}
