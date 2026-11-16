import { t } from '../i18n/index.js';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Home as HomeIcon, Sparkles, HeartHandshake, Leaf as LeafIcon } from 'lucide-react';
import { categories, packages, generalFaq, renataFranca } from '../data/services.js';
import { site, asset } from '../config/site.js';
import { Reveal, SplitText, Leaf, Magnetic, ParallaxImage, SectionHead, ease } from '../components/ui.jsx';
import { Faq, CtaBand, Marquee } from '../components/blocks.jsx';

const visage = categories.find((c) => c.id === 'visage');
const regard = categories.find((c) => c.id === 'regard');
const corps = categories.find((c) => c.id === 'corps');
const lifting = regard.services[0];
const minPrice = (c) => Math.min(...c.services.map((s) => s.price));

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="grain relative overflow-hidden bg-gradient-to-b from-ivory via-cream to-cream pt-32 md:pt-40">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[38rem] w-[38rem] rounded-full bg-gold-pale/60 blur-3xl" />
      <Leaf className="pointer-events-none absolute -left-10 top-24 w-56 animate-floaty opacity-70 md:w-80" />

      <div className="container-site relative grid items-center gap-12 pb-20 lg:grid-cols-[1.1fr_.9fr] lg:gap-8 lg:pb-28">
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease }} className="kicker flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />{" "}{t("Esthéticienne à domicile · Genève")}
          </motion.p>

          <h1 className="display mt-6 text-[2.9rem] leading-[0.98] sm:text-7xl xl:text-[5.6rem]">
            <SplitText onLoad text={t("Beauté &")} className="block" delay={0.1} />
            <SplitText onLoad text={t("bien-être")} className="gold-text block" delay={0.25} />
            <SplitText onLoad text={t("à Genève")} className="block" delay={0.4} />
          </h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 1.2, ease }}
            className="mt-4 font-script text-[2.6rem] leading-tight text-gold-dark md:text-6xl"
          >
            {site.tagline}
          </motion.p>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.05, duration: 1, ease }} className="lead mt-6 max-w-xl">
            {t("Soins du visage, lifting coréen des cils, épilation, massages et drainage lymphatique Renata França. Des soins sur mesure par")}{" "}{site.owner}{t(", chez vous, sur rendez-vous.")}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 1, ease }} className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <Link to="/reservation" className="btn-primary">
                <span className="flex items-center gap-2">{t("Réserver un soin")}{" "}<ArrowUpRight size={16} aria-hidden="true" /></span>
              </Link>
            </Magnetic>
            <Link to="/soins-et-tarifs" className="btn-ghost">{t("Soins & tarifs")}</Link>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1.2 }} className="mt-10 flex flex-wrap gap-x-5 gap-y-2 text-[0.72rem] uppercase tracking-luxe text-taupe">
            {site.values.map((v, i) => (
              <li key={v} className="flex items-center gap-5">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-gold" aria-hidden="true" />}
                {v}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <ParallaxImage image={visage.image} priority sizes="(min-width: 1024px) 40vw, 90vw" className="aspect-[4/5] rounded-t-full" />
          <div className="pointer-events-none absolute inset-0 translate-x-3 translate-y-3 rounded-t-full border border-gold/50" aria-hidden="true" />

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 1.3, duration: 1.2, ease }}
            className="absolute -bottom-6 -left-3 sm:-left-10"
          >
            <Link to={regard.slug} className="group block rounded-3xl border border-gold/30 bg-cream/95 px-6 py-5 shadow-soft backdrop-blur transition-transform duration-500 hover:-translate-y-1">
              <p className="kicker">{lifting.offer.label}</p>
              <p className="mt-1 font-serif text-2xl text-bordeaux">{t("Lifting coréen des cils")}</p>
              <p className="mt-1 flex items-baseline gap-2">
                <span className="font-serif text-4xl text-bordeaux">{lifting.offer.price}</span>
                <span className="text-[0.7rem] uppercase tracking-wide2 text-gold-dark">CHF</span>
                <s className="text-sm text-taupe">{lifting.price} CHF</s>
              </p>
            </Link>
          </motion.div>
        </div>
      </div>

      <a href="#soins" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[0.68rem] uppercase tracking-luxe text-taupe lg:flex">
        {t("Découvrir")}
        <motion.span animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
          <ArrowDown size={14} aria-hidden="true" />
        </motion.span>
      </a>
    </section>
  );
}

