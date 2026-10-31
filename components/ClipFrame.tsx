// ClipFrame: a 16:10 MediaFrame with the reframe overlay (DESIGN.md, the signature: the reframe). The overlay moves by
// transform and clip-path only: the crop edge and guides are SVG strokes, the caption and brackets translate, the dims
// clip. A reframe therefore causes no layout shift.
//   focus        0 to 1: x of the 9:16 crop centre on the frame. The window is clamped inside the frame.
//   caption      burned-in caption with a --ground plate on every line, in the window's lower part. Its size fits the longest word.
//   captionMode  'playhead' (default): scrubbed by scroll. 'loop': its own word loop, paused off screen. 'static': no motion.
//   label        UI chip in the frame's top-left corner (optional). The caption never reaches the top of the frame.
//   reframe      'playhead' (default), 'intro', 'static', or 'none' (MediaFrame only). See ClipFrame.module.css.
// Server-safe: no hooks.
import type { CSSProperties } from 'react';
import { Caption } from '@/components/Caption';
import { MediaFrame } from '@/components/MediaFrame';
import type { Media } from '@/data/site';
import styles from './ClipFrame.module.css';

export type ClipFrameProps = {
  media: Media;
  focus: number;
  ratio?: '16 / 10';
  sizes?: string;
  priority?: boolean;
  caption?: string;
  captionMode?: 'playhead' | 'loop' | 'static';
  label?: string;
  reframe?: 'playhead' | 'intro' | 'static' | 'none';
};

/** The length of a caption's longest word. The caption's size is capped so that this word always fits the window. */
function longestWord(text: string): number {
  return Math.max(...text.split(/\s+/).map((word) => word.length));
}

export function ClipFrame({
  media,
  focus,
  ratio = '16 / 10',
  sizes,
  priority = false,
  caption,
  captionMode = 'playhead',
  label,
  reframe = 'playhead',
}: ClipFrameProps) {
  const x = Math.min(1, Math.max(0, focus));
  const overlay =
    reframe === 'none' ? undefined : (
      <>
        <div className={styles.overlay} aria-hidden="true">
          <span className={`${styles.dim} ${styles.dimL}`} />
          <span className={`${styles.dim} ${styles.dimR}`} />
          <svg className={styles.frame} viewBox="0 0 100 100" preserveAspectRatio="none" focusable="false">
            <g className={styles.crop}>
              <rect className={styles.edge} x="0" y="0" width="100" height="100" />
              <rect className={styles.guide} x="6" y="10" width="88" height="80" />
            </g>
          </svg>
          {caption ? (
            <div className={styles.caption} style={{ '--lw': longestWord(caption) } as CSSProperties}>
              <Caption as="span" mode={captionMode} onImage plate text={caption} />
            </div>
          ) : null}
          <span className={`${styles.brackets} ${styles.inPoint}`}>
            <span className={`${styles.corner} ${styles.tl}`} />
            <span className={`${styles.corner} ${styles.bl}`} />
          </span>
          <span className={`${styles.brackets} ${styles.outPoint}`}>
            <span className={`${styles.corner} ${styles.tr}`} />
            <span className={`${styles.corner} ${styles.br}`} />
          </span>
        </div>
        {label ? <span className={`ui ${styles.label}`}>{label}</span> : null}
      </>
    );
  return (
    <div className={styles.clip} data-reframe={reframe} style={{ '--focus': String(x) } as CSSProperties}>
      <MediaFrame
        media={media}
        ratio={ratio}
        sizes={sizes}
        priority={priority}
        overlay={overlay}
        mediaClassName={styles.zoom}
      />
    </div>
  );
}
