import {
  CodeXml,
  Database,
  GitBranch,
  LayoutTemplate,
  type LucideIcon,
} from "lucide-react";
import { toolGroups, type ToolGroup } from "@/lib/data";
import { toolIcons } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { labelClass } from "./ui";

const groupIcons: Record<ToolGroup["icon"], LucideIcon> = {
  languages: CodeXml,
  frontend: LayoutTemplate,
  backend: Database,
  workflow: GitBranch,
};

export function Tools() {
  return (
    <section
      id="tools"
      aria-labelledby="tools-title"
      className="pb-20 md:pb-28 lg:pb-40"
    >
      <div className="shell">
        <SectionHeader
          index="01"
          label="Tools"
          title="What I build with"
          titleId="tools-title"
          aside={
            <p className="max-w-[360px] text-body text-muted">
              The languages, frameworks, and tools I reach for day to day.
            </p>
          }
        />

        {/* Trik grid hairline: background = warna garis, gap 1px, sel = warna kanvas */}
        <Reveal className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line md:grid-cols-2">
          {toolGroups.map((group) => {
            const GroupIcon = groupIcons[group.icon];
            return (
              <div key={group.name} className="bg-canvas p-6 md:p-8">
                <GroupIcon
                  size={24}
                  strokeWidth={1.5}
                  className="text-accent"
                  aria-hidden="true"
                />
                <h3 className={`${labelClass} mt-4 text-fg`}>{group.name}</h3>
                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-3">
                  {group.tools.map((tool) => {
                    const ToolLogo = toolIcons[tool.icon];
                    return (
                      <li
                        key={tool.name}
                        className="flex items-center gap-2 text-body-sm text-muted transition-colors duration-150 hover:text-fg"
                      >
                        <ToolLogo className="size-4" aria-hidden="true" />
                        {tool.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
