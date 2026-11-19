import { useEffect, useSyncExternalStore } from 'react';

// L'écoute en direct charge le SDK Firestore complet (~180 Ko compressés) : sur les pages ordinaires,
// elle ne démarre que si la page reste ouverte, pour ne pas peser sur les visites courtes.
const LIVE_DELAY = 20000;

/**
 * Donnée partagée par tout le site et tenue à jour en direct : une modification faite dans
 * l'espace privé apparaît partout, sans recharger la page.
 * Lecture simple d'abord (légère et rapide), puis écoute des changements.
 *
 * load  : () => Promise<valeur>
 * watch : (onData) => arrêt de l'écoute
 */
export function liveStore(load, watch, initial) {
  let value = initial;
  let seen = 0; // mises à jour reçues en direct
  let started = false;
  let stop; // arrêt de l'écoute, une fois lancée (elle dure tant que la page est ouverte)
  const subs = new Set();
  const set = (v) => {
    value = v;
    subs.forEach((notify) => notify());
  };
  /** Relit la donnée tout de suite ; ignorée si une mise à jour en direct est arrivée entre-temps */
  const refresh = () => {
    const at = seen;
    return load().then((v) => at === seen && set(v), () => {});
  };
  /** Passe en direct sans attendre (espace privé, réservation) ; sans effet si c'est déjà fait */
  const live = () => {
    stop ||= watch((v) => {
      seen += 1;
      set(v);
    });
  };
  const subscribe = (notify) => {
    subs.add(notify);
    if (!started) {
      started = true;
      refresh().then(() => window.setTimeout(live, LIVE_DELAY));
    }
    return () => subs.delete(notify);
  };
  return { subscribe, refresh, live, get: () => value, getInitial: () => initial };
}

/** now = true : écoute en direct dès l'affichage, sans le délai des pages ordinaires */
export function useLive(store, now = false) {
  useEffect(() => {
    if (now) store.live();
  }, [store, now]);
  return useSyncExternalStore(store.subscribe, store.get, store.getInitial);
}
