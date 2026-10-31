// Method: E, "Two projects, cut two ways" (DESIGN.md, wireframe 6). Agile (many short cuts) sits on cols 3 to 7 and
// Waterfall (one long take) on cols 8 to 12, dropped 20vh. Each entry carries its cut track (the same full width),
// the screenshot (next/image in a frame that clips in, with an inner drift), the project line and the paragraph.
import Image from 'next/image';
import { TrackHead } from '@/components/TrackHead';
import { methodSection, methods } from '@/data/site';
import { CutTrack } from './CutTrack';
import styles from './Method.module.css';

export function Method() {
  return (
    <section id="method" className={styles.method}>
      <div className="wrap">
        <div className={styles.head}>
          <TrackHead track={methodSection.track} />
        </div>
        <h3 className={`display ${styles.statement}`} data-split="lines">
          {methodSection.heading}
        </h3>
        {methods.map((method, i) => (
          <article key={method.name} className={`${styles.entry} ${i === 0 ? styles.first : styles.second}`}>
            <CutTrack cut={method.cut} />
            <figure
              className={styles.frame}
              data-reveal="clip"
              style={{ aspectRatio: `${method.image.width} / ${method.image.height}` }}
            >
              <div className={styles.inner} data-parallax="0.08">
                <Image
                  src={method.image.src}
                  alt={method.image.alt}
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className={styles.image}
                />
              </div>
            </figure>
            <h4 className={styles.title}>{method.title}</h4>
            <p className={`prose ${styles.body}`}>{method.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
