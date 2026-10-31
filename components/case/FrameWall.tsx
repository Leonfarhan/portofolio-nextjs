// FrameWall: the FRAMES gallery of one clip, on the timeline (10 columns: cols 3 to 12 of the page grid).
// Frames take 'auto': a code sheet is as tall as its listing and an image keeps its own ratio, so nothing
// is cropped and the wall reads as varied sizes. A wide frame runs 5 columns; a tall phone screenshot runs
// 4. Odd frames sit on the right and drop 20vh, so a pair staggers. Phones: one column, no drop.
// Frames are numbered from 1 within the clip.
import type { CSSProperties } from 'react';
import { MediaFrame } from '@/components/MediaFrame';
import type { Media } from '@/data/site';
import styles from './Case.module.css';

export function FrameWall({ frames }: { frames: Media[] }) {
  if (frames.length === 0) return null;
  const solo = frames.length === 1;
  return (
    <div className={styles.wall}>
      {frames.map((media, i) => {
        const tall = media.kind === 'image' && media.height > media.width;
        const left = i % 2 === 0;
        const col = solo
          ? tall
            ? '1 / span 4'
            : '1 / -1'
          : left
            ? tall
              ? '1 / span 4'
              : '1 / span 5'
            : tall
              ? '7 / span 4'
              : '6 / span 5';
        const className = left ? styles.wallItem : `${styles.wallItem} ${styles.drop}`;
        return (
          <div key={i} className={className} style={{ '--col': col } as CSSProperties}>
            <MediaFrame
              media={media}
              figure={i + 1}
              ratio="auto"
              sizes={tall ? '(min-width: 1180px) 30vw, 70vw' : '(min-width: 1180px) 50vw, 100vw'}
            />
          </div>
        );
      })}
    </div>
  );
}
