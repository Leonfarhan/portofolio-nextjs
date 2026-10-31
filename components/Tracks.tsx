// Tracks: the four lanes of one project (Screen, Server, Data, Ship), in layerOrder. A used lane holds one
// clip block: a yellow in-point bar and its label. An unused lane holds an empty dashed outline. The list is
// one image to assistive tech: "Tracks built: Screen, Server" names the lanes used.
//   labels   text inside a used lane's clip; defaults to the lane name.
//   compact  22 px clips and 4 px between rows (the work list). Default: 26 px clips and 6 px between rows.
// Server-safe: no hooks.
import { layerLabels, layerOrder, type Layer } from '@/data/site';
import styles from './Tracks.module.css';

export type TracksProps = {
  layers: Layer[];
  labels?: Partial<Record<Layer, string>>;
  compact?: boolean;
  className?: string;
};

export function Tracks({ layers, labels, compact = false, className }: TracksProps) {
  const built = layerOrder.filter((layer) => layers.includes(layer));
  const label =
    built.length > 0 ? `Tracks built: ${built.map((layer) => layerLabels[layer]).join(', ')}` : 'No tracks built';
  const root = [styles.tracks, compact ? styles.compact : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <div className={root} role="img" aria-label={label}>
      {layerOrder.map((layer) => {
        const on = layers.includes(layer);
        return (
          <div key={layer} className={styles.lane} aria-hidden="true">
            <span className={on ? `${styles.name} ${styles.nameOn}` : styles.name}>{layerLabels[layer]}</span>
            <span className={styles.track}>
              {on ? (
                <span className={styles.clip}>
                  <span className={styles.text}>{labels?.[layer] ?? layerLabels[layer]}</span>
                </span>
              ) : (
                <span className={styles.empty} />
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
