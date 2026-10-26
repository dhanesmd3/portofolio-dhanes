import Image from "next/image";
import { beyondIntro, gallery, type GalleryItem } from "@/lib/data";
import { cn } from "@/lib/utils";
import { AfkPauseButton } from "./AfkPauseButton";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

/**
 * "Away from the keyboard": foto landscape dalam kolom yang bergulir pelan
 * tanpa henti — kolom ganjil ke atas, kolom tengah ke bawah. Murni CSS
 * (lihat .afk-track di globals.css), jadi ringan dan tidak butuh JS.
 * Hover kolom = berhenti; tombol Pause untuk menghentikan semuanya.
 */

// Bagi foto ke n kolom secara bergiliran (0,1,2,0,1,2,...)
const splitInto = (count: number) =>
  Array.from({ length: count }, (_, col) =>
    gallery.filter((_, i) => i % count === col),
  );

const desktopColumns = splitInto(3);
const mobileColumns = splitInto(2);

// Detik per foto: makin banyak foto di kolom, makin lama satu putaran,
// jadi kecepatannya tetap pelan dan konsisten
const SECONDS_PER_PHOTO = 9;

function Card({ item, duplicate }: { item: GalleryItem; duplicate: boolean }) {
  return (
    <figure
      aria-hidden={duplicate || undefined}
      className="group relative aspect-[3/2] shrink-0 overflow-hidden rounded-card border border-line bg-carbon"
    >
      {item.src && (
        <Image
          src={item.src}
          alt={duplicate ? "" : item.alt}
          fill
          sizes="(min-width: 768px) 30vw, 46vw"
          className="object-cover transition-transform duration-[600ms] ease-out-soft group-hover:scale-[1.04]"
        />
      )}
      <figcaption className="absolute bottom-2.5 left-2.5 max-w-[calc(100%-1.25rem)] rounded-tag bg-canvas/75 px-2 py-1 font-mono text-micro text-fg uppercase">
        {item.caption}
        {item.description && (
          <span className="mt-1 hidden font-sans text-body-sm text-muted normal-case group-hover:block">
            {item.description}
          </span>
        )}
      </figcaption>
    </figure>
  );
}

function Column({
  items,
  direction,
  speed = 1,
}: {
  items: GalleryItem[];
  direction: "up" | "down";
  speed?: number;
}) {
  const duration = items.length * SECONDS_PER_PHOTO * speed;
  return (
    <div className="afk-col h-full min-w-0 overflow-hidden">
      {/* Isi diulang dua kali; animasi menggeser tepat satu set → loop mulus */}
      <div
        className="afk-track flex flex-col gap-4"
        data-dir={direction}
        style={{ "--afk-duration": `${duration}s` } as React.CSSProperties}
      >
        {[...items, ...items].map((item, i) => (
          <Card
            key={`${item.src}-${i}`}
            item={item}
            duplicate={i >= items.length}
          />
        ))}
      </div>
    </div>
  );
}

export function BeyondTech() {
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
          aside={<AfkPauseButton targetId="afk-marquee" />}
        />

        <Reveal className="mx-auto mt-16 max-w-[600px] text-center">
          <p className="text-heading text-fg">{beyondIntro.title}</p>
          <p className="mt-4 text-body text-muted">{beyondIntro.body}</p>
        </Reveal>

        <Reveal className="mt-12">
          <div
            id="afk-marquee"
            role="region"
            aria-label="Photos from life outside the editor"
            className={cn(
              "relative h-[520px] overflow-hidden md:h-[680px]",
              // Atas & bawah memudar supaya foto muncul/hilang dengan halus
              "[mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]",
            )}
          >
            <div className="grid h-full grid-cols-2 gap-4 md:hidden">
              <Column items={mobileColumns[0]} direction="up" />
              <Column items={mobileColumns[1]} direction="down" speed={1.1} />
            </div>
            <div className="hidden h-full grid-cols-3 gap-4 md:grid">
              <Column items={desktopColumns[0]} direction="up" />
              <Column items={desktopColumns[1]} direction="down" speed={1.12} />
              <Column items={desktopColumns[2]} direction="up" speed={0.94} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
