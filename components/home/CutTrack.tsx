'use client';
// CutTrack: one method's edit as a track bar (DESIGN.md, E Method). Sprints are thin equal blocks numbered 1 to 8;
// phases are four long blocks named for their phase. The blocks drop onto the track left to right when the bar
// scrolls in: a hard cut, 0.2 s each, 0.07 s apart. Printed (no JS, reduced motion) the track is simply full.
import { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { MethodCut } from '@/data/site';
import { ease, prefersReducedMotion } from '@/engine';
import { usePage } from '@/engine/next';
import styles from './CutTrack.module.css';

export function CutTrack({ cut }: { cut: MethodCut }) {
  const ref = useRef<HTMLOListElement>(null);

  usePage(() => {
    const list = ref.current;
    if (!list || prefersReducedMotion()) return;
    const blocks = list.querySelectorAll('[data-cut-block]');
    const drop = gsap.fromTo(
      blocks,
      { autoAlpha: 0, yPercent: -100 },
      { autoAlpha: 1, yPercent: 0, duration: 0.2, ease: ease.soft, stagger: 0.07, paused: true },
    );
    ScrollTrigger.create({
      trigger: list,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        drop.play();
      },
    });
  });

  const blocks =
    cut.kind === 'sprints'
      ? Array.from({ length: cut.count }, (_, i) => ({ key: `sprint-${i + 1}`, text: String(i + 1) }))
      : cut.phases.map((phase) => ({ key: phase, text: phase }));

  return (
    <div className={styles.cut}>
      {cut.kind === 'sprints' && <p className={`ui ${styles.lane}`}>{cut.label}</p>}
      <ol
        ref={ref}
        className={styles.track}
        aria-label={cut.kind === 'sprints' ? `${cut.label} 1 to ${cut.count}` : cut.phases.join(', ')}
      >
        {blocks.map((block) => (
          <li key={block.key} className={styles.seg} data-cut-block="">
            {block.text}
          </li>
        ))}
      </ol>
    </div>
  );
}
