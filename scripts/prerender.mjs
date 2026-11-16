/**
 * Prérendu statique (SSG) : génère un fichier HTML complet par page,
 * avec son <head> SEO et ses données structurées, puis sitemap.xml,
 * robots.txt et llms.txt à partir des mêmes données.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssr = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href);
const { render, routes, notFoundMeta, buildHead, site, categories, renataFranca, packages, generalFaq, formatDuration } = ssr;

let template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Préchargement de la police de titre (LCP)
const fontFile = fs.readdirSync(path.join(dist, 'assets')).find((f) => /^cormorant-garamond-latin-400-normal.*\.woff2$/.test(f));
const preload = fontFile ? `<link rel="preload" href="/assets/${fontFile}" as="font" type="font/woff2" crossorigin />\n    ` : '';

const writePage = (meta, file) => {
  const html = template
    .replace('<!--app-head-->', preload + buildHead(meta))
    .replace('<!--app-html-->', render(meta.path));
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, html);
  console.log('  ✓', file);
};

console.log('Prérendu des pages :');
for (const r of routes) writePage(r, r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`);
writePage(notFoundMeta, '404.html');

// ---------- sitemap.xml ----------
const today = new Date().toISOString().split('T')[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${routes
  .map(
    (r) => `  <url>
    <loc>${site.url}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq || 'monthly'}</changefreq>
    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>${
      r.image && r.image.endsWith('.webp') ? `\n    <image:image><image:loc>${site.url}${r.image}</image:loc></image:image>` : ''
    }
  </url>`
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// ---------- robots.txt (moteurs classiques + moteurs IA explicitement autorisés) ----------
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'MistralAI-User'];
const robots = `User-agent: *
Allow: /

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${site.url}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

// ---------- llms.txt (GEO : résumé factuel pour les assistants IA) ----------
const price = (s) => `${s.name}${s.duration ? ` (${formatDuration(s.duration)})` : ''} : ${s.price} CHF${s.offer ? ` — ${s.offer.label} : ${s.offer.price} CHF (${s.offer.note.toLowerCase()})` : ''}`;
const a = site.address;
const llms = `# ${site.name}

> Institut de beauté et de bien-être à ${a.locality} (Suisse), tenu par ${site.owner}. Soins du visage, lifting coréen des cils, teintures cils et sourcils, épilation, massages relaxants et amincissants, drainage lymphatique méthode Renata França. Certaines prestations sont proposées à domicile sur rendez-vous. Valeurs : ${site.values.join(', ').toLowerCase()}.

## Informations pratiques

- Nom : ${site.name}
- Lieu : ${[a.streetAddress, `${a.postalCode} ${a.locality}`.trim(), 'Suisse'].filter(Boolean).join(', ')}
- Téléphone / WhatsApp : ${site.phoneDisplay}${site.email ? `\n- E-mail : ${site.email}` : ''}
- Horaires : ${site.openingHoursText.map(([d, h]) => `${d} ${h}`).join(' ; ')}
- Réservation : ${site.url}/reservation (WhatsApp, téléphone ou formulaire)
- Zones desservies à domicile : ${site.areaServed.join(', ')}
- Devise : CHF (francs suisses)

## Soins et tarifs

${categories.map((c) => `### ${c.name} — ${site.url}${c.slug}\n\n${c.services.map((s) => `- ${price(s)}${s.description ? `. ${s.description}` : ''}`).join('\n')}`).join('\n\n')}

### Forfaits — ${site.url}/forfaits

${packages.flatMap((p) => p.items.map((s) => `- Forfait ${p.name} — ${price(s)}`)).join('\n')}

## Pages principales

${routes.filter((r) => (r.priority ?? 0) >= 0.6).map((r) => `- [${r.title}](${site.url}${r.path}) : ${r.description}`).join('\n')}

## Questions fréquentes

${[...generalFaq, ...categories.flatMap((c) => c.faq), ...renataFranca.faq].map(([q, an]) => `### ${q}\n\n${an}`).join('\n\n')}
`;
fs.writeFileSync(path.join(dist, 'llms.txt'), llms);

fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });
console.log('  ✓ sitemap.xml, robots.txt, llms.txt');
