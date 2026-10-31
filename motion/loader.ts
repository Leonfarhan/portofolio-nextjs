// Loader exit (DESIGN.md, continuity). 0.48 s in total, so a late boot waits for no animation. The counter becomes the
// timecode 00:00:00:00; a yellow razor drops through the screen at the content centre (the playhead's x); the loader
// splits into two halves that slide apart (expo.inOut); the page intro starts as they part. The header timecode appears
// once the loader is gone (html.is-loaded), so the two never overlap.
import { gsap } from 'gsap';
import { ease } from '@/engine';

export function loaderExit(root: HTMLElement, handoff: () => void) {
  const tl = gsap.timeline();
  const left = root.querySelector<HTMLElement>('[data-loader-half="left"]');
  const right = root.querySelector<HTMLElement>('[data-loader-half="right"]');
  const razor = root.querySelector<HTMLElement>('[data-loader-razor]');
  const head = root.querySelector<HTMLElement>('[data-loader-head]');
  const count = root.querySelector<HTMLElement>('[data-loader-count]');
  const ui = root.querySelectorAll<HTMLElement>('[data-loader-ui]');
  if (!left || !right || !razor || !head) return tl;
  tl.call(
    () => {
      if (count) count.textContent = '00:00:00:00';
    },
    [],
    0,
  )
    .fromTo(
      razor,
      { clipPath: 'inset(0% 0% 100% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.12, ease: 'power2.in' },
      0,
    )
    .to(ui, { autoAlpha: 0, duration: 0.1, ease: ease.soft }, 0.12)
    .to(left, { xPercent: -100, duration: 0.36, ease: ease.inOut }, 0.12)
    .to(right, { xPercent: 100, duration: 0.36, ease: ease.inOut }, 0.12)
    .call(handoff, [], 0.2)
    .to([razor, head], { autoAlpha: 0, duration: 0.08, ease: ease.soft }, 0.4);
  return tl;
}
