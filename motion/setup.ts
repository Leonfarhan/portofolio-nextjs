// Global motion for this site. Runs once on the client, before the first page initializes (engine/next.tsx calls
// setupMotion from boot). Page behaviour registers with onPage() inside the modules below, so it is reverted on every
// navigation.
import { setLoaderExit, setTransition } from '@/engine';
import { registerFill } from './fill';
import { registerHeader } from './header';
import { registerHero } from './hero';
import { loaderExit } from './loader';
import { registerPlayhead } from './playhead';
import { startTimer } from './timer';
import { curtainTransition, trackClicks } from './transition';

export function setupMotion() {
  setLoaderExit(loaderExit);
  setTransition(curtainTransition);
  trackClicks();
  document.addEventListener('engine:loaded', startTimer, { once: true });
  registerPlayhead();
  registerHeader();
  registerFill();
  registerHero();
}
