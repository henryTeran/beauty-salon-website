/**
 * Configuration centrale du site.
 * ⚠️ Tous les champs marqués TODO doivent être vérifiés / complétés avant la mise en ligne :
 * ils alimentent le SEO local (Google Business Profile, données structurées, NAP).
 */
export const site = {
  // URL de production, SANS slash final. Peut être surchargée par la variable d'env SITE_URL au build.
  url: (typeof process !== 'undefined' && process.env && process.env.SITE_URL) || 'https://www.mariafernanda-beaute.ch', // TODO: domaine définitif

  name: 'María Fernanda Beauté & Bien-être',
  shortName: 'María Fernanda',
  tagline: 'Révélez votre beauté naturelle',
  values: ['Expertise', 'Douceur', 'Résultats naturels'],
  owner: 'María Fernanda',
  jobTitle: 'Esthéticienne & praticienne bien-être',

  phone: '+41786898020',
  phoneDisplay: '+41 78 689 80 20',
  whatsapp: '41786898020',
  email: '', // TODO: adresse e-mail professionnelle (ex. contact@mariafernanda-beaute.ch)

  // Adresse du cabinet. Laisser streetAddress vide si les soins sont uniquement sur rendez-vous / à domicile.
  address: {
    streetAddress: '', // TODO: rue et numéro
    postalCode: '', // TODO: NPA
    locality: 'Genève',
    region: 'GE',
    regionName: 'Canton de Genève',
    country: 'CH',
  },
  // Coordonnées GPS approximatives (centre de Genève) – TODO: remplacer par celles du cabinet
  geo: { lat: 46.2044, lng: 6.1432 },

  // Zones desservies (SEO local + soins à domicile)
  areaServed: [
    'Genève', 'Carouge', 'Lancy', 'Plan-les-Ouates', 'Onex', 'Vernier', 'Meyrin',
    'Chêne-Bougeries', 'Thônex', 'Cologny', 'Le Grand-Saconnex', 'Versoix',
  ],

  // Horaires (format schema.org). TODO: confirmer
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '19:00' },
    { days: ['Saturday'], opens: '09:00', closes: '16:00' },
  ],
  openingHoursText: [
    ['Lundi – Vendredi', '9h00 – 19h00'],
    ['Samedi', '9h00 – 16h00'],
    ['Dimanche', 'Fermé'],
  ],

  social: {
    instagram: '', // TODO: https://www.instagram.com/...
    facebook: '',
    googleBusiness: '', // TODO: lien de la fiche Google Business Profile
  },

  priceRange: 'CHF 12 – 600',
  currency: 'CHF',
  languages: ['fr', 'es', 'en'], // TODO: langues parlées au cabinet
  paymentAccepted: ['Espèces', 'TWINT', 'Carte'], // TODO: confirmer
};

export const telHref = `tel:${site.phone}`;
export const waHref = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const absUrl = (path = '/') => `${site.url}${path === '/' ? '/' : path}`;
