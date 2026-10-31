// NotFound: "Media offline" (DESIGN.md, 404). The editor's offline frame: a 16:9 field in --offline with the caption
// and the requested address centred in it (the address is a client island, so the server renders none of it).
// Then the heading, the body and the way back, and the five clips as a list on the track grid. Each row takes the
// clip's motion verb on hover and on keyboard focus: the in and out brackets snap onto the title, and the title slides.
import { BoxLink } from '@/components/BoxLink';
import { TrackHead } from '@/components/TrackHead';
import { RequestedPath } from '@/components/notfound/RequestedPath';
import { notFound, projects, workSection } from '@/data/site';
import styles from './NotFound.module.css';

export function NotFound() {
  return (
    <div className={styles.page}>
      <div className="wrap">
        <div className={styles.main}>
          <div className={styles.field}>
            <p className={`caption-type ${styles.fieldTitle}`}>{notFound.field}</p>
            <RequestedPath className={`ui ${styles.path}`} />
          </div>
          <h1 id="not-found-title" className={`display ${styles.heading}`} data-split="lines" data-intro="" data-duration="0.8">
            {notFound.heading}
          </h1>
          <p className={`prose ${styles.copy}`}>{notFound.body}</p>
          <div className={styles.cta}>
            <BoxLink href="/" size="l">
              {notFound.cta}
            </BoxLink>
          </div>
        </div>
      </div>

      <section className={`wrap ${styles.band}`}>
        <div className={styles.track}>
          <TrackHead track={workSection.track} />
        </div>
        <div className={styles.main}>
          <ul className={styles.list}>
            {projects.map((project) => (
              <li key={project.slug} className={styles.item}>
                <a className={styles.link} href={`/work/${project.slug}`} data-curtain-title={project.title}>
                  <span className={`ui ${styles.num}`}>{project.number}</span>
                  <span className={`inout ${styles.title}`}>{project.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
