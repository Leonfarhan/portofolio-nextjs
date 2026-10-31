# Farhan Alwahid, portfolio

The portfolio is footage being clipped. Scroll is the playhead, and the screen-based projects are reframed from a landscape frame into a 9:16 clip with burned-in captions (the code listings stay full-frame: a crop through monospace reads as a bug). The design system, concept and decisions are in [`DESIGN.md`](DESIGN.md).

## Stack

Next.js 14 (App Router), TypeScript, plain CSS (tokens in `app/globals.css`, CSS Modules per component), GSAP with ScrollTrigger and SplitText, Lenis. Type is Bricolage Grotesque and TikTok Sans, self-hosted in `app/fonts/` through `next/font/local` (`app/fonts.ts`).

## Run

```bash
npm install
npm run dev                      # development
npm run build && npm start       # production
```

## Where things live

| What | Where |
|---|---|
| Every visible string, project, experience entry and the assumptions to confirm | `data/site.ts` |
| Project screenshots | `public/work/<slug>/` |
| Open Graph images (1200×630) | `public/og.png`, `public/og/<slug>.png` |
| Motion engine (scroll, reveals, loader, page transitions) | `engine/` |
| Site motion: playhead driver, hero playback, loader, transition | `motion/` |
| Home sections | `components/home/` |
| Case study pages | `app/work/[slug]/page.tsx`, `components/case/` |

To regenerate the Open Graph images after a design change, run the production server and capture the hero of each page at 1200×630.

## Deploy

The site is static (all pages prerender). `npx vercel --prod` deploys it. `site.url` in `data/site.ts` sets the canonical URLs, the sitemap and the Open Graph URLs.
