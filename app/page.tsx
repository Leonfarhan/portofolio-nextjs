import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Now } from '@/components/home/Now';
import { Work } from '@/components/home/Work';
import { Experience } from '@/components/home/Experience';
import { Stack } from '@/components/home/Stack';
import { Method } from '@/components/home/Method';

export const metadata: Metadata = { alternates: { canonical: '/' } };

// Hero (scene), Now (statement), V1 Work (five stacked clips), A1 Experience (a track), Bin Stack (the media bin),
// V2 Method (two cuts, one length). The export footer (#contact) is rendered by the layout.
export default function Home() {
  return (
    <>
      <Hero />
      <Now />
      <Work />
      <Experience />
      <Stack />
      <Method />
    </>
  );
}
