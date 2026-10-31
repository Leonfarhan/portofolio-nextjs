// CaseMeta: the properties of the clip as rows on the editor's track grid. Each label is a track header (cols 1 to
// 2) and each value sits on the timeline (cols 3 to 12). TRACKS is the four lanes (Tracks, role img); then ROLE,
// YEAR, STACK and LINKS. The first link is a BoxLink (its render bar); the rest are utility links that draw an
// underline. External links open in a new tab, and say so to screen readers.
import { BoxLink } from '@/components/BoxLink';
import { Tracks } from '@/components/Tracks';
import { casePage, type Project } from '@/data/site';
import styles from './Case.module.css';

export function CaseMeta({ project }: { project: Project }) {
  return (
    <dl className={styles.meta}>
      <div className={`wrap ${styles.metaRow}`}>
        <dt className={`ui ${styles.rowLabel}`}>{casePage.tracks}</dt>
        <dd className={styles.rowValue}>
          <Tracks layers={project.layers} labels={project.tracks} />
        </dd>
      </div>

      <div className={`wrap ${styles.metaRow}`}>
        <dt className={`ui ${styles.rowLabel}`}>{casePage.role}</dt>
        <dd className={`prose ${styles.rowValue}`}>{project.role}</dd>
      </div>

      <div className={`wrap ${styles.metaRow}`}>
        <dt className={`ui ${styles.rowLabel}`}>{casePage.year}</dt>
        <dd className={`${styles.year} ${styles.rowValue}`}>{project.year}</dd>
      </div>

      <div className={`wrap ${styles.metaRow}`}>
        <dt className={`ui ${styles.rowLabel}`}>{casePage.stack}</dt>
        <dd className={`prose ${styles.rowValue}`}>{project.stack.join(', ')}</dd>
      </div>

      <div className={`wrap ${styles.metaRow}`}>
        <dt className={`ui ${styles.rowLabel}`}>{casePage.links}</dt>
        <dd className={`${styles.links} ${styles.rowValue}`}>
          {project.links.map((link, i) => {
            const external = /^https?:\/\//.test(link.href);
            const newTab = external ? <span className="sr-only"> {casePage.newTab}</span> : null;
            if (i === 0) {
              return (
                <BoxLink
                  key={link.href}
                  href={link.href}
                  external={external}
                  size="m"
                  arrow={external ? 'up-right' : 'right'}
                >
                  {link.label}
                  {newTab}
                </BoxLink>
              );
            }
            return (
              <a
                key={link.href}
                className="link-draw"
                href={link.href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.label}
                {newTab}
                {external ? (
                  <svg className={styles.ext} viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                    <path d="M4 12L12 4M6 4H12V10" />
                  </svg>
                ) : null}
              </a>
            );
          })}
        </dd>
      </div>
    </dl>
  );
}
