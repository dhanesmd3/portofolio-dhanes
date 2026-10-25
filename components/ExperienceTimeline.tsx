"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { experiences } from "@/lib/data";
import { cn } from "@/lib/utils";
import { labelClass } from "./ui";

// Berapa entri yang langsung terlihat; sisanya lewat tombol "Show earlier"
const INITIAL_COUNT = 5;

const pad = (n: number) => String(n).padStart(2, "0");

export function ExperienceTimeline() {
  const [showAll, setShowAll] = useState(false);
  const hiddenCount = experiences.length - INITIAL_COUNT;
  const visible = showAll ? experiences : experiences.slice(0, INITIAL_COUNT);

  return (
    <>
      <ol className="mt-4">
        {visible.map((experience, index) => (
          <li
            key={`${experience.organization}-${experience.role}`}
            className="grid grid-cols-[88px_1fr] gap-4 border-t border-line py-6 last:border-b sm:grid-cols-[120px_1fr]"
          >
            <div>
              <p className={cn(labelClass, "text-accent")}>{pad(index + 1)}</p>
              <p className={cn(labelClass, "mt-1 text-muted")}>
                {experience.period}
              </p>
            </div>
            <div>
              <span className="inline-block rounded-full px-2.5 py-1 font-mono text-label text-muted uppercase glass-chip">
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

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll((value) => !value)}
          aria-expanded={showAll}
          className={cn(
            labelClass,
            "group mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-fg glass-chip transition-colors duration-150 hover:border-line-strong",
          )}
        >
          {showAll ? "Show less" : `Show earlier (${hiddenCount})`}
          <ChevronDown
            size={14}
            strokeWidth={1.5}
            className={cn(
              "transition-transform duration-300",
              showAll && "rotate-180",
            )}
            aria-hidden="true"
          />
        </button>
      )}
    </>
  );
}
