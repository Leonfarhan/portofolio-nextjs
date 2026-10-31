import type { MetadataRoute } from 'next';
import { projects, site } from '@/data/site';

// Canonical URLs use no trailing slash: Next's default (trailingSlash: false) redirects `/x/` to `/x`.
export default function sitemap(): MetadataRoute.Sitemap {
  return ['/', ...projects.map((p) => `/work/${p.slug}`)].map((path) => ({ url: `${site.url}${path}` }));
}
