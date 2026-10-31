// CaseSubtitles: the subtitle lane directly under the hero frame (the S1 track). The clip's one-line summary loops
// as a caption here (Caption mode="loop", size m, no plate), not on the screenshot, so the frame's own copy and CTA
// stay readable. The track header (S1, Subtitles) sits in cols 1 to 2; the block in cols 3 to 12 has a yellow
// in-point on its leading edge. Phones: the header stacks above and the block runs full width (Case.module.css).
import { Caption } from '@/components/Caption';
import { TrackHead } from '@/components/TrackHead';
import { casePage, type Project } from '@/data/site';
import styles from './Case.module.css';

export function CaseSubtitles({ project }: { project: Project }) {
  return (
    <div className={`wrap ${styles.lane}`}>
      <div className={styles.track}>
        <TrackHead track={casePage.subtitles} as="p" />
      </div>
      <div className={styles.subBlock}>
        <Caption text={project.line} mode="loop" size="m" />
      </div>
    </div>
  );
}
