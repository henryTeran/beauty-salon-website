/**
 * Multilingue (français, espagnol, anglais).
 * La langue vient de l'URL : français à la racine, /es/… et /en/… pour les autres.
 * Les textes du site sont écrits en français ; t('texte français') renvoie sa traduction
 * (src/i18n/es.js, en.js) ou le français s'il n'y en a pas encore.
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const languages = [
  { code: 'fr', label: 'Français', locale: 'fr-CH', og: 'fr_CH' },
  { code: 'es', label: 'Español', locale: 'es-ES', og: 'es_ES' },
  { code: 'en', label: 'English', locale: 'en-GB', og: 'en_GB' },
];

function detect() {
  if (typeof window === 'undefined') return globalThis.__LANG__ || 'fr'; // prérendu
  const m = window.location.pathname.slice(base.length).match(/^\/(es|en)(?=\/|$)/);
  return m ? m[1] : 'fr';
}

export const lang = detect();
export const { locale, og: ogLocale } = languages.find((l) => l.code === lang);
export const prefixOf = (code) => (code === 'fr' ? '' : `/${code}`);
export const prefix = prefixOf(lang);

let dict = {};
if (lang === 'es') dict = (await import('./es.js')).default;
if (lang === 'en') dict = (await import('./en.js')).default;

/** Traduit un texte ; {0}, {1}… sont remplacés par les arguments suivants */
export function t(key, ...args) {
  let s = dict[key];
  if (s === undefined) {
    s = key;
    globalThis.__I18N_COLLECT__?.add(key);
  }
  return args.length ? s.replace(/\{(\d)\}/g, (_, i) => args[i]) : s;
}

const KEEP = new Set(['id', 'slug', 'src', 'icon', 'link', 'path', 'pageType', 'changefreq']);
/** Traduit toutes les chaînes d'un objet de données (sauf identifiants et chemins) */
export function localize(value, key) {
  if (typeof value === 'string') return KEEP.has(key) || value.startsWith('/') ? value : t(value);
  if (Array.isArray(value)) return value.map((v) => localize(v, key));
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, localize(v, k)]));
  return value;
}

/** Heure affichée : 10h30 en français, 10:30 ailleurs */
export const clock = (hhmm) => (lang === 'fr' ? hhmm.replace(':', 'h') : hhmm);
