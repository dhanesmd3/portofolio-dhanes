"use client";

import { motion } from "framer-motion";

type SectionHeadingProps = {
  index: string;
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  index,
  label,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={align === "center" ? "text-center" : "text-left"}
    >
      <div
        className={`flex items-center gap-3 text-sm font-mono text-ember-400 ${
          align === "center" ? "justify-center" : ""
        }`}
      >
        <span className="text-paper-600">{index}</span>
        <span className="h-px w-8 bg-line-600" aria-hidden="true" />
        <span>{label}</span>
      </div>
      <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-paper-50 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 max-w-2xl text-paper-300 ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
