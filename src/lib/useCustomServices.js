import { loadCustomServices, watchCustomServices } from './firebase.js';
import { liveStore, useLive } from './liveStore.js';

const store = liveStore(loadCustomServices, watchCustomServices, []);

/** À appeler après un enregistrement : la nouvelle carte s'affiche tout de suite, partout */
export const refreshCustomServices = store.refresh;

/**
 * Prestations gérées dans l'espace privé, tenues à jour en direct ; liste vide tant qu'elles ne sont pas chargées
 * ou si Firebase est indisponible. now = true (espace privé, réservation) : en direct dès l'affichage.
 */
export const useCustomServices = (now) => useLive(store, now);
