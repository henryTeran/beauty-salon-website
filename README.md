# María Fernanda Beauté & Bien-être — site vitrine

Site de l'institut (Genève) : React 19 + Vite + Tailwind + Framer Motion, **prérendu en HTML statique** (une page HTML complète par URL) pour le SEO et les moteurs IA.

## Commandes

```bash
npm install
npm run dev      # développement
npm run build    # build + prérendu + sitemap.xml / robots.txt / llms.txt → dist/
npm run preview  # prévisualiser dist/
```

Déploiement : publier le dossier `dist/` (Vercel, Netlify, Cloudflare Pages… — `vercel.json` et `netlify.toml` fournis).
Définir le domaine via `SITE_URL=https://mon-domaine.ch npm run build` ou dans `src/config/site.js`.

## Architecture

```
src/
  config/site.js      Identité, téléphone, adresse, horaires, zones, réseaux  ← à compléter (TODO)
  data/services.js    Prestations, prix, forfaits, FAQ (source unique : pages, schémas, llms.txt)
  seo/routes.js       Registre des pages : title, description, fil d'Ariane, priorité sitemap
  seo/schema.js       Données structurées JSON-LD (BeautySalon, Service, FAQPage, BreadcrumbList…)
  seo/head.js         Génération du <head> (prérendu) + mise à jour à la navigation
  components/         Header, Footer, Layout, blocs (tarifs, FAQ, CTA), primitives d'animation
  pages/              Home, Soins, Category (gabarit des pages soin), Forfaits, Domicile, About, Reservation, Legal
  entry-server.jsx    Rendu serveur utilisé par le prérendu
scripts/prerender.mjs Génère les .html, sitemap.xml, robots.txt, llms.txt
```

**Modifier un prix ou ajouter un soin** : uniquement dans `src/data/services.js`, puis `npm run build`.

## Avant la mise en ligne

Compléter les `TODO` de `src/config/site.js` : domaine, adresse, e-mail, horaires, coordonnées GPS, Instagram, fiche Google.
