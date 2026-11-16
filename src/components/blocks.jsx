import { t } from '../i18n/index.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronRight, Plus, Clock } from 'lucide-react';
import { formatDuration } from '../data/services.js';
import { site, telHref, waHref } from '../config/site.js';
import { Reveal, SplitText, Leaf, Magnetic, SectionHead, ease } from './ui.jsx';

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label={t("Fil d’Ariane")} className="text-[0.72rem] uppercase tracking-wide2 text-taupe">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li><Link to="/" className="link-line">{t("Accueil")}</Link></li>
        {items.map(([label, to], i) => (
          <li key={to} className="flex items-center gap-1.5">
            <ChevronRight size={12} aria-hidden="true" />
            {i === items.length - 1 ? <span aria-current="page" className="text-bordeaux">{label}</span> : <Link to={to} className="link-line">{label}</Link>}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({ kicker, title, children, breadcrumbs, aside }) {
  return (
    <section className="grain relative overflow-hidden bg-gradient-to-b from-ivory to-cream pb-16 pt-36 md:pb-24 md:pt-44">
      <Leaf className="pointer-events-none absolute -left-8 top-20 w-56 opacity-50 md:w-72" />
      <div className={`container-site relative grid items-end gap-12 ${aside ? 'lg:grid-cols-[1.15fr_.85fr]' : ''}`}>
        <div>
          {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
          <p className="kicker mt-8">{kicker}</p>
          <SplitText as="h1" onLoad text={title} className="display mt-4 block text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl" />
          {children && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1, ease }} className="lead mt-7 max-w-2xl">
              {children}
            </motion.div>
          )}
        </div>
        {aside}
      </div>
    </section>
  );
}

export function PriceRow({ s, index = 0 }) {
  return (
    <Reveal as="li" delay={index * 0.06} y={18} className="group py-5">
      <div className="flex items-baseline gap-3">
        <h3 className="font-serif text-[1.45rem] leading-snug text-ink transition-colors duration-500 group-hover:text-bordeaux md:text-[1.6rem]">
          {s.link ? <Link to={s.link} className="link-line">{s.name}</Link> : s.name}
          {s.duration && (
            <span className="ml-3 inline-flex items-center gap-1 whitespace-nowrap align-middle font-sans text-[0.8rem] tracking-wide text-taupe">
              <Clock size={12} aria-hidden="true" /> {formatDuration(s.duration)}
            </span>
          )}
        </h3>
        <span className="dots" aria-hidden="true" />
        <p className="whitespace-nowrap font-serif text-[1.45rem] text-bordeaux md:text-[1.6rem]">
          {s.price} <span className="font-sans text-[0.7rem] uppercase tracking-wide2 text-gold-dark">CHF</span>
        </p>
      </div>
      {s.description && <p className="mt-1 max-w-xl text-[0.95rem] text-taupe">{s.description}</p>}
      {s.saving && <p className="mt-1 text-[0.8rem] uppercase tracking-wide2 text-gold-dark">{t("Économie de")}{" "}{s.saving} CHF</p>}
      {s.offer && (
        <div className="mt-3 flex items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-gold-pale/70 to-ivory px-5 py-3">
          <p className="font-serif text-xl text-bordeaux">
            {s.offer.label} <span className="block font-sans text-[0.82rem] text-taupe">{s.offer.note}</span>
          </p>
          <p className="whitespace-nowrap font-serif text-2xl text-bordeaux">
            {s.offer.price} <span className="font-sans text-[0.7rem] uppercase tracking-wide2 text-gold-dark">CHF</span>
          </p>
        </div>
      )}
    </Reveal>
  );
}

export function PriceList({ services, className = '' }) {
  return (
    <ul className={`divide-y divide-gold/20 border-y border-gold/20 ${className}`}>
      {services.map((s, i) => (
        <PriceRow key={s.id} s={s} index={i} />
      ))}
    </ul>
  );
}

export function Faq({ items, title = t("Questions fréquentes"), kicker = t("Bon à savoir") }) {
  const [open, setOpen] = useState(0);
  return (
    <section className="section bg-ivory/60">
      <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionHead kicker={kicker} title={title} />
        <div className="divide-y divide-gold/25 border-y border-gold/25">
          {items.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal key={q} delay={i * 0.05} y={14}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left font-serif text-[1.35rem] leading-snug text-bordeaux md:text-2xl"
                  >
                    {q}
                    <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border border-gold/50 transition-all duration-500 ${isOpen ? 'rotate-45 bg-bordeaux text-cream' : ''}`}>
                      <Plus size={16} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                {/* Réponse toujours présente dans le DOM (SEO / GEO), seule la hauteur est animée */}
                <motion.div
                  id={`faq-${i}`}
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.6, ease }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-7 text-taupe">{a}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function CtaBand({ title = t("Offrez-vous un moment rien que pour vous"), text }) {
  return (
    <section className="relative overflow-hidden bg-bordeaux text-cream">
      <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(60% 80% at 80% 10%, #A9814F 0%, transparent 60%), radial-gradient(50% 70% at 0% 100%, #6B2A35 0%, transparent 70%)' }} />
      <Leaf className="pointer-events-none absolute -bottom-10 right-4 w-64 opacity-40 md:w-80" />
      <div className="container-site relative py-24 text-center md:py-32">
        <Reveal className="font-script text-4xl text-gold-light md:text-5xl" y={14}>{site.tagline}</Reveal>
        <SplitText as="h2" text={title} className="display mx-auto mt-5 block max-w-4xl text-4xl !text-cream md:text-6xl" />
        <Reveal delay={0.2} className="mx-auto mt-6 max-w-xl text-cream/75">
          {text || t("Réponse rapide par WhatsApp ou par téléphone au {0}. À domicile à Genève et environs, sur rendez-vous.", site.phoneDisplay)}
        </Reveal>
        <Reveal delay={0.3} className="mt-10 flex flex-wrap justify-center gap-4">
          <Magnetic>
            <Link to="/reservation" className="btn bg-cream text-bordeaux hover:bg-gold-light">
              {t("Réserver un soin")}{" "}<ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </Magnetic>
          <a href={waHref('Bonjour, je souhaite prendre rendez-vous.')} target="_blank" rel="noopener" className="btn-light">{t("WhatsApp")}</a>
          <a href={telHref} className="btn-light">{t("Appeler")}</a>
        </Reveal>
      </div>
    </section>
  );
}

export function Marquee({ items }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-gold/25 bg-ivory/70 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10 whitespace-nowrap hover:[animation-play-state:paused]">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-10 font-serif text-2xl italic text-bordeaux/80 md:text-3xl">
            {t}
            <svg width="14" height="14" viewBox="0 0 24 24" className="text-gold"><path fill="currentColor" d="M12 21s-7.5-4.6-10-9.3C.3 8.300 2.300 4 6.200 4c2.200 0 3.900 1.100 5.800 3.300C13.900 5.100 15.600 4 17.800 4c3.900 0 5.900 4.300 4.200 7.700C19.500 16.400 12 21 12 21z" /></svg>
          </span>
        ))}
      </div>
    </div>
  );
}
