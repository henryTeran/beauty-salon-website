import { site } from '../config/site.js';
import { categories, renataFranca, generalFaq, domicileFaq } from '../data/services.js';

/**
 * Registre des pages : unique source pour le <head>, le prerender et le sitemap.
 * title ≤ ~60 caractères, description ≤ ~160 caractères.
 */
const brand = ' | María Fernanda';

export const routes = [
  {
    path: '/',
    title: 'Institut de beauté à Genève | María Fernanda Beauté & Bien-être',
    description:
      "María Fernanda Beauté & Bien-être, Genève : soin du visage, lifting coréen des cils, épilation, massages et drainage Renata França. Au cabinet ou à domicile.",
    image: '/og-image.jpg',
    faq: generalFaq,
    priority: 1.0,
    changefreq: 'weekly',
  },
  {
    path: '/soins-et-tarifs',
    title: `Soins & tarifs – esthéticienne à Genève${brand}`,
    description:
      'Tous les soins et tarifs en CHF : visage dès 80 CHF, lifting coréen des cils 100 CHF, épilation dès 12 CHF, massages dès 50 CHF, drainage Renata França 130 CHF.',
    breadcrumbs: [['Soins & tarifs', '/soins-et-tarifs']],
    pageType: 'CollectionPage',
    priority: 0.9,
  },
  ...[...categories, renataFranca].map((c) => ({
    path: c.slug,
    title: `${c.seo.title}${c.seo.title.length < 40 ? brand : ''}`,
    description: c.seo.description,
    image: c.image ? `${c.image.src}-${c.image.widths[c.image.widths.length - 1]}.webp` : undefined,
    breadcrumbs: [['Soins & tarifs', '/soins-et-tarifs'], [c.navLabel, c.slug]],
    faq: c.faq,
    category: c,
    priority: 0.9,
  })),
  {
    path: '/forfaits',
    title: `Forfaits beauté & cures bien-être à Genève${brand}`,
    description:
      'Forfaits Regard (115 CHF), Épilation & teintures (dès 27 CHF) et cures de 3 ou 5 massages ou drainages Renata França jusqu’à 50 CHF d’économie.',
    breadcrumbs: [['Forfaits', '/forfaits']],
    priority: 0.8,
  },
  {
    path: '/soins-a-domicile-geneve',
    title: 'Esthéticienne à domicile à Genève – massages & soins',
    description:
      'Soins esthétiques et massages à domicile à Genève et environs (Carouge, Lancy, Onex, Vernier…), sur rendez-vous. Le confort d’un institut, chez vous.',
    breadcrumbs: [['Soins à domicile', '/soins-a-domicile-geneve']],
    faq: domicileFaq,
    priority: 0.8,
  },
  {
    path: '/a-propos',
    title: `À propos de María Fernanda – esthéticienne à Genève`,
    description:
      'Rencontrez María Fernanda, esthéticienne et praticienne bien-être à Genève. Une approche douce, experte et tournée vers des résultats naturels.',
    breadcrumbs: [['À propos', '/a-propos']],
    pageType: 'AboutPage',
    priority: 0.6,
  },
  {
    path: '/reservation',
    title: `Réserver un soin à Genève – rendez-vous${brand}`,
    description: `Réservez votre soin en quelques secondes par WhatsApp, téléphone (${site.phoneDisplay}) ou formulaire. Cabinet à Genève et soins à domicile.`,
    breadcrumbs: [['Réservation', '/reservation']],
    pageType: 'ContactPage',
    priority: 0.7,
  },
  {
    path: '/mentions-legales',
    title: `Mentions légales${brand}`,
    description: `Mentions légales du site ${site.name}.`,
    breadcrumbs: [['Mentions légales', '/mentions-legales']],
    priority: 0.1,
    changefreq: 'yearly',
  },
  {
    path: '/confidentialite',
    title: `Politique de confidentialité${brand}`,
    description: `Politique de confidentialité et protection des données (nLPD) de ${site.name}.`,
    breadcrumbs: [['Confidentialité', '/confidentialite']],
    priority: 0.1,
    changefreq: 'yearly',
  },
];

export const notFoundMeta = {
  path: '/404',
  title: `Page introuvable${brand}`,
  description: 'Cette page n’existe pas ou a été déplacée.',
  noindex: true,
};

export const getRouteMeta = (pathname) => {
  const p = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;
  return routes.find((r) => r.path === p) || notFoundMeta;
};
