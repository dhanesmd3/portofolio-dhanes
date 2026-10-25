import { cn } from "@/lib/utils";

// Primitif UI kecil sesuai DESIGN.md → Components.

const buttonBase =
  "group inline-flex items-center justify-center gap-2 text-sm font-medium uppercase tracking-[0.02em] transition-[opacity,background-color,border-color] duration-150 ease-out-soft disabled:pointer-events-none disabled:opacity-40";

export const buttonStyles = {
  // Satu aksi terpenting per section (Download CV, Send message, ...)
  primary: cn(
    buttonBase,
    "rounded-full bg-action-bg px-6 py-3 text-action-fg hover:opacity-90",
  ),
  // Aksi sekunder di samping primary — pill kaca (liquid glass)
  ghost: cn(
    buttonBase,
    "rounded-full px-5 py-3 text-fg glass-chip hover:border-line-strong hover:bg-fg/6",
  ),
  // Tombol lingkaran 40px untuk ikon (panah carousel, toggle tema, menu)
  icon: "inline-flex size-10 shrink-0 items-center justify-center rounded-full text-fg glass-chip transition-colors duration-150 hover:border-line-strong disabled:pointer-events-none disabled:opacity-40",
};

// Geser panah sedikit ke arah tujuannya saat parent (.group) di-hover
export const nudge = {
  right: "transition-transform duration-150 group-hover:translate-x-0.5",
  down: "transition-transform duration-150 group-hover:translate-y-0.5",
  upRight:
    "transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
};

export const labelClass = "font-mono text-label uppercase";

export function StatusBadge({
  children,
  live = false,
  className,
}: {
  children: React.ReactNode;
  live?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-muted glass-chip",
        labelClass,
        className,
      )}
    >
      {live && (
        <span className="relative flex size-1.5" aria-hidden="true">
          <span className="absolute inset-0 animate-live-ring rounded-full bg-live" />
          <span className="relative size-1.5 rounded-full bg-live" />
        </span>
      )}
      {children}
    </span>
  );
}

export function TagList({
  tags,
  className,
}: {
  tags: string[];
  className?: string;
}) {
  return (
    <ul
      className={cn("flex flex-wrap gap-2", className)}
      aria-label="Tech stack"
    >
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-tag border border-line px-2 py-1 font-mono text-label text-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
