/**
 * Textes des messages envoyés : WhatsApp (demande de la cliente, confirmation de María Fernanda)
 * et e-mails (avis à María Fernanda, confirmation / annulation à la cliente).
 * Chaque message est rédigé dans une seule langue : celle de la cliente (b.lang),
 * sauf l'avis interne, toujours en français.
 *
 * b = { name, phone, email, address, message, date, start, end, total, lang, services: [{ name, price, minutes }] }
 */
import { adminEmails } from '../config/firebase.js';

const BRAND = 'María Fernanda Beauté & Bien-être';
const OWNER = 'María Fernanda';
const PHONE = '+41 78 689 80 20';
const locales = { fr: 'fr-CH', es: 'es-ES', en: 'en-GB' };

const L = {
  fr: {
    hello: (n) => `Bonjour ${n},`,
    reqIntro: `Bonjour ${OWNER}, je souhaite prendre rendez-vous.`,
    date: 'Date', time: 'Heure', services: 'Prestations', total: 'Total indicatif', address: 'Adresse', name: 'Nom', phone: 'Téléphone', email: 'E-mail', note: 'Message',
    confirmed: 'Votre rendez-vous est confirmé.',
    confirmedSubject: 'Votre rendez-vous est confirmé',
    cancelled: 'Votre rendez-vous a été annulé.',
    cancelledSubject: 'Votre rendez-vous a été annulé',
    change: 'Pour modifier ou annuler, répondez simplement à ce message.',
    rebook: 'Pour choisir une autre date, répondez à ce message ou réservez à nouveau sur le site.',
    bye: 'À bientôt,',
    home: 'Soin à domicile',
  },
  es: {
    hello: (n) => `Hola ${n}:`,
    reqIntro: `Hola ${OWNER}, me gustaría reservar una cita.`,
    date: 'Fecha', time: 'Hora', services: 'Tratamientos', total: 'Total orientativo', address: 'Dirección', name: 'Nombre', phone: 'Teléfono', email: 'Correo', note: 'Mensaje',
    confirmed: 'Tu cita está confirmada.',
    confirmedSubject: 'Tu cita está confirmada',
    cancelled: 'Tu cita ha sido cancelada.',
    cancelledSubject: 'Tu cita ha sido cancelada',
    change: 'Si necesitas cambiarla o cancelarla, responde a este mensaje.',
    rebook: 'Para elegir otra fecha, responde a este mensaje o reserva de nuevo en la web.',
    bye: 'Hasta pronto,',
    home: 'Tratamiento a domicilio',
  },
  en: {
    hello: (n) => `Hello ${n},`,
    reqIntro: `Hello ${OWNER}, I would like to book an appointment.`,
    date: 'Date', time: 'Time', services: 'Treatments', total: 'Estimated total', address: 'Address', name: 'Name', phone: 'Phone', email: 'Email', note: 'Message',
    confirmed: 'Your appointment is confirmed.',
    confirmedSubject: 'Your appointment is confirmed',
    cancelled: 'Your appointment has been cancelled.',
    cancelledSubject: 'Your appointment has been cancelled',
    change: 'To change or cancel it, simply reply to this message.',
    rebook: 'To choose another date, reply to this message or book again on the website.',
    bye: 'See you soon,',
    home: 'Home treatment',
  },
};

