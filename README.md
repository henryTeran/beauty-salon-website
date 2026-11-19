# María Fernanda Beauté & Bien-être — site vitrine

Site de l'institut (Genève) : React 19 + Vite + Tailwind + Framer Motion, **prérendu en HTML statique** (une page HTML complète par URL) pour le SEO et les moteurs IA.

## Commandes

```bash
npm install
npm run dev      # développement
npm run build    # build + prérendu + sitemap.xml / robots.txt / llms.txt → dist/
npm run preview  # prévisualiser dist/
```

Déploiement : publier le dossier `dist/` (Vercel, Netlify, Cloudflare Pages… — `vercel.json` et `netlify.toml` fournis).
Définir le domaine via `VITE_SITE_URL=https://mon-domaine.ch npm run build` ou dans `src/config/site.js`.

## Architecture

```
src/
  config/site.js      Identité, téléphone, adresse, horaires, zones, réseaux  ← à compléter (TODO)
  data/services.js    Prestations, prix, forfaits, FAQ (source unique : pages, schémas, llms.txt)
  seo/routes.js       Registre des pages : title, description, fil d'Ariane, priorité sitemap
  seo/schema.js       Données structurées JSON-LD (BeautySalon, Service, FAQPage, BreadcrumbList…)
  seo/head.js         Génération du <head> (prérendu) + mise à jour à la navigation
  components/         Header, Footer, Layout, blocs (tarifs, FAQ, CTA), primitives d'animation
  pages/              Home, Soins, Category (gabarit des pages soin), Forfaits, Domicile, About, Reservation, Legal
  entry-server.jsx    Rendu serveur utilisé par le prérendu
scripts/prerender.mjs Génère les .html, sitemap.xml, robots.txt, llms.txt
```

**Modifier un prix ou ajouter un soin** : uniquement dans `src/data/services.js`, puis `npm run build`.

## Avant la mise en ligne

Compléter les `TODO` de `src/config/site.js` : domaine, adresse, e-mail, horaires, coordonnées GPS, Instagram, fiche Google.

## Planning et horaires (Firebase)

- Réservation : `/reservation` affiche les créneaux libres selon les horaires et les rendez-vous déjà pris.
- Espace privé : `/admin` (connexion e-mail + mot de passe) pour voir le planning, confirmer ou annuler, bloquer un créneau et modifier les horaires.
- Code : `src/lib/schedule.js` (calcul des créneaux), `src/lib/firebase.js` (accès aux données), `src/pages/Admin.jsx`.
- Mise à jour en direct, sans recharger la page : planning de l'espace privé (nouvelles demandes, changements faits sur un autre appareil), créneaux de la réservation, horaires et prestations sur tout le site. Les lectures et écritures passent par Firestore « lite » ; l'écoute en direct (`watch…` dans `src/lib/firebase.js`, `src/lib/liveStore.js`) charge le SDK complet, tout de suite dans l'espace privé et la réservation, après 20 s sur les autres pages.
- Espace privé sur téléphone : vue par jour (semaine en bandeau, journée en liste, détail en panneau bas) ; grille de la semaine à partir de la tablette.

Mise en service, une seule fois, dans la console Firebase du projet `beautybooker-25c9d` :

1. **Authentication** → activer « E-mail/Mot de passe », puis ajouter l'utilisateur `rodmafer6@gmail.com` avec un mot de passe.
2. **Firestore Database** → créer la base si besoin, puis coller le contenu de `firestore.rules` dans l'onglet Règles et publier (ou `firebase deploy --only firestore:rules`).

Pour autoriser un autre compte : l'ajouter dans `firestore.rules` et dans `src/config/firebase.js` (`adminEmails`).

Version de validation (GitHub Pages) : `npm run build:preview`, puis publier `dist/` sur la branche `gh-pages`.
Firebase Hosting : `npm run build && firebase deploy --only hosting`.

## Langues (français, espagnol, anglais)

- Français à la racine, espagnol sous `/es/…`, anglais sous `/en/…` : chaque page est prérendue dans les trois langues, avec balises `hreflang` et sitemap multilingue.
- Les textes sont écrits en français dans le code ; `t('texte français')` renvoie la traduction de `src/i18n/es.js` ou `src/i18n/en.js`. Une phrase sans traduction s'affiche en français.
- Après avoir ajouté ou modifié un texte français : ajouter la même clé (le texte français exact) dans `es.js` et `en.js`.
- L'espace privé `/admin` et les prestations ajoutées depuis celui-ci restent en français.

