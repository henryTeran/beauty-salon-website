import { site } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { PageHero } from '../components/blocks.jsx';

function LegalPage({ path, title, children }) {
  const meta = getRouteMeta(path);
  return (
    <>
      <PageHero kicker="Informations" title={title} breadcrumbs={meta.breadcrumbs} />
      <section className="section !pt-12">
        <div className="container-site max-w-3xl space-y-10 [&_h2]:display [&_h2]:text-2xl [&_h2]:tracking-[0.06em] [&_p]:mt-3 [&_p]:text-taupe [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5 [&_ul]:text-taupe">
          {children}
        </div>
      </section>
    </>
  );
}

const a = site.address;
const fullAddress = `${a.locality}, Suisse (soins à domicile, sur rendez-vous)`;

export function MentionsLegales() {
  return (
    <LegalPage path="/mentions-legales" title="Mentions légales">
      <div>
        <h2>Éditeur du site</h2>
        <p>
          {site.name}<br />
          Responsable : {site.owner}<br />
          {fullAddress}<br />
          Téléphone : {site.phoneDisplay}
          {site.email && <><br />E-mail : {site.email}</>}
        </p>
      </div>
      <div>
        <h2>Tarifs</h2>
        <p>Les prix sont indiqués en francs suisses (CHF) et peuvent être modifiés. Le tarif applicable est celui en vigueur au moment de la confirmation du rendez-vous.</p>
      </div>
      <div>
        <h2>Prestations</h2>
        <p>Les soins proposés sont des soins esthétiques et de bien-être. Ils ne constituent pas des actes médicaux et ne remplacent pas un avis ou un traitement médical.</p>
      </div>
      <div>
        <h2>Propriété intellectuelle</h2>
        <p>Les textes, visuels et éléments graphiques de ce site sont protégés. Toute reproduction sans autorisation est interdite.</p>
      </div>
    </LegalPage>
  );
}

export function Confidentialite() {
  return (
    <LegalPage path="/confidentialite" title="Politique de confidentialité">
      <div>
        <h2>Responsable du traitement</h2>
        <p>{site.name}, {fullAddress}. Contact : {site.email || site.phoneDisplay}.</p>
      </div>
      <div>
        <h2>Données collectées</h2>
        <p>Ce site ne dépose aucun cookie publicitaire et n’enregistre aucune donnée du formulaire de réservation : votre demande est transmise directement via WhatsApp, e-mail ou téléphone, à votre initiative.</p>
        <p>Les informations que vous communiquez ainsi (nom, téléphone, soin souhaité, adresse pour un soin à domicile) sont utilisées uniquement pour organiser votre rendez-vous.</p>
      </div>
      <div>
        <h2>Vos droits</h2>
        <p>Conformément à la loi fédérale sur la protection des données (nLPD), vous pouvez demander l’accès, la rectification ou la suppression de vos données en nous contactant.</p>
      </div>
      <div>
        <h2>Services tiers</h2>
        <ul>
          <li>WhatsApp (Meta) pour l’envoi de votre demande, selon leurs propres conditions.</li>
          <li>Hébergeur du site : journaux techniques standards (adresse IP, date) à des fins de sécurité.</li>
        </ul>
      </div>
    </LegalPage>
  );
}
