'use client';
// Header: fixed, ground-coloured, with a --line hairline under it. The name (left). The playhead timecode (centre;
// hidden on phones and without JS through [data-tc]). The nav (right) with the in and out brackets
// (.inout). The current page (case pages: Work) carries aria-current="page". On the home page the section in view
// takes aria-current="location" (motion/header.ts). The bar stays pinned on every page and on phones.
import { usePathname } from 'next/navigation';
import { header, nav, site } from '@/data/site';
import styles from './Header.module.css';

export function Header() {
  const pathname = usePathname();
  const onWork = pathname.startsWith('/work');
  return (
    <header className={styles.header} id="site-header">
      <div className={styles.inner}>
        <a className={`inout ${styles.name}`} href="/">
          {site.name}
        </a>
        <div className={styles.center} data-tc="" role="group" aria-label={header.timecodeLabel}>
          <span className="tc" data-timecode="">
            00:00:00:00
          </span>
        </div>
        <nav className={styles.nav} aria-label="Sections">
          <ul className={styles.list}>
            {nav.map((item) => {
              const current = onWork && item.id === 'work';
              return (
                <li key={item.id}>
                  <a
                    className={`inout ${styles.link}`}
                    href={item.href}
                    data-nav-id={item.id}
                    aria-current={current ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
