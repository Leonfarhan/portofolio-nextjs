'use client';
// Next.js App Router adapter (Next 14). Render <Engine setup={…} /> once, as the LAST child of
// <body> in the root layout. React runs child effects first, so page components register before
// the engine boots. `setup` (global motion) must come from a client module.
//
//   Cross-page links: leave → router.push → enter (curtain). Opt out with data-no-transition.
//   Same-page hash links (/#work while on /): smooth scroll below the fixed header, no curtain.
//   Cross-page hash links (/#work from a case page): the page lands on the hash under the curtain.
//   Back/forward: re-inits the page without the curtain. Hash-only history moves are left alone.
import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { boot, cleanup, enter, leave, onPage, scrollToTarget, type PageFn } from './index';

export function Engine({ setup }: { setup?: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const mode = useRef<'idle' | 'push' | 'pop'>('idle');
  const pendingHash = useRef('');
  const committed = useRef(pathname);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    boot(setup);
  }, []);

  useEffect(() => {
    const onClick = async (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest('a');
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download') || a.hasAttribute('data-no-transition')) {
        return;
      }
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;

      if (url.pathname === location.pathname && url.search === location.search) {
        const target = url.hash ? document.getElementById(url.hash.slice(1)) : null;
        if (!target) return; // no such element: let the browser try
        e.preventDefault();
        history.pushState(history.state, '', url.href); // keeps Next's router state on the entry
        scrollToTarget(target);
        if (target.hasAttribute('tabindex')) target.focus({ preventScroll: true });
        return;
      }

      e.preventDefault(); // next/link sees defaultPrevented and stands down
      if (mode.current !== 'idle') return;
      mode.current = 'push';
      pendingHash.current = url.hash;
      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      await leave();
      cleanup();
      router.push(href, { scroll: false });
    };

    const onPop = () => {
      if (location.pathname === committed.current) return; // hash-only history move: the browser handles it
      mode.current = 'pop';
      cleanup();
    };

    document.addEventListener('click', onClick, true);
    addEventListener('popstate', onPop);
    return () => {
      document.removeEventListener('click', onClick, true);
      removeEventListener('popstate', onPop);
    };
  }, [router]);

  useEffect(() => {
    if (pathname === committed.current) return; // first mount (also StrictMode's second effect run)
    const pop = mode.current === 'pop';
    const hash = pop ? location.hash : pendingHash.current || location.hash;
    committed.current = pathname;
    pendingHash.current = '';
    mode.current = 'idle';
    enter({ transition: !pop, scrollTop: !pop, hash });
  }, [pathname]);

  return null;
}

/** Component-level page code: runs when the page is ready (after the loader), reverted on leave. */
export function usePage(fn: PageFn) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onPage(fn), []);
}
