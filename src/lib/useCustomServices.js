import { useEffect, useState } from 'react';
import { loadCustomServices } from './firebase.js';

let cache;
export const resetCustomServices = () => {
  cache = undefined;
};

/** Prestations gérées dans l'espace privé ; liste vide tant qu'elles ne sont pas chargées ou si Firebase est indisponible */
export function useCustomServices() {
  const [custom, setCustom] = useState([]);
  useEffect(() => {
    let alive = true;
    (cache ||= loadCustomServices().catch(() => [])).then((c) => alive && setCustom(c));
    return () => {
      alive = false;
    };
  }, []);
  return custom;
}
