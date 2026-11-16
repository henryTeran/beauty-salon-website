import { Link } from 'react-router-dom';
import { GraduationCap, Languages, Home as HomeIcon, Sparkles } from 'lucide-react';
import { site } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { t } from '../i18n/index.js';
import { Reveal, SectionHead, ParallaxImage, Leaf } from '../components/ui.jsx';
import { PageHero, CtaBand } from '../components/blocks.jsx';

const meta = getRouteMeta('/a-propos');
const ambiance = { src: '/images/ambiance', widths: [800, 1400], ratio: 1.498, alt: t('Ambiance chaleureuse et apaisante pendant un soin') };

// Parcours (source : CV de María Fernanda)
const parcours = [
  ['2021 – 2023', t('Diplôme en Esthétique Supérieure et Cosmétologie'), t('École Michelle Paschoud. Soins du visage et du corps, épilation, cosmétologie et appareils esthétiques.')],
  ['2023', t('Esthéticienne en institut à Genève'), t('Soins du visage personnalisés, massages, soins amincissants, drainage lymphatique, conseil et suivi de la clientèle.')],
  ['2025', t('Méthode Renata França'), t('Formation de mise à jour au drainage lymphatique selon la méthode Renata França.')],
  ['2025', t('Masterclass sourcils'), t('Techniques avancées de design des sourcils.')],
  [t('Aujourd’hui'), t('Esthéticienne indépendante à domicile'), t('Des soins sur mesure réalisés chez vous, à Genève et dans les communes voisines.')],
];

const facts = [
  [GraduationCap, t('Esthéticienne diplômée'), t('Esthétique Supérieure et Cosmétologie')],
  [Sparkles, t('Techniques spécialisées'), t('Drainage Renata França, lifting coréen des cils')],
  [HomeIcon, t('À domicile'), t('Genève et communes voisines, sur rendez-vous')],
  [Languages, t('Langues'), t('Français et espagnol')],
];

export default function About() {
  return (
    <>
      <PageHero kicker={t('Votre esthéticienne')} title={t('À propos de María Fernanda')} breadcrumbs={meta.breadcrumbs}>
        {t('Esthéticienne diplômée, María Fernanda se déplace chez vous à Genève. Une seule personne, du premier échange aux conseils d’après-soin, pour révéler votre beauté naturelle avec des gestes justes.')}
      </PageHero>

      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <ParallaxImage image={ambiance} className="mx-auto aspect-[4/5] w-full max-w-md rounded-t-full" sizes="(min-width: 1024px) 40vw, 90vw" />
          <div className="relative">
            <Leaf className="pointer-events-none absolute -right-4 -top-20 w-36 opacity-60" />
            <SectionHead kicker={t('Son approche')} title={t('Expertise, douceur, résultats naturels')} />
            <div className="mt-6 space-y-5 text-taupe">
              <Reveal as="p" delay={0.1}>
                {t('Passionnée par la beauté et le bien-être, María Fernanda s’est formée aux soins du visage et du corps, à l’épilation, au rehaussement de cils coréen et au drainage lymphatique selon la méthode Renata França.')}
              </Reveal>
              <Reveal as="p" delay={0.15}>
                {t('Elle travaille seule et à domicile : vous êtes reçue par la même personne à chaque rendez-vous, dans le confort de votre intérieur. Elle prend le temps d’écouter, d’observer votre peau et d’adapter chaque geste, avec rigueur et un grand sens du détail.')}
              </Reveal>
              <Reveal as="p" delay={0.2}>
                {t('Son objectif n’est jamais de transformer, mais de sublimer ce qui est déjà là : une peau plus lumineuse, un regard plus ouvert, un corps plus léger.')}
              </Reveal>
            </div>
            <Reveal delay={0.3} className="mt-8 font-script text-5xl text-gold-dark">{site.owner}</Reveal>
          </div>
        </div>
      </section>

      <section className="pb-20 md:pb-28">
        <div className="container-site">
        <ul className="grid gap-px overflow-hidden rounded-[2rem] border border-gold/25 bg-gold/25 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map(([Icon, title, text], i) => (
            <Reveal as="li" key={title} delay={i * 0.08} className="bg-cream p-8">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold-dark"><Icon size={20} strokeWidth={1.2} aria-hidden="true" /></span>
              <p className="display mt-5 text-xl tracking-[0.06em] text-bordeaux">{title}</p>
              <p className="mt-2 text-[0.95rem] text-taupe">{text}</p>
            </Reveal>
          ))}
        </ul>
        </div>
      </section>

      <section className="section bg-ivory/60">
        <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <SectionHead kicker={t('Formation et expérience')} title={t('Son parcours')}>
            {t('Une formation complète en esthétique, puis des spécialisations choisies pour répondre aux demandes de ses clientes.')}
          </SectionHead>
          <ol className="relative border-l border-gold/40 pl-8">
            {parcours.map(([year, title, text], i) => (
              <Reveal as="li" key={title} delay={i * 0.08} y={16} className="relative pb-10 last:pb-0">
                <span className="absolute -left-[2.35rem] top-2 h-3 w-3 rounded-full border border-gold bg-cream" aria-hidden="true" />
                <p className="kicker">{year}</p>
                <h3 className="mt-1 font-serif text-2xl text-bordeaux md:text-[1.7rem]">{title}</h3>
                <p className="mt-1 text-taupe">{text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container-site">
          <SectionHead kicker={t('Ce qui fait la différence')} title={t('Un accompagnement sur mesure')} align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              [t('Un seul interlocuteur'), t('Vous êtes suivie par la même personne à chaque rendez-vous : elle connaît votre peau, vos préférences et vos objectifs.')],
              [t('Des tarifs transparents'), t('Tous les prix sont affichés en francs suisses, avec des forfaits avantageux pour les cures.')],
              [t('Chez vous, sur rendez-vous'), t('Tous les soins sont réalisés à domicile, à Genève et dans les communes voisines.')],
            ].map(([title, text], i) => (
              <Reveal key={title} delay={i * 0.12} className="rounded-[2rem] border border-gold/30 bg-cream p-9">
                <p className="font-serif text-lg italic text-gold-dark">0{i + 1}</p>
                <h3 className="display mt-3 text-2xl tracking-[0.06em]">{title}</h3>
                <p className="mt-3 text-taupe">{text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link to="/soins-et-tarifs" className="btn-ghost">{t('Découvrir les soins')}</Link>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
