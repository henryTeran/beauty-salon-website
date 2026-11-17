/**
 * Configuration centrale du site.
 * ⚠️ Tous les champs marqués TODO doivent être vérifiés / complétés avant la mise en ligne :
 * ils alimentent le SEO local (Google Business Profile, données structurées, NAP).
 */
import { t, localize, prefix, prefixOf } from '../i18n/index.js';

export const site = {
  // URL de production, SANS slash final. Peut être surchargée par la variable d'env VITE_SITE_URL au build.
  url: import.meta.env.VITE_SITE_URL || 'https://www.mariafernanda-beaute.ch', // TODO: domaine définitif
  // Version de validation : VITE_NOINDEX=1 empêche l'indexation par les moteurs
  noindex: import.meta.env.VITE_NOINDEX === '1',

  name: 'María Fernanda Beauté & Bien-être',
  shortName: 'María Fernanda',
  tagline: t('Révélez votre beauté naturelle'),
  values: ['Expertise', 'Douceur', 'Résultats naturels'].map((v) => t(v)),
  owner: 'María Fernanda',
  // Nom complet de la responsable (mentions légales, politique de confidentialité). TODO: confirmer l'orthographe exacte
  legalName: 'María Fernanda Rodriguez',
  jobTitle: t('Esthéticienne & praticienne bien-être'),

  phone: '+41786898020',
  phoneDisplay: '+41 78 689 80 20',
  whatsapp: '41786898020',
  email: 'rodmafer6@gmail.com',

  // Pas d'adresse publique : soins uniquement à domicile, sur rendez-vous (seule la ville est indiquée).
  address: {
    streetAddress: '',
    postalCode: '',
    locality: 'Genève',
    region: 'GE',
    regionName: 'Canton de Genève',
    country: 'CH',
  },

  // Zones desservies (SEO local + soins à domicile)
  areaServed: [
    'Genève', 'Carouge', 'Lancy', 'Plan-les-Ouates', 'Onex', 'Vernier', 'Meyrin',
    'Chêne-Bougeries', 'Thônex', 'Cologny', 'Le Grand-Saconnex', 'Versoix',
  ],

  // Horaires (format schema.org). TODO: confirmer les jours
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:00', closes: '19:00' },
  ],
  openingHoursText: localize([
    ['Lundi – Samedi', '9h00 – 19h00'],
    ['Dimanche', 'Fermé'],
  ]),

  social: {
    instagram: 'https://www.instagram.com/mafer_gz1921/',
    facebook: '',
    googleBusiness: '', // TODO: lien de la fiche Google Business Profile
  },

  // Création du site (crédit en pied de page, mentions légales, données structurées)
  creator: { name: 'Henry Teran', label: 'henryteran.com', url: 'https://henryteran.com' },

  // Hébergeur des pages (mentions légales). TODO: adapter à l'hébergement définitif
  host: { name: 'GitHub, Inc. (GitHub Pages)', country: { fr: 'États-Unis', es: 'Estados Unidos', en: 'United States' } },

  // Mesure d'audience Google Analytics : chargée uniquement si le visiteur l'accepte. Laisser vide pour la désactiver.
  analyticsId: 'G-JR7WC4KXVG',

  brochure: '/brochure-maria-fernanda.pdf',

  priceRange: 'CHF 12 – 600',
  currency: 'CHF',
  languages: ['fr', 'es'], // langues parlées par l'esthéticienne
  paymentAccepted: ['Espèces'].map((v) => t(v)), // règlement en espèces à la fin du soin
};

export const telHref = `tel:${site.phone}`;
export const waHref = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
/** Chemin d'un fichier de /public en tenant compte du sous-dossier de déploiement */
export const asset = (p) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${p}`;
/** URL absolue d'une page dans une langue donnée (par défaut : la langue courante) */
export const langUrl = (code, path = '/') => `${site.url}${prefixOf(code)}${path === '/' ? '/' : path}`;
export const absUrl = (path = '/') => `${site.url}${prefix}${path === '/' ? '/' : path}`;
/** URL absolue d'un fichier (image, icône) : jamais préfixée par la langue */
export const fileUrl = (path) => `${site.url}${path}`;
