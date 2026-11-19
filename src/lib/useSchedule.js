import { loadSchedule, watchSchedule } from './firebase.js';
import { defaultSchedule } from './schedule.js';
import { liveStore, useLive } from './liveStore.js';

const store = liveStore(loadSchedule, watchSchedule, defaultSchedule);

/** À appeler après un enregistrement : la nouvelle valeur s'affiche tout de suite, partout */
export const refreshSchedule = store.refresh;

/**
 * Horaires enregistrés dans l'espace privé, tenus à jour en direct ; valeurs par défaut tant qu'ils ne sont pas chargés.
 * now = true (espace privé, réservation) : en direct dès l'affichage.
 */
export const useSchedule = (now) => useLive(store, now);
