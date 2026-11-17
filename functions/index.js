/**
 * Envoi des e-mails par SMTP.
 *
 * Le site dépose chaque e-mail à envoyer dans la collection Firestore « mail »
 * ({ to, replyTo?, message: { subject, html, text } } — voir src/lib/messages.js).
 * sendMail se déclenche à chaque nouveau document, l'envoie par SMTP, puis inscrit le résultat
 * dans le document (champ « delivery »). Les documents portant une date « sendAt » (rappels de
 * rendez-vous) sont envoyés à l'heure prévue par sendScheduledMail.
 *
 * Réglages (demandés au premier déploiement, modifiables dans functions/.env) :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, MAIL_FROM_NAME
 * Mot de passe (secret, jamais dans le code) :
 *   firebase functions:secrets:set SMTP_PASSWORD
 */
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { onSchedule } from 'firebase-functions/v2/scheduler';
import { defineSecret, defineString, defineInt } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { FieldValue, getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

initializeApp();

// Région d'exécution : la plus proche de la Suisse. À changer si le déploiement signale
// une incompatibilité avec l'emplacement de la base Firestore.
const REGION = 'europe-west1';

const SMTP_HOST = defineString('SMTP_HOST', { default: 'smtp.gmail.com' });
const SMTP_PORT = defineInt('SMTP_PORT', { default: 465 });
const SMTP_USER = defineString('SMTP_USER', { default: 'rodmafer6@gmail.com' });
const MAIL_FROM_NAME = defineString('MAIL_FROM_NAME', { default: 'María Fernanda Beauté & Bien-être' });
const SMTP_PASSWORD = defineSecret('SMTP_PASSWORD');

const isEmail = (v) => typeof v === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Envoie un document « mail » par SMTP et inscrit le résultat dans son champ « delivery » */
async function deliver(ref, mail, id) {
  const message = mail.message || {};
  // sendAt est retiré dans tous les cas : un rappel programmé n'est tenté qu'une fois
  const done = (delivery) => ref.update({ delivery: { ...delivery, at: FieldValue.serverTimestamp() }, sendAt: FieldValue.delete() });

  if (!isEmail(mail.to) || !message.subject || !(message.html || message.text)) {
    await done({ state: 'ERROR', error: 'Document incomplet : destinataire, objet ou contenu manquant.' });
    return;
  }
  const port = SMTP_PORT.value();
  const transport = nodemailer.createTransport({
    host: SMTP_HOST.value(),
    port,
    secure: port === 465, // 465 = TLS direct ; 587 = STARTTLS
    auth: { user: SMTP_USER.value(), pass: SMTP_PASSWORD.value() },
  });
  try {
    const info = await transport.sendMail({
      from: { name: MAIL_FROM_NAME.value(), address: SMTP_USER.value() },
      to: mail.to,
      replyTo: isEmail(mail.replyTo) ? mail.replyTo : undefined,
      subject: String(message.subject).slice(0, 300),
      text: message.text,
      html: message.html,
    });
    await done({ state: 'SUCCESS', messageId: info.messageId || null });
    logger.info('E-mail envoyé', { id, to: mail.to });
  } catch (err) {
    logger.error('Échec de l’envoi', { id, error: err.message });
    await done({ state: 'ERROR', error: String(err.message || err).slice(0, 500) });
  }
}

/** Envoi immédiat : chaque nouveau document sans date programmée */
export const sendMail = onDocumentCreated(
  { document: 'mail/{id}', region: REGION, secrets: [SMTP_PASSWORD], maxInstances: 2, retry: false },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const mail = snap.data();
    if (mail.delivery || mail.sendAt) return; // déjà traité, ou rappel programmé (voir sendScheduledMail)
    await deliver(snap.ref, mail, event.params.id);
  }
);

/**
 * Rappels programmés (veille et 2 h avant le rendez-vous) : toutes les 15 minutes,
 * envoie les documents dont la date « sendAt » est atteinte. Un rappel en retard de
 * plus de 3 h (fonction arrêtée, par exemple) est abandonné plutôt qu'envoyé trop tard.
 */
export const sendScheduledMail = onSchedule(
  { schedule: 'every 15 minutes', timeZone: 'Europe/Zurich', region: REGION, secrets: [SMTP_PASSWORD], maxInstances: 1 },
  async () => {
    const now = Date.now();
    const due = await getFirestore().collection('mail').where('sendAt', '<=', new Date(now)).limit(50).get();
    for (const doc of due.docs) {
      const mail = doc.data();
      if (mail.delivery) continue;
      if (now - mail.sendAt.toMillis() > 3 * 3600000) {
        await doc.ref.update({ delivery: { state: 'SKIPPED', error: 'Rappel trop en retard, non envoyé.', at: FieldValue.serverTimestamp() }, sendAt: FieldValue.delete() });
        continue;
      }
      await deliver(doc.ref, mail, doc.id);
    }
  }
);
