import { useEffect, useState } from 'react';
import { loadSchedule } from './firebase.js';
import { defaultSchedule } from './schedule.js';

let cache;
export const resetSchedule = () => {
  cache = undefined;
};

/** Horaires enregistrés dans l'espace privé ; valeurs par défaut tant qu'ils ne sont pas chargés */
export function useSchedule() {
  const [schedule, setSchedule] = useState(defaultSchedule);
  useEffect(() => {
    let alive = true;
    (cache ||= loadSchedule().catch(() => defaultSchedule)).then((s) => alive && setSchedule(s));
    return () => {
      alive = false;
    };
  }, []);
  return schedule;
}
