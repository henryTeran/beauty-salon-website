import { Link } from 'react-router-dom';
import { Instagram, Facebook } from 'lucide-react';
import { categories, renataFranca } from '../data/services.js';
import { site, telHref, waHref } from '../config/site.js';
import { Monogram, Leaf } from './ui.jsx';

export default function Footer() {
  const a = site.address;
  return (
    <footer className="relative overflow-hidden bg-bordeaux-deep pb-20 text-cream/80 lg:pb-0">
      <Leaf className="pointer-events-none absolute -right-10 -top-6 w-72 opacity-25" />
      <div className="container-site relative grid gap-12 py-20 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
        <div>
          <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} – accueil`}>
            <Monogram className="h-10 w-14" />
            <span className="leading-none">
              <span className="block font-serif text-lg uppercase tracking-[0.3em] text-cream">María Fernanda</span>
              <span className="mt-1 block text-[0.6rem] uppercase tracking-luxe text-gold-light">Beauté &amp; bien-être</span>
            </span>
          </Link>
          <p className="mt-6 font-script text-4xl text-gold-light">{site.tagline}</p>
          <p className="mt-4 max-w-xs text-[0.95rem] leading-relaxed text-cream/65">
            Soins esthétiques et bien-être à domicile, à Genève et environs. {site.values.join(' · ')}.
          </p>
          <div className="mt-6 flex gap-3">
            {site.social.instagram && (
              <a href={site.social.instagram} rel="noopener me" target="_blank" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-bordeaux">
                <Instagram size={16} strokeWidth={1.5} />
              </a>
            )}
            {site.social.facebook && (
              <a href={site.social.facebook} rel="noopener me" target="_blank" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-cream/25 transition-colors hover:bg-cream hover:text-bordeaux">
                <Facebook size={16} strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        <nav aria-label="Soins">
          <p className="kicker !text-gold-light">Soins</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            {[...categories, renataFranca].map((c) => (
              <li key={c.slug}>
                <Link to={c.slug} className="link-line hover:text-cream">{c.navLabel}</Link>
              </li>
            ))}
            <li><Link to="/forfaits" className="link-line hover:text-cream">Forfaits</Link></li>
            <li><Link to="/soins-et-tarifs" className="link-line hover:text-cream">Tous les tarifs</Link></li>
          </ul>
        </nav>

        <nav aria-label="Informations">
          <p className="kicker !text-gold-light">Informations</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            <li><Link to="/a-propos" className="link-line hover:text-cream">À propos</Link></li>
            <li><Link to="/soins-a-domicile-geneve" className="link-line hover:text-cream">Soins à domicile</Link></li>
            <li><Link to="/reservation" className="link-line hover:text-cream">Réservation &amp; contact</Link></li>
            <li><Link to="/mentions-legales" className="link-line hover:text-cream">Mentions légales</Link></li>
            <li><Link to="/confidentialite" className="link-line hover:text-cream">Confidentialité</Link></li>
          </ul>
        </nav>

        <address className="not-italic">
          <p className="kicker !text-gold-light">Contact</p>
          <ul className="mt-5 space-y-2.5 text-[0.95rem]">
            <li>
              <a href={telHref} className="font-serif text-2xl text-cream">{site.phoneDisplay}</a>
            </li>
            <li><a href={waHref('Bonjour, je souhaite prendre rendez-vous.')} rel="noopener" target="_blank" className="link-line hover:text-cream">WhatsApp</a></li>
            {site.email && <li><a href={`mailto:${site.email}`} className="link-line hover:text-cream">{site.email}</a></li>}
            <li className="pt-2 text-cream/65">
              {a.streetAddress && <>{a.streetAddress}<br /></>}
              À domicile · {a.locality} et environs, Suisse<br />Sur rendez-vous uniquement
            </li>
          </ul>
          <dl className="mt-5 space-y-1 text-[0.88rem] text-cream/65">
            {site.openingHoursText.map(([d, h]) => (
              <div key={d} className="flex justify-between gap-4">
                <dt>{d}</dt>
                <dd>{h}</dd>
              </div>
            ))}
          </dl>
        </address>
      </div>
      <div className="border-t border-cream/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[0.78rem] text-cream/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · Genève</p>
          <p>Zones desservies : {site.areaServed.slice(0, 7).join(', ')}…</p>
        </div>
      </div>
    </footer>
  );
}