const pick = (lang) => L[lang] || L.fr;
const fmtDate = (key, lang) => {
  const s = new Date(`${key}T12:00:00`).toLocaleDateString(locales[lang] || locales.fr, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  return s.charAt(0).toUpperCase() + s.slice(1);
};
const hhmm = (min, lang) => {
  const s = `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
  return lang === 'fr' ? s.replace(':', 'h') : s;
};
const fmtTime = (b, lang) => `${hhmm(b.start, lang)} – ${hhmm(b.end, lang)}`;
const dur = (min) => (min ? (min < 60 ? `${min} min` : `${Math.floor(min / 60)} h${min % 60 ? ` ${min % 60}` : ''}`) : '');
const serviceLine = (s) => `${s.name}${s.minutes ? ` (${dur(s.minutes)})` : ''}${s.price !== undefined ? ` · ${s.price} CHF` : ''}`;
// Deux-points : précédés d'une espace en français uniquement
const sep = (lang) => (lang === 'fr' || !L[lang] ? ' :' : ':');
const lines = (arr) => arr.filter((l) => typeof l === 'string').join('\n');

/* ------------------------------ WhatsApp ------------------------------ */
// *gras* et _italique_ sont la mise en forme de WhatsApp ; pas d'émojis (mal rendus selon les appareils)

/** Demande envoyée par la cliente */
export function requestWhatsApp(b) {
  const l = pick(b.lang);
  return lines([
    l.reqIntro,
    '',
    `*${l.date}${sep(b.lang)}* ${fmtDate(b.date, b.lang)}`,
    `*${l.time}${sep(b.lang)}* ${fmtTime(b, b.lang)}`,
    '',
    `*${l.services}*`,
    ...b.services.map((s) => `• ${serviceLine(s)}`),
    `*${l.total}${sep(b.lang)}* ${b.total} CHF`,
    '',
    `*${l.name}${sep(b.lang)}* ${b.name}`,
    `*${l.phone}${sep(b.lang)}* ${b.phone}`,
    `*${l.address}${sep(b.lang)}* ${b.address}`,
    b.message && `*${l.note}${sep(b.lang)}* ${b.message}`,
  ]);
}

/** Confirmation envoyée par María Fernanda, dans la langue de la cliente */
export function confirmWhatsApp(b) {
  const l = pick(b.lang);
  return lines([
    l.hello(b.name),
    '',
    `*${l.confirmed}*`,
    '',
    `*${l.date}${sep(b.lang)}* ${fmtDate(b.date, b.lang)}`,
    `*${l.time}${sep(b.lang)}* ${fmtTime(b, b.lang)}`,
    `*${l.services}${sep(b.lang)}* ${(b.services || []).map((s) => s.name).join(', ')}`,
    b.address && `*${l.address}${sep(b.lang)}* ${b.address}`,
    '',
    l.change,
    '',
    l.bye,
    OWNER,
    `_${BRAND}_`,
  ]);
}

/* ------------------------------- E-mails ------------------------------- */
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const C = { cream: '#FCF8F2', ivory: '#F6EEE3', gold: '#A9814F', pale: '#EFE0CB', bordeaux: '#4A1A22', ink: '#2B1C1A', taupe: '#75625A' };
const serif = "Georgia, 'Times New Roman', serif";
const sans = "'Helvetica Neue', Helvetica, Arial, sans-serif";

/** Gabarit commun : en-tête à la marque, titre, détails en tableau, pied de page */
function layout({ lang, kicker, title, intro, rows, outro }) {
  const row = ([k, v]) => `
          <tr>
            <td style="padding:12px 0;border-bottom:1px solid ${C.pale};font:11px ${sans};letter-spacing:2px;text-transform:uppercase;color:${C.gold};width:34%;vertical-align:top">${esc(k)}</td>
            <td style="padding:12px 0;border-bottom:1px solid ${C.pale};font:16px/1.5 ${serif};color:${C.ink};vertical-align:top">${v}</td>
          </tr>`;
  return `<!doctype html>
<html lang="${lang}">
  <body style="margin:0;padding:0;background:${C.ivory}">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.ivory};padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:${C.cream};border:1px solid ${C.pale};border-radius:24px;overflow:hidden">
          <tr><td align="center" style="padding:36px 32px 8px">
            <div style="font:400 26px ${serif};letter-spacing:8px;color:${C.bordeaux};text-transform:uppercase">María Fernanda</div>
            <div style="font:10px ${sans};letter-spacing:4px;color:${C.gold};text-transform:uppercase;margin-top:8px">Beauté &amp; Bien-être</div>
            <div style="height:1px;background:${C.gold};opacity:.45;margin:24px auto 0;width:120px"></div>
          </td></tr>
          <tr><td style="padding:24px 40px 8px">
            <div style="font:11px ${sans};letter-spacing:3px;color:${C.gold};text-transform:uppercase">${esc(kicker)}</div>
            <h1 style="margin:10px 0 14px;font:400 28px/1.2 ${serif};color:${C.bordeaux}">${esc(title)}</h1>
            <p style="margin:0;font:15px/1.7 ${sans};color:${C.taupe}">${intro}</p>
          </td></tr>
          <tr><td style="padding:12px 40px 8px">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${C.pale}">${rows.filter((r) => r && r[1]).map(row).join('')}
            </table>
          </td></tr>
          <tr><td style="padding:16px 40px 36px">
            <p style="margin:0;font:15px/1.7 ${sans};color:${C.taupe}">${outro}</p>
          </td></tr>
          <tr><td align="center" style="background:${C.bordeaux};padding:22px 32px;font:12px/1.7 ${sans};color:${C.pale}">
            ${BRAND} · Genève<br />${PHONE}
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`;
}

const serviceRows = (b) => (b.services || []).map((s) => esc(serviceLine(s))).join('<br />');

/** Avis interne : nouvelle demande reçue (toujours en français, envoyé à María Fernanda) */
export function emailToOwner(b) {
  const rows = [
    ['Date', esc(fmtDate(b.date, 'fr'))],
    ['Heure', esc(fmtTime(b, 'fr'))],
    ['Prestations', serviceRows(b)],
    ['Total indicatif', `${esc(b.total)} CHF`],
    ['Cliente', esc(b.name)],
    ['Téléphone', esc(b.phone)],
    ['E-mail', esc(b.email)],
    ['Adresse', esc(b.address)],
    ['Message', esc(b.message)],
    ['Langue', { fr: 'Français', es: 'Español', en: 'English' }[b.lang] || ''],
  ];
  const doc = {
    to: adminEmails[0],
    message: {
      subject: `Nouvelle demande : ${b.name} – ${fmtDate(b.date, 'fr').toLowerCase()} à ${hhmm(b.start, 'fr')}`,
      html: layout({ lang: 'fr', kicker: 'Nouvelle demande', title: `${b.name} souhaite un rendez-vous`, intro: 'La demande est inscrite dans le planning, en attente de confirmation.', rows, outro: 'Ouvrez l’espace privé pour confirmer ou annuler ce rendez-vous.' }),
      text: lines(['Nouvelle demande de rendez-vous', '', ...rows.filter((r) => r[1]).map(([k, v]) => `${k} : ${String(v).replace(/<br \/>/g, ', ')}`)]),
    },
  };
  if (b.email) doc.replyTo = b.email;
  return doc;
}

/** E-mail à la cliente : confirmation ou annulation, dans sa langue */
export function emailToClient(b, kind = 'confirmed') {
  const lang = L[b.lang] ? b.lang : 'fr';
  const l = pick(lang);
  const ok = kind === 'confirmed';
  const rows = [
    [l.date, esc(fmtDate(b.date, lang))],
    [l.time, esc(fmtTime(b, lang))],
    [l.services, (b.services || []).map((s) => esc(s.name)).join('<br />')],
    [l.address, esc(b.address)],
  ];
  const title = ok ? l.confirmedSubject : l.cancelledSubject;
  const outro = `${esc(ok ? l.change : l.rebook)}<br /><br />${esc(l.bye)}<br /><span style="font:18px ${serif};color:${C.bordeaux}">${OWNER}</span>`;
  return {
    to: b.email,
    message: {
      subject: `${title} – ${BRAND}`,
      html: layout({ lang, kicker: l.home, title, intro: esc(l.hello(b.name)), rows, outro }),
      text: lines([l.hello(b.name), '', ok ? l.confirmed : l.cancelled, '', ...rows.filter((r) => r[1]).map(([k, v]) => `${k}${sep(lang)} ${String(v).replace(/<br \/>/g, ', ')}`), '', ok ? l.change : l.rebook, '', l.bye, OWNER, BRAND]),
    },
  };
}
