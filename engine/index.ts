// Engine core: framework-agnostic page lifecycle. No DOM access at import time (SSR-safe).
// The Next adapter (next.tsx) calls:
//   boot(setup)              once, on first load: setup → scroll → page init → loader → intro
//   leave() → cleanup()      before the route swaps (leave runs while the next page loads)
//   enter({ hash })         after the new page is in the DOM: jump or reset → init → curtain → intro
// Project code hooks in with onPage(fn): fn runs on every page load inside a gsap.context, so the
// tweens and ScrollTriggers it creates are reverted automatically. Return a cleanup for the rest
// (ticker callbacks and window listeners are not reverted by the context).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { initScroll, jumpTo, resetScroll, startScroll, stopScroll } from './scroll';
import { initReveals } from './reveal';
import { runLoader } from './loader';
import { playEnter, playLeave } from './transition';
import { prefersReducedMotion } from './env';

export { onScroll, scrollState, scrollToTarget, jumpTo, stopScroll, startScroll } from './scroll';
export type { ScrollState } from './scroll';
export { setTransition } from './transition';
export type { Transition } from './transition';
export { setLoaderFormat, setLoaderExit } from './loader';
export type { LoaderExit } from './loader';
export { ease, isTouch, isMobile, prefersReducedMotion } from './env';

export type PageFn = (page: { intro: gsap.core.Timeline; path: string }) => void | (() => void);
const pageFns = new Set<PageFn>();
const cleanups: (() => void)[] = [];
let ctx: gsap.Context | null = null;
let intro: gsap.core.Timeline | null = null;
let ready = false;
let booted = false;
let introStarted = false;

/** Run fn on every page load (and now, if a page is ready). Returns an unsubscribe. */
export function onPage(fn: PageFn) {
  pageFns.add(fn);
  if (ready) runPageFn(fn);
  return () => {
    pageFns.delete(fn);
  };
}

function runPageFn(fn: PageFn) {
  ctx?.add(() => {
    const c = fn({ intro: intro!, path: location.pathname });
    if (typeof c === 'function') cleanups.push(c);
  });
}

// Flags on <html>. Re-applied on every page so a router that swaps root attributes cannot drop them.
export function syncFlags() {
  const h = document.documentElement.classList;
  h.add('js', 'is-booted');
  h.toggle('motion', !prefersReducedMotion());
}

function initPage() {
  syncFlags();
  ctx = gsap.context(() => {
    intro = initReveals(document);
  });
  ready = true;
  pageFns.forEach(runPageFn);
  gsap.delayedCall(0, () => ScrollTrigger.refresh());
}

// The page intro plays once: from the loader's handoff on first load, or right after enter().
function handoff() {
  if (introStarted) return;
  introStarted = true;
  intro?.play();
}

/** First load. `setup` runs once on the client after scroll init and before the first page:
 *  register setTransition, setLoaderFormat, setLoaderExit and the driver modules there. */
export async function boot(setup?: () => void) {
  if (booted) return;
  booted = true;
  syncFlags();
  initScroll();
  setup?.();
  stopScroll();
  if (location.hash) jumpTo(location.hash);
  initPage();
  // The loader's deadline script (app/layout.tsx) may have already taken it away on a slow boot. Then the intro is not
  // replayed late: the page is simply put in its final state, so nothing jumps under a visitor who is already reading.
  const root = document.documentElement;
  if (root.classList.contains('is-loaded') || root.classList.contains('is-deadline')) {
    root.classList.remove('is-deadline');
    introStarted = true;
    intro?.progress(1);
    startScroll();
    return;
  }
  await runLoader(handoff);
  startScroll();
  handoff();
}

/** Play the leave animation (resolve when the screen is covered). */
export async function leave() {
  stopScroll();
  await playLeave();
}

/** Tear down the current page: reverts every tween and ScrollTrigger, runs page cleanups. */
export function cleanup() {
  if (!ready) return;
  ready = false;
  cleanups.splice(0).forEach((c) => c());
  ctx?.revert();
  ctx = null;
}

/** Init the new page. `transition: false` for back/forward, where no leave ran. `hash` lands on
 *  that element before the curtain lifts; without a matching element the page resets to the top. */
export async function enter({
  transition = true,
  scrollTop = true,
  hash = '',
}: { transition?: boolean; scrollTop?: boolean; hash?: string } = {}) {
  if (!booted) return;
  cleanup(); // no-op if the adapter already cleaned up
  const jumped = hash ? jumpTo(hash) : false;
  if (!jumped && scrollTop) resetScroll();
  initPage();
  if (!transition) {
    startScroll();
    intro?.play();
    return;
  }
  // The intro starts while the curtain is still leaving (about 40% through its 0.8 s), so the page never sits empty.
  const ENTER_INTRO_AT = 0.35;
  let introPlayed = false;
  const playIntro = () => {
    if (introPlayed) return;
    introPlayed = true;
    intro?.play();
  };
  const early = gsap.delayedCall(ENTER_INTRO_AT, playIntro);
  await playEnter();
  early.kill();
  playIntro();
  startScroll();
}
