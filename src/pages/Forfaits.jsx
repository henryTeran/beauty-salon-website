import { t } from '../i18n/index.js';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { packages, packageItems } from '../data/services.js';
import { useCustomServices } from '../lib/useCustomServices.js';
import { getRouteMeta } from '../seo/routes.js';
import { Reveal, ease } from '../components/ui.jsx';
import { PageHero, PriceList, CtaBand } from '../components/blocks.jsx';

const meta = getRouteMeta('/forfaits');

export default function Forfaits() {
  const custom = useCustomServices();
  return (
    <>
      <PageHero kicker={t("Des combinaisons pensées pour vous")} title={t("Forfaits & cures à Genève")} breadcrumbs={meta.breadcrumbs}>
        {t("Associez plusieurs soins pour un résultat plus harmonieux, ou prolongez les bienfaits d’un massage dans la durée avec une cure de 3 ou 5 séances à tarif préférentiel.")}
      </PageHero>
      <section className="section">
        <div className="container-site grid gap-8 lg:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <motion.article whileHover={{ y: -8 }} transition={{ duration: 0.6, ease }} className="flex h-full flex-col rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cream to-ivory p-8 shadow-card md:p-10">
                <p className="font-serif text-lg italic text-gold-dark">0{i + 1}</p>
                <h2 className="display mt-2 text-3xl tracking-[0.06em] md:text-4xl">{p.name}</h2>
                <p className="mt-3 text-taupe">{p.note}</p>
                <PriceList services={packageItems(p, custom)} className="mt-6 flex-1" />
                <Link to={`/reservation?soin=${p.items[0].id}`} className="btn-ghost mt-8">{t("Réserver")}</Link>
              </motion.article>
            </Reveal>
          ))}
        </div>
        <div className="container-site mt-16 max-w-3xl">
          <h2 className="display text-3xl">{t("Pourquoi choisir une cure ?")}</h2>
          <p className="mt-4 text-taupe">
            {t("Les effets d’un massage ou d’un drainage lymphatique se construisent séance après séance. Une cure rapprochée permet d’installer les résultats : détente plus profonde, silhouette plus légère, circulation stimulée. Les forfaits bien-être font économiser de 15 à 50 CHF par rapport aux séances à l’unité.")}
          </p>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
