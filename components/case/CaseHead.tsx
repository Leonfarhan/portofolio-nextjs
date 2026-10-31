// CaseHead: the top of the clip, the editor's header. The track column (cols 1 to 2) holds the track chip (V1 Work),
// the clip number and the way back. The timeline (cols 3 to 12) holds the title, the page's only h1, and the
// summary. The title lines rise in on the page intro (data-split, data-intro): server-rendered text, so it is safe.
import { TrackHead } from '@/components/TrackHead';
import { casePage, projects, workSection, type Project } from '@/data/site';
import styles from './Case.module.css';

export function CaseHead({ project }: { project: Project }) {
  const clipLabel = casePage.clipLabel
    .replace('{n}', project.number)
    .replace('{total}', String(projects.length).padStart(2, '0'));
  return (
    <header className={`wrap ${styles.top}`}>
      <div className={styles.track}>
        <TrackHead track={workSection.track} as="p" />
        <p className={`ui ${styles.clipLabel}`}>{clipLabel}</p>
        <a className={`ui inout ${styles.back}`} href="/#work" data-curtain-title={workSection.track.name}>
          {casePage.back}
        </a>
      </div>
      <div className={styles.main}>
        <h1 id="case-title" className={`display ${styles.title}`} data-split="lines" data-intro="" data-duration="0.8">
          {project.title}
        </h1>
        <p className={styles.summary}>{project.summary}</p>
      </div>
    </header>
  );
}
