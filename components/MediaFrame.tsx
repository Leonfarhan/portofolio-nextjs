// MediaFrame: one frame in the editor's bin for a case-study Media (data/site.ts). Server-safe: no hooks.
//   image → next/image in a 3 px frame on --surface, 1 px --line rule. `ratio` ('w / h', default '16 / 10')
//           crops with object-fit: cover; 'auto' takes the image's own ratio. A tall image (height > width,
//           a phone screenshot) keeps its own ratio, centred, at most 80% of the viewport height, never cropped.
//   code  → a listing: the title as a UI label, --muted line numbers in a narrow gutter, --ink code in
//           --f-code on --surface. The sheet sits centred in its frame. The type fits the frame: the widest line
//           fills the width, and with a ratio the listing fills the height too. 'auto' sets no minimum height.
//           A wrapped line hangs under the first character of its code (the leading spaces become padding).
//   overlay → optional layer over the media area (the image box or the code sheet), used by ClipFrame for
//           the dim, the 9:16 window and the guides. It must be pointer-events: none, so a listing still scrolls.
//   caption → <figcaption>: the frame label (casePage.frameLabel, when `figure` is given) and media.caption.
// Props: media (required); figure (frame number); ratio ('w / h' or 'auto', default '16 / 10'); priority
// (hero only: eager load, fetchPriority high); sizes (next/image sizes); overlay (ReactNode); mediaClassName (a class on the media layer).
import Image from 'next/image';
import type { CSSProperties, ReactNode } from 'react';
import { casePage, type Media } from '@/data/site';
import styles from './MediaFrame.module.css';

export type MediaFrameProps = {
  media: Media;
  figure?: number;
  ratio?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: ReactNode;
  mediaClassName?: string;
};

/** "w / h" to [w, h]. Anything unreadable falls back to 16 / 10. */
function parseRatio(ratio: string): [number, number] {
  const [w, h] = ratio.split('/').map((part) => parseFloat(part));
  return w > 0 && h > 0 ? [w, h] : [16, 10];
}

function Caption({ figure, text }: { figure?: number; text?: string }) {
  if (!figure && !text) return null;
  return (
    <figcaption className={styles.caption}>
      {figure ? <span className={`ui ${styles.figLabel}`}>{casePage.frameLabel.replace('{n}', String(figure))}</span> : null}
      {text ? <span>{text}</span> : null}
    </figcaption>
  );
}

export function MediaFrame({ media, figure, ratio = '16 / 10', priority = false, sizes = '100vw', overlay, mediaClassName }: MediaFrameProps) {
  if (media.kind === 'image') {
    const tall = media.height > media.width;
    const [rw, rh] = tall || ratio === 'auto' ? [media.width, media.height] : parseRatio(ratio);
    return (
      <figure
        className={tall ? `${styles.frame} ${styles.tall}` : styles.frame}
        data-kind="image"
        style={{ '--rw': rw, '--rh': rh } as CSSProperties}
      >
        <div className={[styles.media, styles.image, mediaClassName].filter(Boolean).join(' ')}>
          <Image
            className={styles.img}
            src={media.src}
            width={media.width}
            height={media.height}
            alt={media.alt}
            sizes={sizes}
            priority={priority}
            fetchPriority={priority ? 'high' : undefined}
          />
          {overlay}
        </div>
        <Caption figure={figure} text={media.caption} />
      </figure>
    );
  }

  const lines = media.code.split('\n');
  const frame = ratio === 'auto' ? null : parseRatio(ratio);
  const widest = Math.max(...lines.map((line) => line.length));
  // Fit, in CSS: `widest` monospace cells (0.6em each) plus the gutter (about 3.4em) fill the width. With a
  // ratio, the rows (1.6em each) fill the height left under the padding and title (about 64 px).
  const style = {
    '--em': (widest * 0.6 + 3.4).toFixed(2),
    '--rows': lines.length,
    '--rw': frame?.[0] ?? 1,
    '--rh': frame?.[1] ?? 0,
  } as CSSProperties;
  return (
    <figure className={styles.frame} data-kind="code" aria-label={media.alt} style={style}>
      <div className={[styles.media, styles.code, mediaClassName].filter(Boolean).join(' ')}>
        <div className={styles.sheet}>
          <p className={`ui ${styles.title}`}>{media.title}</p>
          <pre
            className={frame ? styles.listing : `${styles.listing} ${styles.free}`}
            role="region"
            aria-label={media.title}
          >
            <code>
              {lines.map((line, i) => {
                const code = line.trimStart();
                const indent = line.length - code.length;
                return (
                  <span className={styles.row} key={i}>
                    <span className={styles.num} aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className={styles.text} style={{ '--indent': indent } as CSSProperties}>
                      {code}
                    </span>
                  </span>
                );
              })}
            </code>
          </pre>
        </div>
        {overlay}
      </div>
      <Caption figure={figure} text={media.caption} />
    </figure>
  );
}
