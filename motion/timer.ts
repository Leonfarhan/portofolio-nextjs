// Time on site: the elapsed clock behind the watched line (motion/playhead.ts). It starts when the loader hands over
// (engine:loaded) and keeps counting across navigations. gsap.ticker drives it; listeners run when the displayed second
// changes.
import { gsap } from 'gsap';

let startedAt: number | null = null;
let lastSecond = -1;
const secondListeners = new Set<(sec: number) => void>();

/** Seconds since the sheet was read (0 before the loader finishes). */
export function elapsedSeconds() {
  return startedAt === null ? 0 : Math.floor((performance.now() - startedAt) / 1000);
}

/** Calls `fn` whenever the displayed second changes. Returns an unsubscribe. */
export function onSecond(fn: (sec: number) => void) {
  secondListeners.add(fn);
  return () => {
    secondListeners.delete(fn);
  };
}

/** HH:MM:SS. */
export function formatClock(sec: number) {
  const pad = (n: number) => String(n).padStart(2, '0');
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${pad(h)}:${pad(m)}:${pad(sec % 60)}`;
}

function tick() {
  const sec = elapsedSeconds();
  if (sec === lastSecond) return;
  lastSecond = sec;
  secondListeners.forEach((fn) => fn(sec));
}

/** Starts the clock once. Safe to call again. */
export function startTimer() {
  if (startedAt !== null) return;
  startedAt = performance.now();
  gsap.ticker.add(tick);
}
