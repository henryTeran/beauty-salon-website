import { t, localize } from '../i18n/index.js';

/**
 * Source unique des prestations (issue de la brochure officielle).
 * Utilisée par les pages, le formulaire de réservation, les données structurées,
 * le sitemap et llms.txt. Modifier un prix ici le met à jour partout.
 */

export const categories = localize([
  {
    id: 'visage',
    slug: '/soins/soin-visage-geneve',
    name: 'Visage',
    kicker: 'Éclat et soin personnalisé',
    navLabel: 'Soins du visage',
    image: { src: '/images/soin-visage', widths: [800, 1400], ratio: 1.5, alt: 'Soin du visage relaxant réalisé à domicile à Genève' },
    seo: {
      title: 'Soin du visage à Genève – classique & sur-mesure dès 80 CHF',
      description:
        "Soin du visage à Genève : nettoyage, exfoliation, extraction, masque et soin adapté à votre peau. Hydratation, éclat, anti-imperfections ou anti-âge. Dès 80 CHF.",
    },
    h1: 'Soin du visage à Genève',
    intro: [
      "Une peau éclatante commence par un diagnostic juste. Chaque soin du visage débute par un échange sur vos habitudes, votre ressenti et l'état de votre peau, pour choisir les gestes et les produits qui lui conviennent vraiment.",
      "Le soin classique offre une heure de nettoyage en profondeur et de détente. Le soin spécifique, plus long, cible un besoin précis : déshydratation, teint terne, imperfections ou premiers signes de l'âge. Dans les deux cas, l'objectif est le même : une peau nette, reposée et lumineuse, sans effet artificiel.",
    ],
    benefits: ['Peau nettoyée en profondeur', 'Teint plus lumineux', 'Protocole adapté à votre type de peau', 'Moment de détente complet'],
    steps: [
      ['Diagnostic', 'Analyse de la peau et de vos attentes.'],
      ['Nettoyage & exfoliation', 'Démaquillage, gommage doux et extraction si besoin.'],
      ['Masque & modelage', 'Masque ciblé et gestes relaxants du visage.'],
      ['Soin final', 'Sérum et crème adaptés, conseils pour la maison.'],
    ],
    faq: [
      ['À quelle fréquence faire un soin du visage ?', "Idéalement toutes les 4 à 6 semaines, soit environ la durée d'un cycle de renouvellement cellulaire. Un soin ponctuel avant un événement est aussi possible."],
      ['Quelle différence entre le soin classique et le soin spécifique ?', "Le soin classique (1h, 80 CHF) est un soin complet de nettoyage et d'hydratation. Le soin spécifique (1h30, 110 CHF) ajoute un protocole ciblé : hydratation intense, éclat, anti-imperfections ou anti-âge."],
      ['Puis-je me maquiller après le soin ?', "Il est préférable de laisser respirer la peau quelques heures après le soin pour profiter pleinement de ses bienfaits."],
    ],
    services: [
      {
        id: 'visage-classique',
        name: 'Soin du visage classique',
        duration: 60,
        price: 80,
        description: 'Nettoyage, exfoliation, extraction si besoin, masque et soin adapté à votre peau.',
      },
      {
        id: 'visage-specifique',
        name: 'Soin du visage spécifique',
        duration: 90,
        price: 110,
        description: 'Soin personnalisé selon les besoins de votre peau (hydratation, éclat, anti-imperfections, anti-âge).',
      },
    ],
  },
  {
    id: 'regard',
    slug: '/soins/rehaussement-cils-coreen-geneve',
    name: 'Beauté du regard',
    kicker: 'Sublimez votre regard naturel',
    navLabel: 'Lifting coréen & teintures',
    image: { src: '/images/regard-cils', widths: [345], ratio: 0.39, alt: 'Cils rehaussés après un lifting coréen des cils' },
    seo: {
      title: 'Lifting coréen des cils à Genève – rehaussement dès 90 CHF',
      description:
        'Lifting coréen des cils (rehaussement) et teinture cils & sourcils à Genève. Un regard plus ouvert et lumineux, sans extensions. Offre de bienvenue : 90 CHF.',
    },
    h1: 'Lifting coréen des cils & teintures à Genève',
    intro: [
      "Le lifting coréen des cils rehausse et courbe vos cils naturels depuis la racine. Le regard paraît plus ouvert, plus reposé, sans extensions ni mascara au quotidien. Le protocole intègre un soin nourrissant pour respecter la fibre du cil.",
      "Associé à une teinture des cils, il intensifie la couleur jusqu'aux pointes pour un effet « mascara naturel ». La teinture des sourcils, elle, structure et densifie la ligne du sourcil tout en restant fidèle à votre carnation.",
    ],
    benefits: ['Regard ouvert sans extensions', 'Tenue de plusieurs semaines', 'Soin nourrissant des cils inclus', 'Résultat naturel et lumineux'],
    steps: [
      ['Préparation', 'Nettoyage des cils et protection des yeux.'],
      ['Rehaussement', 'Pose des moules et courbure sur mesure.'],
      ['Fixation & soin', 'Fixation douce puis soin nourrissant.'],
      ['Teinture (option)', 'Intensification de la couleur des cils.'],
    ],
    faq: [
      ['Combien de temps dure un lifting coréen des cils ?', "Le résultat tient généralement 6 à 8 semaines, selon le cycle naturel de renouvellement de vos cils."],
      ['Le lifting des cils abîme-t-il les cils ?', "Réalisé avec précision et suivi d'un soin, le rehaussement respecte la fibre du cil. Il est conseillé d'espacer les séances d'au moins 6 semaines."],
      ["Qu'est-ce que l'offre de bienvenue ?", "Pour votre première séance de lifting coréen des cils, la prestation est à 90 CHF au lieu de 100 CHF."],
      ['Lifting et teinture le même jour ?', "Oui : le forfait Regard (lifting coréen + teinture des cils) est proposé à 115 CHF."],
    ],
    services: [
      {
        id: 'lifting-coreen',
        name: 'Lifting coréen des cils',
        duration: 90,
        price: 100,
        description: 'Rehaussement des cils avec soin et précision, pour un regard plus ouvert et lumineux.',
        offer: { label: 'Offre de bienvenue', price: 90, note: 'Première séance uniquement' },
      },
      { id: 'teinture-cils', name: 'Teinture des cils', price: 25, description: 'Intensifie la couleur des cils jusqu’aux pointes.' },
      { id: 'teinture-sourcils', name: 'Teinture des sourcils', price: 20, description: 'Structure et densifie la ligne du sourcil.' },
    ],
  },
  {
    id: 'epilation',
    slug: '/soins/epilation-geneve',
    name: 'Épilation',
    kicker: 'Douceur et précision',
    navLabel: 'Épilation',
    seo: {
      title: 'Épilation à Genève – sourcils, lèvre, jambes dès 12 CHF',
      description:
        "Épilation à Genève avec douceur et précision : sourcils, lèvre supérieure, demi-jambes et jambes complètes. Tarifs clairs dès 12 CHF, sur rendez-vous.",
    },
    h1: 'Épilation à Genève',
    intro: [
      "Une épilation réussie, c'est d'abord une question de précision et de confort. Les sourcils sont redessinés en respectant la forme naturelle de votre visage ; les jambes et la lèvre sont traitées avec des gestes sûrs pour limiter les rougeurs.",
      "Les prestations se combinent facilement avec une teinture des sourcils ou un soin du regard, grâce aux forfaits Épilation & Teintures.",
    ],
    benefits: ['Ligne de sourcils sur mesure', 'Gestes rapides et précis', 'Peau douce et nette', 'Combinable avec les teintures'],
    faq: [
      ['Quelle longueur de poils pour une épilation ?', "Idéalement quelques millimètres, soit environ 3 à 4 semaines de repousse après la dernière épilation."],
      ['Puis-je combiner épilation et teinture des sourcils ?', "Oui, le forfait épilation des sourcils + teinture des sourcils est proposé à 35 CHF."],
    ],
    services: [
      { id: 'epil-levre', name: 'Épilation lèvre', price: 12 },
      { id: 'epil-sourcils', name: 'Épilation sourcils', price: 18 },
      { id: 'epil-demi-jambes', name: 'Demi-jambes', price: 25 },
      { id: 'epil-jambes', name: 'Jambes complètes', price: 45 },
    ],
  },
  {
    id: 'corps',
    slug: '/soins/massage-geneve',
    name: 'Corps & bien-être',
    kicker: 'Lâcher prise et se ressourcer',
    navLabel: 'Massages',
    image: { src: '/images/massage', widths: [800, 1600], ratio: 0.667, alt: 'Massage relaxant du dos à domicile à Genève' },
    seo: {
      title: 'Massage à Genève – relaxant, amincissant, dos dès 50 CHF',
      description:
        'Massages à Genève : massage relaxant, massage amincissant, massage du dos 30 min ou 1h et drainage lymphatique Renata França. À domicile, sur rendez-vous.',
    },
    h1: 'Massages relaxants & amincissants à Genève',
    intro: [
      "Un massage, c'est une parenthèse : une heure pour relâcher les tensions, apaiser le mental et retrouver un corps plus léger. Chaque séance est adaptée à votre état du jour, à la pression souhaitée et aux zones à privilégier.",
      "Le massage relaxant enveloppe le corps de manœuvres lentes et profondes. Le massage amincissant, plus tonique, aide à affiner la silhouette et à tonifier la peau. Le massage du dos cible les tensions accumulées par le stress et les postures du quotidien.",
    ],
    benefits: ['Détente profonde du corps et de l’esprit', 'Tensions musculaires soulagées', 'Pression adaptée à chaque séance', 'Réalisé chez vous, sans déplacement'],
    faq: [
      ['Quel massage choisir pour décompresser ?', "Le massage relaxant d'une heure est idéal pour une détente globale. Si les tensions sont surtout localisées, le massage du dos (30 min ou 1h) est plus ciblé."],
      ['Le massage amincissant fait-il maigrir ?', "Il ne remplace pas une alimentation équilibrée et une activité physique, mais il aide à affiner la silhouette et à tonifier la peau, surtout en cure (forfait 3 séances à 265 CHF)."],
      ['Où se déroulent les massages ?', "Chez vous : tous les soins sont réalisés à domicile, sur rendez-vous, à Genève et dans les communes voisines. Le matériel nécessaire est apporté."],
    ],
    services: [
      { id: 'massage-relaxant', name: 'Massage relaxant', duration: 60, price: 85, description: 'Détente profonde du corps et de l’esprit.' },
      { id: 'massage-amincissant', name: 'Massage amincissant', duration: 60, price: 95, description: 'Aide à affiner la silhouette et à tonifier la peau.' },
      {
        id: 'drainage-rf',
        name: 'Drainage lymphatique Renata França',
        duration: 60,
        price: 130,
        description: 'Stimule la circulation et réduit la rétention d’eau.',
        link: '/soins/drainage-lymphatique-renata-franca-geneve',
      },
      { id: 'massage-dos-30', name: 'Massage du dos', duration: 30, price: 50, description: 'Soulage les tensions et détend en profondeur.' },
      { id: 'massage-dos-60', name: 'Massage du dos', duration: 60, price: 75, description: 'Détente ciblée et relaxation complète.' },
    ],
  },
]);

