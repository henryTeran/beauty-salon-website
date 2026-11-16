import { useCallback, useEffect, useMemo, useState } from 'react';
import { CalendarDays, ChevronLeft, ChevronRight, Clock, Loader2, LogOut, MapPin, MessageCircle, Phone, Plus, Trash2 } from 'lucide-react';
import { adminEmails } from '../config/firebase.js';
import { authApi, loadSchedule, saveSchedule, loadBookings, loadBusy, setBookingStatus, addBlock, deleteBusy } from '../lib/firebase.js';
import { defaultSchedule, dayNames, weekOrder, dateKey, addDays, formatDate, parseDate, toMin, toTime } from '../lib/schedule.js';

const field = 'rounded-xl border border-gold/35 bg-cream px-3 py-2 text-ink focus:border-bordeaux focus:outline-none';
const card = 'rounded-[1.5rem] border border-gold/30 bg-cream p-6 shadow-card';
const h = (min) => toTime(min).replace(':', 'h');
const statusLabel = { pending: 'À confirmer', confirmed: 'Confirmé', cancelled: 'Annulé' };
const statusStyle = { pending: 'bg-gold-pale text-gold-dark', confirmed: 'bg-bordeaux text-cream', cancelled: 'bg-sand/60 text-taupe line-through' };

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

