import type { SVGProps } from "react";
import { Mail } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiC,
  SiGit,
  SiGithub,
  SiGnu,
  SiHaskell,
  SiInstagram,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenjdk,
  SiPython,
  SiReact,
  SiTailwindcss,
} from "react-icons/si";
import type { SocialIcon, ToolIcon } from "@/lib/data";

// Semua logo teknologi dari satu set (Simple Icons) supaya gayanya seragam.
// Warnanya selalu ikut currentColor (monokrom), bukan warna brand.
export const toolIcons: Record<ToolIcon, IconType> = {
  javascript: SiJavascript,
  python: SiPython,
  java: SiOpenjdk,
  haskell: SiHaskell,
  c: SiC,
  gnu: SiGnu,
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  mysql: SiMysql,
  git: SiGit,
  github: SiGithub,
};

export function SocialGlyph({
  icon,
  className,
}: {
  icon: SocialIcon;
  className?: string;
}) {
  switch (icon) {
    case "github":
      return <GithubIcon className={className} />;
    case "linkedin":
      return <LinkedinIcon className={className} />;
    case "instagram":
      return <SiInstagram className={className} aria-hidden="true" />;
    case "mail":
      return (
        <Mail className={className} strokeWidth={1.5} aria-hidden="true" />
      );
  }
}

export function GithubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.04 11.04 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.59.24 2.76.12 3.05.74.81 1.18 1.84 1.18 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.08.78 2.17 0 1.56-.01 2.82-.01 3.2 0 .31.21.67.79.56A10.52 10.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.89 1.63-1.85 3.36-1.85 3.59 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}
