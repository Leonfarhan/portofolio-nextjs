// Smooth scroll on ONE clock: Lenis is driven by gsap.ticker and ScrollTrigger reads Lenis.
// Reduced motion → native scroll, no Lenis. Anchors are handled by the adapter (anchors: false),
// so hash links go through one place and land below the fixed header.
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './env';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
const listeners = new Set<(s: ScrollState) => void>();

export type ScrollState = { y: number; velocity: number; progress: number };
const state: ScrollState = { y: 0, velocity: 0, progress: 0 };

export function initScroll() {
  if (lenis || prefersReducedMotion()) {
    // Still publish native scroll position for listeners.
    if (!lenis) addEventListener('scroll', nativeTick, { passive: true });
    return;
  }
  lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.2, anchors: false });
  lenis.on('scroll', (l: Lenis) => {
    state.y = l.scroll;
    state.velocity = l.velocity;
    state.progress = l.limit > 0 ? l.scroll / l.limit : 0; // Lenis reports 1 on pages that cannot scroll
    ScrollTrigger.update();
    listeners.forEach((fn) => fn(state));
  });
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

function nativeTick() {
  const max = document.documentElement.scrollHeight - innerHeight;
  state.velocity = scrollY - state.y;
  state.y = scrollY;
  state.progress = max > 0 ? scrollY / max : 0;
  listeners.forEach((fn) => fn(state));
}

export const onScroll = (fn: (s: ScrollState) => void) => {
  listeners.add(fn);
  return () => listeners.delete(fn);
};
export const scrollState = () => state;
export const stopScroll = () => lenis?.stop();
export const startScroll = () => lenis?.start();

export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else scrollTo(0, 0);
  state.y = 0;
  state.velocity = 0;
}

// Quartic ease-out for programmatic scrolls (the page's own easing, not a shared name).
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

/** Document Y that puts `el` just under the fixed header. */
function landingY(el: HTMLElement) {
  const header = document.getElementById('site-header');
  const offset = (header?.offsetHeight ?? 0) + 8;
  return Math.max(0, el.getBoundingClientRect().top + scrollY - offset);
}

/** Smooth scroll to a selector, element or document Y. */
export function scrollToTarget(target: string | HTMLElement | number) {
  if (typeof target === 'number') {
    if (lenis) lenis.scrollTo(target, { duration: 1.4, easing: easeOut });
    else scrollTo({ top: target });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  lenis?.resize(); // the sheet may have grown since the last measure (sections load, fonts settle)
  const y = landingY(el);
  if (lenis) lenis.scrollTo(y, { duration: 1.4, easing: easeOut });
  else scrollTo({ top: y });
}

/** Instant jump (used under the curtain). Returns false when the target does not exist. */
export function jumpTo(target: string) {
  const el = document.querySelector<HTMLElement>(target);
  if (!el) return false;
  const y = landingY(el);
  if (lenis) {
    lenis.resize(); // the page has just been swapped: re-measure before Lenis clamps to the old limit
    lenis.scrollTo(y, { immediate: true, force: true });
  } else scrollTo(0, y);
  return true;
}
