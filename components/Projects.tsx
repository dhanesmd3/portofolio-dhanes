"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./ProjectCard";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { buttonStyles, labelClass } from "./ui";

const featured = projects.filter((project) => project.featured);
const archive = projects.filter((project) => !project.featured);

const pad = (n: number) => String(n).padStart(2, "0");

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const thumbRef = useRef<HTMLDivElement>(null);
  // Satu kartu terbuka dalam satu waktu; klik kartu yang sama = tutup
  const [openId, setOpenId] = useState<string | null>(null);
  const toggleProject = (id: string) =>
    setOpenId((current) => (current === id ? null : id));

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setSnapCount(emblaApi.scrollSnapList().length);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  // Progress bar diupdate langsung ke DOM (bukan state) supaya tidak
  // re-render puluhan kali per detik saat carousel digeser
  const onScroll = useCallback(() => {
    if (!emblaApi || !thumbRef.current) return;
    const snaps = emblaApi.scrollSnapList().length;
    const progress = Math.min(1, Math.max(0, emblaApi.scrollProgress()));
    thumbRef.current.style.width = `${100 / Math.max(1, snaps)}%`;
    thumbRef.current.style.transform = `translateX(${progress * (snaps - 1) * 100}%)`;
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sinkronisasi state awal dari Embla API (bukan derived state biasa,
    // melainkan membaca status instance carousel yang baru terpasang).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    onScroll();
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    emblaApi.on("scroll", onScroll).on("reInit", onScroll);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
      emblaApi.off("scroll", onScroll).off("reInit", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      emblaApi?.scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      emblaApi?.scrollNext();
    }
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="pb-20 md:pb-28 lg:pb-40"
    >
      <div className="shell">
        <SectionHeader
          index="02"
          label="Selected work"
          title="Things I've shipped"
          titleId="projects-title"
          aside={
            <div className="flex items-center gap-4">
              <p className={cn(labelClass, "hidden text-muted lg:block")}>
                Select a project for details
              </p>
              <p className={labelClass} aria-live="polite">
                <span className="text-fg">{pad(selectedIndex + 1)}</span>
                <span className="text-muted">
                  {" "}
                  / {pad(Math.max(snapCount, 1))}
                </span>
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollPrev()}
                  disabled={!canScrollPrev}
                  className={buttonStyles.icon}
                  aria-label="Previous project"
                >
                  <ChevronLeft size={18} strokeWidth={1.5} aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => emblaApi?.scrollNext()}
                  disabled={!canScrollNext}
                  className={buttonStyles.icon}
                  aria-label="Next project"
                >
                  <ChevronRight
                    size={18}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          }
        />

        <Reveal className="mt-12">
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label="Selected projects"
            onKeyDown={onKeyDown}
          >
            {/* Pinggir kanan memudar = petunjuk masih ada slide berikutnya */}
            <div
              ref={emblaRef}
              className={cn(
                "overflow-hidden",
                canScrollNext &&
                  "[mask-image:linear-gradient(to_right,black_85%,transparent)]",
              )}
            >
              <div className="-ml-6 flex items-start">
                {featured.map((project, index) => (
                  <div
                    key={project.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${index + 1} of ${featured.length}`}
                    className="min-w-0 shrink-0 grow-0 basis-[85%] pl-6 sm:basis-[60%] lg:basis-[464px]"
                  >
                    <ProjectCard
                      project={project}
                      isOpen={openId === project.id}
                      onToggle={() => toggleProject(project.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-10 h-px bg-line" aria-hidden="true">
              <div
                ref={thumbRef}
                className="absolute inset-y-0 left-0 bg-fg transition-transform duration-150"
              />
            </div>
          </div>
        </Reveal>

        {archive.length > 0 && (
          <Reveal className="mt-20">
            <h3 className={cn(labelClass, "text-muted")}>Archive</h3>
            <ul className="mt-4">
              {archive.map((project) => (
                <li
                  key={project.id}
                  className="border-t border-line last:border-b"
                >
                  <a
                    href={project.url ?? project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-6 py-5"
                  >
                    <div className="min-w-0 flex-1 md:grid md:grid-cols-[2fr_2fr_auto] md:items-baseline md:gap-6">
                      <span className="block text-body text-fg transition-transform duration-150 group-hover:translate-x-1">
                        {project.title}
                      </span>
                      <span className="mt-1 block text-body-sm text-muted md:mt-0">
                        {project.category}
                        <span className="md:hidden"> · {project.year}</span>
                      </span>
                      <span
                        className={cn(labelClass, "hidden text-muted md:block")}
                      >
                        {project.year}
                      </span>
                    </div>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      className="mt-0.5 shrink-0 text-muted transition-colors duration-150 group-hover:text-accent"
                      aria-hidden="true"
                    />
                    <span className="sr-only">(opens in new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