/** Page dédiée (mot-clé à fort potentiel) – réutilise le service du catalogue */
export const renataFranca = localize({
  id: 'renata-franca',
  slug: '/soins/drainage-lymphatique-renata-franca-geneve',
  name: 'Drainage lymphatique Renata França',
  kicker: 'Légèreté et silhouette affinée',
  navLabel: 'Drainage Renata França',
  image: { src: '/images/massage', widths: [800, 1600], ratio: 0.667, alt: 'Drainage lymphatique méthode Renata França à Genève' },
  seo: {
    title: 'Drainage lymphatique Renata França à Genève – 130 CHF',
    description:
      'Drainage lymphatique méthode Renata França à Genève : manœuvres rythmées pour stimuler la circulation, dégonfler et affiner la silhouette. Séance 1h ou cure de 3 ou 5.',
  },
  h1: 'Drainage lymphatique Renata França à Genève',
  intro: [
    "Développée par la thérapeute brésilienne Renata França, cette méthode de drainage lymphatique se distingue par des manœuvres fermes, rapides et rythmées. Elle stimule la circulation de la lymphe pour aider l'organisme à éliminer l'excès d'eau.",
    "Dès la première séance, beaucoup de personnes ressentent une sensation de jambes légères et un ventre plus plat. Pour des résultats plus durables, une cure de plusieurs séances rapprochées est recommandée : c'est tout l'intérêt des forfaits 3 et 5 séances.",
  ],
  benefits: ['Sensation de légèreté immédiate', 'Silhouette visiblement dégonflée', 'Circulation stimulée', 'Idéal en cure de 3 ou 5 séances'],
  steps: [
    ['Échange', 'Vos objectifs, vos zones de rétention, vos contre-indications.'],
    ['Drainage', 'Manœuvres rythmées de la méthode, du cou aux pieds.'],
    ['Ressenti', 'Corps léger, conseils d’hydratation après la séance.'],
  ],
  faq: [
    ['Combien de séances de drainage Renata França faut-il ?', "Une séance donne déjà un effet dégonflant. Pour un résultat durable, on conseille une cure de 3 à 5 séances rapprochées (forfaits à 360 CHF et 600 CHF)."],
    ['Le drainage lymphatique Renata França fait-il mal ?', "Les manœuvres sont plus fermes qu'un drainage classique, mais ne doivent pas être douloureuses. La pression est ajustée à votre confort."],
    ['Y a-t-il des contre-indications ?', "Oui, notamment en cas de problème cardiaque, de thrombose, d'infection en cours ou pendant certaines périodes de grossesse. En cas de doute, demandez l'avis de votre médecin avant la séance."],
    ['Que faire après une séance ?', "Bien s'hydrater et privilégier une alimentation légère le jour même pour prolonger l'effet drainant."],
  ],
  services: [
    { id: 'drainage-rf', name: 'Drainage lymphatique Renata França', duration: 60, price: 130, description: 'Stimule la circulation et réduit la rétention d’eau.' },
  ],
});