## Espace privé : prestations

L'onglet « Prestations » ajoute des soins et modifie prix, durée et description (collection Firestore `services`). Le site et la réservation les affichent dès le chargement de la page ; les textes prérendus pour Google (HTML, données structurées, `llms.txt`) reprennent `src/data/services.js` et ne changent qu'au prochain `npm run build`.

## E-mails automatiques (SMTP)

Un navigateur ne peut pas parler à un serveur SMTP : le site dépose les e-mails dans la collection Firestore `mail`, et la Cloud Function `functions/index.js` les envoie par SMTP (nodemailer), puis note le résultat dans le champ `delivery` du document. Aucune extension Firebase n'est utilisée.

Mise en service, une seule fois :

1. Passer le projet Firebase au forfait **Blaze** (obligatoire pour les Cloud Functions qui sortent vers un serveur externe).
2. Sur le compte Gmail d'envoi : activer la validation en deux étapes, puis créer un **mot de passe d'application**.
3. Dans un terminal, à la racine du dépôt :

   ```bash
   npm install -g firebase-tools
   firebase login
   cd functions && npm install && cd ..
   firebase functions:secrets:set SMTP_PASSWORD   # coller le mot de passe d'application
   firebase deploy --only functions,firestore:rules
   ```

   Au premier déploiement, la commande propose les réglages `SMTP_HOST` (smtp.gmail.com), `SMTP_PORT` (465), `SMTP_USER` et `MAIL_FROM_NAME` : valider les valeurs par défaut ou les adapter. Ils sont enregistrés dans `functions/.env.<projet>`.
4. Espace privé → Horaires → « E-mails automatiques » : cocher, enregistrer, puis « Envoyer un e-mail de test ».

En cas de problème : `firebase functions:log`, ou ouvrir le document dans la collection `mail` (champ `delivery.error`).
Changer de mot de passe SMTP : relancer `firebase functions:secrets:set SMTP_PASSWORD` puis `firebase deploy --only functions`.

Modèles et textes (e-mails et WhatsApp, en français, espagnol et anglais) : `src/lib/messages.js`.

## Cookies, confidentialité et mentions légales (nLPD)

- Bandeau de consentement : `src/components/Consent.jsx`. Rien de facultatif n'est chargé avant le choix du visiteur ; « Gérer les cookies » (pied de page) le rouvre. Choix conservé 12 mois dans le stockage local.
- Google Analytics n'est chargé qu'après acceptation (`analyticsId` dans `src/config/site.js` ; vide = désactivé ; jamais chargé sur la version de validation).
- Textes juridiques en trois langues : `src/content/legal.js`. À compléter dans `src/config/site.js` : `legalName`, `host`.
- En-têtes de sécurité (HSTS, nosniff, etc.) : `firebase.json`, appliqués avec Firebase Hosting.
- Crédit de création : `creator` dans `src/config/site.js` (pied de page, mentions légales, données structurées, `humans.txt`).
- Brochure téléchargeable : `public/brochure-maria-fernanda.pdf`.

## Rappels de rendez-vous et absences

- **WhatsApp (manuel, un clic)** : dans le planning, le bandeau « Rappels à envoyer » liste les rendez-vous confirmés de demain (rappel de la veille) et d'aujourd'hui (message « je serai chez vous à… », 2 h avant). Les mêmes boutons sont dans le détail de chaque rendez-vous.
- **E-mail (automatique)** : à la confirmation, deux e-mails sont programmés (24 h et 2 h avant) dans la collection `mail` avec un champ `sendAt` ; la fonction `sendScheduledMail` les envoie toutes les 15 minutes. Nécessite la fonction SMTP déployée, les e-mails activés dans l'espace privé et une adresse e-mail laissée par la cliente. Ils sont annulés si le rendez-vous est annulé.
- **Absences** : bouton « Cliente absente » ; le détail d'un rendez-vous signale les absences déjà enregistrées pour le même numéro.
- **Conditions de réservation** : page `/conditions-de-reservation` (texte dans `src/content/legal.js`), case à cocher obligatoire dans le formulaire. Paiement en espèces à la fin du soin.
