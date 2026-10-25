import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  GraduationCap,
  MapPin,
  Trophy,
} from "lucide-react";
import {
  achievements,
  education,
  experiences,
  profile,
  projects,
  socials,
  toolGroups,
  type Project,
} from "@/lib/data";
import { cn } from "@/lib/utils";
import { CopyEmailButton } from "./CopyEmailButton";
import { SocialGlyph } from "./icons";
import { buttonStyles, labelClass, nudge, StatusBadge } from "./ui";

/**
 * Tampilan Compact: satu halaman ringkas gaya resume untuk recruiter.
 * Isi diambil dari data yang sama dengan tampilan Full (lib/data.ts),
 * tanpa bagian dekoratif (ring AFK, form, carousel, preview gambar).
 * Id section memakai prefix "c-" supaya tidak bentrok dengan tampilan Full.
 */

const featured = projects.filter((project) => project.featured);
const archive = projects.filter((project) => !project.featured);
const linkOf = (project: Project) => project.url ?? project.repoUrl;

const nickname = profile.name.startsWith(profile.nickname)
  ? profile.nickname
  : "";

const pad = (n: number) => String(n).padStart(2, "0");

function Row({
  id,
  index,
  label,
  children,
}: {
  id?: string;
  index: number;
  label: string;
  children: React.ReactNode;
}) {
  const titleId = `c-title-${label.toLowerCase().replace(/\W+/g, "-")}`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className="grid gap-5 border-t border-line py-10 md:grid-cols-[180px_1fr] md:gap-10"
    >
      <h2 id={titleId} className={labelClass}>
        <span className="text-accent">{pad(index)}</span>
        <span className="text-muted"> / {label}</span>
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

function ExternalLink({
  href,
  children,
  className,
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  if (!href) return <span className={className}>{children}</span>;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-baseline gap-1 decoration-1 underline-offset-4 hover:underline",
        className,
      )}
    >
      {children}
      <ArrowUpRight
        size={14}
        strokeWidth={1.5}
        className={cn("shrink-0 self-center text-muted", nudge.upRight)}
        aria-hidden="true"
      />
      <span className="sr-only">(opens in new tab)</span>
    </a>
  );
}

