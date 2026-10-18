import Image from "next/image";
import { ArrowUpRight, Plus } from "lucide-react";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";
import { labelClass, nudge, StatusBadge, TagList } from "./ui";

const textLink =
  "group inline-flex items-center gap-1 text-body-sm text-fg decoration-1 underline-offset-4 hover:underline";

// Bingkai preview 16:10. Screenshot yang lebih tinggi dari ini = bisa di-scroll.
const FRAME_RATIO = 10 / 16;

// Efek aktif saat kartu di-hover ATAU sedang dibuka (data-open="true").
// Ditulis lengkap (bukan dirakit dinamis) supaya terbaca oleh Tailwind.
const activeScroll =
  "group-hover/card:translate-y-[calc(-100%+100cqh)] group-hover/card:[transition-duration:var(--scroll-duration)] group-data-[open=true]/card:translate-y-[calc(-100%+100cqh)] group-data-[open=true]/card:[transition-duration:var(--scroll-duration)]";
const activeZoom =
  "group-hover/card:scale-[1.03] group-data-[open=true]/card:scale-[1.03]";
const activeHide =
  "group-hover/card:opacity-0 group-data-[open=true]/card:opacity-0";

type ProjectCardProps = {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * Kartu project. Awalnya cuma gambar + judul; klik untuk membuka detail
 * (deskripsi, stack, link). Screenshot full-page otomatis "nge-scroll"
 * pelan saat kartu di-hover atau dibuka.
 */
export function ProjectCard({ project, isOpen, onToggle }: ProjectCardProps) {
  const detailsId = `project-${project.id}-details`;
  const image = project.image;
  const ratio = image ? image.height / image.width : 0;
  const scrolls = ratio > FRAME_RATIO + 0.05;
  // Makin tinggi screenshot, makin lama durasinya → kecepatan scroll terasa sama
  const scrollSeconds = Math.min(12, Math.max(3, ratio * 2.2));

  return (
    <article data-open={isOpen} className="group/card">
      {/* Gambar ikut membuka/menutup detail. Disembunyikan dari keyboard &
          screen reader karena tombol judul di bawah melakukan hal yang sama */}
      <button
        type="button"
        onClick={onToggle}
        tabIndex={-1}
        aria-hidden="true"
        className="[container-type:size] relative block aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-card border border-line bg-carbon transition-colors duration-150 group-hover/card:border-line-strong group-data-[open=true]/card:border-accent"
      >
        {image && scrolls && (
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 85vw"
            style={
              {
                "--scroll-duration": `${scrollSeconds}s`,
              } as React.CSSProperties
            }
            className={cn(
              "absolute inset-x-0 top-0 h-auto w-full transition-transform duration-700 ease-in-out",
              activeScroll,
            )}
          />
        )}
        {image && !scrolls && (
          <Image
            src={image.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 85vw"
            className={cn(
              "object-cover object-left-top transition-transform duration-[600ms] ease-out-soft",
              activeZoom,
            )}
          />
        )}
        {!image && (
          <span className="absolute inset-0 flex items-center justify-center text-heading-lg text-line-strong">
            {project.title.charAt(0)}
          </span>
        )}
        {scrolls && (
          <span
            className={cn(
              "pointer-events-none absolute right-3 bottom-3 rounded-tag bg-canvas/70 px-2 py-1 font-mono text-micro text-fg uppercase backdrop-blur-sm transition-opacity duration-300",
              activeHide,
            )}
          >
            ↓ Preview
          </span>
        )}
      </button>

      <div className="mt-5 flex min-h-8 items-center justify-between gap-4">
        <p className={cn(labelClass, "text-muted")}>
          {project.category} · {project.year}
        </p>
        {project.status && (
          <StatusBadge live={project.status === "LIVE"}>
            {project.status}
          </StatusBadge>
        )}
      </div>

      <h3 className="mt-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={detailsId}
          className="flex w-full items-center justify-between gap-4 text-left text-heading-sm text-fg"
        >
          {project.title}
          <span
            className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-[transform,border-color,color] duration-300 ease-out-soft group-hover/card:border-line-strong group-data-[open=true]/card:rotate-45 group-data-[open=true]/card:border-accent group-data-[open=true]/card:text-accent"
            aria-hidden="true"
          >
            <Plus size={16} strokeWidth={1.5} />
          </span>
        </button>
      </h3>

      {/* Trik grid-rows 0fr → 1fr: animasi buka/tutup dengan tinggi "auto" */}
      <div
        id={detailsId}
        inert={!isOpen}
        className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out-soft group-data-[open=true]/card:grid-rows-[1fr]"
      >
        <div className="overflow-hidden">
          <div className="pt-3 opacity-0 transition-opacity duration-300 group-data-[open=true]/card:opacity-100 group-data-[open=true]/card:delay-150">
            <p className="text-body-sm text-muted">{project.description}</p>

            <TagList tags={project.stack} className="mt-4" />

            <div className="mt-5 flex gap-5">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={textLink}
              >
                Visit site
                <span className="sr-only">
                  {" "}
                  — {project.title} (opens in new tab)
                </span>
                <ArrowUpRight
                  size={14}
                  strokeWidth={1.5}
                  className={nudge.upRight}
                  aria-hidden="true"
                />
              </a>
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={textLink}
                >
                  Code
                  <span className="sr-only">
                    {" "}
                    — {project.title} (opens in new tab)
                  </span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1.5}
                    className={nudge.upRight}
                    aria-hidden="true"
                  />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
