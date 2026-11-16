import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { categories, packages } from '../data/services.js';
import { getRouteMeta } from '../seo/routes.js';
import { Reveal, SectionHead } from '../components/ui.jsx';
import { PageHero, PriceList, CtaBand } from '../components/blocks.jsx';

const meta = getRouteMeta('/soins-et-tarifs');

export default function Soins() {
  return (
    <>
      <PageHero kicker="La carte des soins" title="Soins & tarifs" breadcrumbs={meta.breadcrumbs}>
        Tous les soins proposés à Genève par María Fernanda, avec leur durée et leur prix en francs suisses.
        Tarifs clairs, sans surprise.
      </PageHero>

      <nav aria-label="Catégories de soins" className="sticky top-0 z-20 border-y border-gold/25 bg-cream/90 backdrop-blur-md">
        <ul className="container-site flex gap-7 overflow-x-auto py-4 text-[0.74rem] uppercase tracking-wide2">
          {categories.map((c) => (
            <li key={c.id}><a href={`#${c.id}`} className="link-line whitespace-nowrap">{c.name}</a></li>
          ))}
          <li><a href="#forfaits" className="link-line whitespace-nowrap">Forfaits</a></li>
        </ul>
      </nav>

      {categories.map((c, i) => (
        <section key={c.id} id={c.id} className={`section ${i % 2 ? 'bg-ivory/60' : ''}`}>
          <div className="container-site grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHead kicker={c.kicker} title={c.name}>{c.intro[0]}</SectionHead>
              <Reveal delay={0.2} className="mt-8">
                <Link to={c.slug} className="btn-ghost">Détails du soin <ArrowUpRight size={15} aria-hidden="true" /></Link>
              </Reveal>
            </div>
            <PriceList services={c.services} />
          </div>
        </section>
      ))}

      <section id="forfaits" className="section">
        <div className="container-site">
          <SectionHead kicker="Des combinaisons pensées pour vous" title="Nos forfaits" align="center" />
          <div className="mt-14 grid gap-10 lg:grid-cols-3">
            {packages.map((p) => (
              <div key={p.id}>
                <Reveal as="h3" className="display text-2xl tracking-[0.08em]">{p.name}</Reveal>
                <PriceList services={p.items} className="mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
