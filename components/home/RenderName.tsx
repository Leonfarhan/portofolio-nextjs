'use client';
// RenderName: the footer name, rendered on scroll-in (DESIGN.md, F Export). A --caption render bar covers the
// name; its hard leading edge wipes left to right and the name appears behind it. The bar is printed only under
// motion (.motion on <html>): reduced motion and no-JS show the name with no bar.
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ease, prefersReducedMotion } from '@/engine';
import { usePage } from '@/engine/next';
import styles from './RenderName.module.css';

export function RenderName({ name }: { name: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  usePage(() => {
    const el = ref.current;
    const bar = el?.querySelector<HTMLElement>('[data-render-bar]');
    if (!el || !bar || prefersReducedMotion()) return;
    // The bar's visible part is [x%, 100%]: x runs 0 to 100, so its left edge (the hard leading edge) sweeps right.
    const wipe = gsap.fromTo(
      bar,
      { clipPath: 'inset(0% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 100%)', duration: 0.9, ease: ease.soft, paused: true },
    );
    ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => {
        wipe.play();
      },
    });
  });

  return (
    <p ref={ref} className={`display ${styles.name}`}>
      {name}
      <span className={styles.bar} data-render-bar="" aria-hidden="true" />
    </p>
  );
}
