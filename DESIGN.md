# DESIGN.md: Farhan Alwahid, clipped

## Brief

- **Subject:** Farhan Alwahid, software engineer at **Ternak Klip** (current), Indonesia, UTC+7. Previously software engineer at PT Optimal Untuk Negeri (built CBT Optimal end to end), interned at PT Formulatrix Indonesia and PT Pupuk Indonesia. Works across the stack: React, Next.js and TypeScript on screen; Go (Fiber, Chi, Gin) on the server; PostgreSQL; deploys on DigitalOcean with Nginx, AWS, Vercel. At Ternak Klip: front end and back end, payments through Xendit virtual accounts, and the Threads integration.
- **Ternak Klip (the anchor):** the platform where brands fund campaigns, creators cut short vertical clips from source videos for TikTok, YouTube Shorts and Instagram Reels, views come in through official platform APIs (six platforms, Threads among them), every view is checked before it counts, and payouts clear every seven days.
- **Audience:** recruiters and engineering leads, founders who need someone who ships a whole product.
- **Job of the site:** get hired or booked. Show he builds whole products, and that he works on the platform that clipping runs on.
- **Assets:** five projects (real screenshots for CBT Optimal and the OpenCV editor, a login screenshot for Shopmate, code frames from real source for Go Clean Architecture, AI Website Builder and the Shopmate cover), two method screenshots, the copy in `data/site.ts`.
- **Language:** English.
- **Stack:** the existing Next.js 14 App Router project. Plain CSS (tokens in `app/globals.css`, CSS Modules per component), GSAP 3.15 (SplitText), Lenis, no WebGL. The engine, adapter, page lifecycle, case page routing and content file from the first build stay; the answer-sheet visual system is replaced.

## Concepts considered (second round, after the owner rejected the exam sheet)

| | Idea | Anchor | Signature | O/F/Fe/P |
|---|---|---|---|---|
| **A. Clipped (material)** | The portfolio is a long source take. Scroll is the playhead, and every project gets cut out of the timeline and reframed from landscape to a 9:16 clip with burned-in captions | He builds Ternak Klip, the platform where clippers do exactly this to brand videos | The reframe: a fixed playhead line; as a project's 16:10 frame crosses it, the frame cuts down to a vertical 9:16 crop around the project's focus, safe-area guides flash, and the title burns in as a word-by-word caption | 4 / 5 / 4 / 3 |
| B. Every view is checked (process) | Each project only "counts" after it passes checks: platform data, human review, fraud analysis, verified | Ternak Klip's verification pipeline | a verification stamp sequence per project | 3 / 3 / 4 / 3 |
| C. Settle up (formal) | The site is a payout ledger: each project is a line that clears | "Where brands and creators settle up" | lines clear on a seven-day cycle | 2 / 3 / 4 / 3 |

**Pick A.** It is the only one a visitor reads in three seconds ("it's cutting my portfolio into clips") and it comes from the work itself, not the company's marketing. Portability is 3: a video editor could borrow it, so the copy and the "Now" section tie it to the platform he engineers. Steal from B for the case page: the craft list reads as checks that passed.

## Concept card

```
Idea:        Farhan's portfolio is footage being clipped: scroll is the playhead, and each project is cut
             out of the timeline and reframed into a vertical clip with burned-in captions.
Metaphor:    A short-form clipping editor: source footage (landscape), timeline and ruler, playhead,
             razor cut, in and out points, 9:16 reframe with safe-area guides, word-by-word captions,
             timecode HH:MM:SS:FF.
Signature:   The reframe. A fixed playhead (1 px line across the viewport at 50% height, drawn behind content at 14% ink, a yellow flag
             with the live timecode on the left ruler). When a project's 16:10 frame crosses it, the
             frame cuts down to a 9:16 crop around the project's focus point (clip-path; outside dims
             to 22%), safe-area guides blink once, and the title burns in as a caption, one word
             highlighted at a time. Scrubbed by scroll (ScrollTrigger scrub 0.6): scroll back and it
             un-cuts. One driver module (motion/playhead.ts) owns the playhead, the timecode, the
             reframes and the captions.
Emotion:     "Oh, it's clipping my work." Quick, confident, a little playful, like a good short.
Motion verb: Cut and reframe. Cuts snap (0.12 to 0.2 s, hard edges); reframes glide (0.9 s expo.inOut
             or scrubbed); caption words pop (lift 0.08em, 0.08 s per word).
Screenshot:  The hero: Farhan Alwahid set landscape at display size inside a dimmed 16:9 source frame, a
             bright 9:16 crop window over part of the name with safe-area guides, a caption below it
             with one word in yellow, and the playhead crossing with its timecode.
```