export function CompactView() {
  const linkedin = socials.find((social) => social.icon === "linkedin");
  const github = socials.find((social) => social.icon === "github");

  return (
    <div className="shell pt-28 pb-16 md:pt-32">
      <div className="mx-auto max-w-[920px]">
        {/* ── Profil ─────────────────────────────────────────────────── */}
        <section id="c-about" aria-label="Introduction" className="pb-10">
          <div className="flex items-center gap-5">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-full border border-line bg-carbon sm:size-24">
              <Image
                src={profile.photoUrl}
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="96px"
                className="origin-[50%_24%] scale-[1.7] object-cover [filter:saturate(0.9)_contrast(1.04)]"
              />
            </div>
            <div className="min-w-0">
              <h1 className="text-heading text-fg">
                <span className="text-accent">{nickname}</span>
                {profile.name.slice(nickname.length)}
              </h1>
              <p className="mt-1 text-body text-muted">{profile.tagline}</p>
            </div>
          </div>

          <p className="mt-6 max-w-[640px] text-body text-muted">
            {profile.bio}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
            <StatusBadge live>{profile.availability}</StatusBadge>
            <span
              className={cn(
                labelClass,
                "inline-flex items-center gap-2 text-muted",
              )}
            >
              <MapPin size={14} strokeWidth={1.5} aria-hidden="true" />
              {profile.location}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={profile.cvUrl} download className={buttonStyles.primary}>
              Download CV
              <ArrowDown
                size={16}
                strokeWidth={1.5}
                className={nudge.down}
                aria-hidden="true"
              />
            </a>
            <a href={`mailto:${profile.email}`} className={buttonStyles.ghost}>
              Email me
            </a>
            {[linkedin, github].map(
              (social) =>
                social && (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={buttonStyles.icon}
                  >
                    <SocialGlyph icon={social.icon} className="size-4" />
                  </a>
                ),
            )}
          </div>
        </section>

        {/* ── Highlights ─────────────────────────────────────────────── */}
        <Row id="c-highlights" index={1} label="Highlights">
          <ul className="space-y-4">
            {achievements.map((achievement) => (
              <li key={achievement.title} className="flex gap-3">
                <Trophy
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-body text-fg">{achievement.title}</p>
                  {achievement.issuer && (
                    <p className="text-body-sm text-muted">
                      {achievement.issuer}
                    </p>
                  )}
                </div>
                <p className={cn(labelClass, "mt-1 shrink-0 text-muted")}>
                  {achievement.year}
                </p>
              </li>
            ))}
          </ul>
        </Row>

        {/* ── Experience ─────────────────────────────────────────────── */}
        <Row id="c-experience" index={2} label="Experience">
          <ol className="space-y-6">
            {experiences.map((experience) => (
              <li key={`${experience.organization}-${experience.role}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <p className="text-body text-fg">{experience.role}</p>
                  <p className={cn(labelClass, "text-muted")}>
                    {experience.period}
                  </p>
                </div>
                <p className="mt-0.5 text-body-sm text-muted">
                  {experience.organization}
                  <span className="text-line-strong"> · </span>
                  <span className="font-mono text-label uppercase">
                    {experience.kind}
                  </span>
                </p>
                {experience.highlights.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {experience.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-body-sm text-muted"
                      >
                        <span aria-hidden="true">–</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Row>

        {/* ── Projects ───────────────────────────────────────────────── */}
        <Row id="c-projects" index={3} label="Projects">
          <ul className="space-y-7">
            {featured.map((project) => (
              <li key={project.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <ExternalLink
                    href={linkOf(project)}
                    className="text-body text-fg"
                  >
                    {project.title}
                  </ExternalLink>
                  <p className={cn(labelClass, "text-muted")}>
                    {project.category} · {project.year}
                  </p>
                </div>
                <p className="mt-1 text-body-sm text-muted">
                  {project.description}
                </p>
                <p className={cn(labelClass, "mt-2 text-muted normal-case")}>
                  {project.stack.join(" · ")}
                  {project.note && (
                    <span className="text-line-strong"> — {project.note}</span>
                  )}
                </p>
              </li>
            ))}
          </ul>

          {archive.length > 0 && (
            <>
              <h3 className={cn(labelClass, "mt-10 text-muted")}>More</h3>
              <ul className="mt-3">
                {archive.map((project) => (
                  <li
                    key={project.id}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-t border-line py-3 last:border-b"
                  >
                    <ExternalLink
                      href={linkOf(project)}
                      className="min-w-0 text-body-sm text-fg"
                    >
                      {project.title}
                    </ExternalLink>
                    <p className={cn(labelClass, "shrink-0 text-muted")}>
                      {project.category} · {project.year}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </Row>

        {/* ── Skills ─────────────────────────────────────────────────── */}
        <Row index={4} label="Skills">
          <dl className="space-y-3">
            {toolGroups.map((group) => (
              <div
                key={group.name}
                className="grid gap-1 sm:grid-cols-[140px_1fr] sm:gap-4"
              >
                <dt className={cn(labelClass, "pt-0.5 text-muted")}>
                  {group.name}
                </dt>
                <dd className="text-body-sm text-fg">
                  {group.tools.map((tool) => tool.name).join(", ")}
                </dd>
              </div>
            ))}
          </dl>
        </Row>

        {/* ── Education ──────────────────────────────────────────────── */}
        <Row index={5} label="Education">
          <ul className="space-y-4">
            {education.map((item) => (
              <li key={item.school} className="flex gap-3">
                <GraduationCap
                  size={16}
                  strokeWidth={1.5}
                  className="mt-1 shrink-0 text-accent"
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-body text-fg">{item.school}</p>
                  <p className="text-body-sm text-muted">{item.degree}</p>
                </div>
                <p className={cn(labelClass, "mt-1 shrink-0 text-muted")}>
                  {item.period}
                </p>
              </li>
            ))}
          </ul>
        </Row>

        {/* ── Contact ────────────────────────────────────────────────── */}
        <Row id="c-contact" index={6} label="Contact">
          <ul>
            {socials.map((social) => {
              const isMail = social.icon === "mail";
              return (
                <li
                  key={social.label}
                  className="flex items-center justify-between gap-4 border-t border-line py-3 last:border-b"
                >
                  <span className={cn(labelClass, "shrink-0 text-muted")}>
                    {social.label}
                  </span>
                  <div className="flex min-w-0 items-center gap-2">
                    <a
                      href={social.href}
                      target={isMail ? undefined : "_blank"}
                      rel={isMail ? undefined : "noopener noreferrer"}
                      className="truncate text-body-sm text-fg decoration-1 underline-offset-4 hover:underline"
                    >
                      {social.handle}
                    </a>
                    {isMail && <CopyEmailButton email={profile.email} />}
                  </div>
                </li>
              );
            })}
          </ul>
        </Row>
      </div>
    </div>
  );
}
