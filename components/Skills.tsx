"use client";

import { motion } from "framer-motion";
import { Puzzle, Users, Clock, Sparkles, type LucideIcon } from "lucide-react";
import {
  SiNextdotjs,
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiC,
  SiNodedotjs,
  SiMysql,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { DiProlog } from "react-icons/di";
import type { IconType } from "react-icons";
import { hardSkills, softSkills, type SoftSkill, type HardSkillIcon } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

const iconMap: Record<SoftSkill["icon"], LucideIcon> = {
  Puzzle,
  Users,
  Clock,
  Sparkles,
};

const hardSkillIconMap: Record<HardSkillIcon, IconType> = {
  nextjs: SiNextdotjs,
  react: SiReact,
  javascript: SiJavascript,
  tailwind: SiTailwindcss,
  python: SiPython,
  c: SiC,
  prolog: DiProlog,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
};

const listContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const chipItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Skills() {
  return (
    <section id="skills" className="border-b border-line-700/60 py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <SectionHeading
          index="02"
          label="skills"
          title="Tools & cara kerja saya"
          description="Kombinasi kemampuan teknis dan kebiasaan kerja yang saya pakai untuk menyelesaikan project dari awal sampai akhir."
        />

        {/* Hard skills */}
        <div className="mt-12 rounded-xl border border-line-700 bg-ink-900 p-6 text-center sm:p-8">
          <p className="font-mono text-xs uppercase tracking-wider text-paper-600">
            tech-stack.json
          </p>
          <motion.ul
            variants={listContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-5 flex flex-wrap justify-center gap-2.5"
          >
            {hardSkills.map((skill) => {
              const Icon = hardSkillIconMap[skill.icon];
              return (
                <motion.li
                  key={skill.name}
                  variants={chipItem}
                  className="group flex items-center gap-2.5 rounded-md border border-line-600 bg-ink-800 px-3.5 py-2 font-mono text-sm text-paper-200 transition-colors hover:border-ember-400/70 hover:text-paper-50"
                >
                  <Icon
                    className="h-4 w-4 text-paper-400 transition-colors group-hover:text-ember-400"
                    aria-hidden="true"
                  />
                  {skill.name}
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        {/* Soft skills */}
        <motion.div
          variants={listContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {softSkills.map((skill) => {
            const Icon = iconMap[skill.icon];
            return (
              <motion.div
                key={skill.title}
                variants={cardItem}
                className="group rounded-xl border border-line-700 bg-ink-900 p-6 transition-colors duration-200 hover:border-line-600"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember-400/10 text-ember-400">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-paper-50">
                  {skill.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-400">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
