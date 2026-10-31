// Caption: burned-in caption type (DESIGN.md: Caption, TikTok Sans, wght 840, wdth 108, uppercase). Each word is a <span data-word>;
// the spaces stay as text so the line reads and wraps normally. The first word carries .is-on in the markup, so the
// no-JS, reduced-motion and static states all show it highlighted. A driver (motion/playhead.ts, motion/hero.ts) moves
// .is-on word to word. Each word carries its index as --i for the card replay (ClipFrame.module.css).
//   mode     'playhead' (scrubbed by scroll), 'loop' (its own clock, paused off screen), 'static' (no motion).
//   size     'm' | 'l' | 'xl'; omit it to inherit the font size of the parent.
//   onImage  a 0.12em dark stroke so the words read on any frame (not used with plate).
//   plate    each line sits on a --ground 78% box, the text background style. For captions over imagery.
// Server-safe: no hooks.
import type { CSSProperties } from 'react';
import styles from './Caption.module.css';

export type CaptionProps = {
  text: string;
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3';
  mode?: 'playhead' | 'loop' | 'static';
  size?: 'm' | 'l' | 'xl';
  onImage?: boolean;
  plate?: boolean;
  className?: string;
};

export function Caption({
  text,
  as: Tag = 'p',
  mode = 'static',
  size,
  onImage = false,
  plate = false,
  className,
}: CaptionProps) {
  const root = [
    styles.caption,
    size ? styles[size] : '',
    onImage && !plate ? styles.onImage : '',
    plate ? styles.plate : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ');
  let index = -1;
  return (
    <Tag className={root} data-caption={mode}>
      {text.split(/(\s+)/).map((part, i) => {
        if (!/\S/.test(part)) return part;
        index += 1;
        return (
          <span
            key={i}
            data-word
            className={index === 0 ? 'is-on' : undefined}
            style={{ '--i': index } as CSSProperties}
          >
            {part}
          </span>
        );
      })}
    </Tag>
  );
}
