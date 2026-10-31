// Page transition: "drop the next clip" (DESIGN.md, continuity). A --surface panel slides in from the right, the way a
// clip drops on the track. It carries the destination title as a caption line (its first word in --caption) and an
// in-point bracket on its leading edge. It slides out to the left to reveal the new page, whose intro then plays.
// Reduced motion uses the engine's fade.
import { gsap } from 'gsap';
import { ease, type Transition } from '@/engine';

let clicked: HTMLAnchorElement | null = null;

/** Remembers the link that starts a navigation, so the curtain can name its destination. */
export function trackClicks() {
  addEventListener(
    'click',
    (e) => {
      clicked = (e.target as Element).closest('a');
    },
    true,
  );
}

// The title: the link's data-curtain-title, else its label (BoxLink's base row), else its text. Capped at 40 characters.
function destinationTitle() {
  const label = clicked?.querySelector('[data-label]')?.textContent;
  const raw = clicked?.dataset.curtainTitle || label || clicked?.textContent || '';
  return raw.replace(/\s+/g, ' ').trim().slice(0, 40).trim();
}

function setTitle(curtain: HTMLElement) {
  const [first = '', ...rest] = destinationTitle().split(' ');
  const head = curtain.querySelector<HTMLElement>('[data-curtain-first]');
  const tail = curtain.querySelector<HTMLElement>('[data-curtain-rest]');
  if (head) head.textContent = first;
  if (tail) tail.textContent = rest.length > 0 ? ` ${rest.join(' ')}` : '';
}

export const curtainTransition: Transition = {
  leave: (curtain) => {
    const panel = curtain.querySelector<HTMLElement>('.curtain__panel');
    return gsap
      .timeline()
      .set(curtain, { autoAlpha: 1 })
      .call(() => setTitle(curtain))
      .fromTo(panel, { xPercent: 100 }, { xPercent: 0, duration: 0.8, ease: ease.inOut });
  },
  enter: (curtain) => {
    const panel = curtain.querySelector<HTMLElement>('.curtain__panel');
    return gsap
      .timeline()
      .to(panel, { xPercent: -100, duration: 0.8, ease: ease.inOut })
      .set(curtain, { autoAlpha: 0 });
  },
};
