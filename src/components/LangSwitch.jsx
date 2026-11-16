import { useLocation } from 'react-router-dom';
import { languages, lang, prefixOf } from '../i18n/index.js';

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Liens vers la même page dans les autres langues (rechargement complet : chaque langue a ses propres pages) */
export default function LangSwitch({ className = '', light = false }) {
  const { pathname } = useLocation();
  return (
    <ul className={`flex items-center gap-1 text-[0.72rem] uppercase tracking-wide2 ${className}`}>
      {languages.map((l) => {
        const on = l.code === lang;
        return (
          <li key={l.code}>
            <a
              href={`${base}${prefixOf(l.code)}${pathname === '/' ? '/' : pathname}`}
              hrefLang={l.code}
              lang={l.code}
              title={l.label}
              aria-current={on ? 'true' : undefined}
              className={`grid h-8 w-8 place-items-center rounded-full transition-colors ${
                on ? (light ? 'bg-cream text-bordeaux' : 'bg-bordeaux text-cream') : light ? 'text-cream/70 hover:text-cream' : 'text-taupe hover:text-bordeaux'
              }`}
            >
              {l.code}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
