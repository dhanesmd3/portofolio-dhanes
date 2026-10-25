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
import { cn } from "@/lib/utils";

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

        {/* Panel kaca, dibagi 2×2 oleh garis tipis di antara sel */}
        <Reveal className="mt-12 grid overflow-hidden rounded-glass glass md:grid-cols-2">
          {toolGroups.map((group, index) => {
            const GroupIcon = groupIcons[group.icon];
            return (
              <div
                key={group.name}
                className={cn(
                  "border-line p-6 md:p-8",
                  index < toolGroups.length - 1 && "border-b",
                  index % 2 === 0 && "md:border-r",
                  index >= toolGroups.length - 2 && "md:border-b-0",
                )}
              >
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
