"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileDown, Mail } from "lucide-react";
import { profile, socialLinks } from "@/lib/data";
import { GithubIcon, LinkedinIcon } from "./icons";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: Mail,
};

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl border border-line-700 bg-ink-900 px-6 py-14 text-center sm:px-12 sm:py-16"
        >
          <p className="font-mono text-sm text-ember-400">04 — contact</p>
          <h2 className="mx-auto mt-4 max-w-xl font-display text-3xl font-semibold tracking-tight text-paper-50 sm:text-4xl">
            Mari berkolaborasi!
          </h2>
          <p className="mx-auto mt-4 max-w-md text-paper-300">
            Terbuka untuk peluang magang, kolaborasi project, atau sekadar
            diskusi seputar pengembangan web.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-ember-400 px-5 py-3 text-sm font-medium text-ink-950 transition-colors hover:bg-ember-300"
            >
              <Mail size={16} />
              {profile.email}
            </a>
            <a
              href={profile.cvUrl}
              download
              className="inline-flex items-center gap-2 rounded-md border border-line-600 px-5 py-3 text-sm font-medium text-paper-100 transition-colors hover:border-ember-400 hover:text-ember-300"
            >
              <FileDown size={16} />
              Unduh CV
            </a>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3">
            {socialLinks
              .filter((s) => s.icon !== "mail")
              .map((social) => {
                const Icon = iconMap[social.icon];
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 rounded-full border border-line-700 px-4 py-2 text-sm text-paper-300 transition-colors hover:border-ember-400 hover:text-paper-50"
                  >
                    <Icon className="h-4 w-4" />
                    {social.label}
                    <ArrowUpRight
                      size={13}
                      className="text-paper-600 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ember-400"
                    />
                  </a>
                );
              })}
          </div>
        </motion.div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-line-700/60 pt-6 text-xs text-paper-600 sm:flex-row">
          <p className="font-mono">
            © {new Date().getFullYear()} {profile.name}.
          </p>
        </div>
      </div>
    </section>
  );
}
