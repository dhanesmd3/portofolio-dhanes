"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ImagePlus, X } from "lucide-react";
import { beyondIntro, gallery } from "@/lib/data";
import { cn } from "@/lib/utils";
import { easeOutSoft, Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";
import { buttonStyles, labelClass } from "./ui";

const COUNT = gallery.length;
const STEP = (Math.PI * 2) / COUNT;
// Putaran otomatis (radian per frame) — kira-kira satu putaran per menit
const AUTO_SPEED = 0.0017;
// Geser lebih dari ini (px) = drag, bukan klik
const DRAG_THRESHOLD = 6;

const pad = (n: number) => String(n).padStart(2, "0");
// Normalisasi sudut ke rentang -π..π
const wrapAngle = (a: number) => Math.atan2(Math.sin(a), Math.cos(a));

/**
 * "Away from the keyboard" sebagai ring 3D (terinspirasi velmax.llc):
 * kartu tersusun melingkar dan berputar pelan. Bisa di-drag (dengan
 * inersia), digeser pakai tombol ←/→, dan kartu bisa dibuka untuk info.
 *
 * Posisi kartu dihitung tiap frame lalu ditulis langsung ke style DOM
 * (bukan lewat state) supaya React tidak re-render 60x per detik.
 */
export function BeyondTech() {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ring = useRef({
    rotation: 0,
    velocity: 0,
    target: null as number | null,
    dragging: false,
    pointerId: -1,
    lastX: 0,
    moved: 0,
    suppressClick: false,
    hovering: false,
    visible: false,
    radius: 360,
  });
  const frontRef = useRef(0);
  const openRef = useRef<number | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const [frontIndex, setFrontIndex] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Rotasi (terdekat dari posisi sekarang) yang membawa kartu i ke depan
  const rotationFor = (i: number) => {
    const r = ring.current.rotation;
    return r + wrapAngle(-i * STEP - r);
  };

  const layout = useCallback(() => {
    const s = ring.current;
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      const theta = i * STEP + s.rotation;
      const depth = (Math.cos(theta) + 1) / 2; // 0 = paling belakang, 1 = depan
      const x = Math.sin(theta) * s.radius;
      const z = Math.cos(theta) * s.radius;
      const y = Math.cos(theta) * s.radius * 0.36; // ring miring: depan lebih rendah, belakang lebih tinggi
      card.style.transform = `translate(-50%, -50%) translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${(Math.sin(theta) * 24).toFixed(2)}deg)`;
      card.style.opacity = (0.2 + 0.8 * depth ** 1.6).toFixed(3);
      card.style.zIndex = String(Math.round(depth * 100));
    });
    const front = (((Math.round(-s.rotation / STEP) % COUNT) + COUNT) %
      COUNT) as number;
    if (front !== frontRef.current) {
      frontRef.current = front;
      setFrontIndex(front);
    }
  }, []);

  // Loop animasi: easing ke target → inersia setelah drag → putar otomatis
  useEffect(() => {
    let frame = 0;
    const loop = () => {
      const s = ring.current;
      if (s.visible) {
        if (!s.dragging) {
          if (s.target !== null) {
            const diff = s.target - s.rotation;
            s.rotation += reduceMotion ? diff : diff * 0.12;
            if (Math.abs(diff) < 0.0008) {
              s.rotation = s.target;
              s.target = null;
            }
          } else if (Math.abs(s.velocity) > 0.0004) {
            s.rotation += s.velocity;
            s.velocity *= 0.93;
            if (Math.abs(s.velocity) <= 0.0004) {
              s.velocity = 0;
              s.target = Math.round(s.rotation / STEP) * STEP;
            }
          } else if (!reduceMotion && !s.hovering && openRef.current === null) {
            s.rotation -= AUTO_SPEED;
          }
        }
        layout();
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [layout, reduceMotion]);

  // Ukuran ring ikut lebar layar; loop hanya bekerja saat section terlihat
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const resize = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      ring.current.radius = Math.min(400, Math.max(150, width * 0.36));
      stage.style.setProperty(
        "--card-w",
        `${Math.min(184, Math.max(112, width * 0.16))}px`,
      );
      layout();
    });
    const visibility = new IntersectionObserver(([entry]) => {
      ring.current.visible = entry.isIntersecting;
    });
    resize.observe(stage);
    visibility.observe(stage);
    return () => {
      resize.disconnect();
      visibility.disconnect();
    };
  }, [layout]);

  // Saat kartu terbuka: fokus ke tombol tutup, Esc untuk menutup
  useEffect(() => {
    openRef.current = openIndex;
    if (openIndex === null) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenIndex(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex]);

  const close = () => {
    setOpenIndex(null);
    lastFocused.current?.focus();
  };

  const goTo = (i: number) => {
    ring.current.velocity = 0;
    ring.current.target = rotationFor(i);
  };

  const step = (direction: 1 | -1) => {
    const s = ring.current;
    s.velocity = 0;
    s.target = Math.round(s.rotation / STEP) * STEP - direction * STEP;
  };

  const openCard = (i: number, trigger: HTMLElement) => {
    if (ring.current.suppressClick) return; // itu tadi drag, bukan klik
    lastFocused.current = trigger;
    goTo(i);
    setOpenIndex(i);
  };

  // ── Drag ────────────────────────────────────────────────────────────────
  const onPointerDown = (event: React.PointerEvent) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const s = ring.current;
    s.dragging = true;
    s.pointerId = event.pointerId;
    s.lastX = event.clientX;
    s.moved = 0;
    s.velocity = 0;
    s.target = null;
  };

  const onPointerMove = (event: React.PointerEvent) => {
    const s = ring.current;
    if (!s.dragging || event.pointerId !== s.pointerId) return;
    const dx = event.clientX - s.lastX;
    s.lastX = event.clientX;
    s.moved += Math.abs(dx);
    // Tangkap pointer baru setelah benar-benar drag, supaya klik biasa
    // tetap sampai ke kartu
    const stage = stageRef.current;
    if (
      stage &&
      s.moved > DRAG_THRESHOLD &&
      !stage.hasPointerCapture(event.pointerId)
    ) {
      stage.setPointerCapture(event.pointerId);
    }
    const delta = dx / (s.radius * 1.1);
    s.rotation += delta;
    s.velocity = delta;
  };

  const endDrag = (event: React.PointerEvent) => {
    const s = ring.current;
    if (!s.dragging || event.pointerId !== s.pointerId) return;
    s.dragging = false;
    stageRef.current?.releasePointerCapture?.(event.pointerId);
    if (s.moved <= DRAG_THRESHOLD) {
      s.velocity = 0;
      return;
    }
    if (Math.abs(s.velocity) < 0.002) {
      s.target = Math.round(s.rotation / STEP) * STEP;
    }
    // Event "click" dikirim browser tepat setelah pointerup ini → abaikan
    // klik itu saja, lalu reset supaya klik/Enter berikutnya tetap jalan
    s.suppressClick = true;
    window.setTimeout(() => (s.suppressClick = false), 0);
  };

  const openItem = openIndex === null ? null : gallery[openIndex];

  return (
    <section
      id="beyond"
      aria-labelledby="beyond-title"
      className="overflow-x-clip pb-20 md:pb-28 lg:pb-40"
    >
      <div className="shell">
        <SectionHeader
          index="04"
          label="Beyond tech"
          title="Off the clock"
          titleId="beyond-title"
          aside={
            <p className="max-w-[360px] text-body text-muted">
              Drag the ring, then open any card to see what it&apos;s about.
            </p>
          }
        />

        <Reveal className="mx-auto mt-16 max-w-[600px] text-center">
          <p className="text-heading text-fg">{beyondIntro.title}</p>
          <p className="mt-4 text-body text-muted">{beyondIntro.body}</p>
        </Reveal>

        <Reveal className="relative mt-6">
          <div
            ref={stageRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Life outside the editor"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerEnter={() => (ring.current.hovering = true)}
            onPointerLeave={() => (ring.current.hovering = false)}
            className="relative h-[320px] cursor-grab touch-pan-y select-none [perspective-origin:50%_40%] [perspective:1700px] active:cursor-grabbing sm:h-[520px] lg:h-[640px]"
          >
            {/* Inti ring */}
            <div
              aria-hidden="true"
              className="absolute top-[40%] left-1/2 z-50 flex size-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-mono text-label text-fg glass sm:size-24"
            >
              AFK
            </div>

            {gallery.map((item, i) => (
              <button
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                type="button"
                onClick={(event) => openCard(i, event.currentTarget)}
                onFocus={() => goTo(i)}
                aria-label={`${item.caption} — open (${i + 1} of ${COUNT})`}
                className="absolute top-[40%] left-1/2 w-(--card-w,180px) cursor-pointer rounded-glass border border-[var(--glass-border)] bg-raised/85 p-2 text-left shadow-[inset_0_1px_0_0_var(--glass-highlight),var(--glass-shadow)] will-change-transform"
              >
                <span className="relative block aspect-[4/5] overflow-hidden rounded-[12px] bg-carbon/70">
                  {item.src ? (
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      draggable={false}
                      sizes="280px"
                      className="object-cover"
                    />
                  ) : (
                    <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 dot-field text-muted">
                      <ImagePlus
                        size={18}
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </span>
                <span className="flex items-center justify-between gap-2 px-1 pt-2.5 pb-0.5 font-mono text-micro uppercase">
                  <span className="text-accent">{pad(i + 1)}</span>
                  <span className="truncate text-fg">{item.caption}</span>
                </span>
              </button>
            ))}

            {/* Kartu yang dibuka */}
            <AnimatePresence>
              {openItem && openIndex !== null && (
                <motion.div
                  key="detail"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="absolute inset-0 z-[200] flex items-center justify-center"
                  onPointerDown={(event) => event.stopPropagation()}
                >
                  <button
                    type="button"
                    aria-label="Close"
                    tabIndex={-1}
                    onClick={close}
                    className="absolute inset-0 cursor-default rounded-glass bg-canvas/40 backdrop-blur-[2px]"
                  />
                  <motion.div
                    role="dialog"
                    aria-labelledby="beyond-detail-title"
                    initial={{ opacity: 0, scale: 0.96, y: 12 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97, y: 8 }}
                    transition={{ duration: 0.35, ease: easeOutSoft }}
                    className="relative grid w-[min(92%,600px)] cursor-auto gap-5 rounded-glass p-4 glass sm:grid-cols-[200px_1fr] sm:p-5"
                  >
                    <div className="relative hidden aspect-[4/5] overflow-hidden rounded-[12px] bg-carbon/70 sm:block">
                      {openItem.src ? (
                        <Image
                          src={openItem.src}
                          alt={openItem.alt}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      ) : (
                        <span className="absolute inset-0 flex items-center justify-center dot-field text-muted">
                          <ImagePlus
                            size={20}
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col py-1">
                      <div className="flex items-start justify-between gap-4">
                        <p className={cn(labelClass, "text-muted")}>
                          <span className="text-accent">
                            {pad(openIndex + 1)}
                          </span>{" "}
                          / {pad(COUNT)}
                        </p>
                        <button
                          ref={closeButtonRef}
                          type="button"
                          onClick={close}
                          aria-label="Close"
                          className={cn(buttonStyles.icon, "-mt-1 size-8")}
                        >
                          <X size={16} strokeWidth={1.5} aria-hidden="true" />
                        </button>
                      </div>
                      <h3
                        id="beyond-detail-title"
                        className="mt-4 text-heading-sm text-fg"
                      >
                        {openItem.caption}
                      </h3>
                      <p className="mt-3 text-body text-muted">
                        {openItem.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Kontrol */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => step(-1)}
              className={buttonStyles.icon}
              aria-label="Previous card"
            >
              <ArrowLeft size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
            <p className={cn(labelClass, "text-muted")}>
              <span className="text-fg">{pad(frontIndex + 1)}</span> /{" "}
              {pad(COUNT)}
              <span className="hidden sm:inline"> · Drag or open a card</span>
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              className={buttonStyles.icon}
              aria-label="Next card"
            >
              <ArrowRight size={18} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
