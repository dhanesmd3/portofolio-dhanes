import { ArrowUpRight } from "lucide-react";
import { profile, socials } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { labelClass, nudge, StatusBadge } from "./ui";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="pb-20 md:pb-28 lg:pb-40"
    >
      <div className="shell">
        <SectionHeader
          index="05"
          label="Contact"
          title="Let's connect."
          titleId="contact-title"
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-6">
          <Reveal className="lg:col-span-5">
            <p className="max-w-[420px] text-body text-muted">
              Open to internships, collaborations, or just a chat about building
              for the web. Send a message here or reach me directly.
            </p>
            <StatusBadge live className="mt-6">
              {profile.availability}
            </StatusBadge>

            <ul className="mt-10">
              {socials.map((social) => {
                const isMail = social.icon === "mail";
                return (
                  <li
                    key={social.label}
                    className="flex items-center justify-between gap-4 border-t border-line py-4 last:border-b"
                  >
                    <span className={cn(labelClass, "shrink-0 text-muted")}>
                      {social.label}
                    </span>
                    <div className="flex min-w-0 items-center gap-2">
                      <a
                        href={social.href}
                        target={isMail ? undefined : "_blank"}
                        rel={isMail ? undefined : "noopener noreferrer"}
                        className="group flex min-w-0 items-center gap-1 text-body text-fg decoration-1 underline-offset-4 hover:underline"
                      >
                        <span className="truncate">{social.handle}</span>
                        <ArrowUpRight
                          size={16}
                          strokeWidth={1.5}
                          className={cn("shrink-0", nudge.upRight)}
                          aria-hidden="true"
                        />
                      </a>
                      {isMail && <CopyEmailButton email={profile.email} />}
                    </div>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
