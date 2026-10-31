// Stack: D, the media bin (DESIGN.md, wireframe 5). Four bin folders on cols 3 to 12, each with its lane name on a
// folder tab. Items list like clip names, numbered continuously across the bins.
import { TrackHead } from '@/components/TrackHead';
import { layerLabels, stack, stackSection } from '@/data/site';
import styles from './Stack.module.css';

export function Stack() {
  // The first number of each bin: the numbers run on across the bins, like clips on one track.
  const firsts: number[] = [];
  stack.reduce((next, block) => {
    firsts.push(next);
    return next + block.items.length;
  }, 1);

  return (
    <section id="stack" className={styles.stack}>
      <div className="wrap">
        <div className={styles.head}>
          <TrackHead track={stackSection.track} />
        </div>
        <div className={styles.bins}>
          {stack.map((block, b) => (
            <div key={block.layer} className={styles.bin}>
              <h3 className={`ui ${styles.tab}`}>{layerLabels[block.layer]}</h3>
              <ol className={styles.items}>
                {block.items.map((item, i) => (
                  <li key={item} className={styles.item}>
                    <span className={`tc ${styles.count}`}>{String(firsts[b] + i).padStart(2, '0')}</span>
                    <span className={styles.name}>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
