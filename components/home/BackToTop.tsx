'use client';
// BackToTop: the footer's return link. With JavaScript it scrolls to the top through the engine
// (scrollToTarget(0)); without it the href lands on the top of the page (#main). data-no-transition keeps the
// engine's router from treating the click as a page change.
import type { MouseEvent } from 'react';
import { scrollToTarget } from '@/engine';

export function BackToTop({ label }: { label: string }) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget(0);
  };
  return (
    <a className="link-draw" href="#main" data-no-transition onClick={onClick}>
      {label}
    </a>
  );
}