Survives everywhere: header (timecode), loader (import and razor cut), work (each project reframes), experience (a track with "Now" at the playhead), method (two edits of the same length: many cuts vs one long take), footer ("Export", watch time), case page (one clip opened in the editor), 404 ("Media offline").

## Art direction system

### Palette (the editor panel, the caption, the record light)

| Role | Token | Hex | Use | Contrast |
|---|---|---|---|---|
| ground | `--ground` | `#101113` | the timeline panel, every page | |
| surface | `--surface` | `#18191C` | frames, track lanes, the curtain | |
| ink | `--ink` | `#F3F2EF` | all text, frame rules at 100% | 17.3:1 on ground |
| muted | `--muted` | `#9A9BA1` | secondary text, ruler numbers | 6.9:1 on ground |
| line | `--line` | `#2C2D32` | hairlines, lane borders, ruler ticks | |
| accent | `--caption` | `#FFD23F` | caption highlight word, playhead, in/out points, focus ring, CTA fill | 13.4:1 on ground; ground on it 13.4:1 |
| record | `--rec` | `#FF4D4D` | the "Now" record dot only | |
| offline | `--offline` | `#C8102E` | the 404 Media offline field only | |

Yellow means one thing: the part that's playing or selected right now (the active caption word, the playhead, the cut, the hovered in/out). Never decoration, never body text. Dark ground because that's where editors live and because the reframe's dim reads only on dark. The "near-black + one accent" default is accepted on purpose: the caption yellow is the most recognisable device of short-form clips.

### Type

Two families, both from Google Fonts under the SIL Open Font License. They are self-hosted in `app/fonts/` with `next/font/local` (`--font-sans` and `--font-caption`). Bricolage Grotesque is cut with fontTools to wdth 100 (the site sets no width), opsz 12 to 96 and wght 400 to 800, then subset to Basic Latin, Latin-1 and the punctuation and symbols the site sets: `bricolage-grotesque.woff2` is 67.8 KiB (69,420 bytes). Latin Extended, combining marks and rare symbols are dropped. It has no reserved font name, so the family keeps its name. TikTok Sans has no reserved name and is cut to the caption ranges (51 KiB: opsz 36, wdth 100 to 120, wght 800 to 900). The licences sit beside the files (`OFL-BricolageGrotesque.txt`, `OFL-TikTokSans.txt`).

| Role | Family and setting |
|---|---|
| Display (name, project titles, section statements) | Bricolage Grotesque, wght 700, natural case, tracking -0.03em, leading 0.92, balanced line breaks; optical size follows the size, pinned at 96 on the two names |
| Caption (burned-in captions, the hero line, project titles inside frames, the curtain title, the 404 field) | TikTok Sans, wght 840, wdth 108, opsz 36, UPPERCASE, tracking -0.005em, leading 1.0; over imagery a 0.12em dark stroke via `paint-order: stroke` so it reads on any frame; the active word in `--caption` |
| UI / timecode / track headers | Bricolage Grotesque, wght 560, 12 to 13 px, natural case, no tracking, `tabular-nums` (its digits share one advance, so timecodes do not jitter); track ids keep the case of the data |
| Text | Bricolage Grotesque, wght 400, 17 px fluid, leading 1.55, measure 60ch |
| Code frames | `ui-monospace, SFMono-Regular, Menlo, monospace` |

- **Bricolage Grotesque** is the sans now. The owner found the earlier grotesque stiff (see Decisions after QA). Its ink traps, optical sizes and slightly irregular forms read warmer and more hand-made, which suits an engineer working inside a creator platform.
- **Capitals stay only on burned-in captions**, where they are the clip convention. Names, titles, track names and labels are natural case.
- **TikTok Sans** is the caption face of the platform the clips are made for.

