// The playhead: the driver for the timecode, the ruler, the reframes, the captions, the checks and the watched line
// (DESIGN.md: the signature). Global, on every page:
//   [data-timecode]          scroll px as frames at 30 fps, HH:MM:SS:FF (the header and the playhead flag)
//   [data-ruler-labels]      MM:SS labels every 240 px (8 s), written from the document height, zeroed at the
//                              playhead's line so a label and the flag always read the same time
// Per page (onPage: reverted on navigation):
//   [data-reframe="playhead"]  --cut 0 to 1 while the frame's centre moves from 80% to 50% of the viewport
//                              (scrubbed, 0.6 s lag). The crop edge blinks once when the crop completes.
//   [data-reframe="intro"]     --cut 1 to 0 on the page intro, or once when the frame's top reaches 85% of the viewport.
//   [data-caption="playhead"]  .is-on steps word to word while the centre moves from 75% to 40%.
//   [data-caption="loop"]      .is-on steps word to word on its own clock, paused off screen. The home hero is skipped
//                              (motion/hero.ts drives it, with its crop).
//   [data-check]               .is-checked once the centre has crossed 50% going down. It stays checked.
//   [data-watched]             text from data-template; {tc} = time on site as HH:MM:SS:FF (frames read :00).
// Reduced motion: no scrub, no word stepping, no loops; CSS shows the end states. Timecodes keep counting.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isMobile, onPage, onScroll, prefersReducedMotion, scrollState } from '@/engine';
import { elapsedSeconds, formatClock, onSecond } from './timer';

export const FPS = 30;
const LABEL_EVERY = 240; // px: 8 s of footage between two long ticks
const WORD = 0.45; // seconds per caption word (loop captions)
const REST = 1.1; // seconds the last word rests (loop captions)

const pad = (n: number) => String(n).padStart(2, '0');

/** HH:MM:SS:FF for a count of frames (one frame per px of scroll). */
export function timecode(frames: number) {
  const total = Math.max(0, Math.floor(frames));
  const secs = Math.floor(total / FPS);
  return [Math.floor(secs / 3600), Math.floor((secs % 3600) / 60), secs % 60, total % FPS].map(pad).join(':');
}

let shown = -1;
function writeTimecode(y: number, force = false) {
  const frame = Math.max(0, Math.floor(y));
  if (!force && frame === shown) return;
  shown = frame;
  const text = timecode(frame);
  document.querySelectorAll<HTMLElement>('[data-timecode]').forEach((el) => {
    el.textContent = text;
  });
}

// The ruler is read at the playhead: the line sits at 50% of the viewport, so the label it crosses must read the same
// timecode as the flag. Labels are anchored to the document, the flag to the scroll position; the half-viewport offset
// is what makes the two agree (without it the flag read 15 s behind the ruler at 900 px tall).
function drawRuler() {
  const host = document.querySelector<HTMLElement>('[data-ruler-labels]');
  if (!host) return;
  host.replaceChildren();
  if (isMobile()) return;
  const height = document.documentElement.scrollHeight;
  const origin = innerHeight / 2;
  for (let y = 0; y < height; y += LABEL_EVERY) {
    const frames = y - origin;
    if (frames < 0) continue;
    const secs = Math.floor(frames / FPS);
    const label = document.createElement('span');
    label.style.top = `${y + 3}px`;
    label.textContent = `${pad(Math.floor(secs / 60))}:${pad(secs % 60)}`;
    host.appendChild(label);
  }
}

// Time on site as HH:MM:SS:FF. It updates once a second, so its frames read :00. The same under reduced motion.
function watched(): () => void {
  const lines = [...document.querySelectorAll<HTMLElement>('[data-watched]')];
  if (lines.length === 0) return () => {};
  const write = () => {
    const tc = `${formatClock(elapsedSeconds())}:00`;
    lines.forEach((el) => {
      el.textContent = (el.dataset.template || '{tc}').replace('{tc}', tc);
    });
  };
  write();
  return onSecond(write);
}

function setCut(el: HTMLElement, v: number) {
  el.style.setProperty('--cut', v.toFixed(4));
  if (v > 0.001 && v < 0.999) el.setAttribute('data-reframing', '');
  else el.removeAttribute('data-reframing');
}

