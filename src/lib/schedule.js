import { locale } from '../i18n/index.js';

/** Horaires de travail et calcul des créneaux libres (fonctions pures, sans Firebase). */

export const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
export const weekOrder = [1, 2, 3, 4, 5, 6, 0];

const day = (open) => ({ open, start: '09:00', end: '19:00' });

/** Valeurs par défaut, utilisées tant que rien n'est enregistré dans l'espace privé */
export const defaultSchedule = {
  slotMinutes: 30, // pas entre deux créneaux proposés
  bufferMinutes: 30, // temps de trajet / préparation entre deux rendez-vous
  days: { 0: day(false), 1: day(true), 2: day(true), 3: day(true), 4: day(true), 5: day(true), 6: day(true) },
  blockedDates: [],
  emailEnabled: false, // e-mails automatiques : à activer dans l'espace privé une fois la fonction d'envoi SMTP déployée
};

export function mergeSchedule(data) {
  if (!data) return defaultSchedule;
  const days = {};
  for (let i = 0; i < 7; i += 1) days[i] = { ...defaultSchedule.days[i], ...(data.days?.[i] || {}) };
  return {
    slotMinutes: Number(data.slotMinutes) || defaultSchedule.slotMinutes,
    bufferMinutes: Number.isFinite(Number(data.bufferMinutes)) ? Number(data.bufferMinutes) : defaultSchedule.bufferMinutes,
    days,
    blockedDates: Array.isArray(data.blockedDates) ? data.blockedDates : [],
    emailEnabled: !!data.emailEnabled,
  };
}

export const toMin = (t) => {
  const [h, m] = t.split(':').map(Number);
  return h * 60 + m;
};
export const toTime = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`;
export const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const parseDate = (key) => new Date(`${key}T12:00:00`);
export const addDays = (key, n) => {
  const d = parseDate(key);
  d.setDate(d.getDate() + n);
  return dateKey(d);
};
export const formatDate = (key, opts = { weekday: 'long', day: 'numeric', month: 'long' }) => parseDate(key).toLocaleDateString(locale, opts);

/**
 * Créneaux libres d'une journée.
 * busy : [{ start, end }] en minutes depuis minuit. Retourne { slots: [minutes], reason }.
 */
export function freeSlots(schedule, date, duration, busy = [], now = new Date()) {
  const d = schedule.days[parseDate(date).getDay()];
  if (!d?.open) return { slots: [], reason: 'closed' };
  if (schedule.blockedDates.includes(date)) return { slots: [], reason: 'blocked' };
  const dur = Math.max(duration || 0, 15);
  const buf = schedule.bufferMinutes;
  const earliest = date === dateKey(now) ? now.getHours() * 60 + now.getMinutes() + 120 : 0; // pas de rendez-vous à moins de 2h
  const slots = [];
  for (let t = toMin(d.start); t + dur <= toMin(d.end); t += schedule.slotMinutes) {
    if (t < earliest) continue;
    if (busy.some((b) => t < b.end + buf && t + dur + buf > b.start)) continue;
    slots.push(t);
  }
  return { slots, reason: slots.length ? null : 'full' };
}
