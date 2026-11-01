"use client";

import { useEffect, useRef } from "react";

/**
 * Latar "globe": grid garis lintang-bujur di permukaan bola yang berputar
 * pelan (dan ikut berputar saat halaman di-scroll), dengan tanda "+" di
 * setiap titik potong dan debu halus yang melayang — terinspirasi
 * puture.co.kr, tapi digambar dengan canvas 2D biasa (tanpa WebGL/library)
 * supaya ringan. Warna diambil dari token tema (--accent, --fg).
 *
 * Performa: garis dikelompokkan per tingkat transparansi lalu digambar
 * dengan sedikit stroke() saja per frame; berhenti saat tab tidak terlihat;
 * prefers-reduced-motion → gambar diam (tetap ikut scroll, tanpa animasi).
 */

const D = 2.4; // jarak kamera ke pusat bola (radius bola = 1)
const HORIZON = 1 / D; // titik dengan z < -HORIZON menghadap kamera
const STEP = 10; // jarak antar garis (derajat)
const LAT_MAX = 72;
const SEG = 5; // panjang segmen garis (derajat)
const FRAME_MS = 1000 / 30; // gerakannya pelan → 30 fps sudah halus, beban CPU separuh
const BUCKETS = 8;
const DUST = 70;

type Vec = [number, number, number];

const rad = (deg: number) => (deg * Math.PI) / 180;
const onSphere = (latDeg: number, lonDeg: number): Vec => {
  const lat = rad(latDeg);
  const lon = rad(lonDeg);
  return [
    Math.cos(lat) * Math.sin(lon),
    Math.sin(lat),
    -Math.cos(lat) * Math.cos(lon),
  ];
};

// Geometri dihitung sekali: polyline bujur & lintang, dan titik potong
const lines: Vec[][] = [];
for (let lon = 0; lon < 360; lon += STEP) {
  const line: Vec[] = [];
  for (let lat = -LAT_MAX; lat <= LAT_MAX; lat += SEG)
    line.push(onSphere(lat, lon));
  lines.push(line);
}
for (let lat = -LAT_MAX + STEP; lat < LAT_MAX; lat += STEP) {
  const line: Vec[] = [];
  for (let lon = 0; lon <= 360; lon += SEG) line.push(onSphere(lat, lon));
  lines.push(line);
}
const crosses: Vec[] = [];
for (let lon = 0; lon < 360; lon += STEP)
  for (let lat = -LAT_MAX + STEP; lat < LAT_MAX; lat += STEP)
    crosses.push(onSphere(lat, lon));

