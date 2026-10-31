// Footer: F, Export, the finale of every page (DESIGN.md, wireframe 7). The Contact track head, the question at
// --t-xl, the mail box with the address, the watched line (the playhead driver keeps its timecode), then the name
// rendered on scroll-in, and the links and the small print.
import { BoxLink } from '@/components/BoxLink';
import { TrackHead } from '@/components/TrackHead';
import { BackToTop } from '@/components/home/BackToTop';
import { RenderName } from '@/components/home/RenderName';
import { casePage, footer, site } from '@/data/site';
import styles from './Footer.module.css';

export function Footer() {
  const mail = `mailto:${site.email}`;
  return (
    <footer id="contact" className={styles.footer}>
      <div className={`wrap ${styles.top}`}>
        <div className={styles.head}>
          <TrackHead track={footer.track} />
        </div>
        <div className={styles.body}>
          <h3 className={`display ${styles.question}`} data-split="lines">
            {footer.heading}
          </h3>
          <div className={styles.cta}>
            <BoxLink href={mail} size="l" strong>
              {footer.cta}
            </BoxLink>
            <a className={`link-draw ${styles.address}`} href={mail}>
              {site.email}
            </a>
          </div>
          <p className={`tc ${styles.watched}`} data-tc="" data-watched="" data-template={footer.watched}>
            {footer.watched.replace('{tc}', '00:00:00:00')}
          </p>
        </div>
      </div>
      <div className={`wrap ${styles.nameBlock}`}>
        <hr className={styles.rule} />
        <div className={styles.nameRow}>
          <RenderName name={site.name} />
        </div>
      </div>
      <div className={`wrap ${styles.bottom}`}>
        <ul className={styles.links}>
          {site.socials.map((social) => (
            <li key={social.label}>
              <a className="link-draw" href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
                <span className="sr-only"> {casePage.newTab}</span>
              </a>
            </li>
          ))}
          <li>
            <BackToTop label={footer.backToTop} />
          </li>
        </ul>
        <p className={styles.small}>
          <span>{footer.copyright}</span>
          <span>{footer.colophon}</span>
        </p>
      </div>
    </footer>
  );
}
