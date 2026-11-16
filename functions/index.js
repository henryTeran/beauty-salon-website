/**
 * Envoi des e-mails par SMTP.
 *
 * Le site dépose chaque e-mail à envoyer dans la collection Firestore « mail »
 * ({ to, replyTo?, message: { subject, html, text } } — voir src/lib/messages.js).
 * Cette fonction se déclenche à chaque nouveau document, l'envoie par SMTP,
 * puis inscrit le résultat dans le document (champ « delivery »).
 *
 * Réglages (demandés au premier déploiement, modifiables dans functions/.env) :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, MAIL_FROM_NAME
 * Mot de passe (secret, jamais dans le code) :
 *   firebase functions:secrets:set SMTP_PASSWORD
 */
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import { defineSecret, defineString, defineInt } from 'firebase-functions/params';
import { logger } from 'firebase-functions';
import { initializeApp } from 'firebase-admin/app';
import { FieldValue } from 'firebase-admin/firestore';
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

export const sendMail = onDocumentCreated(
  { document: 'mail/{id}', region: REGION, secrets: [SMTP_PASSWORD], maxInstances: 2, retry: false },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const mail = snap.data();
    const message = mail.message || {};
    const fail = (error) => snap.ref.update({ delivery: { state: 'ERROR', error, at: FieldValue.serverTimestamp() } });

    if (mail.delivery) return; // déjà traité
    if (!isEmail(mail.to) || !message.subject || !(message.html || message.text)) {
      await fail('Document incomplet : destinataire, objet ou contenu manquant.');
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
      await snap.ref.update({ delivery: { state: 'SUCCESS', messageId: info.messageId || null, at: FieldValue.serverTimestamp() } });
      logger.info('E-mail envoyé', { id: event.params.id, to: mail.to });
    } catch (err) {
      logger.error('Échec de l’envoi', { id: event.params.id, error: err.message });
      await fail(String(err.message || err).slice(0, 500));
    }
  }
);