export const packages = localize([
  {
    id: 'regard',
    name: 'Regard',
    icon: 'eye',
    note: 'Un regard plus intense et lumineux.',
    items: [{ id: 'f-regard', name: 'Lifting coréen + teinture des cils', price: 115 }],
  },
  {
    id: 'epilation-teintures',
    name: 'Épilation & teintures',
    icon: 'brow',
    note: 'Des prestations complémentaires pour un regard harmonieux.',
    items: [
      { id: 'f-sourcils-levre', name: 'Épilation sourcils + lèvre', price: 27 },
      { id: 'f-sourcils-teinture', name: 'Épilation sourcils + teinture sourcils', price: 35 },
      { id: 'f-teintures', name: 'Teinture cils + teinture sourcils', price: 40 },
    ],
  },
  {
    id: 'bien-etre',
    name: 'Bien-être',
    icon: 'lotus',
    note: 'Des forfaits pour prolonger les bienfaits du soin dans la durée.',
    items: [
      { id: 'f-3-relaxants', name: '3 massages relaxants', duration: 60, price: 240, saving: 15 },
      { id: 'f-3-amincissants', name: '3 massages amincissants', duration: 60, price: 265, saving: 20 },
      { id: 'f-3-drainages', name: '3 drainages Renata França', duration: 60, price: 360, saving: 30 },
      { id: 'f-5-drainages', name: '5 drainages Renata França', duration: 60, price: 600, saving: 50 },
    ],
  },
]);

