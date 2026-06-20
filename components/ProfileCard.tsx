"use client";

import { motion } from "framer-motion";
import { SiInstagram } from "react-icons/si";
import { profile } from "@/lib/data";
import { ProfilePhoto } from "./ProfilePhoto";

export function ProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md rounded-xl border border-line-700 bg-ink-900 shadow-[0_0_0_1px_rgba(227,168,87,0.05),0_30px_60px_-20px_rgba(0,0,0,0.6)]"
    >
      {/* Title bar ala browser window — dekorasi ringan saja, tetap dipertahankan */}
      <div className="flex items-center gap-2 border-b border-line-700 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-[#e0635c]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#e3b157]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#5fb88f]" />
        <span className="ml-2 font-mono text-xs text-paper-600">{profile.shortName.toLowerCase()}@portfolio:~</span>
      </div>

      {/* Foto besar + nama + tagline singkat — tanpa animasi rumit */}
      <div className="flex flex-col items-center px-8 py-9 text-center">
        <ProfilePhoto size="h-40 w-40" />
        <p className="mt-5 font-display text-xl font-semibold text-paper-50">
          {profile.name}
        </p>
        <p className="mt-1 text-sm text-paper-400">{profile.role}</p>
        <a
          href="https://instagram.com/dhanes.md"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1.5 text-sm text-paper-300 transition-colors hover:text-ember-400"
        >
          <SiInstagram size={14} />
          {profile.tagline}
        </a>
      </div>
    </motion.div>
  );
}
