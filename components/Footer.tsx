import { ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import { cn } from "@/lib/utils";
import { LocalTime } from "./LocalTime";
import { labelClass } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div
        className={cn(
          labelClass,
          "shell flex flex-col gap-4 py-8 text-muted sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <p>
          © {new Date().getFullYear()} {profile.wordmark} · Built with Next.js
        </p>
        <div className="flex items-center gap-6">
          <LocalTime />
          <a
            href="#main"
            className="group inline-flex items-center gap-1 transition-colors duration-150 hover:text-fg"
          >
            Back to top
            <ArrowUp
              size={14}
              strokeWidth={1.5}
              className="transition-transform duration-150 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
