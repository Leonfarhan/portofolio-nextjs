// The 404 page: "Media offline" (DESIGN.md). Rendered inside the root layout for every unmatched URL and for any
// unknown clip slug. Copy comes from data/site.ts (notFound). It shares the site image (/og.png).
import type { Metadata } from 'next';
import { NotFound } from '@/components/notfound/NotFound';
import { notFound, site } from '@/data/site';

export const metadata: Metadata = {
  title: notFound.title,
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: notFound.title,
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: { card: 'summary_large_image', title: notFound.title, images: ['/og.png'] },
};

export default function NotFoundPage() {
  return <NotFound />;
}
