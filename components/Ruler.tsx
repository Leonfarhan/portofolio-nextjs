// The ruler and the playhead (DESIGN.md: the ruler, the playhead). The ruler runs down the left edge of the sheet
// (--ruler: 64 px desktop, 18 px phones): a tick every 24 px, a long tick with a MM:SS label every 240 px (desktop).
// motion/playhead.ts writes the labels from the document height. The playhead is fixed: a 1 px line across the
// viewport at 50% height (under the page content, at 14% ink), a solid --caption segment in the ruler zone, and a
// --caption flag on the ruler with the live timecode (every [data-timecode]). All are decorative (aria-hidden).
// Server-safe: no hooks.
import styles from './Ruler.module.css';

export function Ruler() {
  return (
    <div className={styles.ruler} aria-hidden="true">
      <span className="ruler-ticks" />
      <div className={styles.labels} data-ruler-labels="" />
    </div>
  );
}

export function Playhead() {
  return (
    <div className={styles.playhead} aria-hidden="true">
      <span className={styles.line} />
      <span className={styles.segment} />
      <span className={styles.flag} data-tc="">
        <span className={`tc ${styles.tc}`} data-timecode="">
          00:00:00:00
        </span>
      </span>
    </div>
  );
}
