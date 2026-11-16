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
