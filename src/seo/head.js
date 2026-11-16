import { site, absUrl } from '../config/site.js';
import { buildGraph } from './schema.js';

const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Balises <head> propres à une page (injectées au prerender) */
export function buildHead(meta) {
  const url = absUrl(meta.path);
  const image = absUrl(meta.image && meta.image.endsWith('.jpg') ? meta.image : '/og-image.jpg');
  const jsonLd = JSON.stringify(buildGraph(meta)).replace(/</g, '\\u003c');
  return [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}" />`,
    meta.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    meta.noindex ? '' : `<link rel="alternate" hreflang="fr-CH" href="${url}" />`,
    meta.noindex ? '' : `<link rel="alternate" hreflang="x-default" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="fr_CH" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${image}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${image}" />`,
    `<meta name="geo.region" content="${site.address.country}-${site.address.region}" />`,
    `<meta name="geo.placename" content="${esc(site.address.locality)}" />`,
    `<meta name="geo.position" content="${site.geo.lat};${site.geo.lng}" />`,
    `<meta name="ICBM" content="${site.geo.lat}, ${site.geo.lng}" />`,
    `<script type="application/ld+json" id="ld-json">${jsonLd}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}

/** Mise à jour du <head> lors de la navigation côté client */
export function applyHead(meta) {
  if (typeof document === 'undefined') return;
  const url = absUrl(meta.path);
  document.title = meta.title;
  const set = (sel, attr, val) => {
    const el = document.head.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  set('meta[name="description"]', 'content', meta.description);
  set('meta[property="og:title"]', 'content', meta.title);
  set('meta[property="og:description"]', 'content', meta.description);
  set('meta[property="og:url"]', 'content', url);
  set('meta[name="twitter:title"]', 'content', meta.title);
  set('meta[name="twitter:description"]', 'content', meta.description);
  set('link[rel="canonical"]', 'href', url);
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((l) => l.setAttribute('href', url));
  const ld = document.getElementById('ld-json');
  if (ld) ld.textContent = JSON.stringify(buildGraph(meta));
}
