"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    // 'auto' -> geser sebanyak slide yang lagi kelihatan (1 di mobile, 2 di
    // tablet, 3 di desktop), bukan 1 per 1. Ini yang bikin panah selalu
    // geser satu "halaman" penuh dan rapi.
    slidesToScroll: "auto",
    containScroll: "trimSnaps",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnapCount, setScrollSnapCount] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setScrollSnapCount(emblaApi.scrollSnapList().length);
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // Sinkronisasi state awal dari Embla API (bukan derived state biasa,
    // melainkan membaca status instance carousel yang baru terpasang).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" className="border-b border-line-700/60 py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="03"
            label="projects"
            title="Project pilihan"
            description="Beberapa project yang telah saya buat, kembangkan, ataupun berkontribusi dalam pembuatan."
          />

          {/* Tombol navigasi (desktop) */}
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Project sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-700 text-paper-100 transition-colors hover:border-ember-400 hover:text-ember-300 disabled:opacity-30 disabled:hover:border-line-700 disabled:hover:text-paper-100"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Project berikutnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line-700 text-paper-100 transition-colors hover:border-ember-400 hover:text-ember-300 disabled:opacity-30 disabled:hover:border-line-700 disabled:hover:text-paper-100"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Viewport carousel — basis-full/1-2/1-3 supaya 1/2/3 kartu penuh
            sejajar persis (gak ada yang kepotong setengah) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 overflow-hidden"
          ref={emblaRef}
        >
          <div className="-ml-6 flex">
            {projects.map((project) => (
              <div
                key={project.id}
                className="shrink-0 basis-full pl-6 sm:basis-1/2 lg:basis-1/3"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Dot indicator (per halaman, bukan per kartu) + tombol mobile */}
        <div className="mt-8 flex items-center justify-between sm:justify-center sm:gap-6">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            aria-label="Project sebelumnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-700 text-paper-100 disabled:opacity-30 sm:hidden"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: scrollSnapCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => emblaApi?.scrollTo(index)}
                aria-label={`Ke halaman project ${index + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? "w-6 bg-ember-400"
                    : "w-1.5 bg-line-600 hover:bg-line-500"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            aria-label="Project berikutnya"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-700 text-paper-100 disabled:opacity-30 sm:hidden"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
