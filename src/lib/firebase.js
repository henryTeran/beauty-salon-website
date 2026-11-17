/**
 * Accès Firebase, chargé à la demande (uniquement sur la réservation et l'espace privé)
 * pour ne pas alourdir le reste du site.
 *
 * Collections Firestore :
 *  - settings/schedule : horaires de travail (lecture publique, écriture admin)
 *  - busy/{id}         : créneaux occupés, sans donnée personnelle (lecture publique)
 *  - bookings/{id}     : demandes de rendez-vous complètes (lecture admin uniquement)
 */
import { firebaseConfig } from '../config/firebase.js';
import { mergeSchedule } from './schedule.js';

let appPromise;
const getApp = () => (appPromise ||= import('firebase/app').then(({ initializeApp }) => initializeApp(firebaseConfig)));

async function fs() {
  const [app, m] = await Promise.all([getApp(), import('firebase/firestore/lite')]);
  return { m, db: m.getFirestore(app) };
}

export async function authApi() {
  const [app, m] = await Promise.all([getApp(), import('firebase/auth')]);
  return { m, auth: m.getAuth(app) };
}

export async function loadSchedule() {
  const { m, db } = await fs();
  const snap = await m.getDoc(m.doc(db, 'settings', 'schedule'));
  return mergeSchedule(snap.exists() ? snap.data() : null);
}

export async function saveSchedule(schedule) {
  const { m, db } = await fs();
  await m.setDoc(m.doc(db, 'settings', 'schedule'), schedule);
}

async function range(name, from, to) {
  const { m, db } = await fs();
  const snap = await m.getDocs(m.query(m.collection(db, name), m.where('date', '>=', from), m.where('date', '<=', to)));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}
export const loadBusy = (from, to = from) => range('busy', from, to);
export const loadBookings = (from, to) => range('bookings', from, to);

/** Enregistre la demande et réserve le créneau en une seule écriture */
export async function createBooking(booking) {
  const { m, db } = await fs();
  const ref = m.doc(m.collection(db, 'bookings'));
  const batch = m.writeBatch(db);
  batch.set(ref, { ...booking, status: 'pending', createdAt: m.serverTimestamp() });
  batch.set(m.doc(db, 'busy', ref.id), { date: booking.date, start: booking.start, end: booking.end });
  await batch.commit();
  return ref.id;
}

export async function setBookingStatus(id, status) {
  const { m, db } = await fs();
  const batch = m.writeBatch(db);
  batch.update(m.doc(db, 'bookings', id), { status });
  if (status === 'cancelled') batch.delete(m.doc(db, 'busy', id)); // libère le créneau
  await batch.commit();
}

/** Indisponibilité ajoutée à la main par l'esthéticienne */
export async function addBlock({ date, start, end }) {
  const { m, db } = await fs();
  await m.addDoc(m.collection(db, 'busy'), { date, start, end, manual: true });
}

export async function deleteBusy(id) {
  const { m, db } = await fs();
  await m.deleteDoc(m.doc(db, 'busy', id));
}

/** Prestations ajoutées ou modifiées depuis l'espace privé */
export async function loadCustomServices() {
  const { m, db } = await fs();
  const snap = await m.getDocs(m.collection(db, 'services'));
  return snap.docs.map((d) => ({ ...d.data(), id: d.id }));
}
export async function saveService(id, data) {
  const { m, db } = await fs();
  await m.setDoc(m.doc(db, 'services', id), data);
}
export async function deleteService(id) {
  const { m, db } = await fs();
  await m.deleteDoc(m.doc(db, 'services', id));
}

/**
 * Ajouts depuis l'espace privé, éventuellement répétés : une entrée par date.
 * entry = { date, start, end, booking? } ; avec booking → rendez-vous confirmé, sinon indisponibilité.
 */
export async function createEntries(entries, series = null) {
  const { m, db } = await fs();
  const batch = m.writeBatch(db);
  const created = []; // { id, date } des rendez-vous créés, pour programmer leurs rappels
  entries.forEach(({ date, start, end, booking }) => {
    if (booking) {
      const ref = m.doc(m.collection(db, 'bookings'));
      created.push({ id: ref.id, date });
      batch.set(ref, { ...booking, date, start, end, status: 'confirmed', byAdmin: true, series, createdAt: m.serverTimestamp() });
      batch.set(m.doc(db, 'busy', ref.id), { date, start, end, series });
    } else {
      batch.set(m.doc(m.collection(db, 'busy')), { date, start, end, manual: true, series });
    }
  });
  await batch.commit();
  return created;
}

/** Supprime toutes les occurrences à venir d'une série répétée (indisponibilités et rendez-vous) */
export async function deleteSeries(series, fromDate) {
  const { m, db } = await fs();
  const batch = m.writeBatch(db);
  const removed = [];
  for (const name of ['busy', 'bookings']) {
    const snap = await m.getDocs(m.query(m.collection(db, name), m.where('series', '==', series)));
    const docs = snap.docs.filter((d) => d.data().date >= fromDate);
    docs.forEach((d) => batch.delete(d.ref));
    if (name === 'bookings') removed.push(...docs.map((d) => d.id));
  }
  await batch.commit();
  await Promise.all(removed.map((id) => cancelReminders(id).catch(() => {})));
}

/**
 * File d'attente des e-mails : chaque document de la collection « mail » est envoyé par SMTP
 * par la Cloud Function du dossier functions/ (qui note le résultat dans le champ « delivery »).
 */
export async function sendMail(mail) {
  const { m, db } = await fs();
  await m.addDoc(m.collection(db, 'mail'), mail);
}

/** Programme les e-mails de rappel d'un rendez-vous (voir reminderMails) */
export async function scheduleReminders(mails) {
  if (!mails.length) return;
  const { m, db } = await fs();
  const batch = m.writeBatch(db);
  mails.forEach((mail) => batch.set(m.doc(m.collection(db, 'mail')), mail));
  await batch.commit();
}

/** Annule les rappels encore en attente d'un rendez-vous (annulation, absence, suppression) */
export async function cancelReminders(bookingId) {
  const { m, db } = await fs();
  const snap = await m.getDocs(m.query(m.collection(db, 'mail'), m.where('bookingId', '==', bookingId)));
  const pending = snap.docs.filter((d) => d.data().sendAt);
  if (!pending.length) return;
  const batch = m.writeBatch(db);
  pending.forEach((d) => batch.delete(d.ref));
  await batch.commit();
}

/** Note qu'un rappel WhatsApp a été envoyé à la main (kind = 'reminder1' | 'reminder2') */
export async function markReminded(id, kind) {
  const { m, db } = await fs();
  await m.updateDoc(m.doc(db, 'bookings', id), { [`reminded.${kind}`]: true });
}

/** Nombre d'absences déjà enregistrées pour ce numéro de téléphone */
export async function countNoShows(phone) {
  if (!phone) return 0;
  const { m, db } = await fs();
  const snap = await m.getDocs(m.query(m.collection(db, 'bookings'), m.where('phone', '==', phone)));
  return snap.docs.filter((d) => d.data().status === 'noshow').length;
}
