import { ArrowUpRight, Trophy } from "lucide-react";
import { achievements, experiences, type Achievement } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { labelClass } from "./ui";

const pad = (n: number) => String(n).padStart(2, "0");

function AchievementContent({ achievement }: { achievement: Achievement }) {
  return (
    <>
      <Trophy
        size={16}
        strokeWidth={1.5}
        className="mt-1 shrink-0 text-accent"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="text-body text-fg">
          {achievement.title}
          {achievement.url && (
            <ArrowUpRight
              size={14}
              strokeWidth={1.5}
              className="ml-1 inline align-baseline text-muted"
              aria-hidden="true"
            />
          )}
        </p>
        <p className="mt-0.5 text-body-sm text-muted">{achievement.issuer}</p>
      </div>
      <p className={cn(labelClass, "mt-1 shrink-0 text-muted")}>
        {achievement.year}
      </p>
    </>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="pb-20 md:pb-28 lg:pb-40"
    >
      <div className="shell">
        <SectionHeader
          index="03"
          label="Experience"
          title="Where I've been"
          titleId="experience-title"
        />

        <div className="mt-12 grid gap-16 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <h3 className={cn(labelClass, "text-muted")}>Timeline</h3>
            <ol className="mt-4">
              {experiences.map((experience, index) => (
                <li
                  key={`${experience.organization}-${index}`}
                  className="grid grid-cols-[88px_1fr] gap-4 border-t border-line py-6 last:border-b sm:grid-cols-[120px_1fr]"
                >
                  <div>
                    <p className={cn(labelClass, "text-accent")}>
                      {pad(index + 1)}
                    </p>
                    <p className={cn(labelClass, "mt-1 text-muted")}>
                      {experience.period}
                    </p>
                  </div>
                  <div>
                    <span className="inline-block rounded-tag border border-line px-2 py-1 font-mono text-label text-muted uppercase">
                      {experience.kind}
                    </span>
                    <h4 className="mt-3 text-heading-sm text-fg">
                      {experience.role}
                    </h4>
                    <p className="mt-1 text-body text-muted">
                      {experience.organization}
                    </p>
                    {experience.highlights.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
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
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.1}>
            <h3 className={cn(labelClass, "text-muted")}>Achievements</h3>
            <ul className="mt-4">
              {achievements.map((achievement) => (
                <li
                  key={achievement.title}
                  className="border-t border-line last:border-b"
                >
                  {achievement.url ? (
                    <a
                      href={achievement.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-3 py-4 transition-colors duration-150 hover:bg-fg/3"
                    >
                      <AchievementContent achievement={achievement} />
                    </a>
                  ) : (
                    <div className="flex gap-3 py-4">
                      <AchievementContent achievement={achievement} />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