Fits, measured in Chromium for these faces: the hero name is 14.55 cqw of the source frame, so its natural width is 92% of the frame at every desktop width and at 390 (the name's optical size is pinned at 96 so the phone cut matches the desktop one); the footer name is 15 cqi, about 95% of its row at 390, 768, 1440 and 1920; Work titles are `min(--t-xl, 17cqi)` so "Architecture" fills its column; clip captions size to 0.78 em a letter (`ClipFrame.module.css`). Timecodes: Bricolage's tabular digits have 0 px spread at 13, 15 and 24 px, so the header timecode, the ruler and the loader counter do not move as they count.

Scale tokens: `--t-mega: clamp(3.5rem, 0.6rem + 12vw, 14rem)`, `--t-xl: clamp(2.5rem, 1.2rem + 4.6vw, 6rem)`, `--t-l: clamp(1.625rem, 1.15rem + 1.8vw, 2.875rem)`, `--t-m: clamp(1.1875rem, 1.05rem + 0.55vw, 1.5rem)`, `--t-body: clamp(1rem, 0.96rem + 0.2vw, 1.125rem)`, `--t-s: 0.875rem`, `--t-xs: 0.75rem`.

### Grid and rhythm

- **The ruler:** a vertical timecode ruler runs down the document's left edge (`--ruler`: 64 px desktop, 18 px phone): a tick every 24 px, a long tick with a timecode label every 10 ticks (desktop only), 1 px `--line`. It replaces the margin; content never enters it. Time maps 1 px of scroll to 1 frame at 30 fps.
- 12 columns after the ruler, `--gutter: clamp(16px, 2vw, 32px)`.
- **Alignment rule (from the editor):** track header column (cols 1 to 2: track id + name, sticky in long sections) and the timeline column (cols 3 to 12). Every section obeys it. Phones (4 columns): the track header sits above the content.
- Section rhythm, `u = 8px`: hero full viewport; now airy (28u); work long (each clip ~110svh, the reframe needs scroll); experience normal (16u); stack tight (8u); method airy; footer full viewport.

### Shape

One radius: **3 px** (frames, clip blocks, lanes, buttons, the playhead flag). 9:16 crop windows and safe-area guides are square-cornered lines inside frames. Circles only for the record dot.

### Motion language

- Engine eases: `ease.out` (expo.out) entrances, `ease.inOut` (expo.inOut) reframes and the curtain, `ease.soft` (power3.out) hovers. Cuts: `steps(1)`-like snaps or 0.12 s `power4.out`.
- Text reveals: engine `data-split="lines"`, lines rise out of a mask (a clip sliding up the track), stagger 0.08.
- Captions: words pop in (lift 0.08em, 0.08 s per word), the highlight steps word to word.
- Curtain: 0.8 s each way.

### Micro-interactions (one treatment per role)

| Role | Treatment | Touch / reduced motion |
|---|---|---|
| Nav links | in and out brackets (`[` `]`, 1.5 px `--caption`) snap from the label's center to its edges; current page keeps them | brackets on current; instant |
| Primary CTA (Email me, Open clip, Next clip, Visit site) | a box with a `--line` rule; a yellow fill renders in behind a hard-edged wipe from left to right (like a render bar), label turns `--ground`, arrow travels 6 px | `:active` fill; instant fill |
| Project frames and rows | the in/out brackets snap onto the frame's corners, the media scales 1.03 inside the clip, the caption replays its word highlight | press state |
| Utility links (socials, colophon) | underline draws from the left | underline on focus |
| Inline body links | underline at rest, rises into a `--caption` 15% band | same |
| Focus | 2 px `--caption` outline, 3 px offset, plus the hover treatment | same |

Native cursor always. No follower.

### Idle state (decision)

The page is never still at rest, and everything moving is the concept:
1. **Hero playback:** the hero is a clip that plays. Its timecode counts at 30 fps, its caption steps word by word in a loop, and the 9:16 crop window drifts slowly across the source like auto-reframe tracking a subject. One `gsap.ticker` loop, paused off screen, off under reduced motion.
2. The playhead flag's timecode follows scroll; the header shows it too.

## Information architecture

```
/                    hero → Now (Ternak Klip) → V1 Work → A1 Experience → Bin (stack) → Method (two edits) → Export (footer)
/work/<slug>         five case pages: cbt-optimal, shopmate, go-clean-architecture, ai-website-builder, opencv-image-editor
/404                 "Media offline"
```
Nav: name (home), Work (`/#work`), Experience (`/#experience`), Contact (`/#contact`). The footer is the contact section on every page.

## Composition plan (each section a different family)

### Header (fixed, steps aside on scroll down, returns on scroll up)
```
Farhan Alwahid              00:01:12:08                    [Work]  Experience  Contact
```
Phone: name, three nav items; timecode hidden.

### Ruler + playhead (persistent, every page)
```
00:00 ─┤                                                   (ruler down the left edge, scrolls with the doc)
       ┤
00:10 ─┤►00:00:10:14 ─────────────────────────────────── (fixed playhead at 50% vh: yellow flag on the
       ┤                                                   ruler, 1 px line across at 14% ink, behind content)
```

### 1. Hero: Scene (100svh)
```
ruler │ cols 1–2                 cols 3–12
      │ V1  Source               ┌──────────────────────────────────────────────────────────┐
      │                          │ Software engineer, Ternak Klip        Indonesia, UTC+7   │ (frame overlays)
      │ React, Next.js,          │                ┌────────────┐                            │
      │ TypeScript, Go           │  FARHAN AL│WAHID       │   (name at mega, landscape;  │
      │                          │                │ safe area  │    dimmed outside the crop)│
      │                          │                │ I BUILD    │                            │
      │                          │                │ [WHOLE]    │   ← caption, word stepping │
      │                          │                │ PRODUCTS   │                            │
      │                          │ 00:00:03:12    └────────────┘                     9:16   │
      │                          └──────────────────────────────────────────────────────────┘
      │ I build web products end to end: the React screen, the Go server under it,     Scroll to play ↓
      │ and the deploy.
```
The name is the `<h1>` (real text). The crop window (9:16, full frame height) drifts across the name; inside it the name is at full ink, outside at 22%. Phone: the screen itself is 9:16: the source frame becomes a horizontal strip (name set landscape, scrolling slowly sideways inside it like the source footage) above a tall caption block; the crop window marks the strip.

### 2. Now: Statement (airy)
```
● REC  Now                Software engineer at Ternak Klip, the platform where creators cut brand
                          videos into short clips and get paid per view. I work on the front end and
                          the back end: Xendit virtual account payments and the Threads integration.   (t-l)
                          ternakklip.com ↗
```

### 3. V1 Work: stacked clips (five, alternating sides)
```
V1  Work          ┌─────────────── 16:10 source ───────────────┐   Clip 01 of 05            2026
5 clips           │ dim       ┌─9:16─┐                  dim     │   CBT Optimal                (t-xl display)
                  │           │ CBT  │  ← reframes at the       │   Exam practice for nurses and midwives…
                  │           │OPTIMAL│    playhead, caption    │   SCREEN ▇▇▇▇▇▇▇▇▇▇▇▇
                  │           └──────┘    burns in             │   SERVER ▇▇▇▇▇▇▇▇▇▇▇▇   (four lanes;
                  └────────────────────────────────────────────┘   DATA   ▇▇▇▇▇▇▇▇▇▇▇▇    filled block =
                                                                   SHIP   ▇▇▇▇▇▇▇▇▇▇▇▇    built it)
                                                                   [ Open clip → ]
```
Even clips mirror (frame right, info left). Phone: frame full width, info below, reframe kept.

### 4. A1 Experience: a track (sticky header + segments)
```
A1  Experience    ● Now   Ternak Klip                       Software engineer
(sticky)          ┃       description                       Xendit, Threads API
                  ├─────  PT Optimal Untuk Negeri           Software engineer
                  ┃       description …
                  ├─────  PT Formulatrix Indonesia          Software engineer intern
                  ├─────  PT Pupuk Indonesia (Persero)      Full stack engineer intern
                  └─────  HMIK                              Head of project management
```
A vertical track line on the left with an in-point notch per role; "Now" has the record dot and a yellow in-point.

### 5. Bin: Data block (the media bin)
```
Bin  Stack        SCREEN            SERVER            DATA              SHIP
                  React             Go (Fiber, Chi…)  PostgreSQL        Docker
                  Next.js           NestJS            MySQL             Nginx
                  …                 …                 …                 …
```
Four columns as bin folders (a small 3 px-radius folder tab with the lane name), items listed like clip names with tabular counts. 2×2 on phones.

### 6. Method: Asymmetric pair, "two edits, same length"
```
Method            Agile                                   Waterfall
                  ▕▏▕▏▕▏▕▏▕▏▕▏▕▏▕▏  (many short cuts)        ▕ Requirements ▏ Design ▏ Build ▏ Test ▏ (one take)
                  [screenshot 16:10]                      [screenshot 16:10, offset down]
                  Learning Skill, 2023 to 2024            Thesis: graduation prediction
                  paragraph                               paragraph
```
Each method gets a track bar of the same total width: Agile cut into sprints, Waterfall in four long phases. Illustrative, labeled as such by its content (no fake dates).

### 7. Export: Footer as finale (every page)
```
Export            Got a role or a project?                                     (t-xl)
                  [ Email me   farhanalwahid10@gmail.com  → ]                  (render-bar CTA)
                  Watched 00:02:41:12 of this sequence                         (live timecode of time on site)
──────────────────────────────────────────────────────────────────────────────
Farhan Alwahid                                                                 (one line, fills the row)
GitHub  LinkedIn  Back to top             © 2026  Set in Bricolage Grotesque and TikTok Sans. Built with Next.js, GSAP and Lenis.
```
On scroll in, the name is "rendered": a render bar wipes left to right and the name appears behind its hard edge.

### Case page `/work/<slug>`: one clip opened in the editor
```
V1  Clip 01 of 05            CBT Optimal                                      (h1, t-xl)
All clips                    summary                                          (t-m)
                             TRACKS  four lanes        ROLE …  YEAR …  STACK …  LINKS  [Visit site ↗]
──────────────────────────────────────────────────────────────────────────────
HERO MEDIA cols 1–12, 16:10, in/out brackets at the corners; on intro it cuts in from 9:16 to full
──────────────────────────────────────────────────────────────────────────────
CONTEXT   2–3 sentences          IDEA   2–3 sentences
CHECKS    the craft list, each line with a yellow check tick as it crosses the playhead ("Every view is checked before it counts")
FRAMES    2–3 frames on the grid, varied sizes, captions in small text
OUTCOME   statement
──────────────────────────────────────────────────────────────────────────────
NEXT CLIP  02  Shopmate  →                          (display link, render-bar fill)
```

### 404: "Media offline"
The editor's media offline frame: a 16:9 field in `--offline` red with "Media offline" set in the caption style and the requested path below it in UI type, the h1 "This clip is offline.", the body, the CTA "Back to the timeline", then the five clips as a short list.

## Continuity

- **Loader (≤ 2.6 s, real progress):** "Importing" and a 3-digit counter where the header timecode sits; a thin render bar across the top fills with progress while the ruler's ticks print down the left edge. Exit: a yellow razor line drops through the screen at the playhead's x position (a vertical cut), the loader splits into two halves that slide apart left and right (0.7 s `ease.inOut`), the counter becomes the timecode at 00:00:00:00, and the hero clip starts playing.
- **Hero intro:** the name rises out of a mask (lines), the crop window cuts in (from the full frame down to 9:16, 0.9 s `ease.inOut`), safe-area guides blink, the caption pops word by word.
- **Page transition ("drop the next clip"):** a `--surface` panel slides in from the right like a clip dropped on the track (0.8 s `ease.inOut`), carrying the destination title as a caption with the yellow active word and an in-point bracket on its leading edge; it slides out to the left (0.8 s) to reveal the new page, whose intro plays. Reduced motion: short fade.

## Genericness test

A generic model asked for a "video-themed developer portfolio" lands on: a play-button hero, a dark glassy UI with gradient glows, a filmstrip horizontal gallery, a fake video player chrome, neon accents. Rejected or changed here: no play button or player chrome (it's an editor, not a player); no filmstrip gallery (projects reframe vertically, the actual act of clipping); no gradients or glass (flat panel surfaces, hairlines); the accent is the caption yellow, used only for "now playing or selected"; timecode is real (scroll position, time on site), not decoration; the "Now" section ties the metaphor to the platform he engineers.

## Reduced motion and no-JS

Every reframe shows its end state (9:16 crop with the rest dimmed), every caption shows all words with the first highlighted, no Lenis, no loader theatrics (short fade), the hero does not play (static crop over "ALWAHID", timecode 00:00:00:00), hovers change instantly. Without JS: the same end states from CSS, timecodes hidden, all content readable.

## Decisions after QA pass 1

- **Tracks carry real labels.** Each used lane is an editor clip block holding the tools used on that layer (`project.tracks` in `data/site.ts`), with a yellow in-point on its left edge. Unused lanes are dashed and empty. Grey fills were removed: they read as skill bars.
- **Yellow also marks in-points.** Tracks, Method cut blocks and the "Now" role start at a `--caption` in-point: the same meaning as the playhead (where the work cuts in).
- **Body links wipe, not tint.** `.link-inline` hover is the render-bar wipe (yellow fill from the left with a hard edge, text to `--ground`), matching the CTAs.
- **Case page order:** title and summary, then the hero clip, then the meta rows, so the first frame shows the work. The case hero's burned caption is the project's one-line description (looping), not its title, to avoid repeating the h1.
- **Idle on inner pages:** case pages keep the hero caption looping. The 404 "Media offline" frame stays still on purpose: an offline clip doesn't play.
- **Crop geometry moves with transform only** (translate in container units, scale with non-scaling SVG strokes). Layout properties never animate (CLS went from 0.387 to 0.0001).
- **Dim copy outside the crop** is at ≥ 3:1 so the name stays readable outside the window.
- **Removed accessory (final pass):** the red record dot beside the header timecode and the loader counter. The playhead isn't recording; red now appears only where something is live (Ternak Klip, "Now").
- **Header stays pinned** on every page and on phones (the step-aside was removed so navigation is always one tap away).
- **Bricolage Grotesque replaces Mona Sans, which the owner found stiff; capitals stay on captions only.** Bricolage (wdth 100, opsz 12 to 96, wght 400 to 800, subset to Latin-1 and the punctuation the site sets) is self-hosted at 67.8 KiB. Names, titles, track names and labels are natural case; capitals remain on burned-in captions, the curtain title and the 404 field. Timecodes use Bricolage's tabular digits, so there is no monospace face. The two names pin the optical size at 96, so their fill of the frame does not drift with the phone size.
- **Three layouts.** Phone under 768 px. Tablet from 768 to 939 px: each Work clip and each Method entry runs in one column, the stack bins go two by two, and the track chip sits above the section name, so no word has to fit a column narrower than itself. Desktop from 940 px is the grid described above; at 940 the narrowest track label is still 11 px and nothing breaks mid-word.

## Decisions after the polish pass

- **Source clips are not reframed.** A 9:16 window over monospace slices file names mid-token (`err|ors.go`, `connection.g|o`), which reads as a rendering bug, not a crop. The two code covers (Shopmate, Go Clean Architecture, AI Website Builder) stay full-frame source panels with the tracks and the caption below; the three screen covers still reframe at the playhead and the case hero still cuts in. The code listings were also re-wrapped to one file per line so no frame has to wrap a line, and the line-number gutter is a fixed 2.5 ch so line 10 does not shift the tree one character right.
- **The ruler is zeroed at the playhead.** Labels are painted from the document, the flag from the scroll position, so the label the playhead crosses was 15 s behind the flag. `drawRuler` now offsets by half a viewport: the labels straddling the line read the same time as the flag (at 900 px, 04:33 above and 04:41 below a flag at 04:39).
- **The loader has a deadline.** The page is server-rendered, so it is readable without React; waiting for the bundle is what pushed the phone loader to 2.9 s. A small script in the layout counts the loader up and cuts it away at 1.25 s if the engine has not booted, in CSS, and the engine then skips its exit and shows the page in its final state (`html.is-deadline` makes the hidden-until-intro text visible). On a fast connection the engine boots first and the script stands down. Measured on a throttled phone: loader 2.09 to 2.18 s (was 2.7 to 3.5 s), LCP 0.72 to 0.97 s (was 2.65 to 2.9 s). The hero intro paragraph also lost its hidden reveal, since it is the LCP element.
- **The footer CTA carries the only standing yellow mark.** The mail box gets a 3 px `--caption` in-point on its left edge and a 38% ink rule, so it is the primary action at rest; the address drops to `--t-s`, `--muted` and a `link-draw` underline, and the watched line drops to `--t-s` muted. The name block is pushed to the bottom of the viewport (`margin-top: auto`), so the rule, the name and the links share one base instead of leaving a gap above the name and a larger one below.
