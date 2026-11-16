import { site, absUrl, fileUrl } from '../config/site.js';
import { t, locale } from '../i18n/index.js';
import { categories, packages } from '../data/services.js';

const BUSINESS_ID = `${site.url}/#business`;
const WEBSITE_ID = `${site.url}/#website`;
const PERSON_ID = `${site.url}/#maria-fernanda`;

const dayMap = { Monday: 'Mo', Tuesday: 'Tu', Wednesday: 'We', Thursday: 'Th', Friday: 'Fr', Saturday: 'Sa', Sunday: 'Su' };

const isoDuration = (min) => (min ? `PT${Math.floor(min / 60) ? `${Math.floor(min / 60)}H` : ''}${min % 60 ? `${min % 60}M` : ''}` : undefined);

const clean = (obj) => JSON.parse(JSON.stringify(obj, (k, v) => (v === '' || v === null ? undefined : v)));

export function businessSchema() {
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    '@type': ['BeautySalon', 'HealthAndBeautyBusiness'],
    '@id': BUSINESS_ID,
    name: site.name,
    alternateName: site.shortName,
    slogan: site.tagline,
    description:
      t("Esthéticienne à domicile à Genève : soins du visage, lifting coréen des cils, teintures, épilation, massages relaxants et amincissants, drainage lymphatique Renata França. Soins réalisés à domicile, sur rendez-vous."),
    url: absUrl('/'),
    telephone: site.phone,
    email: site.email,
    image: [fileUrl('/og-image.jpg'), fileUrl('/images/soin-visage-1400.webp')],
    logo: fileUrl('/icons/icon-512.png'),
    priceRange: site.priceRange,
    currenciesAccepted: site.currency,
    paymentAccepted: site.paymentAccepted.join(', '),
    knowsLanguage: site.languages,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.streetAddress,
      postalCode: site.address.postalCode,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: site.areaServed.map((name) => ({ '@type': 'City', name })),
    openingHoursSpecification: site.openingHours.map((o) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: o.days.map((d) => `https://schema.org/${d}`),
      opens: o.opens,
      closes: o.closes,
    })),
    openingHours: site.openingHours.map((o) => `${o.days.map((d) => dayMap[d]).join(',')} ${o.opens}-${o.closes}`),
    founder: { '@id': PERSON_ID },
    sameAs: sameAs.length ? sameAs : undefined,
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: t('Soins et tarifs'),
      itemListElement: [
        ...categories.map((c) => ({
          '@type': 'OfferCatalog',
          name: c.name,
          url: absUrl(c.slug),
          itemListElement: c.services.map((s) => offerFor(s)),
        })),
        {
          '@type': 'OfferCatalog',
          name: t('Forfaits'),
          url: absUrl('/forfaits'),
          itemListElement: packages.flatMap((p) => p.items.map((s) => offerFor(s))),
        },
      ],
    },
  };
}

function offerFor(s) {
  return {
    '@type': 'Offer',
    price: s.price,
    priceCurrency: site.currency,
    itemOffered: {
      '@type': 'Service',
      name: s.duration ? `${s.name} (${s.duration} min)` : s.name,
      description: s.description,
    },
  };
}

export function personSchema() {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.owner,
    jobTitle: site.jobTitle,
    worksFor: { '@id': BUSINESS_ID },
    knowsAbout: [
      'Soin du visage', 'Lifting coréen des cils', 'Rehaussement de cils', 'Teinture des cils et sourcils',
      'Épilation', 'Massage relaxant', 'Massage amincissant', 'Drainage lymphatique Renata França',
    ].map((v) => t(v)),
    url: absUrl('/a-propos'),
  };
}

export function websiteSchema() {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: absUrl('/'),
    name: site.name,
    inLanguage: locale,
    publisher: { '@id': BUSINESS_ID },
  };
}

export function webPageSchema(meta) {
  return {
    '@type': meta.pageType || 'WebPage',
    '@id': `${absUrl(meta.path)}#webpage`,
    url: absUrl(meta.path),
    name: meta.title,
    description: meta.description,
    inLanguage: locale,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    primaryImageOfPage: meta.image ? fileUrl(meta.image) : undefined,
    breadcrumb: meta.breadcrumbs ? { '@id': `${absUrl(meta.path)}#breadcrumb` } : undefined,
  };
}

export function breadcrumbSchema(meta) {
  const items = [[t('Accueil'), '/'], ...meta.breadcrumbs];
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absUrl(meta.path)}#breadcrumb`,
    itemListElement: items.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: absUrl(path),
    })),
  };
}

export function faqSchema(faq) {
  return {
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function servicesSchema(cat) {
  return cat.services.map((s) => ({
    '@type': 'Service',
    name: s.name,
    serviceType: cat.name,
    description: s.description || cat.intro?.[0],
    provider: { '@id': BUSINESS_ID },
    areaServed: { '@type': 'City', name: 'Genève' },
    url: absUrl(cat.slug),
    timeRequired: isoDuration(s.duration),
    offers: [
      { '@type': 'Offer', price: s.price, priceCurrency: site.currency, availability: 'https://schema.org/InStock' },
      ...(s.offer
        ? [{ '@type': 'Offer', name: s.offer.label, description: s.offer.note, price: s.offer.price, priceCurrency: site.currency }]
        : []),
    ],
  }));
}

/** Construit le graphe JSON-LD complet d'une page */
export function buildGraph(meta) {
  const graph = [businessSchema(), websiteSchema(), personSchema(), webPageSchema(meta)];
  if (meta.breadcrumbs) graph.push(breadcrumbSchema(meta));
  if (meta.faq?.length) graph.push(faqSchema(meta.faq));
  if (meta.category) graph.push(...servicesSchema(meta.category));
  return clean({ '@context': 'https://schema.org', '@graph': graph });
}
