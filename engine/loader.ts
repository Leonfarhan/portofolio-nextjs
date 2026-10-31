// First-load sequence. Progress follows REAL work (fonts + critical images) and a clock that starts at navigation
// (performance.now() counts from there), so a late boot finds the count already at its cap and leaves at once.
// Markup (#loader) lives in the layout; its look is authored per project (motion/loader.ts).
import { gsap } from 'gsap';
import { ease, prefersReducedMotion } from './env';

let format = (p: number) => String(Math.round(p)).padStart(3, '0');
/** Customize the counter text, e.g. a clock, a year, a frame count. p goes 0 → 100. */
export const setLoaderFormat = (fn: (p: number) => string) => {
  format = fn;
};

/** The loader → page handoff. `handoff()` starts the page intro (call it once, mid-exit is fine). */
export type LoaderExit = (root: HTMLElement, handoff: () => void) => gsap.core.Timeline;
let exit: LoaderExit | null = null;
/** Replace the exit choreography. Return a timeline. */
export const setLoaderExit = (fn: LoaderExit) => {
  exit = fn;
};

// Seconds since navigation start. The count reaches 100 by MIN when the assets are in, and by MAX whatever they do.
// A boot after MAX skips the count and leaves at once. The exit (motion/loader.ts) takes 0.48 s.
const MIN = 0.9;
const MAX = 1.5;

function criticalAssets(): Promise<unknown>[] {
  const imgs = [...document.querySelectorAll<HTMLImageElement>('img[data-critical], [data-intro] img')];
  return [document.fonts.ready, ...imgs.map((i) => (i.complete ? Promise.resolve() : i.decode().catch(() => {})))];
}

export async function runLoader(handoff: () => void): Promise<void> {
  const root = document.getElementById('loader');
  if (!root) return;
  // The deadline script already started the exit (app/layout.tsx): let its 380 ms cut finish, then hand over.
  if (root.dataset.expired) {
    await new Promise((resolve) => setTimeout(resolve, 380));
    return finish(root);
  }
  if (prefersReducedMotion()) {
    const cap = Promise.withResolvers<void>();
    setTimeout(cap.resolve, Math.max(0, MAX * 1000 - performance.now()));
    await Promise.race([Promise.all(criticalAssets()), cap.promise]);
    await gsap.to(root, { autoAlpha: 0, duration: 0.3 });
    return finish(root);
  }
  const count = root.querySelector<HTMLElement>('[data-loader-count]');
  const bar = root.querySelector<HTMLElement>('[data-loader-bar]');
  const ruler = root.querySelector<HTMLElement>('[data-loader-ruler]');
  const tasks = criticalAssets();
  let done = 0;
  const shown = { v: 0 };
  const target = { v: 0 };
  tasks.forEach((t) =>
    t.then(() => {
      done++;
      target.v = (done / tasks.length) * 100;
    }),
  );

  const progress = Promise.withResolvers<void>();
  const tick = () => {
    const elapsed = performance.now() / 1000; // seconds since navigation
    const clock = 1 - Math.pow(1 - Math.min(1, elapsed / MIN), 3);
    const goal = elapsed > MAX ? 100 : Math.min(target.v, clock * 100); // never ahead of the real work
    shown.v = Math.max(shown.v, goal);
    if (shown.v >= 100) shown.v = 100;
    if (count) count.textContent = format(shown.v);
    if (bar) bar.style.clipPath = `inset(0 ${100 - shown.v}% 0 0)`; // the render bar fills from the left
    if (ruler) ruler.style.clipPath = `inset(0 0 ${100 - shown.v}% 0)`; // the ticks print down the left edge
    if (shown.v === 100) {
      gsap.ticker.remove(tick);
      progress.resolve();
    }
  };
  gsap.ticker.add(tick);
  await progress.promise;

  // Exit. Author per project with setLoaderExit(): it is the first handoff every visitor sees.
  root.dataset.exit = '1';
  if (exit) {
    await exit(root, handoff);
    return finish(root);
  }
  await gsap
    .timeline()
    .to(root.querySelectorAll('[data-loader-out]'), { yPercent: -110, duration: 0.7, ease: ease.inOut, stagger: 0.05 })
    .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: ease.inOut }, '-=0.35');
  finish(root);
}

// Hide rather than remove: in React apps the loader node belongs to React. The event lets the header timer start counting
// from the moment the sheet is ready, and html.is-loaded reveals the header timecode.
function finish(root: HTMLElement) {
  root.hidden = true;
  document.documentElement.classList.add('is-loaded');
  document.dispatchEvent(new Event('engine:loaded'));
}
