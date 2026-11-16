import { t } from '../i18n/index.js';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { categories, packages, renataFranca, servicesFor, packageItems } from '../data/services.js';
import { useCustomServices } from '../lib/useCustomServices.js';
import { getRouteMeta } from '../seo/routes.js';
import { site } from '../config/site.js';
import { Reveal, SectionHead, ParallaxImage, Magnetic } from '../components/ui.jsx';
import { PageHero, PriceList, Faq, CtaBand } from '../components/blocks.jsx';

const faqTitles = {
  visage: t('Vos questions sur le soin du visage'),
  regard: t('Vos questions sur le lifting des cils'),
  epilation: t('Vos questions sur l’épilation'),
  corps: t('Vos questions sur les massages'),
  'renata-franca': t('Vos questions sur le drainage Renata França'),
};

const relatedPackages = {
  regard: ['regard', 'epilation-teintures'],
  epilation: ['epilation-teintures'],
  corps: ['bien-etre'],
  'renata-franca': ['bien-etre'],
};

export default function Category({ category: c }) {
  const meta = getRouteMeta(c.slug);
  const custom = useCustomServices();
  const others = [...categories, renataFranca].filter((o) => o.id !== c.id);
  const packs = packages
    .filter((p) => relatedPackages[c.id]?.includes(p.id))
    .map((p) => (c.id === 'renata-franca' ? { ...p, items: p.items.filter((i) => i.name.includes('drainage')) } : p));

  return (
    <>
      <PageHero
        kicker={c.kicker}
        title={c.h1}
        breadcrumbs={meta.breadcrumbs}
        aside={
          c.image && c.image.widths[0] >= 800 ? (
            <ParallaxImage image={c.image} priority className="mx-auto aspect-[4/5] w-full max-w-sm rounded-t-full lg:max-w-none" sizes="(min-width: 1024px) 36vw, 80vw" />
          ) : null
        }
      >
        <p>{c.intro[0]}</p>
        <div className="mt-8">
          <Magnetic>
            <Link to={`/reservation?soin=${c.services[0].id}`} className="btn-primary">
              <span className="flex items-center gap-2">{t("Réserver ce soin")}{" "}<ArrowUpRight size={16} aria-hidden="true" /></span>
            </Link>
          </Magnetic>
        </div>
      </PageHero>

      <section className="section">
        <div className="container-site grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <SectionHead kicker={t("Prestations & tarifs")} title={t("Tarifs {0}", c.name.toLowerCase())} />
            <Reveal delay={0.15} className="mt-6 text-taupe">{c.intro[1]}</Reveal>
            <ul className="mt-8 space-y-3">
              {c.benefits.map((b, i) => (
                <Reveal as="li" key={b} delay={0.1 + i * 0.07} y={12} className="flex items-center gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gold-pale text-gold-dark"><Check size={14} aria-hidden="true" /></span>
                  {b}
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <PriceList services={servicesFor(c, custom)} />
            {packs.map((p) => (
              <div key={p.id} className="mt-10">
                <Reveal as="h3" className="kicker">{t("Forfait")}{" "}{p.name}</Reveal>
                <PriceList services={packageItems(p, custom)} className="mt-3" />
              </div>
            ))}
            <Reveal className="mt-8 text-sm text-taupe">
              {t("Prix en francs suisses (CHF). Soins réalisés")}{' '}
              <Link to="/soins-a-domicile-geneve" className="link-line text-bordeaux">{t("à domicile")}</Link>{t(", sur rendez-vous, à")}{" "}{site.address.locality}{" "}{t("et environs.")}
            </Reveal>
          </div>
        </div>
      </section>

      {c.steps && (
        <section className="section bg-bordeaux-deep text-cream">
          <div className="container-site">
            <SectionHead light kicker={t("Le déroulement")} title={t("Votre séance, étape par étape")} />
            <ol className="mt-14 grid gap-px overflow-hidden rounded-[2rem] bg-cream/15 md:grid-cols-2 lg:grid-cols-4">
              {c.steps.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 0.1} className={`bg-bordeaux-deep p-8 ${c.steps.length === 3 ? 'lg:col-span-1 lg:last:col-span-2' : ''}`}>
                  <p className="font-serif text-5xl italic text-gold-light/70">0{i + 1}</p>
                  <h3 className="display mt-5 text-xl tracking-[0.08em] !text-cream">{t}</h3>
                  <p className="mt-2 text-cream/70">{d}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      <Faq items={c.faq} title={faqTitles[c.id]} />

      <section className="section !py-20">
        <div className="container-site">
          <p className="kicker">{t("À découvrir aussi")}</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal as="li" key={o.id} delay={i * 0.07}>
                <Link to={o.slug} className="group flex h-full items-center justify-between gap-4 rounded-3xl border border-gold/30 p-6 transition-colors duration-500 hover:bg-bordeaux hover:text-cream">
                  <span className="font-serif text-2xl leading-tight">{o.navLabel}</span>
                  <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" className="shrink-0 transition-transform duration-500 group-hover:rotate-45" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
