"use client";

import { motion } from "motion/react";
import { ArrowDown, ArrowRight, MapPin } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SocialGlyph } from "./icons";
import { Portrait } from "./Portrait";
import { easeOutSoft } from "./Reveal";
import { buttonStyles, labelClass, nudge } from "./ui";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOutSoft } },
};

const heroSocials = socials.filter((social) => social.icon !== "instagram");

// "Dhanes" + "woro Muhammad Datiputro" — dipecah supaya nama panggilan
// bisa di-highlight. Animasinya ada di globals.css (.hero-nick).
const nickname = profile.name.startsWith(profile.nickname)
  ? profile.nickname
  : "";
const restOfName = profile.name.slice(nickname.length);

export function Hero() {
  return (
    // overflow-x-clip: dot field di belakang foto sengaja melebar keluar
    // bingkai — jangan sampai bikin halaman bisa di-scroll ke samping di HP
    <section
      id="about"
      aria-label="Introduction"
      className="overflow-x-clip pt-16"
    >
      <div className="shell grid min-h-[calc(100svh-64px)] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-6 lg:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="order-2 lg:order-1 lg:col-span-7"
        >
          <motion.h1 variants={item} className="text-display text-fg">
            <span className="hero-nick">{nickname}</span>
            <span className="hero-name-rest">{restOfName}</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-subheading text-muted">
            {profile.tagline}
          </motion.p>

          <motion.p
            variants={item}
            className="mt-5 max-w-[560px] text-body text-muted"
          >
            {profile.bio}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            <a href={profile.cvUrl} download className={buttonStyles.primary}>
              Download CV
              <ArrowDown
                size={16}
                strokeWidth={1.5}
                className={nudge.down}
                aria-hidden="true"
              />
            </a>
            <a href="#projects" className={buttonStyles.ghost}>
              View projects
              <ArrowRight
                size={16}
                strokeWidth={1.5}
                className={nudge.right}
                aria-hidden="true"
              />
            </a>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-muted"
          >
            <span className={cn(labelClass, "inline-flex items-center gap-2")}>
              <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
              {profile.location}
            </span>
            <ul className="flex items-center gap-4">
              {heroSocials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target={social.icon === "mail" ? undefined : "_blank"}
                    rel={
                      social.icon === "mail" ? undefined : "noopener noreferrer"
                    }
                    aria-label={social.label}
                    className="block transition-colors duration-150 hover:text-fg"
                  >
                    <SocialGlyph icon={social.icon} className="size-5" />
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: easeOutSoft, delay: 0.2 }}
          className="order-1 lg:order-2 lg:col-span-5"
        >
          <Portrait />
        </motion.div>
      </div>
    </section>
  );
}
