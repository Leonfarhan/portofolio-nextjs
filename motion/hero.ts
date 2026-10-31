// Hero motion (components/home/Hero.tsx; DESIGN.md: continuity and the idle state).
// Intro, on the page intro after the loader: the name rises out of its mask; the crop cuts in from the full frame to 9:16
// (0.9 s expo.inOut); the guides blink; the caption pops word by word.
// Idle, after the intro: one gsap.ticker callback, paused off screen. The hero timecode counts at 30 fps; the caption steps
// one word every 0.45 s and rests on the last word; the crop pans across the name (25% to 75% of the frame, a 14 s sine),
// like auto-reframe. Phones: the same drift, across the name fitted to the strip (the window moves, the name stays).
// The crop is --cw and --cx on the stage (desktop only). CSS turns them into transforms and clip-paths, so nothing here
// changes layout (CLS). Reduced motion: no intro and no idle; the poster is the CSS state.
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, isMobile, onPage, prefersReducedMotion } from '@/engine';
import { FPS, timecode } from './playhead';

const WORD = 0.45; // seconds per caption word
const REST = 1.1; // seconds the last word rests at the end of the sentence
const SWEEP = 14; // seconds for one full pan of the crop
const CROP = 81 / 256; // a 9:16 window in a 16:9 frame, as a fraction of the frame width
const CROP_PHONE = 63 / 256; // a 9:16 window as tall as the phone's 16:7 strip
const IDLE_AT = 1.9; // seconds into the intro when the idle playback may start

export function registerHero() {
  onPage(({ intro }) => {
    if (prefersReducedMotion()) return;
    const stage = document.querySelector<HTMLElement>('[data-hero-stage]');
    const inner = document.querySelector<HTMLElement>('[data-hero-inner]');
    const dim = document.querySelector<HTMLElement>('[data-hero-dim]');
    const guides = document.querySelector<HTMLElement>('[data-hero-guides]');
    const tc = document.querySelector<HTMLElement>('[data-hero-tc]');
    const caption = document.querySelector<HTMLElement>('[data-caption="loop"]');
    if (!stage || !inner || !dim || !guides) return;
    const words = caption ? [...caption.querySelectorAll<HTMLElement>('[data-word]')] : [];

    // Phone or desktop is read on every ScrollTrigger refresh (a resize included). The window's width is fixed by CSS on
    // phones (CROP_PHONE); the drift across the name is the same on both.
    let phone = isMobile();
    const crop = { cw: phone ? CROP : 1, cx: 0.5 };
    const paint = () => {
      stage.style.setProperty('--cw', (phone ? CROP_PHONE : crop.cw).toFixed(4));
      stage.style.setProperty('--cx', crop.cx.toFixed(4));
    };
    const measure = () => {
      phone = isMobile();
      paint();
    };
    measure();
    ScrollTrigger.addEventListener('refresh', measure);

    // Intro: the name rises from its mask (both copies), the crop cuts in (desktop), the guides blink, the caption pops.
    intro.fromTo([inner, dim], { yPercent: 110 }, { yPercent: 0, duration: 1.1, ease: ease.out }, 0);
    if (!phone) intro.fromTo(crop, { cw: 1 }, { cw: CROP, duration: 0.9, ease: ease.inOut, onUpdate: paint }, 0.35);
    intro.fromTo(guides, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.12, ease: 'none', repeat: 3, yoyo: true }, 0.95);
    if (words.length > 0) {
      intro.fromTo(
        words,
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 0.08, stagger: 0.08, ease: 'power3.out' },
        1.2,
      );
    }

    // Idle playback starts once the intro has played and the hero is on screen.
    let introDone = false;
    let inView = true;
    let playing = false;
    const sync = () => {
      playing = introDone && inView;
    };
    intro.call(
      () => {
        introDone = true;
        sync();
      },
      [],
      IDLE_AT,
    );

    let t = 0; // seconds of idle playback
    let frame = -1;
    let word = 0;
    const count = Math.max(words.length, 1);
    const cycle = count * WORD + REST;
    const tick = (_time: number, delta: number) => {
      if (!playing) return;
      t += delta / 1000;
      const f = Math.floor(t * FPS);
      if (tc && f !== frame) {
        frame = f;
        tc.textContent = timecode(f);
      }
      const next = Math.min(count - 1, Math.floor((t % cycle) / WORD));
      if (next !== word && words.length > 0) {
        words[word]?.classList.remove('is-on');
        words[next]?.classList.add('is-on');
        word = next;
      }
      const phase = (t / SWEEP) * Math.PI * 2;
      crop.cx = 0.5 + 0.25 * Math.sin(phase);
      paint();
    };

    const watch = ScrollTrigger.create({
      trigger: stage,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        inView = self.isActive;
        sync();
      },
    });
    gsap.ticker.add(tick);
    return () => {
      gsap.ticker.remove(tick);
      watch.kill();
      ScrollTrigger.removeEventListener('refresh', measure);
    };
  });
}