export const generalFaq = localize([
  ['Comment prendre rendez-vous ?', "Par téléphone, par WhatsApp ou via le formulaire de réservation du site. Vous recevez une confirmation personnalisée de votre créneau."],
  ['Où se déroulent les soins ?', "Tous les soins sont réalisés à domicile, sur rendez-vous, à Genève et dans les communes voisines. Il n'y a pas de cabinet : María Fernanda se déplace chez vous avec le matériel nécessaire. Les modalités de déplacement sont précisées lors de la réservation."],
  ['Existe-t-il une offre pour une première visite ?', "Oui : le lifting coréen des cils est à 90 CHF au lieu de 100 CHF pour une première séance."],
  ['Proposez-vous des forfaits ?', "Oui : forfait Regard (115 CHF), forfaits Épilation & teintures (dès 27 CHF) et cures bien-être de 3 ou 5 séances (de 240 à 600 CHF)."],
]);

export const domicileFaq = localize([
  ['Quels soins sont proposés à domicile ?', 'Tous les soins de la carte sont réalisés à domicile, sur rendez-vous : soins du visage, lifting coréen des cils, teintures, épilation, massages et drainage lymphatique Renata França.'],
  ['Y a-t-il des frais de déplacement ?', 'Les modalités de déplacement dépendent de votre adresse et sont précisées lors de la réservation, avant toute confirmation.'],
  ['Dans quelles communes vous déplacez-vous ?', 'À Genève et dans les communes voisines du canton (Carouge, Lancy, Onex, Vernier, Meyrin, Chêne-Bougeries, Thônex…). Pour une autre commune, contactez-nous.'],
  ['Que faut-il prévoir chez soi ?', 'Un espace calme et suffisamment dégagé. Le matériel nécessaire au soin est apporté.'],
]);

