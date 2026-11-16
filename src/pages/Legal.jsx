import { t } from '../i18n/index.js';
import { site } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { PageHero } from '../components/blocks.jsx';

function LegalPage({ path, title, children }) {
  const meta = getRouteMeta(path);
  return (
    <>
      <PageHero kicker={t("Informations")} title={title} breadcrumbs={meta.breadcrumbs} />
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
    <LegalPage path="/mentions-legales" title={t("Mentions légales")}>
      <div>
        <h2>{t("Éditeur du site")}</h2>
        <p>
          {site.name}<br />
          {t("Responsable :")}{" "}{site.owner}<br />
          {fullAddress}<br />
          {t("Téléphone :")}{" "}{site.phoneDisplay}
          {site.email && <><br />{t("E-mail :")}{" "}{site.email}</>}
        </p>
      </div>
      <div>
        <h2>{t("Tarifs")}</h2>
        <p>{t("Les prix sont indiqués en francs suisses (CHF) et peuvent être modifiés. Le tarif applicable est celui en vigueur au moment de la confirmation du rendez-vous.")}</p>
      </div>
      <div>
        <h2>{t("Prestations")}</h2>
        <p>{t("Les soins proposés sont des soins esthétiques et de bien-être. Ils ne constituent pas des actes médicaux et ne remplacent pas un avis ou un traitement médical.")}</p>
      </div>
      <div>
        <h2>{t("Propriété intellectuelle")}</h2>
        <p>{t("Les textes, visuels et éléments graphiques de ce site sont protégés. Toute reproduction sans autorisation est interdite.")}</p>
      </div>
    </LegalPage>
  );
}

export function Confidentialite() {
  return (
    <LegalPage path="/confidentialite" title={t("Politique de confidentialité")}>
      <div>
        <h2>{t("Responsable du traitement")}</h2>
        <p>{site.name}, {fullAddress}{t(". Contact :")}{" "}{site.email || site.phoneDisplay}.</p>
      </div>
      <div>
        <h2>{t("Données collectées")}</h2>
        <p>{t("Ce site ne dépose aucun cookie publicitaire. Lorsque vous demandez un rendez-vous, les informations saisies (nom, téléphone, soins souhaités, date et heure, adresse du soin à domicile, message) sont enregistrées dans le planning de")}{" "}{site.owner}{" "}{t("et utilisées uniquement pour organiser votre rendez-vous.")}</p>
        <p>{t("Seul le créneau horaire réservé, sans aucune donnée personnelle, est visible des autres visiteurs afin d’afficher les disponibilités.")}</p>
      </div>
      <div>
        <h2>{t("Vos droits")}</h2>
        <p>{t("Conformément à la loi fédérale sur la protection des données (nLPD), vous pouvez demander l’accès, la rectification ou la suppression de vos données en nous contactant.")}</p>
      </div>
      <div>
        <h2>{t("Services tiers")}</h2>
        <ul>
          <li>{t("Google Firebase (Firestore) pour l’enregistrement des demandes de rendez-vous et du planning.")}</li>
          <li>{t("WhatsApp (Meta) pour l’envoi de votre demande, selon leurs propres conditions.")}</li>
          <li>{t("Hébergeur du site : journaux techniques standards (adresse IP, date) à des fins de sécurité.")}</li>
        </ul>
      </div>
    </LegalPage>
  );
}
