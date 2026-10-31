// Header behaviour (DESIGN.md, the header). The bar stays pinned at all times, on every page and on phones. On the
// home page the section in view takes aria-current="location" (a ScrollTrigger per section). The current page is
// rendered by the header itself (aria-current="page", case pages: Work).
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { onPage } from '@/engine';

export function registerHeader() {
  onPage(() => {
    const links = [...document.querySelectorAll<HTMLElement>('[data-nav-id]')];
    const triggers = links.flatMap((link) => {
      const section = document.getElementById(link.dataset.navId ?? '');
      if (!section) return [];
      return [
        ScrollTrigger.create({
          trigger: section,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) link.setAttribute('aria-current', 'location');
            else if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
          },
        }),
      ];
    });
    return () => {
      triggers.forEach((trigger) => trigger.kill());
      links.forEach((link) => {
        if (link.getAttribute('aria-current') === 'location') link.removeAttribute('aria-current');
      });
    };
  });
}