export const formatDuration = (min) => {
  if (!min) return '';
  if (min < 60) return `${min} min`;
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m ? `${h}h${m}` : `${h}h`;
};

/** Toutes les prestations à plat (pour le formulaire de réservation) */
export const allServices = () => {
  const seen = new Set();
  const list = [];
  categories.forEach((c) =>
    c.services.forEach((s) => {
      if (seen.has(s.id)) return;
      seen.add(s.id);
      list.push({ ...s, category: c.name });
    })
  );
  packages.forEach((p) =>
    p.items.forEach((s) => list.push({ ...s, category: t('Forfait {0}', p.name) }))
  );
  return list;
};

/** Durée bloquée dans le planning quand la brochure n'en précise pas (une séance ; pour une cure, la première) */
export const bookingMinutes = (s) => Number(s.duration) || (s.id === 'f-regard' ? 120 : 30);

/**
 * Fusionne le catalogue du site avec les prestations gérées dans l'espace privé (Firestore) :
 * un document portant l'id d'une prestation existante la modifie (prix, durée, description, masquée),
 * les autres sont de nouvelles prestations rattachées à une catégorie.
 */
const builtinIds = () => new Set(allServices().map((s) => s.id));
const override = (s, custom) => {
  const o = custom.find((c) => c.id === s.id);
  return o ? { ...s, ...o } : s;
};
export function servicesFor(cat, custom = []) {
  const ids = builtinIds();
  return [
    ...cat.services.map((s) => override(s, custom)),
    ...custom.filter((c) => !ids.has(c.id) && c.category === cat.id),
  ].filter((s) => !s.hidden);
}
export function packageItems(pack, custom = []) {
  return pack.items.map((s) => override(s, custom)).filter((s) => !s.hidden);
}
export function allServicesWith(custom = [], { includeHidden = false } = {}) {
  const ids = builtinIds();
  const names = Object.fromEntries(categories.map((c) => [c.id, c.name]));
  return [
    ...allServices().map((s) => override(s, custom)),
    ...custom.filter((c) => !ids.has(c.id)).map((c) => ({ ...c, category: names[c.category] || t('Autres soins'), categoryId: c.category, custom: true })),
  ].filter((s) => includeHidden || !s.hidden);
}
