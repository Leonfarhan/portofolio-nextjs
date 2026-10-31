// CaseText: CONTEXT and IDEA of one clip, side by side on the timeline (cols 3 to 12), each with its UI label
// above the prose. Stacks under 1024 px.
import { casePage, type Project } from '@/data/site';
import styles from './Case.module.css';

export function CaseText({ project }: { project: Project }) {
  return (
    <div className={`wrap ${styles.band}`}>
      <div className={styles.pair}>
        <section aria-labelledby="context-title">
          <h2 id="context-title" className={`ui ${styles.pairLabel}`}>
            {casePage.context}
          </h2>
          <p className="prose">{project.context}</p>
        </section>
        <section aria-labelledby="idea-title">
          <h2 id="idea-title" className={`ui ${styles.pairLabel}`}>
            {casePage.idea}
          </h2>
          <p className="prose">{project.idea}</p>
        </section>
      </div>
    </div>
  );
}
