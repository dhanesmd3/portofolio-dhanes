"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileDown } from "lucide-react";
import { profile } from "@/lib/data";
import { ProfileCard } from "./ProfileCard";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const handleScrollToProjects = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative flex min-h-screen items-center overflow-hidden border-b border-line-700/60 pt-28 pb-20"
    >
      {/* Aksen cahaya halus, tidak ramai */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-ember-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-6 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-xl"
        >
          <motion.p
            variants={item}
            className="font-mono text-sm text-ember-400"
          >
            {profile.eyebrow}
          </motion.p>

          <motion.h1
            variants={item}
            className="mt-5 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-paper-50 sm:text-5xl lg:text-[3.25rem]"
          >
            {profile.greeting}{" "}
            <span className="text-ember-400">{profile.shortName}</span>{" "}
            <span aria-hidden="true">{profile.wave}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-3 font-mono text-sm text-paper-400">
            {profile.role}
          </motion.p>

          <motion.p variants={item} className="mt-6 text-base leading-relaxed text-paper-300 sm:text-lg">
            {profile.bio}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="group inline-flex items-center gap-2 rounded-md bg-ember-400 px-5 py-3 text-sm font-medium text-ink-950 transition-transform duration-200 hover:bg-ember-300 active:scale-[0.98]"
            >
              Lihat Project Saya
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-line-600 px-5 py-3 text-sm font-medium text-paper-100 transition-colors duration-200 hover:border-ember-400 hover:text-ember-300"
            >
              <FileDown size={16} />
              Unduh CV
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex justify-center lg:justify-end"
        >
          <ProfileCard />
        </motion.div>
      </div>
    </section>
  );
}
