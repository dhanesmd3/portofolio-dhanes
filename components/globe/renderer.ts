// Inti penggambar latar "globe" — tanpa DOM, jadi bisa jalan di Web Worker
// (OffscreenCanvas) maupun di thread utama (fallback).
//
// Grid lintang-bujur di permukaan bola yang berputar pelan, ikut berputar
// saat scroll, sedikit miring ke arah kursor, dengan tanda "+" di setiap
// titik potong dan debu halus yang naik pelan.

type Ctx = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;
type Vec = [number, number, number];

export type GlobeTheme = {
  line: string;
  cross: string;
  lineAlpha: number;
  crossAlpha: number;
  dustAlpha: number;
};

const D = 2.4; // jarak kamera ke pusat bola (radius bola = 1)
const HORIZON = 1 / D;
const STEP = 10; // jarak antar garis (derajat)
const LAT_MAX = 70;
const SEG = 5; // panjang segmen garis (derajat)
const BUCKETS = 8;
const DUST = 60;

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

// Geometri dihitung sekali
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

export function createGlobeRenderer(
  ctx: Ctx,
  options: { reduceMotion: boolean },
) {
  let width = 1;
  let height = 1;
  let f = 1;
  let cx = 0;
  let cy = 0;
  let spin = 0;
  let scroll = 0;
  let theme: GlobeTheme | null = null;
  const pointer = { x: 0.5, y: 0.35, tx: 0.5, ty: 0.35, px: -9999, py: -9999 };

  // Buffer dipakai ulang tiap frame supaya tidak membuat array baru
  const lineBuckets: number[][] = Array.from({ length: BUCKETS }, () => []);
  const crossBuckets: number[][] = Array.from({ length: BUCKETS }, () => []);

  const dust = Array.from({ length: DUST }, (_, i) => {
    // Pseudo-random deterministik (worker & fallback menghasilkan pola sama)
    const r = (n: number) => {
      const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return {
      x: r(1),
      y: r(2),
      r: 0.6 + r(3) * 1.2,
      speed: 0.004 + r(4) * 0.01,
      phase: r(5) * Math.PI * 2,
    };
  });

  function resize(w: number, h: number, dpr: number) {
    width = w;
    height = h;
    const canvas = ctx.canvas;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Bola besar yang "muncul" dari kanan-bawah layar
    const radiusPx = Math.max(h * 0.88, w * 0.42);
    f = radiusPx * Math.sqrt(D * D - 1);
    cx = w * (w >= 768 ? 0.72 : 0.62);
    cy = h * 0.72;
  }

  function draw(now: number) {
    if (!theme) return;
    ctx.clearRect(0, 0, width, height);

    const rotY = spin + scroll * 0.00035 + (pointer.x - 0.5) * 0.12;
    const rotX =
      -0.32 + (pointer.y - 0.5) * 0.06 - Math.min(scroll, 4000) * 0.00002;
    const sY = Math.sin(rotY);
    const cY = Math.cos(rotY);
    const sX = Math.sin(rotX);
    const cX = Math.cos(rotX);
    const spotR2 = 2 * 220 * 220;

    // Proyeksi ditulis inline (tanpa alokasi array per titik)
    let px = 0;
    let py = 0;
    let pf = 0;
    const project = (p: Vec) => {
      const x1 = p[0] * cY + p[2] * sY;
      const z1 = -p[0] * sY + p[2] * cY;
      const y2 = p[1] * cX - z1 * sX;
      const z2 = p[1] * sX + z1 * cX;
      const s = f / (z2 + D);
      px = cx + x1 * s;
      py = cy - y2 * s;
      pf = (-z2 - HORIZON) / (1 - HORIZON);
    };
    const spot = (x: number, y: number) => {
      const dx = x - pointer.px;
      const dy = y - pointer.py;
      return Math.exp(-(dx * dx + dy * dy) / spotR2);
    };

    // ── Garis ───────────────────────────────────────────────────────────
    for (const b of lineBuckets) b.length = 0;
    for (const line of lines) {
      project(line[0]);
      let ax = px;
      let ay = py;
      let af = pf;
      for (let i = 1; i < line.length; i++) {
        project(line[i]);
        const facing = af < pf ? af : pf;
        if (facing > 0) {
          const a = Math.min(1, facing ** 0.7 * (0.55 + 0.9 * spot(px, py)));
          const b = Math.min(BUCKETS - 1, Math.round(a * (BUCKETS - 1)));
          if (b > 0) lineBuckets[b].push(ax, ay, px, py);
        }
        ax = px;
        ay = py;
        af = pf;
      }
    }
    ctx.lineWidth = 1;
    ctx.strokeStyle = theme.line;
    for (let b = 1; b < BUCKETS; b++) {
      const segs = lineBuckets[b];
      if (!segs.length) continue;
      ctx.globalAlpha = (b / (BUCKETS - 1)) * theme.lineAlpha;
      ctx.beginPath();
      for (let i = 0; i < segs.length; i += 4) {
        ctx.moveTo(segs[i], segs[i + 1]);
        ctx.lineTo(segs[i + 2], segs[i + 3]);
      }
      ctx.stroke();
    }

    // ── Tanda "+" ───────────────────────────────────────────────────────
    for (const b of crossBuckets) b.length = 0;
    for (const p of crosses) {
      project(p);
      if (pf <= 0.05) continue;
      const a = Math.min(1, pf * (0.5 + spot(px, py)));
      const b = Math.min(BUCKETS - 1, Math.round(a * (BUCKETS - 1)));
      if (b > 0) crossBuckets[b].push(px, py, 3 + 6 * pf);
    }
    ctx.lineWidth = 1.25;
    ctx.strokeStyle = theme.cross;
    for (let b = 1; b < BUCKETS; b++) {
      const pts = crossBuckets[b];
      if (!pts.length) continue;
      ctx.globalAlpha = (b / (BUCKETS - 1)) * theme.crossAlpha;
      ctx.beginPath();
      for (let i = 0; i < pts.length; i += 3) {
        const x = pts[i];
        const y = pts[i + 1];
        const r = pts[i + 2];
        ctx.moveTo(x - r, y);
        ctx.lineTo(x + r, y);
        ctx.moveTo(x, y - r);
        ctx.lineTo(x, y + r);
      }
      ctx.stroke();
    }

    // ── Debu ────────────────────────────────────────────────────────────
    ctx.fillStyle = theme.cross;
    const t = now / 1000;
    for (const d of dust) {
      const y =
        (((d.y - (options.reduceMotion ? 0 : t * d.speed) - scroll * 0.00004) %
          1) +
          1) %
        1;
      ctx.globalAlpha =
        theme.dustAlpha * (0.45 + 0.55 * Math.sin(t * 0.8 + d.phase) ** 2);
      ctx.fillRect(d.x * width, y * height, d.r, d.r);
    }
    ctx.globalAlpha = 1;
  }

  return {
    resize,
    draw,
    setTheme(next: GlobeTheme) {
      theme = next;
    },
    setScroll(y: number) {
      scroll = y;
    },
    setPointer(x: number, y: number) {
      pointer.tx = x / width;
      pointer.ty = y / height;
      pointer.px = x;
      pointer.py = y;
    },
    /** Maju satu langkah animasi (dt dalam ms). */
    step(dt: number) {
      spin += dt * 0.00002;
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
    },
  };
}

export type GlobeMessage =
  | { type: "init"; canvas: OffscreenCanvas; reduceMotion: boolean }
  | { type: "resize"; width: number; height: number; dpr: number }
  | { type: "theme"; theme: GlobeTheme }
  | { type: "scroll"; y: number }
  | { type: "pointer"; x: number; y: number }
  | { type: "visibility"; visible: boolean };
