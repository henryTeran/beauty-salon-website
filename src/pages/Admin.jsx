import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Loader2, LogOut, MapPin, MessageCircle, Pencil, Phone, Plus, Repeat, Sparkles, Trash2, X } from 'lucide-react';
import { adminEmails } from '../config/firebase.js';
import {
  authApi, loadSchedule, saveSchedule, loadBookings, loadBusy, setBookingStatus, deleteBusy,
  createEntries, deleteSeries, loadCustomServices, saveService, deleteService, sendMail,
} from '../lib/firebase.js';
import { defaultSchedule, dayNames, weekOrder, dateKey, addDays, formatDate, parseDate, toMin, toTime } from '../lib/schedule.js';
import { categories, allServices, allServicesWith, bookingMinutes, formatDuration } from '../data/services.js';
import { resetCustomServices } from '../lib/useCustomServices.js';
import { confirmWhatsApp, emailToClient } from '../lib/messages.js';
import { prefix } from '../i18n/index.js';

const field = 'rounded-xl border border-gold/35 bg-cream px-3 py-2 text-ink focus:border-bordeaux focus:outline-none';
const card = 'rounded-[1.5rem] border border-gold/30 bg-cream p-6 shadow-card';
const pill = (on) => `rounded-full border px-3.5 py-2 text-sm transition-colors ${on ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40 hover:border-bordeaux'}`;
const hm = (min) => toTime(min).replace(':', 'h');
const statusLabel = { pending: 'À confirmer', confirmed: 'Confirmé', cancelled: 'Annulé' };
/** Noms des prestations tels qu'affichés dans l'espace privé (catalogue en français), quelle que soit la langue de la cliente */
const namesOf = (b, services) => (b.services || []).map((s) => services.find((x) => x.id === s.id)?.name || s.name).join(', ');
const PX = 1.1; // pixels par minute dans la grille

function Login({ onError, error }) {
  const [email, setEmail] = useState(adminEmails[0]);
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    onError('');
    try {
      const { m, auth } = await authApi();
      await m.signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      onError('Connexion impossible : vérifiez l’e-mail et le mot de passe.');
    }
    setBusy(false);
  };
  return (
    <form onSubmit={submit} className={`${card} mx-auto max-w-md space-y-5`}>
      <h1 className="display text-3xl">Espace privé</h1>
      <label className="block">
        <span className="kicker">E-mail</span>
        <input type="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} className={`${field} mt-2 w-full`} />
      </label>
      <label className="block">
        <span className="kicker">Mot de passe</span>
        <input type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} className={`${field} mt-2 w-full`} />
      </label>
      {error && <p role="alert" className="text-bordeaux-soft">{error}</p>}
      <button type="submit" disabled={busy} className="btn-primary w-full disabled:opacity-60"><span>{busy ? 'Connexion…' : 'Se connecter'}</span></button>
    </form>
  );
}

const waNumber = (phone) => String(phone || '').replace(/\D/g, '').replace(/^00/, '').replace(/^0(?=[1-9])/, '41');

