"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Plus } from "lucide-react";
import { beyondIntro, gallery, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { labelClass } from "./ui";

const spanClass: Record<NonNullable<GalleryItem["span"]>, string> = {
  big: "col-span-2 row-span-2",
  wide: "col-span-2",
  tall: "row-span-2",
};

const chipClass =
  "absolute rounded-tag bg-canvas/70 font-mono text-micro text-fg uppercase backdrop-blur-sm";

export function BeyondTech() {
  // Satu foto terbuka dalam satu waktu; klik foto yang sama = tutup
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="beyond"
      aria-labelledby="beyond-title"
      className="pb-20 md:pb-28 lg:pb-40"
    >
      <div className="shell">
        <SectionHeader
          index="04"
          label="Beyond tech"
          title="Off the clock"
          titleId="beyond-title"
        />

        <Reveal className="mx-auto mt-16 max-w-[600px] text-center">
          <p className="text-heading text-fg">{beyondIntro.title}</p>
          <p className="mt-4 text-body text-muted">{beyondIntro.body}</p>
        </Reveal>

        <Reveal className="mt-12 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-4 md:auto-rows-[200px] md:grid-cols-4">
          {gallery.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <button
                key={index}
                type="button"
                data-open={isOpen}
                aria-expanded={isOpen}
                aria-label={
                  isOpen
                    ? `${item.caption}: ${item.description}`
                    : `${item.caption} — show details`
                }
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-card border border-line bg-carbon text-left transition-colors duration-150 hover:border-line-strong data-[open=true]:border-accent",
                  item.span && spanClass[item.span],
                )}
              >
                {item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes={
                      item.span === "big" || item.span === "wide"
                        ? "(min-width: 768px) 50vw, 100vw"
                        : "(min-width: 768px) 25vw, 50vw"
                    }
                    // Grayscale cuma di perangkat yang bisa hover; di HP langsung berwarna
                    className="object-cover transition-[transform,filter] duration-[600ms] ease-out-soft group-hover:scale-[1.03] group-hover:grayscale-0 group-data-[open=true]:scale-[1.03] group-data-[open=true]:grayscale-0 [@media(hover:hover)]:grayscale"
                  />
                ) : (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted">
                    <ImagePlus size={20} strokeWidth={1.5} aria-hidden="true" />
                    <span className={cn(labelClass, "text-micro")}>
                      Add photo
                    </span>
                  </span>
                )}

                <span
                  className={cn(
                    chipClass,
                    "bottom-3 left-3 px-2 py-1 transition-opacity duration-300 group-data-[open=true]:opacity-0",
                  )}
                >
                  {item.caption}
                </span>

                <span
                  aria-hidden="true"
                  className={cn(
                    chipClass,
                    "top-3 right-3 inline-flex size-7 items-center justify-center rounded-full transition-transform duration-300 ease-out-soft group-data-[open=true]:rotate-45",
                  )}
                >
                  <Plus size={14} strokeWidth={1.5} />
                </span>

                {/* Info tipis yang naik dari bawah saat foto dibuka */}
                <span
                  aria-hidden={!isOpen}
                  className="absolute inset-x-0 bottom-0 translate-y-full border-t border-line bg-canvas/80 px-3 py-2.5 backdrop-blur-md transition-transform duration-500 ease-out-soft group-data-[open=true]:translate-y-0"
                >
                  <span className="block font-mono text-micro text-fg uppercase">
                    {item.caption}
                  </span>
                  <span className="mt-1 line-clamp-2 block text-body-sm text-muted">
                    {item.description}
                  </span>
                </span>
              </button>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
