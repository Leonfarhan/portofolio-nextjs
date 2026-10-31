// Case-study helpers: lookup, the wrap-around next question, and the meta description rule.
import { projects, type Project } from '@/data/site';

/** Index of the project with this slug, or -1. */
export function projectIndex(slug: string): number {
  return projects.findIndex((project) => project.slug === slug);
}

/** The question after `index`, wrapping from 05 back to 01. */
export function nextProject(index: number): Project {
  return projects[(index + 1) % projects.length];
}

/**
 * The meta description: the summary when it is 120 to 160 characters. Otherwise the summary plus
 * the longest run of role sentences that still fits in 160 characters. Only text from the data is used.
 */
export function caseDescription(project: Project): string {
  const { summary, role } = project;
  if (summary.length >= 120 && summary.length <= 160) return summary;
  const sentences = role.match(/[^.]+\.|[^.]+$/g)?.map((sentence) => sentence.trim()) ?? [];
  for (let k = 0; k < sentences.length; k++) {
    const text = [summary, ...sentences.slice(k)].join(' ');
    if (text.length <= 160) return text;
  }
  return summary;
}
