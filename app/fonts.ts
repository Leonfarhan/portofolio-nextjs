import localFont from 'next/font/local';

// Two families, self-hosted (SIL Open Font License; the licences sit beside the files in app/fonts/) and cut with fontTools
// so a slow phone downloads less before the loader can finish.
// Bricolage Grotesque: wdth pinned at 100 (the site sets no width), opsz 12 to 96 (font-optical-sizing: auto on html picks the
// optical size from the font size), wght 400 to 800. Subset to Basic Latin, Latin-1 and the punctuation and symbols the site
// sets: no Latin Extended or combining marks. No reserved font name, so the family keeps its name. Its tabular figures (tnum)
// keep the timecodes still.
// TikTok Sans: opsz 36, wdth 100 to 120, wght 800 to 900; no reserved name. font-stretch maps onto wdth through the
// declaration, so font-stretch: 112% sets wdth 112.

/** Bricolage Grotesque: display, text, UI and timecodes. */
export const bricolage = localFont({
  src: './fonts/bricolage-grotesque.woff2',
  weight: '400 800',
  style: 'normal',
  variable: '--font-sans',
  display: 'swap',
  preload: true,
});

/** TikTok Sans: burned-in captions only (components/Caption, the curtain title, the 404 field). Not preloaded: on a
 *  slow phone a second preload competes with the JavaScript the loader waits for; the caption swaps in when it lands. */
export const tikTokSans = localFont({
  src: './fonts/tiktok-sans.woff2',
  weight: '800 900',
  style: 'normal',
  variable: '--font-caption',
  display: 'swap',
  preload: false,
  declarations: [{ prop: 'font-stretch', value: '100% 120%' }],
});
