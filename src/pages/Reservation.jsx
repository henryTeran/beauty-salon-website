import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCircle2, ChevronLeft, ChevronRight, Clock, Loader2, Mail, MessageCircle, Phone, Plus, Trash2 } from 'lucide-react';
import { allServicesWith, bookingMinutes, formatDuration } from '../data/services.js';
import { site, telHref, waHref } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { PageHero } from '../components/blocks.jsx';
import { ease } from '../components/ui.jsx';
import { defaultSchedule, freeSlots, toTime, dateKey, addDays, formatDate, parseDate } from '../lib/schedule.js';
import { loadSchedule, loadBusy, createBooking } from '../lib/firebase.js';
import { useCustomServices } from '../lib/useCustomServices.js';

const meta = getRouteMeta('/reservation');
const weekdays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
const hm = (min) => toTime(min).replace(':', 'h');
const monthStart = (key) => `${key.slice(0, 8)}01`;
const field =
  'w-full rounded-2xl border border-gold/35 bg-cream px-5 py-3.5 text-ink placeholder:text-taupe/60 transition-colors focus:border-bordeaux focus:outline-none';
const panel = 'rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cream to-ivory p-6 shadow-card md:p-8';

/** Calendrier mensuel : les jours avec au moins un créneau libre sont cliquables */
function MonthCalendar({ month, setMonth, selected, onSelect, isFree, min, max, loading }) {
  const first = parseDate(month);
  const offset = (first.getDay() + 6) % 7; // lundi en première colonne
  const count = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: count }, (_, i) => addDays(month, i))];
  const shift = (n) => {
    const d = parseDate(month);
    d.setMonth(d.getMonth() + n);
    setMonth(monthStart(dateKey(d)));
  };
  const nav = 'grid h-10 w-10 place-items-center rounded-full border border-gold/40 text-bordeaux transition-colors hover:bg-bordeaux hover:text-cream disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-bordeaux';
  return (
    <div>
      <div className="flex items-center justify-between">
        <button type="button" aria-label="Mois précédent" disabled={month <= monthStart(min)} onClick={() => shift(-1)} className={nav}><ChevronLeft size={18} aria-hidden="true" /></button>
        <p className="font-serif text-2xl capitalize text-bordeaux" aria-live="polite">
          {formatDate(month, { month: 'long', year: 'numeric' })}
          {loading && <Loader2 size={14} className="ml-2 inline animate-spin text-gold-dark" aria-hidden="true" />}
        </p>
        <button type="button" aria-label="Mois suivant" disabled={month >= monthStart(max)} onClick={() => shift(1)} className={nav}><ChevronRight size={18} aria-hidden="true" /></button>
      </div>
      <div className="mt-5 grid grid-cols-7 gap-y-1 text-center">
        {weekdays.map((d) => (
          <span key={d} className="pb-2 text-[0.7rem] uppercase tracking-wide2 text-taupe">{d}</span>
        ))}
        {cells.map((key, i) => {
          if (!key) return <span key={`e${i}`} />;
          const free = key >= min && key <= max && isFree(key);
          const on = key === selected;
          return (
            <button
              type="button"
              key={key}
              disabled={!free}
              aria-pressed={on}
              aria-label={formatDate(key)}
              onClick={() => onSelect(key)}
              className={`mx-auto grid h-11 w-11 place-items-center rounded-full font-serif text-xl transition-colors duration-300 ${
                on ? 'bg-bordeaux text-cream' : free ? 'text-bordeaux hover:bg-gold-pale' : 'cursor-default text-taupe/35'
              }`}
            >
              {Number(key.slice(8))}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Reservation() {
  const [params] = useSearchParams();
  const custom = useCustomServices();
  const services = useMemo(() => allServicesWith(custom), [custom]);
  const groups = useMemo(
    () => services.reduce((acc, s) => {
      (acc[s.category] ||= []).push(s);
      return acc;
    }, {}),
    [services]
  );
  const today = useMemo(() => dateKey(new Date()), []);
  const maxDate = useMemo(() => addDays(today, 90), [today]);

  const [selected, setSelected] = useState([]);
  const [picker, setPicker] = useState(true);
  const [month, setMonth] = useState(monthStart(today));
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: null, adresse: '', message: '' });
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [busy, setBusy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);
  const doneRef = useRef(null);

  useEffect(() => {
    const id = params.get('soin');
    if (id) {
      setSelected([id]);
      setPicker(false);
    }
  }, [params]);

  // Horaires définis dans l'espace privé (valeurs par défaut si indisponibles)
  useEffect(() => {
    loadSchedule().then(setSchedule).catch(() => {});
  }, []);

  // Créneaux déjà pris sur le mois affiché
  useEffect(() => {
    let alive = true;
    setLoading(true);
    loadBusy(month, addDays(month, 31))
      .then((b) => alive && setBusy(b))
      .catch(() => alive && setBusy([]))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [month]);

  const chosen = useMemo(() => services.filter((s) => selected.includes(s.id)), [services, selected]);
  const total = chosen.reduce((t, s) => t + Number(s.price), 0);
  const duration = chosen.reduce((t, s) => t + bookingMinutes(s), 0);
  const slotsOf = useMemo(() => {
    const cache = {};
    return (key) => (cache[key] ||= freeSlots(schedule, key, duration, busy.filter((b) => b.date === key)).slots);
  }, [schedule, duration, busy]);
  const slots = form.date ? slotsOf(form.date) : [];

  // Le créneau choisi n'est plus valable si la durée change ou s'il vient d'être pris
  useEffect(() => {
    setForm((f) => (f.date && f.time !== null && !slotsOf(f.date).includes(f.time) ? { ...f, time: null } : f));
  }, [slotsOf]);

  // Ramène la confirmation à l'écran une fois affichée
  useEffect(() => {
    if (done) doneRef.current?.scrollIntoView({ block: 'center' });
  }, [done]);

  const toggle = (id) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildMessage = () =>
    [
      `Bonjour ${site.owner}, je souhaite prendre rendez-vous.`,
      '',
      `Date : ${formatDate(form.date)}`,
      `Heure : ${hm(form.time)} – ${hm(form.time + duration)}`,
      '',
      'Prestations :',
      ...chosen.map((s) => `• ${s.name} (${formatDuration(bookingMinutes(s))}) – ${s.price} CHF`),
      `Total indicatif : ${total} CHF`,
      '',
      `Adresse (soin à domicile) : ${form.adresse}`,
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      form.message && `Message : ${form.message}`,
    ]
      .filter((l) => typeof l === 'string')
      .join('\n');

  const validate = () => {
    if (!chosen.length) return 'Sélectionnez au moins une prestation.';
    if (!form.date || form.time === null) return 'Choisissez une date et une heure.';
    if (!form.adresse.trim()) return 'Indiquez la commune ou l’adresse du soin.';
    if (!form.name.trim()) return 'Indiquez votre nom.';
    if (!form.phone.trim()) return 'Indiquez votre numéro de téléphone.';
    return '';
  };

  const submit = async (e) => {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (err || sending) return;
    setSending(true);
    const text = buildMessage();
    let saved = true;
    try {
      await createBooking({
        name: form.name.trim(),
        phone: form.phone.trim(),
        address: form.adresse.trim(),
        message: form.message.trim(),
        date: form.date,
        start: form.time,
        end: form.time + duration,
        services: chosen.map((s) => ({ id: s.id, name: s.name, price: Number(s.price) })),
        total,
      });
    } catch {
      saved = false; // le planning est indisponible : la demande part quand même par WhatsApp
    }
    setSending(false);
    setDone({ saved, text });
  };

  return (
    <>
      <PageHero kicker="Rendez-vous" title="Réserver un soin" breadcrumbs={meta.breadcrumbs}>
        Choisissez vos soins, une date et une heure : {site.owner} se déplace chez vous et vous confirme le rendez-vous
        personnellement.
      </PageHero>

      <section className="section !pt-16">
        <div className="container-site">
          {done ? (
            <div ref={doneRef} className={`${panel} mx-auto max-w-3xl md:!p-12`} role="status">
              <CheckCircle2 size={40} strokeWidth={1.2} className="text-gold-dark" aria-hidden="true" />
              <h2 className="display mt-5 text-3xl md:text-4xl">{done.saved ? 'Demande enregistrée' : 'Dernière étape'}</h2>
              <p className="mt-4 max-w-xl text-taupe">
                {done.saved
                  ? 'Votre créneau est pré-réservé. Envoyez maintenant votre demande pour recevoir la confirmation.'
                  : 'Le planning en ligne est momentanément indisponible. Envoyez votre demande directement : le créneau vous sera confirmé.'}
              </p>
              <p className="mt-4 font-serif text-2xl capitalize text-bordeaux">{formatDate(form.date)} · {hm(form.time)}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={waHref(done.text)} target="_blank" rel="noopener" className="btn-primary">
                  <span className="flex items-center gap-2"><MessageCircle size={16} aria-hidden="true" /> Envoyer par WhatsApp</span>
                </a>
                {site.email && (
                  <a href={`mailto:${site.email}?subject=${encodeURIComponent('Demande de rendez-vous')}&body=${encodeURIComponent(done.text)}`} className="btn-ghost">
                    <Mail size={15} aria-hidden="true" /> Envoyer par e-mail
                  </a>
                )}
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="grid items-start gap-8 lg:grid-cols-2">
                {/* Colonne gauche : le rendez-vous */}
                <div>
                  <h2 className="display text-2xl tracking-[0.06em] md:text-3xl">Votre rendez-vous</h2>
                  <ul className="mt-6 space-y-3">
                    <AnimatePresence initial={false}>
                      {chosen.map((s) => (
                        <motion.li key={s.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.4, ease }} className={`${panel} !p-5`}>
                          <div className="flex items-baseline justify-between gap-4">
                            <p className="font-serif text-2xl leading-tight text-bordeaux">{s.name}</p>
                            <p className="whitespace-nowrap font-serif text-2xl text-bordeaux">{s.price} <span className="font-sans text-[0.7rem] uppercase tracking-wide2 text-gold-dark">CHF</span></p>
                          </div>
                          <div className="mt-2 flex items-center justify-between gap-4 text-sm text-taupe">
                            <span className="flex items-center gap-1.5"><Clock size={14} aria-hidden="true" /> {formatDuration(bookingMinutes(s))} · {s.category}</span>
                            <button type="button" onClick={() => toggle(s.id)} className="flex items-center gap-1.5 text-bordeaux-soft"><Trash2 size={14} aria-hidden="true" /> <span className="link-line">Retirer</span></button>
                          </div>
                        </motion.li>
                      ))}
                    </AnimatePresence>
                  </ul>
                  {chosen.length > 0 && (
                    <p className="mt-4 flex items-baseline justify-between px-2">
                      <span className="kicker">Total indicatif · {formatDuration(duration)}</span>
                      <span className="font-serif text-3xl text-bordeaux">{total} <span className="font-sans text-xs uppercase tracking-wide2 text-gold-dark">CHF</span></span>
                    </p>
                  )}

                  {chosen.length > 0 && (
                    <button type="button" aria-expanded={picker} onClick={() => setPicker((p) => !p)} className="btn-ghost mt-5 !px-6 !py-3">
                      <Plus size={15} className={`transition-transform duration-300 ${picker ? 'rotate-45' : ''}`} aria-hidden="true" /> Ajouter une prestation
                    </button>
                  )}
                  <AnimatePresence initial={false}>
                    {(picker || chosen.length === 0) && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="overflow-hidden">
                        <div className="space-y-6 pt-6">
                          {Object.entries(groups).map(([cat, list]) => (
                            <div key={cat}>
                              <p className="kicker">{cat}</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {list.map((s) => {
                                  const on = selected.includes(s.id);
                                  return (
                                    <button
                                      type="button"
                                      key={s.id}
                                      aria-pressed={on}
                                      onClick={() => toggle(s.id)}
                                      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-left text-[0.92rem] transition-colors duration-300 ${
                                        on ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40 hover:border-bordeaux'
                                      }`}
                                    >
                                      {on && <Check size={14} aria-hidden="true" />}
                                      <span>{s.name}{s.duration ? ` · ${formatDuration(s.duration)}` : ''}</span>
                                      <span className={`whitespace-nowrap font-serif text-lg ${on ? 'text-gold-light' : 'text-bordeaux'}`}>{s.price} CHF</span>
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Colonne droite : date et heure */}
                <div className="lg:sticky lg:top-28">
                  <h2 className="display text-2xl tracking-[0.06em] md:text-3xl">Date et heure</h2>
                  <div className={`${panel} mt-6`}>
                    <MonthCalendar
                      month={month}
                      setMonth={setMonth}
                      selected={form.date}
                      onSelect={(date) => setForm((f) => ({ ...f, date, time: null }))}
                      isFree={(key) => slotsOf(key).length > 0}
                      min={today}
                      max={maxDate}
                      loading={loading}
                    />
                    <div className="hairline my-6" />
                    <div aria-live="polite">
                      {!form.date && <p className="text-center text-taupe">Choisissez un jour pour voir les heures disponibles.</p>}
                      {form.date && (
                        <>
                          <p className="kicker text-center">{formatDate(form.date)}</p>
                          {slots.length === 0 ? (
                            <p className="mt-3 text-center text-taupe">Plus d’heure disponible ce jour-là pour cette durée.</p>
                          ) : (
                            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                              {slots.map((t) => (
                                <motion.button
                                  whileTap={{ scale: 0.95 }}
                                  type="button"
                                  key={t}
                                  aria-pressed={form.time === t}
                                  onClick={() => setForm((f) => ({ ...f, time: t }))}
                                  className={`rounded-xl py-2.5 font-serif text-xl transition-colors duration-300 ${
                                    form.time === t ? 'bg-bordeaux text-cream' : 'bg-gold-pale/60 text-bordeaux hover:bg-gold-pale'
                                  }`}
                                >
                                  {hm(t)}
                                </motion.button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Coordonnées */}
              <div className="mt-14 border-t border-gold/25 pt-12">
                <h2 className="display text-2xl tracking-[0.06em] md:text-3xl">Vos coordonnées</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="kicker">Nom et prénom *</span>
                    <input required type="text" autoComplete="name" value={form.name} onChange={set('name')} className={`${field} mt-2`} />
                  </label>
                  <label className="block">
                    <span className="kicker">Téléphone *</span>
                    <input required type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="+41…" className={`${field} mt-2`} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="kicker">Commune / adresse du soin à domicile *</span>
                    <input required type="text" autoComplete="street-address" value={form.adresse} onChange={set('adresse')} placeholder="Ex. Carouge, rue…" className={`${field} mt-2`} />
                  </label>
                  <label className="block md:col-span-2">
                    <span className="kicker">Message (facultatif)</span>
                    <textarea rows={3} value={form.message} onChange={set('message')} placeholder="Type de peau, première visite, question…" className={`${field} mt-2 resize-none`} />
                  </label>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60">
                    <span className="flex items-center gap-2">
                      {sending ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
                      Demander ce rendez-vous
                    </span>
                  </button>
                  {form.date && form.time !== null && (
                    <p className="font-serif text-2xl capitalize text-bordeaux">{formatDate(form.date)} · {hm(form.time)}</p>
                  )}
                </div>
                <p role="alert" className={`mt-4 text-bordeaux-soft ${error ? '' : 'hidden'}`}>{error}</p>
                <p className="mt-4 max-w-xl text-sm text-taupe">
                  Votre demande est enregistrée dans le planning, puis vous l’envoyez par WhatsApp ou e-mail. Le
                  rendez-vous est validé après confirmation.
                </p>
                <p className="mt-6 flex flex-wrap gap-x-8 gap-y-2 text-taupe">
                  <a href={telHref} className="flex items-center gap-2"><Phone size={16} strokeWidth={1.4} aria-hidden="true" /> <span className="link-line">{site.phoneDisplay}</span></a>
                  <a href={waHref('Bonjour, je souhaite prendre rendez-vous.')} target="_blank" rel="noopener" className="flex items-center gap-2"><MessageCircle size={16} strokeWidth={1.4} aria-hidden="true" /> <span className="link-line">WhatsApp</span></a>
                </p>
              </div>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
