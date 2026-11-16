import { Link } from 'react-router-dom';
import { CalendarCheck, MapPin, Sofa } from 'lucide-react';
import { site } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { categories, domicileFaq as faq } from '../data/services.js';
import { Reveal, SectionHead, ParallaxImage } from '../components/ui.jsx';
import { PageHero, Faq, CtaBand } from '../components/blocks.jsx';

const meta = getRouteMeta('/soins-a-domicile-geneve');
const corps = categories.find((c) => c.id === 'corps');

export default function Domicile() {
  return (
    <>
      <PageHero
        kicker="Votre soin, chez vous"
        title="Soins à domicile à Genève"
        breadcrumbs={meta.breadcrumbs}
        aside={<ParallaxImage image={corps.image} priority className="mx-auto aspect-[4/5] w-full max-w-sm rounded-t-full lg:max-w-none" sizes="(min-width: 1024px) 36vw, 80vw" />}
      >
        Tous les soins sont réalisés à domicile, sur rendez-vous : María Fernanda se déplace chez vous avec le matériel
        nécessaire. Les modalités de déplacement sont précisées lors de la réservation.
      </PageHero>

      <section className="section">
        <div className="container-site">
          <SectionHead kicker="Comment ça marche" title="Trois étapes, zéro contrainte" align="center" />
          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              [CalendarCheck, 'Vous réservez', 'Par WhatsApp, téléphone ou formulaire, en précisant le soin et votre adresse.'],
              [MapPin, 'On confirme', 'Créneau, installation nécessaire et modalités de déplacement.'],
              [Sofa, 'Vous profitez', 'María Fernanda se déplace chez vous avec le matériel nécessaire.'],
            ].map(([Icon, t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.12} className="rounded-[2rem] border border-gold/30 p-9">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gold-pale text-gold-dark"><Icon size={22} strokeWidth={1.3} aria-hidden="true" /></span>
                <h3 className="display mt-6 text-2xl tracking-[0.06em]">{t}</h3>
                <p className="mt-2 text-taupe">{d}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-ivory/60">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <SectionHead kicker="Zones desservies" title="Genève et communes voisines">
            Les déplacements se font dans le canton de Genève. Votre commune ne figure pas dans la liste ? Écrivez-nous,
            une solution est souvent possible.
          </SectionHead>
          <ul className="flex flex-wrap content-start gap-3">
            {site.areaServed.map((z, i) => (
              <Reveal as="li" key={z} delay={i * 0.04} y={10} className="rounded-full border border-gold/40 px-5 py-2.5 font-serif text-xl text-bordeaux">
                {z}
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="container-site mt-12">
          <Link to="/soins-et-tarifs" className="btn-ghost">Voir les soins &amp; tarifs</Link>
        </div>
      </section>

      <Faq items={faq} title="Soins à domicile : vos questions" />
      <CtaBand title="Votre soin, chez vous" />
    </>
  );
}
