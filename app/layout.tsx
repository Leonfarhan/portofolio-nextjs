import type { Metadata } from 'next';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Motion } from '@/components/Motion';
import { Playhead, Ruler } from '@/components/Ruler';
import { header, loader, site } from '@/data/site';
import { bricolage, tikTokSans } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | ${site.role}`, template: `%s | ${site.name}` },
  description: site.description,
  openGraph: { type: 'website', siteName: site.name, images: ['/og.png'] },
  twitter: { card: 'summary_large_image' },
};

// Runs before first paint: hidden-until-revealed styles only apply when JS and motion are on.
const flags = `document.documentElement.classList.add('js');if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')`;

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${tikTokSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: flags }} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          {header.skipLink}
        </a>

        <div id="curtain" aria-hidden="true">
          <div className="curtain__panel">
            <span className="curtain__in" />
            <p className="curtain__title caption-type">
              <span className="curtain__first" data-curtain-first="" />
              <span data-curtain-rest="" />
            </p>
          </div>
        </div>

        <div id="loader" role="status" aria-label={loader.label} suppressHydrationWarning>
          <div className="loader__panel loader__panel--left" data-loader-half="left" aria-hidden="true" />
          <div className="loader__panel loader__panel--right" data-loader-half="right" aria-hidden="true" />
          <div className="loader__head" data-loader-head="">
            <span className="loader__name">{site.name}</span>
            <span className="loader__meter" aria-hidden="true">
              {/* The deadline script (below) may rewrite this count before React hydrates on a slow boot. */}
              <span className="tc loader__count" data-loader-count="" suppressHydrationWarning>
                000
              </span>
              <span className="ui loader__label" data-loader-ui="">
                {loader.label}
              </span>
            </span>
          </div>
          <div className="loader__bar" data-loader-bar="" data-loader-ui="" aria-hidden="true" suppressHydrationWarning />
          <div className="loader__ruler" data-loader-ruler="" data-loader-ui="" aria-hidden="true" suppressHydrationWarning>
            <span className="ruler-ticks" />
          </div>
          <div className="loader__razor" data-loader-razor="" aria-hidden="true" />
        </div>
        {/* Loader deadline. The page is server-rendered, so it is readable without React. If the bundle has not booted by
            the deadline (a slow phone), the loader counts itself up and leaves here, in CSS; the engine then skips its own
            exit and shows the page in its final state. On a fast connection the engine boots first and this stands down. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var r=document.getElementById('loader');if(!r)return;var h=document.documentElement;var reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;var count=r.querySelector('[data-loader-count]');var bar=r.querySelector('[data-loader-bar]');var ruler=r.querySelector('[data-loader-ruler]');var t0=performance.now();var done=false;function end(){if(done)return;done=true;r.hidden=true;h.classList.add('is-loaded','is-deadline');document.dispatchEvent(new Event('engine:loaded'))}function draw(){if(done||r.dataset.exit||h.classList.contains('is-booted'))return;var p=Math.min(1,(performance.now()-t0)/1100);var v=Math.round(100*(1-Math.pow(1-p,3)));if(count)count.textContent=('00'+v).slice(-3);if(bar)bar.style.clipPath='inset(0 '+(100-v)+'% 0 0)';if(ruler)ruler.style.clipPath='inset(0 0 '+(100-v)+'% 0)';if(p<1)requestAnimationFrame(draw)}function expire(){if(done||r.dataset.exit||h.classList.contains('is-booted'))return;r.dataset.expired='';if(reduced){end();return}setTimeout(end,380)}requestAnimationFrame(draw);setTimeout(expire,reduced?0:1250)})();`,
          }}
        />

        <Header />

        <div className="sheet">
          <Ruler />
          <Playhead />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
        />
        <Motion />
      </body>
    </html>
  );
}
