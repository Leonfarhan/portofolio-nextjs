// CaseChecks: the CHECKS band of one clip, the craft list on the timeline. Each line is a data-check: globals.css
// draws its box and its yellow tick, and the playhead (motion/playhead.ts) sets .is-checked as the line crosses.
// Without motion or JS the lines print checked (Case.module.css).
import { casePage, type Project } from '@/data/site';
import styles from './Case.module.css';

export function CaseChecks({ project }: { project: Project }) {
  return (
    <section className={`wrap ${styles.band}`} aria-labelledby="checks-title">
      <h2 id="checks-title" className={`ui ${styles.track}`}>
        {casePage.checks}
      </h2>
      <ul className={styles.checks}>
        {project.craft.map((item) => (
          <li key={item.text} className={styles.check} data-check="">
            {item.text}
          </li>
        ))}
      </ul>
    </section>
  );
}
