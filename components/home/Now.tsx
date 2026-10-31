// Now: the statement (DESIGN.md, wireframe 2). The REC track head sits on cols 1 to 2 and the statement on cols
// 3 to 12 at --t-l, with the company link under it. The hero's scroll cue targets this section.
import { TrackHead } from '@/components/TrackHead';
import { casePage, now } from '@/data/site';
import styles from './Now.module.css';

export function Now() {
  return (
    <section id="now" className={styles.now}>
      <div className="wrap">
        <div className={styles.head}>
          <TrackHead track={now.track} rec />
        </div>
        <div className={styles.body}>
          <p className={styles.statement} data-split="lines">
            {now.text}
          </p>
          <p className={styles.link}>
            <a className="link-inline" href={now.link.href} target="_blank" rel="noopener noreferrer">
              {now.link.label}
              <span aria-hidden="true"> ↗</span>
              <span className="sr-only"> {casePage.newTab}</span>
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
