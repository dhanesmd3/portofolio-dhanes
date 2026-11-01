"use client";

import { useEffect, useRef } from "react";
import {
  createGlobeRenderer,
  type GlobeMessage,
  type GlobeTheme,
} from "./globe/renderer";

/**
 * Latar "globe" (terinspirasi puture.co.kr): grid lintang-bujur di
 * permukaan bola dengan tanda "+" dan debu halus. Logika gambar ada di
 * ./globe/renderer.ts.
 *
 * Performa: kalau browser mendukung OffscreenCanvas, menggambar dilakukan
 * di Web Worker (./globe/globe.worker.ts) sehingga thread utama bebas untuk
 * scroll & kursor. Kalau tidak, fallback ke thread utama. Komponen ini
 * hanya meneruskan ukuran, tema, scroll, dan posisi kursor.
 */

// Resolusi canvas dibatasi: garisnya tipis & samar, perbedaan di atas 1.25x
// tidak terlihat, tapi beban GPU-nya naik kuadratik.
const MAX_DPR = 1.25;
const FRAME_MS = 1000 / 30;

function readTheme(): GlobeTheme {
  const root = document.documentElement;
  const cs = getComputedStyle(root);
  const light = root.dataset.theme === "light";
  return {
    line: cs.getPropertyValue("--accent").trim() || "#4a7be3",
    cross: cs.getPropertyValue("--fg").trim() || "#eef1f6",
    lineAlpha: light ? 0.26 : 0.36,
    crossAlpha: light ? 0.32 : 0.5,
    dustAlpha: light ? 0.18 : 0.32,
  };
}

export function BackdropGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    // Canvas dibuat baru tiap effect jalan: kontrol canvas cuma bisa
    // diserahkan ke worker SEKALI, sedangkan di dev (StrictMode) dan saat
    // Fast Refresh effect ini dijalankan ulang.
    const canvas = document.createElement("canvas");
    canvas.className = "absolute inset-0 size-full";
    host.appendChild(canvas);
    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // ── Pilih jalur: Worker (utama) atau thread utama (fallback) ─────────
    let send: (msg: GlobeMessage) => void;
    let cleanupDriver: () => void;

    const canUseWorker =
      typeof Worker !== "undefined" && "transferControlToOffscreen" in canvas;

    if (canUseWorker) {
      const worker = new Worker(
        new URL("./globe/globe.worker.ts", import.meta.url),
        { type: "module" },
      );
      const offscreen = canvas.transferControlToOffscreen();
      worker.postMessage(
        {
          type: "init",
          canvas: offscreen,
          reduceMotion,
        } satisfies GlobeMessage,
        [offscreen],
      );
      send = (msg) => worker.postMessage(msg);
      cleanupDriver = () => worker.terminate();
    } else {
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        canvas.remove();
        return;
      }
      const renderer = createGlobeRenderer(ctx, { reduceMotion });
      let frame = 0;
      let last = 0;
      let lastDraw = 0;
      let visible = true;
      const tick = (now: number) => {
        frame = requestAnimationFrame(tick);
        if (now - lastDraw < FRAME_MS - 1) return;
        lastDraw = now;
        renderer.step(Math.min(now - last, 64));
        last = now;
        renderer.draw(now);
      };
      const start = () => {
        if (reduceMotion || frame || !visible) return;
        last = performance.now();
        frame = requestAnimationFrame(tick);
      };
      send = (msg) => {
        switch (msg.type) {
          case "resize":
            renderer.resize(msg.width, msg.height, msg.dpr);
            break;
          case "theme":
            renderer.setTheme(msg.theme);
            break;
          case "scroll":
            renderer.setScroll(msg.y);
            break;
          case "pointer":
            renderer.setPointer(msg.x, msg.y);
            return;
          case "visibility":
            visible = msg.visible;
            if (!visible) {
              cancelAnimationFrame(frame);
              frame = 0;
            } else start();
            return;
        }
        if (reduceMotion) renderer.draw(performance.now());
        else start();
      };
      cleanupDriver = () => cancelAnimationFrame(frame);
    }

    // ── Teruskan keadaan halaman ke renderer ─────────────────────────────
    const sendSize = () =>
      send({
        type: "resize",
        width: window.innerWidth,
        height: window.innerHeight,
        dpr: Math.min(window.devicePixelRatio || 1, MAX_DPR),
      });

    // Pointer & scroll digabung per frame (maks. satu pesan per frame)
    let pending = 0;
    let pointerX = -9999;
    let pointerY = -9999;
    let pointerDirty = false;
    let scrollDirty = false;
    const flush = () => {
      pending = 0;
      if (pointerDirty) send({ type: "pointer", x: pointerX, y: pointerY });
      if (scrollDirty) send({ type: "scroll", y: window.scrollY });
      pointerDirty = scrollDirty = false;
    };
    const schedule = () => {
      if (!pending) pending = requestAnimationFrame(flush);
    };
    const onPointerMove = (event: PointerEvent) => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      pointerDirty = true;
      schedule();
    };
    const onScroll = () => {
      scrollDirty = true;
      schedule();
    };
    const onVisibility = () =>
      send({ type: "visibility", visible: !document.hidden });
    const themeObserver = new MutationObserver(() =>
      send({ type: "theme", theme: readTheme() }),
    );

    send({ type: "theme", theme: readTheme() });
    send({ type: "scroll", y: window.scrollY });
    sendSize();

    window.addEventListener("resize", sendSize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      cancelAnimationFrame(pending);
      cleanupDriver();
      window.removeEventListener("resize", sendSize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
      canvas.remove();
    };
  }, []);

  return <div ref={hostRef} className="absolute inset-0" />;
}