export function BackdropGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = document.documentElement;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let width = 0;
    let height = 0;
    let f = 1; // focal length (px)
    let cx = 0;
    let cy = 0;
    let frame = 0;
    let last = performance.now();
    let spin = 0; // rotasi otomatis (radian)
    const pointer = {
      x: 0.5,
      y: 0.35,
      tx: 0.5,
      ty: 0.35,
      px: -9999,
      py: -9999,
    };

    const readTheme = () => {
      const cs = getComputedStyle(root);
      const light = root.dataset.theme === "light";
      return {
        line: cs.getPropertyValue("--accent").trim() || "#4a7be3",
        cross: cs.getPropertyValue("--fg").trim() || "#eef1f6",
        lineAlpha: light ? 0.26 : 0.36,
        crossAlpha: light ? 0.32 : 0.5,
        dustAlpha: light ? 0.18 : 0.32,
      };
    };
    let theme = readTheme();

    const dust = Array.from({ length: DUST }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.2,
      speed: 0.004 + Math.random() * 0.01,
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Bola besar yang "muncul" dari kanan-bawah layar
      const radiusPx = Math.max(height * 0.88, width * 0.42);
      f = radiusPx * Math.sqrt(D * D - 1);
      cx = width * (width >= 768 ? 0.72 : 0.62);
      cy = height * 0.72;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const scroll = window.scrollY;
      const rotY = spin + scroll * 0.00035 + (pointer.x - 0.5) * 0.12;
      const rotX =
        -0.32 + (pointer.y - 0.5) * 0.06 - Math.min(scroll, 4000) * 0.00002;
      const sy = Math.sin(rotY);
      const cyR = Math.cos(rotY);
      const sx = Math.sin(rotX);
      const cxR = Math.cos(rotX);

      // Proyeksi: putar (Y lalu X) → perspektif. Kembalikan [x, y, facing]
      const project = (p: Vec): [number, number, number] => {
        const x1 = p[0] * cyR + p[2] * sy;
        const z1 = -p[0] * sy + p[2] * cyR;
        const y2 = p[1] * cxR - z1 * sx;
        const z2 = p[1] * sx + z1 * cxR;
        const s = f / (z2 + D);
        const facing = (-z2 - HORIZON) / (1 - HORIZON);
        return [cx + x1 * s, cy - y2 * s, facing];
      };

      // Sorotan di sekitar kursor (lanjutan efek "senter" sebelumnya)
      const spot = (x: number, y: number) => {
        const dx = x - pointer.px;
        const dy = y - pointer.py;
        return Math.exp(-(dx * dx + dy * dy) / (2 * 220 * 220));
      };

      // ── Garis grid, dikelompokkan per tingkat alpha ──────────────────────
      const buckets: number[][] = Array.from({ length: BUCKETS }, () => []);
      for (const line of lines) {
        let prev = project(line[0]);
        for (let i = 1; i < line.length; i++) {
          const cur = project(line[i]);
          const facing = Math.min(prev[2], cur[2]);
          if (facing > 0) {
            const a = Math.min(
              1,
              facing ** 0.7 * (0.55 + 0.9 * spot(cur[0], cur[1])),
            );
            const b = Math.min(BUCKETS - 1, Math.round(a * (BUCKETS - 1)));
            if (b > 0) buckets[b].push(prev[0], prev[1], cur[0], cur[1]);
          }
          prev = cur;
        }
      }
      ctx.lineWidth = 1;
      ctx.strokeStyle = theme.line;
      buckets.forEach((segs, b) => {
        if (!segs.length) return;
        ctx.globalAlpha = (b / (BUCKETS - 1)) * theme.lineAlpha;
        ctx.beginPath();
        for (let i = 0; i < segs.length; i += 4) {
          ctx.moveTo(segs[i], segs[i + 1]);
          ctx.lineTo(segs[i + 2], segs[i + 3]);
        }
        ctx.stroke();
      });

      // ── Tanda "+" di titik potong ────────────────────────────────────────
      const crossBuckets: number[][] = Array.from(
        { length: BUCKETS },
        () => [],
      );
      for (const p of crosses) {
        const [x, y, facing] = project(p);
        if (facing <= 0.05) continue;
        const a = Math.min(1, facing * (0.5 + spot(x, y)));
        const b = Math.min(BUCKETS - 1, Math.round(a * (BUCKETS - 1)));
        if (b > 0) crossBuckets[b].push(x, y, 3 + 6 * facing);
      }
      ctx.lineWidth = 1.25;
      ctx.strokeStyle = theme.cross;
      crossBuckets.forEach((pts, b) => {
        if (!pts.length) return;
        ctx.globalAlpha = (b / (BUCKETS - 1)) * theme.crossAlpha;
        ctx.beginPath();
        for (let i = 0; i < pts.length; i += 3) {
          const [x, y, r] = [pts[i], pts[i + 1], pts[i + 2]];
          ctx.moveTo(x - r, y);
          ctx.lineTo(x + r, y);
          ctx.moveTo(x, y - r);
          ctx.lineTo(x, y + r);
        }
        ctx.stroke();
      });

      // ── Debu halus yang naik pelan & berkelip ───────────────────────────
      ctx.fillStyle = theme.cross;
      const t = performance.now() / 1000;
      for (const d of dust) {
        const y =
          (((d.y - (reduceMotion ? 0 : t * d.speed) - scroll * 0.00004) % 1) +
            1) %
          1;
        ctx.globalAlpha =
          theme.dustAlpha * (0.45 + 0.55 * Math.sin(t * 0.8 + d.phase) ** 2);
        ctx.fillRect(d.x * width, y * height, d.r, d.r);
      }
      ctx.globalAlpha = 1;
    };

    let lastDraw = 0;
    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      if (now - lastDraw < FRAME_MS - 1) return;
      lastDraw = now;
      const dt = Math.min(now - last, 64);
      last = now;
      spin += dt * 0.00002;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      draw();
    };

    const start = () => {
      if (reduceMotion || frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const onPointerMove = (event: PointerEvent) => {
      pointer.tx = event.clientX / width;
      pointer.ty = event.clientY / height;
      pointer.px = event.clientX;
      pointer.py = event.clientY;
    };
    const onScroll = () => reduceMotion && draw();
    const onResize = () => {
      resize();
      draw();
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const themeObserver = new MutationObserver(() => {
      theme = readTheme();
      draw();
    });

    resize();
    draw();
    start();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    themeObserver.observe(root, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      stop();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      themeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 size-full" />;
}
