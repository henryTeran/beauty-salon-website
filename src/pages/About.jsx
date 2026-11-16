import { Link } from 'react-router-dom';
import { site } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { Reveal, SectionHead, ParallaxImage, Leaf } from '../components/ui.jsx';
import { PageHero, CtaBand } from '../components/blocks.jsx';

const meta = getRouteMeta('/a-propos');
const ambiance = { src: '/images/ambiance', widths: [800, 1400], ratio: 1.498, alt: 'Ambiance chaleureuse et apaisante pendant un soin' };

export default function About() {
  return (
    <>
      <PageHero kicker="Votre esthéticienne" title="À propos de María Fernanda" breadcrumbs={meta.breadcrumbs}>
        Une esthéticienne, une approche : prendre le temps, écouter, et révéler votre beauté naturelle avec des gestes
        justes.
      </PageHero>

      <section className="section">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <ParallaxImage image={ambiance} className="mx-auto aspect-[4/5] w-full max-w-md rounded-t-full" sizes="(min-width: 1024px) 40vw, 90vw" />
          <div className="relative">
            <Leaf className="pointer-events-none absolute -right-4 -top-20 w-36 opacity-60" />
            <SectionHead kicker="La philosophie" title="Expertise, douceur, résultats naturels" />
            <div className="mt-6 space-y-5 text-taupe">
              <Reveal as="p" delay={0.1}>
                {site.name}, ce sont des soins de beauté et de bien-être réalisés à domicile, à {site.address.locality} et
                dans les communes voisines. Vous êtes suivie personnellement par {site.owner}, du premier échange
                jusqu’aux conseils d’après-soin.
              </Reveal>
              <Reveal as="p" delay={0.15}>
                Ici, pas de soin standardisé : chaque protocole est adapté à votre peau, à votre regard et à votre
                rythme. L’objectif n’est jamais de transformer, mais de sublimer ce qui est déjà là — une peau plus
                lumineuse, un regard plus ouvert, un corps plus léger.
              </Reveal>
              <Reveal as="p" delay={0.2}>
                La carte réunit des techniques choisies avec soin : soins du visage personnalisés, lifting coréen des
                cils, teintures, épilation, massages et drainage lymphatique selon la méthode Renata França.
              </Reveal>
            </div>
            <Reveal delay={0.3} className="mt-8 font-script text-5xl text-gold-dark">{site.owner}</Reveal>
          </div>
        </div>
      </section>

      <section className="section bg-ivory/60">
        <div className="container-site">
          <SectionHead kicker="Ce qui fait la différence" title="Un accompagnement sur mesure" align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ['Un seul interlocuteur', 'Vous êtes suivie par la même personne à chaque rendez-vous : elle connaît votre peau, vos préférences et vos objectifs.'],
              ['Des tarifs transparents', 'Tous les prix sont affichés en francs suisses, avec des forfaits avantageux pour les cures.'],
              ['Chez vous, sur rendez-vous', 'Tous les soins sont réalisés à domicile, à Genève et dans les communes voisines.'],
            ].map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.12} className="rounded-[2rem] border border-gold/30 bg-cream p-9">
                <p className="font-serif text-lg italic text-gold-dark">0{i + 1}</p>
                <h3 className="display mt-3 text-2xl tracking-[0.06em]">{t}</h3>
                <p className="mt-3 text-taupe">{d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-12 text-center">
            <Link to="/soins-et-tarifs" className="btn-ghost">Découvrir les soins</Link>
          </Reveal>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
