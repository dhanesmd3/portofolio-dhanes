// Web Worker: menggambar latar globe di OffscreenCanvas, terpisah dari thread
// utama, supaya scroll dan gerakan kursor tidak "rebutan" waktu dengan
// proses menggambar.
import { createGlobeRenderer, type GlobeMessage } from "./renderer";

const FRAME_MS = 1000 / 30; // gerakannya pelan → 30 fps sudah halus

let renderer: ReturnType<typeof createGlobeRenderer> | null = null;
let reduceMotion = false;
let visible = true;
let timer: ReturnType<typeof setTimeout> | null = null;
let last = 0;

function loop() {
  timer = null;
  if (!renderer || !visible || reduceMotion) return;
  const now = performance.now();
  renderer.step(Math.min(now - last, 64));
  last = now;
  renderer.draw(now);
  timer = setTimeout(loop, FRAME_MS);
}

function start() {
  if (timer || reduceMotion || !visible) return;
  last = performance.now();
  loop();
}

self.onmessage = (event: MessageEvent<GlobeMessage>) => {
  const msg = event.data;
  switch (msg.type) {
    case "init": {
      const ctx = msg.canvas.getContext("2d");
      if (!ctx) return;
      reduceMotion = msg.reduceMotion;
      renderer = createGlobeRenderer(ctx, { reduceMotion });
      return;
    }
    case "resize":
      renderer?.resize(msg.width, msg.height, msg.dpr);
      break;
    case "theme":
      renderer?.setTheme(msg.theme);
      break;
    case "scroll":
      renderer?.setScroll(msg.y);
      break;
    case "pointer":
      renderer?.setPointer(msg.x, msg.y);
      return; // digambar di frame berikutnya
    case "visibility":
      visible = msg.visible;
      if (visible) start();
      return;
  }
  // Tanpa animasi (reduced motion) → gambar ulang hanya saat ada perubahan
  if (reduceMotion) renderer?.draw(performance.now());
  else start();
};
