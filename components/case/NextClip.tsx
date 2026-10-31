// NextClip: the link to the next clip (05 wraps to 01). It is a BoxLink, so the CTA's one treatment (the yellow
// render bar, the label to --ground, the arrow travel) is the same as everywhere else. The number sits in a
// chip, the title in display type; the title slides on hover (Case.module.css). data-curtain-title names the
// destination for the sheet transition.
import { BoxLink } from '@/components/BoxLink';
import type { Project } from '@/data/site';
import styles from './Case.module.css';

export function NextClip({ project }: { project: Project }) {
  return (
    <div className={styles.next}>
      <BoxLink href={`/work/${project.slug}`} size="l" title={project.title}>
        <span className={styles.nextRow}>
          <span className={styles.chip}>{project.number}</span>
          <span className={`display ${styles.nextTitle}`}>{project.title}</span>
        </span>
      </BoxLink>
    </div>
  );
}
