import { ArrowUpRight, GraduationCap, Trophy } from "lucide-react";
import { achievements, education, type Achievement } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ExperienceTimeline } from "./ExperienceTimeline";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { labelClass } from "./ui";

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
        {achievement.issuer && (
          <p className="mt-0.5 text-body-sm text-muted">{achievement.issuer}</p>
        )}
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

        <div className="mt-12 grid items-start gap-16 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-7">
            <h3 className={cn(labelClass, "text-muted")}>Timeline</h3>
            <ExperienceTimeline />
          </Reveal>

          {/* Panel kaca: pendidikan + pencapaian */}
          <Reveal
            className="rounded-glass p-6 glass md:p-8 lg:sticky lg:top-24 lg:col-span-5 lg:col-start-8"
            delay={0.1}
          >
            <h3 className={cn(labelClass, "text-muted")}>Education</h3>
            <ul className="mt-4">
              {education.map((item) => (
                <li
                  key={item.school}
                  className="flex gap-3 border-t border-line py-4 last:border-b"
                >
                  <GraduationCap
                    size={16}
                    strokeWidth={1.5}
                    className="mt-1 shrink-0 text-accent"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-body text-fg">{item.school}</p>
                    <p className="mt-0.5 text-body-sm text-muted">
                      {item.degree}
                    </p>
                  </div>
                  <p className={cn(labelClass, "mt-1 shrink-0 text-muted")}>
                    {item.period}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className={cn(labelClass, "mt-10 text-muted")}>Achievements</h3>
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
