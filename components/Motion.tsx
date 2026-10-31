'use client';
// Motion: mounts the engine once, as the last child of <body>. The global motion (loader, curtain,
// reader, timer, header and hero behaviour) is registered in motion/setup.ts.
import { Engine } from '@/engine/next';
import { setupMotion } from '@/motion/setup';

export function Motion() {
  return <Engine setup={setupMotion} />;
}
