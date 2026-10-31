// Hero: the scene (DESIGN.md, wireframe 1; the concept card). Cols 1-2: the track header and the stack line. Cols 3-12: the
// 16:9 source frame. Layers, bottom to top: the frame, the dim outside the crop, the dim name (aria-hidden, muted), the
// crop window with the full-ink h1 clipped to it, the crop edge and safe guides (SVG strokes), and the four overlays on
// --surface plates. The caption sits in the window's lower third and steps word by word. Below the frame: the intro and
// the scroll cue. motion/hero.ts drives the intro, the idle playback and the crop.
import { Caption } from '@/components/Caption';
import { TrackHead } from '@/components/TrackHead';
import { hero } from '@/data/site';
import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} data-hero="">
      <div className={`wrap ${styles.wrap}`}>
        <div className={styles.side}>
          <TrackHead track={hero.track} as="p" />
          <p className={`ui ${styles.stack}`}>{hero.stack}</p>
        </div>
        <div className={styles.main}>
          <div className={styles.stage} data-hero-stage="">
            <div className={styles.source} data-hero-source="">
              <span className={styles.dimL} aria-hidden="true" />
              <span className={styles.dimR} aria-hidden="true" />
              <span className={`${styles.name} ${styles.dim}`} aria-hidden="true">
                <span className={styles.inner} data-hero-dim="">
                  {hero.name}
                </span>
              </span>
              <div className={styles.window} data-hero-window="">
                <h1 className={styles.name} data-hero-name="">
                  <span className={styles.inner} data-hero-inner="">
                    {hero.name}
                  </span>
                </h1>
              </div>
              <svg
                className={styles.frame}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
              >
                <g className={styles.crop} data-hero-crop="">
                  <rect className={styles.edge} x="0" y="0" width="100" height="100" />
                  <rect className={styles.guide} x="6" y="10" width="88" height="80" data-hero-guides="" />
                </g>
              </svg>
              <span className={`ui ${styles.plate} ${styles.topLeft}`}>{hero.overlays.topLeft}</span>
              <span className={`ui ${styles.plate} ${styles.topRight}`}>{hero.overlays.topRight}</span>
              <span className={`tc ${styles.plate} ${styles.timecode}`} data-hero-tc="">
                00:00:00:00
              </span>
              <span className={`ui ${styles.plate} ${styles.bottomRight}`}>{hero.overlays.bottomRight}</span>
            </div>
            <Caption as="p" mode="loop" onImage text={hero.caption} className={styles.caption} />
          </div>
          <div className={styles.foot}>
            {/* No hidden reveal on the hero line: it is the largest text on the first screen, so it must paint with
                the document, not after the intro. The name and the crop carry the entrance. */}
            <p className={styles.intro}>
              {hero.intro}
            </p>
            <a className={`inout ${styles.cue}`} href="#now">
              {hero.scrollCue}
              <svg className={styles.arrow} viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" focusable="false">
                <path d="M5 0v8.5M1.5 6 5 9.5 8.5 6" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
