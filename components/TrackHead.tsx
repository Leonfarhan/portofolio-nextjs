// TrackHead: the track header of a section (DESIGN.md, the editor's track column). The id sits in a
// 3 px chip (V1, A1); the name follows it in UI type. The heading's text is the name only, so the
// heading reads "Work", not "V1 Work": the chip is aria-hidden.
//   as       'h2' (default) or 'p' for the name.
//   sticky   the root sticks under the header (long sections, the track column).
//   rec      a --rec dot before the chip, blinking slowly (off under reduced motion). Never in the heading.
//   extra    anything after the name, inside the root.
// Server-safe: no hooks.
import type { ReactNode } from 'react';
import type { Track } from '@/data/site';
import styles from './TrackHead.module.css';

export type TrackHeadProps = {
  track: Track;
  as?: 'h2' | 'p';
  sticky?: boolean;
  rec?: boolean;
  extra?: ReactNode;
  className?: string;
};

export function TrackHead({ track, as: Tag = 'h2', sticky = false, rec = false, extra, className }: TrackHeadProps) {
  const root = [styles.head, sticky ? styles.sticky : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={root}>
      {rec && <span className={styles.rec} aria-hidden="true" />}
      <span className={styles.id} aria-hidden="true">
        {track.id}
      </span>
      <Tag className={styles.name}>{track.name}</Tag>
      {extra}
    </div>
  );
}
