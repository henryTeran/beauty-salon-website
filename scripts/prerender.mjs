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
const ssrUrl = pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href;
const base = process.env.BASE_PATH || '/';
const noindex = process.env.VITE_NOINDEX === '1';
const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');

// Préchargement de la police de titre (LCP)
const fontFile = fs.readdirSync(path.join(dist, 'assets')).find((f) => /^cormorant-garamond-latin-400-normal.*\.woff2$/.test(f));
const preload = fontFile ? `<link rel="preload" href="${base}assets/${fontFile}" as="font" type="font/woff2" crossorigin />\n    ` : '';

// Une instance du site par langue : la langue est fixée avant le chargement du module
const collect = process.env.I18N_COLLECT ? (globalThis.__I18N_COLLECT__ = new Set()) : null;
const byLang = {};
for (const code of ['fr', 'es', 'en']) {
  globalThis.__LANG__ = code;
  const ssr = await import(`${ssrUrl}?lang=${code}`);
  byLang[code] = ssr;
  const dir = ssr.prefix.slice(1);
  const writePage = (meta, file) => {
    const html = template
      .replace('<html lang="fr-CH"', `<html lang="${ssr.locale}"`)
      .replace('<!--app-head-->', preload + ssr.buildHead(meta))
      .replace('<!--app-html-->', ssr.render(meta.path));
    const out = path.join(dist, dir, file);
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
  };
  for (const r of ssr.routes) writePage(r, r.path === '/' ? 'index.html' : `${r.path.slice(1)}.html`);
  writePage(ssr.notFoundMeta, '404.html');
  if (code === 'fr') writePage(ssr.adminMeta, 'admin.html');
  console.log(`  ✓ ${code} : ${ssr.routes.length} pages`);
}
if (collect) fs.writeFileSync(process.env.I18N_COLLECT, JSON.stringify([...collect], null, 1));
delete globalThis.__I18N_COLLECT__;

const { routes, site, categories, renataFranca, packages, generalFaq, formatDuration, languages, prefixOf } = byLang.fr;

// ---------- sitemap.xml ----------
const today = new Date().toISOString().split('T')[0];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${languages
  .flatMap((l) =>
    routes.map(
      (r) => `  <url>
    <loc>${site.url}${prefixOf(l.code)}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq || 'monthly'}</changefreq>
    <priority>${((r.priority ?? 0.5) * (l.code === 'fr' ? 1 : 0.8)).toFixed(1)}</priority>
${languages.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.code}" href="${site.url}${prefixOf(a.code)}${r.path}" />`).join('\n')}
  </url>`
    )
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

// ---------- robots.txt (moteurs classiques + moteurs IA explicitement autorisés) ----------
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'CCBot', 'MistralAI-User'];
const robots = noindex ? 'User-agent: *\nDisallow: /\n' : `User-agent: *
Allow: /
Disallow: /admin

${aiBots.map((b) => `User-agent: ${b}\nAllow: /`).join('\n\n')}

Sitemap: ${site.url}/sitemap.xml
`;
fs.writeFileSync(path.join(dist, 'robots.txt'), robots);

// ---------- llms.txt (GEO : résumé factuel pour les assistants IA) ----------
const price = (s) => `${s.name}${s.duration ? ` (${formatDuration(s.duration)})` : ''} : ${s.price} CHF${s.offer ? ` — ${s.offer.label} : ${s.offer.price} CHF (${s.offer.note.toLowerCase()})` : ''}`;
const a = site.address;
const llms = `# ${site.name}

> Esthéticienne à domicile à ${a.locality} (Suisse) : ${site.owner}. Soins du visage, lifting coréen des cils, teintures cils et sourcils, épilation, massages relaxants et amincissants, drainage lymphatique méthode Renata França. Tous les soins sont réalisés à domicile, sur rendez-vous (pas de cabinet). Valeurs : ${site.values.join(', ').toLowerCase()}.

## Informations pratiques

- Nom : ${site.name}
- Lieu : soins à domicile uniquement, à ${a.locality} et environs (Suisse)
- Téléphone / WhatsApp : ${site.phoneDisplay}${site.email ? `\n- E-mail : ${site.email}` : ''}
- Horaires : ${site.openingHoursText.map(([d, h]) => `${d} ${h}`).join(' ; ')}
- Réservation : ${site.url}/reservation (WhatsApp, téléphone ou formulaire)
- Zones desservies à domicile : ${site.areaServed.join(', ')}
- Devise : CHF (francs suisses)\n- Langues du site : français (${site.url}/), español (${site.url}/es/), English (${site.url}/en/)

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