function Values() {
  const items = [
    [Sparkles, t("Expertise"), t("Des protocoles maîtrisés et des techniques reconnues : lifting coréen, méthode Renata França, soins du visage ciblés.")],
    [HeartHandshake, t("Douceur"), t("Une écoute attentive, des gestes précis et une pression toujours ajustée à votre confort.")],
    [LeafIcon, t("Résultats naturels"), t("Sublimer sans transformer : un regard ouvert, une peau lumineuse, un corps plus léger.")],
  ];
  return (
    <section className="section">
      <div className="container-site">
        <SectionHead kicker={t("La philosophie")} title={t("Sublimer, sans jamais transformer")} align="center">
          {t("Chez")}{" "}{site.name}{t(", chaque rendez-vous commence par une écoute. Votre peau, votre regard, votre rythme : tout est pensé pour révéler ce qui est déjà là.")}
        </SectionHead>
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] border border-gold/25 bg-gold/25 md:grid-cols-3">
          {items.map(([Icon, t, d], i) => (
            <Reveal key={t} delay={i * 0.12} className="group bg-cream p-10 transition-colors duration-700 hover:bg-ivory md:p-12">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold-dark transition-all duration-700 group-hover:bg-bordeaux group-hover:text-cream">
                <Icon size={22} strokeWidth={1.2} aria-hidden="true" />
              </span>
              <h3 className="display mt-7 text-2xl tracking-[0.08em]">{t}</h3>
              <p className="mt-3 text-taupe">{d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SoinsIndex() {
  return (
    <section id="soins" className="section bg-ivory/60 !pt-24">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead kicker={t("Les soins")} title={t("Une carte pensée pour vous")} />
          <Reveal>
            <Link to="/soins-et-tarifs" className="btn-ghost">{t("Tous les tarifs")}</Link>
          </Reveal>
        </div>
        <ul className="mt-14 border-t border-gold/30">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 0.08} y={20} className="border-b border-gold/30">
              <Link to={c.slug} className="group relative grid items-center gap-x-8 gap-y-2 py-8 transition-[padding] duration-700 hover:px-4 md:grid-cols-[4rem_1.2fr_1fr_auto] md:py-10">
                <span className="font-serif text-xl italic text-gold-dark">0{i + 1}</span>
                <h3 className="display text-4xl transition-colors duration-500 group-hover:text-gold-dark md:text-6xl">{c.name}</h3>
                <p className="text-taupe">
                  <span className="kicker block">{c.kicker}</span>
                  {c.services.map((s) => s.name).filter((v, k, a) => a.indexOf(v) === k).slice(0, 3).join(' · ')}
                </p>
                <p className="flex items-center gap-5 justify-self-start md:justify-self-end">
                  <span className="whitespace-nowrap font-serif text-2xl text-bordeaux">{t("dès")}{" "}{minPrice(c)} <span className="font-sans text-[0.7rem] uppercase tracking-wide2 text-gold-dark">CHF</span></span>
                  <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/50 text-bordeaux transition-all duration-500 group-hover:rotate-45 group-hover:bg-bordeaux group-hover:text-cream">
                    <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" />
                  </span>
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RegardFeature() {
  return (
    <section className="section overflow-hidden">
      <div className="container-site grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <motion.div
            initial={{ clipPath: 'ellipse(0% 0% at 50% 50%)' }}
            whileInView={{ clipPath: 'ellipse(72% 72% at 50% 50%)' }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.8, ease }}
            className="overflow-hidden rounded-[45%_55%_48%_52%/60%_58%_42%_40%] border border-gold/40"
          >
            <img src={asset('/images/regard-cils-345.webp')} width="345" height="134" alt={regard.image.alt} loading="lazy" decoding="async" className="aspect-[5/3] w-full scale-110 object-cover" />
          </motion.div>
          <Leaf className="pointer-events-none absolute -bottom-16 -right-6 w-40 opacity-70" delay={0.4} />
        </div>
        <div>
          <SectionHead kicker={regard.kicker} title={t("Lifting coréen des cils")}>
            {regard.intro[0]}
          </SectionHead>
          <Reveal delay={0.2} className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-gold/30 p-6">
              <p className="kicker">{t("La séance · 1h30")}</p>
              <p className="mt-2 font-serif text-4xl text-bordeaux">{lifting.price} <span className="font-sans text-xs uppercase tracking-wide2 text-gold-dark">CHF</span></p>
            </div>
            <div className="rounded-3xl bg-gradient-to-br from-gold-pale to-ivory p-6">
              <p className="kicker">{lifting.offer.label}</p>
              <p className="mt-2 font-serif text-4xl text-bordeaux">{lifting.offer.price} <span className="font-sans text-xs uppercase tracking-wide2 text-gold-dark">CHF</span></p>
              <p className="text-sm text-taupe">{lifting.offer.note}</p>
            </div>
          </Reveal>
          <Reveal delay={0.3} className="mt-8">
            <Link to={regard.slug} className="btn-ghost">{t("En savoir plus")}{" "}<ArrowUpRight size={15} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function RenataFeature() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['4%', '-22%']);
  return (
    <section ref={ref} className="relative overflow-hidden bg-bordeaux-deep py-24 text-cream md:py-36">
      <motion.p style={{ x }} aria-hidden="true" className="pointer-events-none absolute top-6 whitespace-nowrap font-serif text-[9rem] uppercase leading-none tracking-wide text-cream/[0.04] md:text-[15rem]">
        {t("Renata França · Drainage lymphatique")}
      </motion.p>
      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <ParallaxImage image={corps.image} className="aspect-[4/5] rounded-t-full" sizes="(min-width: 1024px) 38vw, 90vw" />
        <div>
          <SectionHead light kicker={t("Méthode signature")} title={t("Drainage lymphatique Renata França")}>
            {renataFranca.intro[0]}
          </SectionHead>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {renataFranca.benefits.map((b, i) => (
              <Reveal as="li" key={b} delay={0.1 + i * 0.08} y={14} className="flex items-center gap-3 border-b border-cream/15 pb-3 text-cream/85">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light" aria-hidden="true" /> {b}
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-6">
            <p className="font-serif text-5xl text-cream">130 <span className="font-sans text-xs uppercase tracking-wide2 text-gold-light">{t("CHF · 1h")}</span></p>
            <Link to={renataFranca.slug} className="btn-light">{t("Découvrir la méthode")}</Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function PackagesPreview() {
  return (
    <section className="section">
      <div className="container-site">
        <SectionHead kicker={t("Nos forfaits")} title={t("Des combinaisons pensées pour vous")} align="center" />
        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.6, ease }} className="flex h-full flex-col rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cream to-ivory p-9 shadow-card">
                <p className="font-serif text-lg italic text-gold-dark">0{i + 1}</p>
                <h3 className="display mt-2 text-3xl tracking-[0.06em]">{p.name}</h3>
                <p className="mt-2 text-taupe">{p.note}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-gold/25 pt-6">
                  {p.items.map((it) => (
                    <li key={it.id} className="flex items-baseline gap-2">
                      <span>{it.name}</span>
                      <span className="dots" aria-hidden="true" />
                      <span className="whitespace-nowrap font-serif text-xl text-bordeaux">{it.price} CHF</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link to="/forfaits" className="btn-ghost">{t("Voir les forfaits")}</Link>
        </Reveal>
      </div>
    </section>
  );
}

function DomicileBand() {
  return (
    <section className="pb-20 md:pb-28">
      <div className="container-site">
        <Reveal className="grain relative grid items-center gap-8 overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-gold-pale via-ivory to-sand p-10 md:grid-cols-[auto_1fr_auto] md:p-14">
          <span className="grid h-16 w-16 place-items-center rounded-full border border-gold text-gold-dark">
            <HomeIcon size={26} strokeWidth={1.2} aria-hidden="true" />
          </span>
          <div>
            <h2 className="display text-3xl md:text-4xl">{t("Soins à domicile à Genève")}</h2>
            <p className="mt-3 max-w-2xl text-taupe">
              {t("Tous les soins sont réalisés chez vous, sur rendez-vous. Les modalités de déplacement sont précisées lors de la réservation.")}
            </p>
          </div>
          <Link to="/soins-a-domicile-geneve" className="btn-primary relative"><span>{t("En savoir plus")}</span></Link>
        </Reveal>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee items={[t("Soin du visage"), t("Lifting coréen des cils"), t("Teinture cils & sourcils"), t("Épilation"), t("Massage relaxant"), t("Massage amincissant"), t("Drainage Renata França")]} />
      <Values />
      <SoinsIndex />
      <RegardFeature />
      <RenataFeature />
      <PackagesPreview />
      <DomicileBand />
      <Faq items={generalFaq} />
      <CtaBand />
    </>
  );
}
