// BoxLink fill: a render bar (DESIGN.md, micro-interactions). On pointer enter or keyboard focus the --caption
// fill wipes in from the left edge in one hard edge, and the ground label copy is clipped to the same edge. On
// leave the bar wipes out to the right. A re-enter during the wipe-out continues from where the bar is.
// Mouse and pen only: touch uses :active in CSS. Reduced motion and no-JS use the CSS states.
import { gsap } from 'gsap';
import { ease, onPage, prefersReducedMotion } from '@/engine';

const LEFT = 'inset(0% 100% 0% 0%)'; // the wipe starts here: the edge at the left
const OPEN = 'inset(0% 0% 0% 0%)';
const RIGHT = 'inset(0% 0% 0% 100%)'; // the wipe has gone out to the right

export function registerFill() {
  onPage(() => {
    if (prefersReducedMotion()) return;
    const boxes = [...document.querySelectorAll<HTMLElement>('[data-fill]')];
    const offs = boxes.map((box) => {
      const layers = [
        box.querySelector<HTMLElement>('[data-fill-layer]'),
        box.querySelector<HTMLElement>('[data-fill-invert]'),
      ].filter((el): el is HTMLElement => el !== null);
      if (layers.length === 0) return () => {};
      let closed = true; // fully retracted: the next wipe starts from the left edge

      const flood = () => {
        box.classList.add('is-filled');
        const to = { clipPath: OPEN, duration: 0.35, ease: ease.out, overwrite: true };
        if (closed) gsap.fromTo(layers, { clipPath: LEFT }, to);
        else gsap.to(layers, to);
        closed = false;
      };
      const drain = () => {
        box.classList.remove('is-filled');
        gsap.to(layers, {
          clipPath: RIGHT,
          duration: 0.3,
          ease: ease.inOut,
          overwrite: true,
          onComplete: () => {
            closed = true;
          },
        });
      };

      const onEnter = (e: PointerEvent) => {
        if (e.pointerType !== 'touch') flood();
      };
      const onLeave = (e: PointerEvent) => {
        if (e.pointerType !== 'touch') drain();
      };
      const onFocus = () => {
        if (box.matches(':focus-visible')) flood();
      };
      const onBlur = () => {
        if (!box.matches(':hover')) drain();
      };

      box.addEventListener('pointerenter', onEnter);
      box.addEventListener('pointerleave', onLeave);
      box.addEventListener('focus', onFocus);
      box.addEventListener('blur', onBlur);
      return () => {
        box.removeEventListener('pointerenter', onEnter);
        box.removeEventListener('pointerleave', onLeave);
        box.removeEventListener('focus', onFocus);
        box.removeEventListener('blur', onBlur);
      };
    });
    return () => offs.forEach((off) => off());
  });
}
