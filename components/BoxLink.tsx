// BoxLink: the primary call to action (DESIGN.md, micro-interactions). A box with a --line rule. On hover or
// focus a --caption render bar wipes in from the left in one hard edge (motion/fill.ts); the label turns
// --ground behind the same edge, and the arrow travels 6 px. Touch uses :active; no-JS and reduced motion use
// the CSS states. The label is drawn twice (ink, then a ground copy clipped to the fill), so both change at the
// same edge. The base row carries data-label for the curtain fallback title.
import type { ReactNode } from 'react';
import styles from './BoxLink.module.css';

export type BoxLinkProps = {
  href: string;
  children: ReactNode;
  arrow?: 'right' | 'up-right' | 'down';
  external?: boolean;
  size?: 'm' | 'l';
  /** The only action on the page (the footer mail box): a stronger rule, so it reads as primary at rest. */
  strong?: boolean;
  /** Label shown on the curtain when this link starts a page transition. */
  title?: string;
};

const arrowClass = { right: styles.right, 'up-right': styles.upRight, down: styles.down };

export function BoxLink({ href, children, arrow = 'right', external = false, size = 'm', strong = false, title }: BoxLinkProps) {
  const row = (
    <>
      <span className={styles.label}>{children}</span>
      <svg className={`${styles.arrow} ${arrowClass[arrow]}`} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M2 8H13M9 4L13 8L9 12" />
      </svg>
    </>
  );
  return (
    <a
      className={`${styles.box} ${size === 'l' ? styles.l : styles.m}${strong ? ` ${styles.strong}` : ''}`}
      href={href}
      data-fill=""
      data-curtain-title={title}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span className={styles.fill} data-fill-layer="" aria-hidden="true" />
      <span className={styles.content}>
        <span className={styles.row} data-label="">
          {row}
        </span>
        <span className={`${styles.row} ${styles.inv}`} data-fill-invert="" aria-hidden="true">
          {row}
        </span>
      </span>
    </a>
  );
}
