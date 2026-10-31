// Work: V1, five stacked clips (DESIGN.md, wireframe 3). Each clip is one link to its case page. Its 16:10 frame
// reframes to a 9:16 crop as it crosses the playhead (ClipFrame; motion/playhead.ts drives it), and the info beside
// it carries the clip label, the title, the line, the four tracks and the year. Odd clips put the frame left; even
// clips mirror it. Both track variants are rendered; CSS shows the full one on desktop and the compact one on phones.
import { ClipFrame } from '@/components/ClipFrame';
import { TrackHead } from '@/components/TrackHead';
import { Tracks } from '@/components/Tracks';
import { projects, workSection, type Project } from '@/data/site';
import styles from './Work.module.css';

const TOTAL = String(projects.length).padStart(2, '0');

/** "Clip 01 of 05" for one project, from the copy's pattern. */
function clipLabel(number: string) {
  return workSection.clipLabel.replace('{n}', number).replace('{total}', TOTAL);
}

function Clip({ project }: { project: Project }) {
  const label = clipLabel(project.number);
  return (
    <a
      className={styles.clip}
      href={`/work/${project.slug}`}
      data-curtain-title={project.title}
    >
      <div className={styles.media}>
        {/* Source clips (a code listing) are not reframed: a 9:16 window over monospace text slices words
            mid-token, which reads as a bug rather than a crop. They stay full-frame source panels; the three
            screen recordings still reframe at the playhead. */}
        <ClipFrame
          media={project.cover}
          focus={project.focus}
          reframe={project.cover.kind === 'code' ? 'none' : 'playhead'}
          caption={project.cover.kind === 'code' ? undefined : project.title}
          sizes="(min-width: 768px) 60vw, 100vw"
        />
      </div>
      <div className={styles.info}>
        <p className={`ui ${styles.clipLabel}`}>{label}</p>
        <h3 className={`display ${styles.title}`}>
          {project.title}
        </h3>
        <p className={styles.line}>
          {project.line}
        </p>
        <div className={styles.tracksDesk}>
          <Tracks layers={project.layers} labels={project.tracks} />
        </div>
        <div className={styles.tracksPhone}>
          <Tracks layers={project.layers} labels={project.tracks} compact />
        </div>
        <p className={`tc ${styles.year}`}>{project.year}</p>
        <span className={styles.cta}>
          {workSection.cta}
          <svg className={styles.ctaArrow} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
            <path d="M2 8H13M9 4L13 8L9 12" />
          </svg>
        </span>
      </div>
    </a>
  );
}

export function Work() {
  return (
    <section id="work" className={styles.work}>
      <div className="wrap">
        <div className={styles.head}>
          <TrackHead track={workSection.track} />
        </div>
        <p className={styles.prompt}>{workSection.prompt}</p>
      </div>
      <ol className={styles.clips}>
        {projects.map((project, i) => (
          <li key={project.slug} className={`wrap ${styles.item}${i % 2 === 1 ? ` ${styles.mirror}` : ''}`}>
            <Clip project={project} />
          </li>
        ))}
      </ol>
    </section>
  );
}
