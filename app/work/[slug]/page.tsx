// One clip, opened in the editor (DESIGN.md, "Case page"). Static: one page per project (generateStaticParams); any
// other slug is a 404 (dynamicParams = false).
// Order: the clip header (track, clip number, title, summary) → the hero clip (cuts in from a centred 9:16 crop to the
// full frame on the page intro) → property rows (tracks, role, year, stack, links) → CONTEXT and IDEA → CHECKS (each
// line ticks as the playhead crosses it) → FRAMES (the gallery wall) → OUTCOME → NEXT CLIP (wraps 05 to 01). The hero
// sits above the rows, so the first screen shows the clip and not only its specs. placeholderNotes stay out.
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseChecks } from '@/components/case/CaseChecks';
import { CaseHead } from '@/components/case/CaseHead';
import { CaseMeta } from '@/components/case/CaseMeta';
import { CaseSubtitles } from '@/components/case/CaseSubtitles';
import { CaseText } from '@/components/case/CaseText';
import { FrameWall } from '@/components/case/FrameWall';
import { NextClip } from '@/components/case/NextClip';
import styles from '@/components/case/Case.module.css';
import { ClipFrame } from '@/components/ClipFrame';
import { casePage, projects, site } from '@/data/site';
import { caseDescription, nextProject, projectIndex } from '@/lib/case';

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const index = projectIndex(params.slug);
  if (index < 0) return {};
  const project = projects[index];
  const path = `/work/${project.slug}`;
  const description = caseDescription(project);
  const image = `/og/${project.slug}.png`;
  return {
    title: project.title,
    description,
    // The layout sets no canonical; each clip names its own address.
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      title: project.title,
      description,
      url: path,
      images: [{ url: image, width: 1200, height: 630, alt: project.title }],
    },
    twitter: { card: 'summary_large_image', title: project.title, description, images: [image] },
  };
}

export default function CasePage({ params }: { params: { slug: string } }) {
  const index = projectIndex(params.slug);
  if (index < 0) notFound();
  const project = projects[index];
  const next = nextProject(index);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: caseDescription(project),
    url: `${site.url}/work/${project.slug}`,
    author: { '@type': 'Person', name: site.name, url: site.url },
  };

  return (
    <article aria-labelledby="case-title">
      <CaseHead project={project} />

      {/* data-intro: the loader waits for this image to decode, so the cut-in starts with the frame already painted. */}
      <div className={`wrap ${styles.band} ${styles.hero}`} data-intro="">
        <div className={styles.heroFrame}>
          {/* focus 0.5: the intro cuts in from a centred 9:16 crop, then opens to the full frame. */}
          <ClipFrame
            media={project.cover}
            focus={0.5}
            sizes="100vw"
            priority
            reframe={project.cover.kind === 'code' ? 'none' : 'intro'}
          />
        </div>
      </div>

      <CaseSubtitles project={project} />

      <CaseMeta project={project} />
      <CaseText project={project} />
      <CaseChecks project={project} />

      <section className={`wrap ${styles.band}`} aria-labelledby="frames-title">
        <h2 id="frames-title" className={`ui ${styles.track}`}>
          {casePage.frames}
        </h2>
        <FrameWall frames={project.frames} />
      </section>

      <section className={`wrap ${styles.band}`} aria-labelledby="outcome-title">
        <h2 id="outcome-title" className={`ui ${styles.track}`}>
          {casePage.outcome}
        </h2>
        <p className={`display ${styles.statement}`}>{project.outcome}</p>
      </section>

      <section className={`wrap ${styles.band}`} aria-labelledby="next-title">
        <h2 id="next-title" className={`ui ${styles.track}`}>
          {casePage.next}
        </h2>
        <NextClip project={next} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
      />
    </article>
  );
}