function Planning({ notify }) {
  const monday = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return dateKey(d);
  }, []);
  const [offset, setOffset] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [block, setBlock] = useState({ date: '', start: '12:00', end: '14:00' });
  const start = addDays(monday, offset * 7);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  const today = dateKey(new Date());

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
      await refresh();
    } catch {
      notify('L’action a échoué. Réessayez.');
    }
  };
  const submitBlock = (e) => {
    e.preventDefault();
    if (!block.date || toMin(block.end) <= toMin(block.start)) return notify('Indiquez une date et une heure de fin après le début.');
    return act(() => addBlock({ date: block.date, start: toMin(block.start), end: toMin(block.end) }), 'Indisponibilité ajoutée.');
  };
  const pending = bookings.filter((b) => b.status === 'pending').length;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button type="button" aria-label="Semaine précédente" onClick={() => setOffset((o) => o - 1)} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40"><ChevronLeft size={18} /></button>
          <button type="button" onClick={() => setOffset(0)} className="rounded-full border border-gold/40 px-4 py-2.5 text-sm">Cette semaine</button>
          <button type="button" aria-label="Semaine suivante" onClick={() => setOffset((o) => o + 1)} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40"><ChevronRight size={18} /></button>
        </div>
        <p className="font-serif text-2xl text-bordeaux">
          {formatDate(start, { day: 'numeric', month: 'long' })} – {formatDate(days[6], { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <p className="text-sm text-taupe">{loading ? 'Chargement…' : pending ? `${pending} demande${pending > 1 ? 's' : ''} à confirmer` : 'Aucune demande en attente'}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {days.map((d) => {
          const list = bookings.filter((b) => b.date === d).sort((a, b) => a.start - b.start);
          const dayBlocks = blocks.filter((b) => b.date === d).sort((a, b) => a.start - b.start);
          return (
            <section key={d} className={`${card} ${d === today ? '!border-bordeaux' : ''}`}>
              <h2 className="font-serif text-2xl capitalize text-bordeaux">{formatDate(d, { weekday: 'long', day: 'numeric', month: 'short' })}</h2>
              {list.length === 0 && dayBlocks.length === 0 && <p className="mt-3 text-sm text-taupe">Aucun rendez-vous.</p>}
              <ul className="mt-3 space-y-3">
                {dayBlocks.map((b) => (
                  <li key={b.id} className="flex items-center justify-between gap-2 rounded-xl bg-sand/50 px-3 py-2 text-sm">
                    <span>{h(b.start)} – {h(b.end)} · Indisponible</span>
                    <button type="button" aria-label="Supprimer l’indisponibilité" onClick={() => act(() => deleteBusy(b.id), 'Indisponibilité supprimée.')}><Trash2 size={15} /></button>
                  </li>
                ))}
                {list.map((b) => (
                  <li key={b.id} className="rounded-xl border border-gold/25 p-3 text-sm">
                    <p className="flex items-center justify-between gap-2">
                      <span className="font-serif text-xl text-bordeaux">{h(b.start)} – {h(b.end)}</span>
                      <span className={`rounded-full px-2.5 py-1 text-[0.7rem] uppercase tracking-wide ${statusStyle[b.status] || ''}`}>{statusLabel[b.status] || b.status}</span>
                    </p>
                    <p className="mt-1 font-medium">{b.name}</p>
                    <p className="text-taupe">{(b.services || []).map((s) => s.name).join(', ')} · {b.total} CHF</p>
                    <p className="mt-1 flex items-start gap-1.5 text-taupe"><MapPin size={14} className="mt-1 shrink-0" aria-hidden="true" /> {b.address}</p>
                    {b.message && <p className="mt-1 italic text-taupe">« {b.message} »</p>}
                    <p className="mt-2 flex flex-wrap gap-2">
                      <a href={`tel:${b.phone}`} className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1.5"><Phone size={13} aria-hidden="true" /> {b.phone}</a>
                      <a href={`https://wa.me/${String(b.phone).replace(/\D/g, '').replace(/^0(?=7)/, '41')}`} target="_blank" rel="noopener" className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1.5"><MessageCircle size={13} aria-hidden="true" /> WhatsApp</a>
                    </p>
                    {b.status !== 'cancelled' && (
                      <p className="mt-2 flex gap-2">
                        {b.status === 'pending' && <button type="button" onClick={() => act(() => setBookingStatus(b.id, 'confirmed'), 'Rendez-vous confirmé.')} className="rounded-full bg-bordeaux px-3 py-1.5 text-cream">Confirmer</button>}
                        <button type="button" onClick={() => window.confirm('Annuler ce rendez-vous et libérer le créneau ?') && act(() => setBookingStatus(b.id, 'cancelled'), 'Rendez-vous annulé, créneau libéré.')} className="rounded-full border border-bordeaux/40 px-3 py-1.5 text-bordeaux">Annuler</button>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <form onSubmit={submitBlock} className={`${card} space-y-3`}>
          <h2 className="font-serif text-2xl text-bordeaux">Bloquer un créneau</h2>
          <p className="text-sm text-taupe">Pour une pause ou un rendez-vous pris hors du site.</p>
          <input type="date" aria-label="Date" value={block.date} onChange={(e) => setBlock((b) => ({ ...b, date: e.target.value }))} className={`${field} w-full`} />
          <div className="flex items-center gap-2">
            <input type="time" aria-label="Début" value={block.start} onChange={(e) => setBlock((b) => ({ ...b, start: e.target.value }))} className={`${field} flex-1`} />
            <span>–</span>
            <input type="time" aria-label="Fin" value={block.end} onChange={(e) => setBlock((b) => ({ ...b, end: e.target.value }))} className={`${field} flex-1`} />
          </div>
          <button type="submit" className="inline-flex items-center gap-2 rounded-full bg-bordeaux px-4 py-2.5 text-sm text-cream"><Plus size={15} aria-hidden="true" /> Ajouter</button>
        </form>
      </div>
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
                <span className="flex items-center gap-2">
                  <input type="time" aria-label={`${dayNames[i]} – début`} value={s.days[i].start} onChange={(e) => setDay(i, { start: e.target.value })} className={field} />
                  <span>–</span>
                  <input type="time" aria-label={`${dayNames[i]} – fin`} value={s.days[i].end} onChange={(e) => setDay(i, { end: e.target.value })} className={field} />
                </span>
              ) : (
                <span className="text-taupe">Fermé</span>
              )}
            </li>
          ))}
        </ul>
      </section>

      <div className="space-y-6">
        <section className={`${card} space-y-4`}>
          <h2 className="font-serif text-2xl text-bordeaux">Réglages des créneaux</h2>
          <label className="flex items-center justify-between gap-4">
            <span>Un créneau proposé toutes les</span>
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
          <h2 className="font-serif text-2xl text-bordeaux">Jours de congé</h2>
          <div className="flex gap-2">
            <input type="date" aria-label="Jour de congé" value={newDate} min={dateKey(new Date())} onChange={(e) => setNewDate(e.target.value)} className={`${field} flex-1`} />
            <button type="button" onClick={() => { if (newDate && !s.blockedDates.includes(newDate)) setS((c) => ({ ...c, blockedDates: [...c.blockedDates, newDate].sort() })); setNewDate(''); }} className="rounded-full border border-bordeaux/40 px-4 text-bordeaux">Ajouter</button>
          </div>
          <ul className="flex flex-wrap gap-2">
            {s.blockedDates.filter((d) => parseDate(d) >= parseDate(dateKey(new Date()))).map((d) => (
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

export default function Admin() {
  const [user, setUser] = useState(undefined); // undefined = vérification en cours
  const [tab, setTab] = useState('planning');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let unsub = () => {};
    authApi()
      .then(({ m, auth }) => {
        unsub = m.onAuthStateChanged(auth, (u) => setUser(u || null));
      })
      .catch(() => setUser(null));
    return () => unsub();
  }, []);

  const notify = useCallback((msg) => {
    setNote(msg);
    window.clearTimeout(notify.t);
    notify.t = window.setTimeout(() => setNote(''), 5000);
  }, []);
  const logout = async () => {
    const { m, auth } = await authApi();
    await m.signOut(auth);
  };
  const allowed = user && adminEmails.includes(user.email);

  return (
    <section className="min-h-screen bg-ivory/60 pb-24 pt-32">
      <div className="container-site">
        {user === undefined && <p className="flex items-center gap-2 text-taupe"><Loader2 size={16} className="animate-spin" /> Chargement…</p>}
        {user === null && <Login error={error} onError={setError} />}
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
                {[['planning', 'Planning', CalendarDays], ['horaires', 'Horaires', Clock]].map(([id, label, Icon]) => (
                  <button type="button" key={id} aria-pressed={tab === id} onClick={() => setTab(id)} className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm transition-colors ${tab === id ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40'}`}>
                    <Icon size={15} aria-hidden="true" /> {label}
                  </button>
                ))}
                <button type="button" onClick={logout} aria-label="Se déconnecter" className="grid h-11 w-11 place-items-center rounded-full border border-gold/40"><LogOut size={16} /></button>
              </div>
            </div>
            {tab === 'planning' ? <Planning notify={notify} /> : <Hours notify={notify} />}
          </>
        )}
      </div>
      <p role="status" className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-bordeaux-deep px-6 py-3 text-sm text-cream shadow-soft transition-opacity duration-300 ${note ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>{note}</p>
    </section>
  );
}
