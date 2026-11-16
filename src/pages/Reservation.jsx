import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, CheckCircle2, Loader2, Mail, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { allServices, formatDuration } from '../data/services.js';
import { site, telHref, waHref } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { Reveal } from '../components/ui.jsx';
import { PageHero } from '../components/blocks.jsx';
import { defaultSchedule, freeSlots, toTime, dateKey, addDays, formatDate, dayNames, weekOrder } from '../lib/schedule.js';
import { loadSchedule, loadBusy, createBooking } from '../lib/firebase.js';

const meta = getRouteMeta('/reservation');
const services = allServices();
const groups = services.reduce((acc, s) => {
  (acc[s.category] ||= []).push(s);
  return acc;
}, {});
// Durée bloquée dans le planning : une séance (pour les cures, la première)
const bookingMinutes = (s) => s.duration || (s.id === 'f-regard' ? 120 : 30);
const field =
  'w-full rounded-2xl border border-gold/35 bg-cream px-5 py-3.5 text-ink placeholder:text-taupe/60 transition-colors focus:border-bordeaux focus:outline-none';
const legend = 'display text-2xl tracking-[0.06em] text-bordeaux md:text-3xl';
const num = 'mr-3 font-serif italic normal-case text-gold-dark';

export default function Reservation() {
  const [params] = useSearchParams();
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: null, adresse: '', message: '' });
  const [schedule, setSchedule] = useState(defaultSchedule);
  const [busy, setBusy] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null);
  const doneRef = useRef(null);

  useEffect(() => {
    const id = params.get('soin');
    if (id && services.some((s) => s.id === id)) setSelected([id]);
  }, [params]);

  // Horaires définis dans l'espace privé (valeurs par défaut si indisponibles)
  useEffect(() => {
    loadSchedule().then(setSchedule).catch(() => {});
  }, []);

  useEffect(() => {
    if (!form.date) return undefined;
    let cancelled = false;
    setLoadingSlots(true);
    loadBusy(form.date)
      .then((b) => !cancelled && setBusy(b))
      .catch(() => !cancelled && setBusy([]))
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => {
      cancelled = true;
    };
  }, [form.date]);

  const chosen = useMemo(() => services.filter((s) => selected.includes(s.id)), [selected]);
  const total = chosen.reduce((t, s) => t + s.price, 0);
  const duration = chosen.reduce((t, s) => t + bookingMinutes(s), 0);
  const today = useMemo(() => dateKey(new Date()), []);
  const maxDate = useMemo(() => addDays(today, 90), [today]);
  const { slots, reason } = useMemo(
    () => (form.date ? freeSlots(schedule, form.date, duration, busy) : { slots: [], reason: null }),
    [schedule, form.date, duration, busy]
  );

  // Le créneau choisi n'est plus valable si la durée ou la date change
  useEffect(() => {
    setForm((f) => (f.time !== null && !slots.includes(f.time) ? { ...f, time: null } : f));
  }, [slots]);

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
      'Prestations :',
      ...chosen.map((s) => `• ${s.name}${s.duration ? ` (${formatDuration(s.duration)})` : ''} – ${s.price} CHF`),
      `Total indicatif : ${total} CHF`,
      '',
      `Date : ${formatDate(form.date)} à ${toTime(form.time).replace(':', 'h')}`,
      `Adresse (soin à domicile) : ${form.adresse}`,
      '',
      `Nom : ${form.name}`,
      `Téléphone : ${form.phone}`,
      form.message && `Message : ${form.message}`,
    ]
      .filter((l) => typeof l === 'string')
      .join('\n');

  const validate = () => {
    if (!chosen.length) return 'Sélectionnez au moins une prestation.';
    if (!form.date || form.time === null) return 'Choisissez une date et un créneau horaire.';
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
        services: chosen.map((s) => ({ id: s.id, name: s.name, price: s.price })),
        total,
      });
    } catch {
      saved = false; // le planning est indisponible : la demande part quand même par WhatsApp
    }
    setSending(false);
    setDone({ saved, text });
  };

  const hours = weekOrder.map((i) => [dayNames[i], schedule.days[i].open ? `${schedule.days[i].start.replace(':', 'h')} – ${schedule.days[i].end.replace(':', 'h')}` : 'Fermé']);

  return (
    <>
      <PageHero kicker="Rendez-vous" title="Réserver un soin" breadcrumbs={meta.breadcrumbs}>
        Choisissez vos soins et un créneau libre : {site.owner} se déplace chez vous et vous confirme le rendez-vous
        personnellement.
      </PageHero>

      <section className="section !pt-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1.25fr_.75fr]">
          {done ? (
            <div ref={doneRef} className="rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cream to-ivory p-8 shadow-card md:p-12" role="status">
              <CheckCircle2 size={40} strokeWidth={1.2} className="text-gold-dark" aria-hidden="true" />
              <h2 className="display mt-5 text-3xl md:text-4xl">{done.saved ? 'Demande enregistrée' : 'Dernière étape'}</h2>
              <p className="mt-4 max-w-xl text-taupe">
                {done.saved
                  ? `Votre créneau du ${formatDate(form.date)} à ${toTime(form.time).replace(':', 'h')} est pré-réservé. Envoyez maintenant votre demande à ${site.owner} pour qu’elle vous le confirme.`
                  : `Le planning en ligne est momentanément indisponible. Envoyez votre demande directement à ${site.owner} : elle vous confirmera le créneau.`}
              </p>
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
              <pre className="mt-8 whitespace-pre-wrap rounded-2xl bg-cream p-5 font-sans text-[0.9rem] text-taupe">{done.text}</pre>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="space-y-12">
              <fieldset>
                <legend className={legend}><span className={num}>01</span>Vos prestations</legend>
                <div className="mt-6 space-y-7">
                  {Object.entries(groups).map(([cat, list]) => (
                    <div key={cat}>
                      <p className="kicker">{cat}</p>
                      <div className="mt-3 flex flex-wrap gap-2.5">
                        {list.map((s) => {
                          const on = selected.includes(s.id);
                          return (
                            <motion.button
                              whileTap={{ scale: 0.96 }}
                              type="button"
                              key={s.id}
                              aria-pressed={on}
                              onClick={() => toggle(s.id)}
                              className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-left text-[0.95rem] transition-colors duration-300 ${
                                on ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40 hover:border-bordeaux'
                              }`}
                            >
                              {on && <Check size={14} aria-hidden="true" />}
                              <span>{s.name}{s.duration ? ` · ${formatDuration(s.duration)}` : ''}</span>
                              <span className={`whitespace-nowrap font-serif text-lg ${on ? 'text-gold-light' : 'text-bordeaux'}`}>{s.price} CHF</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className={legend}><span className={num}>02</span>Date et créneau</legend>
                <div className="mt-6 grid gap-5">
                  <label className="block sm:max-w-xs">
                    <span className="kicker">Date souhaitée</span>
                    <input type="date" min={today} max={maxDate} value={form.date} onChange={(e) => setForm((f) => ({ ...f, date: e.target.value, time: null }))} className={`${field} mt-2`} />
                  </label>
                  <div aria-live="polite">
                    <span className="kicker">Créneaux libres{form.date ? ` · ${formatDate(form.date)}` : ''}</span>
                    {!form.date && <p className="mt-2 text-taupe">Choisissez d’abord une date.</p>}
                    {form.date && loadingSlots && <p className="mt-3 flex items-center gap-2 text-taupe"><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Chargement des disponibilités…</p>}
                    {form.date && !loadingSlots && reason && (
                      <p className="mt-2 text-taupe">
                        {reason === 'full' ? 'Plus de créneau libre ce jour-là pour cette durée. Essayez une autre date.' : 'Pas de rendez-vous ce jour-là. Essayez une autre date.'}
                      </p>
                    )}
                    {form.date && !loadingSlots && slots.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {slots.map((t) => (
                          <button
                            type="button"
                            key={t}
                            aria-pressed={form.time === t}
                            onClick={() => setForm((f) => ({ ...f, time: t }))}
                            className={`rounded-full border px-4 py-2.5 font-serif text-lg transition-colors ${form.time === t ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40 hover:border-bordeaux'}`}
                          >
                            {toTime(t).replace(':', 'h')}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <label className="block">
                    <span className="kicker">Commune / adresse du soin (à domicile) *</span>
                    <input required type="text" autoComplete="street-address" value={form.adresse} onChange={set('adresse')} placeholder="Ex. Carouge, rue…" className={`${field} mt-2`} />
                  </label>
                </div>
              </fieldset>

              <fieldset>
                <legend className={legend}><span className={num}>03</span>Vos coordonnées</legend>
                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="kicker">Nom et prénom *</span>
                    <input required type="text" autoComplete="name" value={form.name} onChange={set('name')} className={`${field} mt-2`} />
                  </label>
                  <label className="block">
                    <span className="kicker">Téléphone *</span>
                    <input required type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="+41…" className={`${field} mt-2`} />
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="kicker">Message (facultatif)</span>
                    <textarea rows={3} value={form.message} onChange={set('message')} placeholder="Type de peau, première visite, question…" className={`${field} mt-2 resize-none`} />
                  </label>
                </div>
              </fieldset>

              <div>
                <p role="alert" className={`mb-4 text-bordeaux-soft ${error ? '' : 'hidden'}`}>{error}</p>
                <button type="submit" disabled={sending} className="btn-primary disabled:opacity-60">
                  <span className="flex items-center gap-2">
                    {sending ? <Loader2 size={16} className="animate-spin" aria-hidden="true" /> : <Check size={16} aria-hidden="true" />}
                    Demander ce rendez-vous
                  </span>
                </button>
                <p className="mt-4 max-w-lg text-sm text-taupe">
                  Votre demande est enregistrée dans le planning de {site.owner}, puis vous l’envoyez par WhatsApp ou
                  e-mail. Le rendez-vous est validé après sa confirmation.
                </p>
              </div>
            </form>
          )}

          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[2rem] border border-gold/30 bg-gradient-to-b from-cream to-ivory p-8 shadow-card" aria-live="polite">
              <p className="kicker">Votre sélection</p>
              {chosen.length === 0 ? (
                <p className="mt-4 text-taupe">Choisissez une ou plusieurs prestations pour composer votre rendez-vous.</p>
              ) : (
                <ul className="mt-4 space-y-2.5">
                  <AnimatePresence initial={false}>
                    {chosen.map((s) => (
                      <motion.li key={s.id} layout initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} className="flex items-baseline gap-2">
                        <span>{s.name}</span>
                        <span className="dots" aria-hidden="true" />
                        <span className="whitespace-nowrap font-serif text-lg text-bordeaux">{s.price} CHF</span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
              <div className="hairline my-6" />
              <p className="flex items-baseline justify-between">
                <span className="kicker">Total indicatif</span>
                <span className="font-serif text-4xl text-bordeaux">{total} <span className="font-sans text-xs uppercase tracking-wide2 text-gold-dark">CHF</span></span>
              </p>
              {duration > 0 && <p className="mt-1 text-right text-sm text-taupe">Durée estimée : {formatDuration(duration)}</p>}
              {form.date && form.time !== null && (
                <p className="mt-3 text-right font-serif text-xl text-bordeaux">{formatDate(form.date)} · {toTime(form.time).replace(':', 'h')}</p>
              )}
            </div>

            <Reveal className="rounded-[2rem] bg-bordeaux p-8 text-cream">
              <p className="kicker !text-gold-light">Contact direct</p>
              <ul className="mt-5 space-y-4">
                <li><a href={telHref} className="flex items-center gap-3 font-serif text-2xl"><Phone size={18} strokeWidth={1.4} aria-hidden="true" /> {site.phoneDisplay}</a></li>
                <li><a href={waHref('Bonjour, je souhaite prendre rendez-vous.')} target="_blank" rel="noopener" className="flex items-center gap-3"><MessageCircle size={18} strokeWidth={1.4} aria-hidden="true" /> <span className="link-line">WhatsApp</span></a></li>
                {site.email && <li><a href={`mailto:${site.email}`} className="flex items-center gap-3"><Mail size={18} strokeWidth={1.4} aria-hidden="true" /> <span className="link-line">{site.email}</span></a></li>}
                <li className="flex items-start gap-3 text-cream/80"><MapPin size={18} strokeWidth={1.4} className="mt-1 shrink-0" aria-hidden="true" />
                  <span>À domicile · {site.address.locality} et environs<br />Sur rendez-vous uniquement</span>
                </li>
                <li className="flex items-start gap-3 text-cream/80"><Clock size={18} strokeWidth={1.4} className="mt-1 shrink-0" aria-hidden="true" />
                  <span>{hours.map(([d, h]) => <span key={d} className="flex justify-between gap-6"><span>{d}</span><span>{h}</span></span>)}</span>
                </li>
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
