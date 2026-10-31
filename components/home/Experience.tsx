// Experience: A1, a track (DESIGN.md, wireframe 4). The head sticks on cols 1 to 2 (TrackHead sticky). The roles run
// on cols 3 to 12 along a vertical track line; each role starts with an in-point notch. The current role carries
// the record dot, the Now label and a yellow in-point.
import { TrackHead } from '@/components/TrackHead';
import { experience, experienceSection } from '@/data/site';
import styles from './Experience.module.css';

export function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className="wrap">
        <div className={styles.head}>
          <TrackHead track={experienceSection.track} sticky />
        </div>
        <ol className={styles.track}>
          {experience.map((role) => (
            <li key={role.company} className={`${styles.role}${role.current ? ` ${styles.current}` : ''}`}>
              {role.current && (
                <p className={`ui ${styles.nowRow}`}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span className={styles.nowLabel}>{experienceSection.nowLabel}</span>
                </p>
              )}
              <h3 className={`display ${styles.company}`}>{role.company}</h3>
              <div className={styles.roleMeta}>
                <p className={styles.title}>{role.title}</p>
                {role.period && <p className={`tc ${styles.period}`}>{role.period}</p>}
              </div>
              <p className={`prose ${styles.description}`}>{role.description}</p>
              <p className={styles.tech}>{role.tech.join(', ')}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