// Blinks the crop edge and guides once. Removing and re-adding the attribute restarts the CSS animation.
function blink(el: HTMLElement) {
  el.removeAttribute('data-blink');
  void el.offsetWidth;
  el.setAttribute('data-blink', '');
  el.addEventListener('animationend', () => el.removeAttribute('data-blink'), { once: true });
}

function reframes(reduced: boolean, intro: gsap.core.Timeline) {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-reframe="playhead"]').forEach((el) => {
    const s = { p: 0 };
    gsap.to(s, {
      p: 1,
      ease: 'none',
      onUpdate: () => setCut(el, s.p),
      onComplete: () => blink(el),
      scrollTrigger: { trigger: el, start: 'center 80%', end: 'center 50%', scrub: 0.6 },
    });
  });
  document.querySelectorAll<HTMLElement>('[data-reframe="intro"]').forEach((el) => {
    const s = { p: 1 };
    const open = gsap.to(s, { p: 0, duration: 0.9, ease: ease.inOut, onUpdate: () => setCut(el, s.p) });
    if (el.getBoundingClientRect().top < innerHeight * 0.85) {
      intro.add(open, 0.1); // in view at load: it opens with the page intro
    } else {
      open.pause();
      ScrollTrigger.create({ trigger: el, start: 'top 85%', once: true, onEnter: () => open.play() });
    }
  });
}

function captions(reduced: boolean) {
  if (reduced) return;
  document.querySelectorAll<HTMLElement>('[data-caption="playhead"]').forEach((el) => {
    const words = [...el.querySelectorAll<HTMLElement>('[data-word]')];
    if (words.length < 2) return;
    let on = 0; // the server rendered the first word highlighted
    ScrollTrigger.create({
      trigger: el,
      start: 'center 75%',
      end: 'center 40%',
      onUpdate: (self) => {
        const next = Math.round(self.progress * (words.length - 1));
        if (next === on) return;
        words[on]?.classList.remove('is-on');
        words[next]?.classList.add('is-on');
        on = next;
      },
    });
  });
}

// Loop captions (ClipFrame captionMode="loop"): the same word step as the home hero, on their own clock. The home hero is
// skipped here, because motion/hero.ts drives it. Paused while off screen.
function loops(reduced: boolean): () => void {
  if (reduced) return () => {};
  const items = [...document.querySelectorAll<HTMLElement>('[data-caption="loop"]')]
    .filter((el) => !el.closest('[data-hero]'))
    .map((el) => ({ el, words: [...el.querySelectorAll<HTMLElement>('[data-word]')], t: 0, on: 0, inView: false }));
  if (items.length === 0) return () => {};
  const tick = (_time: number, delta: number) => {
    for (const it of items) {
      if (!it.inView || it.words.length < 2) continue;
      it.t += delta / 1000;
      const cycle = it.words.length * WORD + REST;
      const next = Math.min(it.words.length - 1, Math.floor((it.t % cycle) / WORD));
      if (next === it.on) continue;
      it.words[it.on]?.classList.remove('is-on');
      it.words[next]?.classList.add('is-on');
      it.on = next;
    }
  };
  const triggers = items.map((it) =>
    ScrollTrigger.create({
      trigger: it.el,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        it.inView = self.isActive;
      },
      onRefresh: (self) => {
        it.inView = self.isActive;
      },
    }),
  );
  gsap.ticker.add(tick);
  return () => {
    gsap.ticker.remove(tick);
    triggers.forEach((trigger) => trigger.kill());
  };
}

function checks(reduced: boolean) {
  document.querySelectorAll<HTMLElement>('[data-check]').forEach((el) => {
    if (reduced) {
      el.classList.add('is-checked');
      return;
    }
    ScrollTrigger.create({
      trigger: el,
      start: 'center 50%',
      onUpdate: (self) => {
        if (self.progress > 0) el.classList.add('is-checked');
      },
    });
  });
}

/** Registers the driver once, from setupMotion. Page scope is handled inside onPage. */
export function registerPlayhead() {
  onScroll(({ y }) => writeTimecode(y));
  ScrollTrigger.addEventListener('refresh', drawRuler);
  onPage(({ intro }) => {
    const reduced = prefersReducedMotion();
    writeTimecode(scrollState().y, true);
    drawRuler();
    checks(reduced);
    reframes(reduced, intro);
    captions(reduced);
    const stopLoops = loops(reduced);
    const stopWatched = watched();
    return () => {
      stopLoops();
      stopWatched();
    };
  });
}