/** Formulaire d'ajout : rendez-vous (durée calculée selon les prestations) ou indisponibilité, répétable */
function EntryForm({ initial, services, onClose, onSaved, notify }) {
  const [f, setF] = useState({ type: 'rdv', date: initial.date, start: initial.start, end: toTime(Math.min(toMin(initial.start) + 60, 1439)), ids: [], name: '', phone: '', email: '', address: '', repeat: false, days: [parseDate(initial.date).getDay()], until: addDays(initial.date, 28) });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setF((c) => ({ ...c, [k]: e.target.value }));
  const chosen = services.filter((s) => f.ids.includes(s.id));
  const duration = chosen.reduce((t, s) => t + bookingMinutes(s), 0);
  const start = toMin(f.start);
  const end = f.type === 'rdv' ? start + duration : toMin(f.end);

  const dates = useMemo(() => {
    if (!f.repeat) return [f.date];
    const out = [];
    for (let d = f.date; d <= f.until && out.length < 120; d = addDays(d, 1)) if (f.days.includes(parseDate(d).getDay())) out.push(d);
    return out;
  }, [f.repeat, f.date, f.until, f.days]);

  const submit = async (e) => {
    e.preventDefault();
    if (f.type === 'rdv' && !chosen.length) return notify('Choisissez au moins une prestation.');
    if (f.type === 'rdv' && !f.name.trim()) return notify('Indiquez le nom de la cliente.');
    if (end <= start || end > 1440) return notify('L’heure de fin doit être après le début, le même jour.');
    if (!dates.length) return notify('Aucune date ne correspond à la répétition choisie.');
    setSaving(true);
    const booking = f.type === 'rdv'
      ? { name: f.name.trim(), phone: f.phone.trim(), email: f.email.trim(), address: f.address.trim(), message: '', lang: 'fr', services: chosen.map((s) => ({ id: s.id, name: s.name, price: Number(s.price), minutes: bookingMinutes(s) })), total: chosen.reduce((t, s) => t + Number(s.price), 0) }
      : null;
    try {
      await createEntries(dates.map((date) => ({ date, start, end, booking })), f.repeat ? `s-${Date.now().toString(36)}` : null);
      onSaved(dates.length > 1 ? `${dates.length} entrées ajoutées au planning.` : 'Ajouté au planning.');
    } catch {
      notify('L’ajout a échoué (droits d’accès ou connexion).');
    }
    return setSaving(false);
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center overflow-y-auto bg-bordeaux-deep/50 p-4" data-lenis-prevent>
      <form onSubmit={submit} className={`${card} w-full max-w-xl space-y-5`}>
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-3xl text-bordeaux">Ajouter au planning</h2>
          <button type="button" aria-label="Fermer" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-gold/40"><X size={16} /></button>
        </div>
        <div className="flex gap-2">
          {[['rdv', 'Rendez-vous'], ['block', 'Indisponibilité']].map(([id, label]) => (
            <button type="button" key={id} aria-pressed={f.type === id} onClick={() => setF((c) => ({ ...c, type: id }))} className={pill(f.type === id)}>{label}</button>
          ))}
        </div>

        {f.type === 'rdv' && (
          <>
            <div>
              <span className="kicker">Prestations (la durée se calcule toute seule)</span>
              <div className="mt-2 flex max-h-44 flex-wrap gap-2 overflow-y-auto rounded-xl border border-gold/25 p-3">
                {services.map((s) => {
                  const on = f.ids.includes(s.id);
                  return (
                    <button type="button" key={s.id} aria-pressed={on} onClick={() => setF((c) => ({ ...c, ids: on ? c.ids.filter((x) => x !== s.id) : [...c.ids, s.id] }))} className={pill(on)}>
                      {s.name} · {formatDuration(bookingMinutes(s))}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <input aria-label="Nom de la cliente" placeholder="Nom de la cliente *" value={f.name} onChange={set('name')} className={field} />
              <input aria-label="Téléphone" placeholder="Téléphone" type="tel" value={f.phone} onChange={set('phone')} className={field} />
              <input aria-label="E-mail" placeholder="E-mail (facultatif)" type="email" value={f.email} onChange={set('email')} className={`${field} sm:col-span-2`} />
              <input aria-label="Adresse" placeholder="Adresse du soin" value={f.address} onChange={set('address')} className={`${field} sm:col-span-2`} />
            </div>
          </>
        )}

        <div className="flex flex-wrap items-end gap-3">
          <label className="block"><span className="kicker block">Date</span><input type="date" required value={f.date} onChange={set('date')} className={`${field} mt-1`} /></label>
          <label className="block"><span className="kicker block">Début</span><input type="time" required step="900" value={f.start} onChange={set('start')} className={`${field} mt-1`} /></label>
          {f.type === 'block' ? (
            <label className="block"><span className="kicker block">Fin</span><input type="time" required step="900" value={f.end} onChange={set('end')} className={`${field} mt-1`} /></label>
          ) : (
            <p className="pb-2 font-serif text-xl text-bordeaux">{duration ? `Fin à ${hm(end)} · ${formatDuration(duration)}` : 'Fin calculée selon les prestations'}</p>
          )}
        </div>

        <div className="rounded-xl bg-ivory p-4">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={f.repeat} onChange={(e) => setF((c) => ({ ...c, repeat: e.target.checked }))} className="h-5 w-5 accent-[#4A1A22]" />
            <span className="flex items-center gap-2 font-serif text-xl"><Repeat size={16} aria-hidden="true" /> Répéter chaque semaine</span>
          </label>
          {f.repeat && (
            <div className="mt-3 space-y-3">
              <div className="flex flex-wrap gap-2">
                {weekOrder.map((i) => {
                  const on = f.days.includes(i);
                  return <button type="button" key={i} aria-pressed={on} onClick={() => setF((c) => ({ ...c, days: on ? c.days.filter((x) => x !== i) : [...c.days, i] }))} className={pill(on)}>{dayNames[i].slice(0, 3)}</button>;
                })}
              </div>
              <label className="flex items-center gap-3"><span>Jusqu’au</span><input type="date" value={f.until} min={f.date} onChange={set('until')} className={field} /></label>
              <p className="text-sm text-taupe">{dates.length} date{dates.length > 1 ? 's' : ''} : de {hm(start)} à {end > start ? hm(Math.min(end, 1440)) : '…'}</p>
            </div>
          )}
        </div>

        <button type="submit" disabled={saving} className="btn-primary w-full disabled:opacity-60"><span>{saving ? 'Enregistrement…' : 'Ajouter'}</span></button>
      </form>
    </div>
  );
}

function Planning({ notify, services }) {
  const monday = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return dateKey(d);
  }, []);
  const [offset, setOffset] = useState(0);
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [bookings, setBookings] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(null);
  const [sel, setSel] = useState(null);
  const start = addDays(monday, offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const today = dateKey(new Date());

  useEffect(() => {
    loadSchedule().then(setSchedule).catch(() => {});
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const [b, busy] = await Promise.all([loadBookings(start, addDays(start, 6)), loadBusy(start, addDays(start, 6))]);
      setBookings(b);
      setBlocks(busy.filter((x) => x.manual));
    } catch {
      notify('Impossible de charger le planning (droits d’accès ou connexion).');
    }
    setLoading(false);
  }, [start, notify]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const act = async (fn, ok) => {
    try {
      await fn();
      notify(ok);
      setSel(null);
      await refresh();
    } catch {
      notify('L’action a échoué. Réessayez.');
    }
  };

  // Plage horaire affichée : englobe les horaires de travail et les rendez-vous de la semaine
  const open = Object.values(schedule.days).filter((d) => d.open);
  const from = Math.floor(Math.min(480, ...open.map((d) => toMin(d.start)), ...bookings.map((b) => b.start), ...blocks.map((b) => b.start)) / 60) * 60;
  const to = Math.ceil(Math.max(1200, ...open.map((d) => toMin(d.end)), ...bookings.map((b) => b.end), ...blocks.map((b) => b.end)) / 60) * 60;
  const hours = Array.from({ length: (to - from) / 60 }, (_, i) => from + i * 60);
  const pending = bookings.filter((b) => b.status === 'pending').length;
  const selected = sel && (bookings.find((b) => b.id === sel) || blocks.find((b) => b.id === sel));

  // Change le statut et prévient la cliente par e-mail si elle a laissé une adresse et que l'envoi est activé
  const mailable = (b) => schedule.emailEnabled && !!b.email;
  const setStatus = async (b, status) => {
    await setBookingStatus(b.id, status);
    if (mailable(b)) await sendMail(emailToClient(b, status)).catch(() => {});
  };

  const clickGrid = (date) => (e) => {
    if (e.target !== e.currentTarget) return;
    const y = e.clientY - e.currentTarget.getBoundingClientRect().top;
    setAdding({ date, start: toTime(Math.min(from + Math.floor(y / PX / 30) * 30, 1410)) });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Semaine précédente" onClick={() => setOffset((o) => o - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => setOffset(0)} className={pill(offset === 0)}>Aujourd’hui</button>
          <button type="button" aria-label="Semaine suivante" onClick={() => setOffset((o) => o + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40"><ChevronRight size={18} /></button>
        </div>
        <p className="font-serif text-2xl text-bordeaux">
          {formatDate(start, { day: 'numeric', month: 'long' })} – {formatDate(days[6], { day: 'numeric', month: 'long', year: 'numeric' })}
          {loading && <Loader2 size={16} className="ml-2 inline animate-spin" />}
        </p>
        <div className="flex items-center gap-3">
          <span className="text-sm text-taupe">{pending ? `${pending} demande${pending > 1 ? 's' : ''} à confirmer` : 'Aucune demande en attente'}</span>
          <button type="button" onClick={() => setAdding({ date: days.includes(today) ? today : start, start: '10:00' })} className="inline-flex items-center gap-2 rounded-full bg-bordeaux px-5 py-2.5 text-sm text-cream"><Plus size={15} aria-hidden="true" /> Ajouter</button>
        </div>
      </div>

      <div className="grid items-start gap-6 xl:grid-cols-[1fr_20rem]">
        <div className={`${card} overflow-x-auto !p-0`}>
          <div className="min-w-[820px]">
            <div className="grid grid-cols-[3.5rem_repeat(7,1fr)] border-b border-gold/25">
              <span />
              {days.map((d) => (
                <p key={d} className={`border-l border-gold/20 py-3 text-center ${d === today ? 'bg-gold-pale/60' : ''}`}>
                  <span className="block text-[0.7rem] uppercase tracking-wide2 text-taupe">{formatDate(d, { weekday: 'short' })}</span>
                  <span className={`font-serif text-2xl ${d === today ? 'text-bordeaux' : 'text-ink'}`}>{Number(d.slice(8))}</span>
                </p>
              ))}
            </div>
            <div className="grid grid-cols-[3.5rem_repeat(7,1fr)]">
              <div>
                {hours.map((t) => (
                  <p key={t} style={{ height: 60 * PX }} className="pr-2 text-right text-xs text-taupe"><span className="relative -top-2">{hm(t)}</span></p>
                ))}
              </div>
              {days.map((d) => {
                const day = schedule.days[parseDate(d).getDay()];
                const off = !day.open || schedule.blockedDates.includes(d);
                return (
                  <div
                    key={d}
                    role="button"
                    tabIndex={-1}
                    aria-label={`Ajouter le ${formatDate(d)}`}
                    onClick={clickGrid(d)}
                    style={{
                      height: (to - from) * PX,
                      backgroundImage: `repeating-linear-gradient(to bottom, rgba(169,129,79,.22) 0 1px, transparent 1px ${60 * PX}px)`,
                    }}
                    className={`relative cursor-cell border-l border-gold/20 ${off ? 'bg-sand/40' : ''}`}
                  >
                    {!off && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bg-gold-pale/25" style={{ top: (toMin(day.start) - from) * PX, height: (toMin(day.end) - toMin(day.start)) * PX }} />}
                    {blocks.filter((b) => b.date === d).map((b) => (
                      <button type="button" key={b.id} onClick={() => setSel(b.id)} style={{ top: (b.start - from) * PX, height: Math.max((b.end - b.start) * PX, 20) }}
                        className={`absolute inset-x-1 overflow-hidden rounded-lg border border-taupe/30 bg-[repeating-linear-gradient(135deg,#EADBC9_0_6px,#F6EEE3_6px_12px)] px-2 text-left text-xs text-taupe ${sel === b.id ? 'ring-2 ring-bordeaux' : ''}`}>
                        {hm(b.start)} Indisponible {b.series && <Repeat size={10} className="inline" />}
                      </button>
                    ))}
                    {bookings.filter((b) => b.date === d && b.status !== 'cancelled').map((b) => (
                      <button type="button" key={b.id} onClick={() => setSel(b.id)} style={{ top: (b.start - from) * PX, height: Math.max((b.end - b.start) * PX, 22) }}
                        className={`absolute inset-x-1 overflow-hidden rounded-lg px-2 py-0.5 text-left text-xs leading-tight shadow-sm ${b.status === 'pending' ? 'border border-dashed border-gold-dark bg-gold-pale text-bordeaux' : 'bg-bordeaux text-cream'} ${sel === b.id ? 'ring-2 ring-gold-dark ring-offset-1' : ''}`}>
                        <span className="font-medium">{hm(b.start)} {b.name}</span>
                        <span className="block opacity-80">{namesOf(b, services)}</span>
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <aside className={`${card} text-sm`}>
          {!selected && (
            <>
              <p className="font-serif text-2xl text-bordeaux">Détail</p>
              <p className="mt-2 text-taupe">Cliquez sur un rendez-vous pour le voir, ou sur une case vide pour ajouter un rendez-vous ou une indisponibilité.</p>
              <ul className="mt-4 space-y-2 text-taupe">
                <li className="flex items-center gap-2"><span className="h-4 w-6 rounded bg-bordeaux" /> Confirmé</li>
                <li className="flex items-center gap-2"><span className="h-4 w-6 rounded border border-dashed border-gold-dark bg-gold-pale" /> À confirmer</li>
                <li className="flex items-center gap-2"><span className="h-4 w-6 rounded bg-sand" /> Indisponible / fermé</li>
              </ul>
            </>
          )}
          {selected && selected.manual && (
            <>
              <p className="font-serif text-2xl text-bordeaux">Indisponibilité</p>
              <p className="mt-1 first-letter:uppercase">{formatDate(selected.date)} · {hm(selected.start)} – {hm(selected.end)}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => act(() => deleteBusy(selected.id), 'Indisponibilité supprimée.')} className={pill(false)}>Supprimer</button>
                {selected.series && <button type="button" onClick={() => window.confirm('Supprimer cette indisponibilité et toutes les suivantes de la série ?') && act(() => deleteSeries(selected.series, selected.date), 'Série supprimée.')} className={pill(false)}>Supprimer la série</button>}
              </div>
            </>
          )}
          {selected && !selected.manual && (
            <>
              <p className="flex items-center justify-between gap-2">
                <span className="font-serif text-2xl text-bordeaux">{selected.name}</span>
                <span className="rounded-full bg-gold-pale px-2.5 py-1 text-[0.7rem] uppercase tracking-wide text-gold-dark">{statusLabel[selected.status]}</span>
              </p>
              <p className="mt-1 font-serif text-xl first-letter:uppercase">{formatDate(selected.date)} · {hm(selected.start)} – {hm(selected.end)}</p>
              <p className="mt-2 text-taupe">{namesOf(selected, services)} · {selected.total} CHF</p>
              {selected.address && <p className="mt-1 flex items-start gap-1.5 text-taupe"><MapPin size={14} className="mt-1 shrink-0" aria-hidden="true" /> {selected.address}</p>}
              {selected.email && <p className="mt-1 text-taupe">{selected.email}</p>}
              {selected.message && <p className="mt-1 italic text-taupe">« {selected.message} »</p>}
              {selected.phone && (
                <p className="mt-3 flex flex-wrap gap-2">
                  <a href={`tel:${selected.phone}`} className={`${pill(false)} inline-flex items-center gap-1`}><Phone size={13} aria-hidden="true" /> {selected.phone}</a>
                  <a href={`https://wa.me/${waNumber(selected.phone)}?text=${encodeURIComponent(confirmWhatsApp(selected))}`} target="_blank" rel="noopener" className={`${pill(false)} inline-flex items-center gap-1`}><MessageCircle size={13} aria-hidden="true" /> Envoyer la confirmation</a>
                </p>
              )}
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.status === 'pending' && <button type="button" onClick={() => act(() => setStatus(selected, 'confirmed'), mailable(selected) ? 'Rendez-vous confirmé, e-mail envoyé à la cliente.' : 'Rendez-vous confirmé.')} className={pill(true)}>Confirmer</button>}
                <button type="button" onClick={() => window.confirm('Annuler ce rendez-vous et libérer le créneau ?') && act(() => setStatus(selected, 'cancelled'), mailable(selected) ? 'Rendez-vous annulé, cliente prévenue par e-mail.' : 'Rendez-vous annulé, créneau libéré.')} className={pill(false)}>Annuler</button>
                {selected.series && <button type="button" onClick={() => window.confirm('Supprimer ce rendez-vous et tous les suivants de la série ?') && act(() => deleteSeries(selected.series, selected.date), 'Série supprimée.')} className={pill(false)}>Supprimer la série</button>}
              </div>
            </>
          )}
        </aside>
      </div>

      {adding && <EntryForm initial={adding} services={services} notify={notify} onClose={() => setAdding(null)} onSaved={(msg) => { setAdding(null); notify(msg); refresh(); }} />}
    </div>
  );
}

function Hours({ notify }) {
  const [s, setS] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSchedule().then(setS).catch(() => setS(defaultSchedule));
  }, []);

  if (!s) return <p className="flex items-center gap-2 text-taupe"><Loader2 size={16} className="animate-spin" /> Chargement…</p>;

  const setDay = (i, patch) => setS((cur) => ({ ...cur, days: { ...cur.days, [i]: { ...cur.days[i], ...patch } } }));
  const testMail = async () => {
    const d = dateKey(new Date());
    const sample = { name: 'Cliente Test', phone: '+41 79 000 00 00', email: adminEmails[0], address: 'Rue de l’Exemple 1, Genève', message: '', date: d, start: 600, end: 690, total: 100, lang: 'fr', services: [{ name: 'Lifting coréen des cils', price: 100, minutes: 90 }] };
    try {
      await sendMail(emailToClient(sample, 'confirmed'));
      notify(`E-mail de test mis en file d’envoi vers ${adminEmails[0]}. S’il n’arrive pas d’ici une minute, la fonction d’envoi n’est pas encore déployée.`);
    } catch {
      notify('Envoi impossible (règles Firestore à mettre à jour ?).');
    }
  };
  const copyAll = (i) => setS((cur) => ({ ...cur, days: Object.fromEntries(Object.entries(cur.days).map(([k, d]) => [k, d.open ? { ...d, start: cur.days[i].start, end: cur.days[i].end } : d])) }));
  const save = async () => {
    const bad = weekOrder.find((i) => s.days[i].open && toMin(s.days[i].end) <= toMin(s.days[i].start));
    if (bad !== undefined) return notify(`${dayNames[bad]} : l’heure de fin doit être après l’heure de début.`);
    setSaving(true);
    try {
      await saveSchedule(s);
      notify('Horaires enregistrés. Ils s’appliquent immédiatement à la réservation en ligne.');
    } catch {
      notify('Enregistrement impossible (droits d’accès ou connexion).');
    }
    return setSaving(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <section className={card}>
        <h2 className="font-serif text-2xl text-bordeaux">Jours et heures de travail</h2>
        <ul className="mt-4 divide-y divide-gold/20">
          {weekOrder.map((i) => (
            <li key={i} className="flex flex-wrap items-center gap-3 py-3">
              <label className="flex w-36 items-center gap-3">
                <input type="checkbox" checked={s.days[i].open} onChange={(e) => setDay(i, { open: e.target.checked })} className="h-5 w-5 accent-[#4A1A22]" />
                <span className="font-serif text-xl">{dayNames[i]}</span>
              </label>
              {s.days[i].open ? (
                <span className="flex flex-wrap items-center gap-2">
                  <input type="time" aria-label={`${dayNames[i]} – début`} value={s.days[i].start} onChange={(e) => setDay(i, { start: e.target.value })} className={field} />
                  <span>–</span>
                  <input type="time" aria-label={`${dayNames[i]} – fin`} value={s.days[i].end} onChange={(e) => setDay(i, { end: e.target.value })} className={field} />
                  <button type="button" onClick={() => copyAll(i)} className="text-sm text-gold-dark underline-offset-4 hover:underline">Appliquer à tous les jours</button>
                </span>
              ) : (
                <span className="text-taupe">Fermé</span>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-taupe">Pour une pause régulière (midi, par exemple), ajoutez dans le planning une indisponibilité répétée chaque semaine.</p>
      </section>

      <div className="space-y-6">
        <section className={`${card} space-y-4`}>
          <h2 className="font-serif text-2xl text-bordeaux">Réglages des créneaux</h2>
          <label className="flex items-center justify-between gap-4">
            <span>Une heure proposée toutes les</span>
            <select value={s.slotMinutes} onChange={(e) => setS((c) => ({ ...c, slotMinutes: Number(e.target.value) }))} className={field}>
              {[15, 30, 60].map((v) => <option key={v} value={v}>{v} min</option>)}
            </select>
          </label>
          <label className="flex items-center justify-between gap-4">
            <span>Temps de trajet entre deux rendez-vous</span>
            <select value={s.bufferMinutes} onChange={(e) => setS((c) => ({ ...c, bufferMinutes: Number(e.target.value) }))} className={field}>
              {[0, 15, 30, 45, 60].map((v) => <option key={v} value={v}>{v} min</option>)}
            </select>
          </label>
        </section>

        <section className={`${card} space-y-3`}>
          <h2 className="font-serif text-2xl text-bordeaux">E-mails automatiques</h2>
          <label className="flex items-start gap-3">
            <input type="checkbox" checked={!!s.emailEnabled} onChange={(e) => setS((c) => ({ ...c, emailEnabled: e.target.checked }))} className="mt-1 h-5 w-5 accent-[#4A1A22]" />
            <span>Activer les e-mails : avis à chaque nouvelle demande, et confirmation ou annulation envoyée à la cliente.</span>
          </label>
          <p className="text-sm text-taupe">À activer une fois la fonction d’envoi SMTP déployée dans Firebase. Enregistrez, puis testez.</p>
          <button type="button" onClick={testMail} className={pill(false)}>Envoyer un e-mail de test</button>
        </section>

        <section className={`${card} space-y-3`}>
          <h2 className="font-serif text-2xl text-bordeaux">Jours de congé</h2>
          <div className="flex gap-2">
            <input type="date" aria-label="Jour de congé" value={newDate} min={dateKey(new Date())} onChange={(e) => setNewDate(e.target.value)} className={`${field} flex-1`} />
            <button type="button" onClick={() => { if (newDate && !s.blockedDates.includes(newDate)) setS((c) => ({ ...c, blockedDates: [...c.blockedDates, newDate].sort() })); setNewDate(''); }} className={pill(false)}>Ajouter</button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {s.blockedDates.filter((d) => d >= dateKey(new Date())).map((d) => (
              <li key={d} className="flex items-center gap-2 rounded-full bg-gold-pale px-3 py-1.5 text-sm">
                {formatDate(d, { day: 'numeric', month: 'short', year: 'numeric' })}
                <button type="button" aria-label="Retirer" onClick={() => setS((c) => ({ ...c, blockedDates: c.blockedDates.filter((x) => x !== d) }))}><Trash2 size={13} /></button>
              </li>
            ))}
          </ul>
        </section>

        <button type="button" onClick={save} disabled={saving} className="btn-primary w-full disabled:opacity-60"><span>{saving ? 'Enregistrement…' : 'Enregistrer les horaires'}</span></button>
      </div>
    </div>
  );
}

const emptyService = { id: '', name: '', category: categories[0].id, duration: 60, price: '', description: '', hidden: false };
const builtin = new Set(allServices().map((s) => s.id));

/** Prestations : en ajouter, modifier prix / durée / description, masquer */
function Prestations({ notify, services, reload }) {
  const [edit, setEdit] = useState(null);
  const groups = services.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  const submit = async (e) => {
    e.preventDefault();
    if (!edit.name.trim() || edit.price === '' || Number(edit.price) < 0) return notify('Indiquez un nom et un prix.');
    const isNew = !edit.id;
    const id = edit.id || `c-${Date.now().toString(36)}`;
    const data = { price: Number(edit.price), duration: Number(edit.duration) || 30, description: edit.description.trim(), hidden: !!edit.hidden };
    if (!builtin.has(id)) Object.assign(data, { name: edit.name.trim(), category: edit.category });
    try {
      await saveService(id, data);
      notify(isNew ? 'Prestation ajoutée : elle est visible sur le site et réservable.' : 'Prestation mise à jour.');
      setEdit(null);
      reload();
    } catch {
      notify('Enregistrement impossible (droits d’accès ou connexion).');
    }
    return undefined;
  };
  const remove = async (s) => {
    if (!window.confirm(builtin.has(s.id) ? 'Revenir au prix et à la durée d’origine de cette prestation ?' : `Supprimer « ${s.name} » ?`)) return;
    try {
      await deleteService(s.id);
      notify(builtin.has(s.id) ? 'Valeurs d’origine rétablies.' : 'Prestation supprimée.');
      reload();
    } catch {
      notify('Suppression impossible.');
    }
  };

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[1.3fr_.7fr]">
      <section className={card}>
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-2xl text-bordeaux">Carte des prestations</h2>
          <button type="button" onClick={() => setEdit({ ...emptyService })} className="inline-flex items-center gap-2 rounded-full bg-bordeaux px-5 py-2.5 text-sm text-cream"><Plus size={15} aria-hidden="true" /> Nouvelle prestation</button>
        </div>
        {Object.entries(groups).map(([cat, list]) => (
          <div key={cat} className="mt-6">
            <p className="kicker">{cat}</p>
            <ul className="mt-2 divide-y divide-gold/20">
              {list.map((s) => (
                <li key={s.id} className={`flex flex-wrap items-center gap-x-4 gap-y-1 py-2.5 ${s.hidden ? 'opacity-45' : ''}`}>
                  <span className="min-w-0 flex-1 font-serif text-xl">{s.name}{s.hidden && ' (masquée)'}{s.custom && <span className="ml-2 rounded-full bg-gold-pale px-2 py-0.5 font-sans text-[0.65rem] uppercase tracking-wide text-gold-dark">ajoutée</span>}</span>
                  <span className="text-sm text-taupe">{formatDuration(bookingMinutes(s))}</span>
                  <span className="w-20 text-right font-serif text-xl text-bordeaux">{s.price} CHF</span>
                  <button type="button" aria-label={`Modifier ${s.name}`} onClick={() => setEdit({ ...emptyService, ...s, category: s.categoryId || emptyService.category, duration: bookingMinutes(s), description: s.description || '' })} className="grid h-9 w-9 place-items-center rounded-full border border-gold/40"><Pencil size={14} /></button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {edit ? (
        <form onSubmit={submit} className={`${card} space-y-4 lg:sticky lg:top-28`}>
          <h2 className="font-serif text-2xl text-bordeaux">{edit.id ? 'Modifier la prestation' : 'Nouvelle prestation'}</h2>
          <label className="block"><span className="kicker">Nom</span>
            <input value={edit.name} disabled={builtin.has(edit.id)} onChange={(e) => setEdit((c) => ({ ...c, name: e.target.value }))} className={`${field} mt-1 w-full disabled:opacity-60`} />
          </label>
          {!builtin.has(edit.id) && (
            <label className="block"><span className="kicker">Catégorie</span>
              <select value={edit.category} onChange={(e) => setEdit((c) => ({ ...c, category: e.target.value }))} className={`${field} mt-1 w-full`}>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </label>
          )}
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="kicker">Durée (min)</span>
              <input type="number" min="5" step="5" value={edit.duration} onChange={(e) => setEdit((c) => ({ ...c, duration: e.target.value }))} className={`${field} mt-1 w-full`} />
            </label>
            <label className="block"><span className="kicker">Prix (CHF)</span>
              <input type="number" min="0" step="1" value={edit.price} onChange={(e) => setEdit((c) => ({ ...c, price: e.target.value }))} className={`${field} mt-1 w-full`} />
            </label>
          </div>
          <label className="block"><span className="kicker">Description</span>
            <textarea rows={3} value={edit.description} onChange={(e) => setEdit((c) => ({ ...c, description: e.target.value }))} className={`${field} mt-1 w-full resize-none`} />
          </label>
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={!!edit.hidden} onChange={(e) => setEdit((c) => ({ ...c, hidden: e.target.checked }))} className="h-5 w-5 accent-[#4A1A22]" />
            <span>Masquer sur le site</span>
          </label>
          <div className="flex flex-wrap gap-2">
            <button type="submit" className={pill(true)}>Enregistrer</button>
            <button type="button" onClick={() => setEdit(null)} className={pill(false)}>Fermer</button>
            {edit.id && <button type="button" onClick={() => { remove(edit); setEdit(null); }} className={`${pill(false)} inline-flex items-center gap-1`}><Trash2 size={13} aria-hidden="true" /> {builtin.has(edit.id) ? 'Rétablir l’origine' : 'Supprimer'}</button>}
          </div>
        </form>
      ) : (
        <p className={`${card} text-sm text-taupe`}>
          La durée sert à calculer automatiquement les heures proposées aux clientes et la fin de chaque rendez-vous.
          Les changements apparaissent tout de suite sur le site et dans la réservation.
        </p>
      )}
    </div>
  );
}

export default function Admin() {
  const [user, setUser] = useState(undefined); // undefined = vérification en cours
  const [tab, setTab] = useState('planning');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [custom, setCustom] = useState([]);

  useEffect(() => {
    let unsub = () => {};
    authApi()
      .then(({ m, auth }) => {
        unsub = m.onAuthStateChanged(auth, (u) => setUser(u || null));
      })
      .catch(() => setUser(null));
    return () => unsub();
  }, []);

  const reload = useCallback(() => {
    resetCustomServices();
    loadCustomServices().then(setCustom).catch(() => {});
  }, []);
  useEffect(reload, [reload]);

  const notify = useCallback((msg) => {
    setNote(msg);
    window.clearTimeout(notify.t);
    notify.t = window.setTimeout(() => setNote(''), 5000);
  }, []);
  // L'espace privé n'existe qu'en français : /es/admin et /en/admin y renvoient
  useEffect(() => {
    if (prefix) window.location.replace(`${import.meta.env.BASE_URL}admin`);
  }, []);

  const logout = async () => {
    const { m, auth } = await authApi();
    await m.signOut(auth);
  };
  // Aperçu de l'interface sans connexion, uniquement en développement local (?demo)
  const demo = import.meta.env.DEV && typeof window !== 'undefined' && window.location.search === '?demo';
  const allowed = demo || (user && adminEmails.includes(user.email));
  const all = useMemo(() => allServicesWith(custom, { includeHidden: true }), [custom]);
  const bookable = useMemo(() => all.filter((s) => !s.hidden), [all]);

  return (
    <section className="min-h-screen bg-ivory/60 pb-24 pt-32">
      <div className="container-site">
        {user === undefined && !demo && <p className="flex items-center gap-2 text-taupe"><Loader2 size={16} className="animate-spin" /> Chargement…</p>}
        {user === null && !demo && <Login error={error} onError={setError} />}
        {user && !allowed && (
          <div className={`${card} mx-auto max-w-md`}>
            <p>Ce compte n’a pas accès à l’espace privé.</p>
            <button type="button" onClick={logout} className="btn-ghost mt-4">Se déconnecter</button>
          </div>
        )}
        {allowed && (
          <>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <h1 className="display text-4xl">Mon planning</h1>
              <div className="flex flex-wrap items-center gap-2">
                {[['planning', 'Planning', CalendarDays], ['horaires', 'Horaires', Clock], ['prestations', 'Prestations', Sparkles]].map(([id, label, Icon]) => (
                  <button type="button" key={id} aria-pressed={tab === id} onClick={() => setTab(id)} className={`${pill(tab === id)} inline-flex items-center gap-2 !px-5 !py-2.5`}>
                    <Icon size={15} aria-hidden="true" /> {label}
                  </button>
                ))}
                <button type="button" onClick={logout} aria-label="Se déconnecter" className="grid h-11 w-11 place-items-center rounded-full border border-gold/40"><LogOut size={16} /></button>
              </div>
            </div>
            {tab === 'planning' && <Planning notify={notify} services={bookable} />}
            {tab === 'horaires' && <Hours notify={notify} />}
            {tab === 'prestations' && <Prestations notify={notify} services={all} reload={reload} />}
          </>
        )}
      </div>
      <p role="status" className={`fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-full bg-bordeaux-deep px-6 py-3 text-sm text-cream shadow-soft transition-opacity duration-300 ${note ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>{note}</p>
    </section>
  );
}
