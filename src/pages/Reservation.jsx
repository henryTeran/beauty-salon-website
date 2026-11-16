import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Mail, MessageCircle, Phone, MapPin, Clock } from 'lucide-react';
import { allServices, formatDuration } from '../data/services.js';
import { site, telHref, waHref } from '../config/site.js';
import { getRouteMeta } from '../seo/routes.js';
import { Reveal, ease } from '../components/ui.jsx';
import { PageHero } from '../components/blocks.jsx';

const meta = getRouteMeta('/reservation');
const services = allServices();
const groups = services.reduce((acc, s) => {
  (acc[s.category] ||= []).push(s);
  return acc;
}, {});
const moments = ['Matin', 'Midi', 'Après-midi', 'Fin de journée'];
const field =
  'w-full rounded-2xl border border-gold/35 bg-cream px-5 py-3.5 text-ink placeholder:text-taupe/60 transition-colors focus:border-bordeaux focus:outline-none';

export default function Reservation() {
  const [params] = useSearchParams();
  const [selected, setSelected] = useState([]);
  const [form, setForm] = useState({ name: '', phone: '', date: '', moment: '', lieu: 'Au cabinet', adresse: '', message: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const id = params.get('soin');
    if (id && services.some((s) => s.id === id)) setSelected([id]);
  }, [params]);

  const chosen = useMemo(() => services.filter((s) => selected.includes(s.id)), [selected]);
  const total = chosen.reduce((t, s) => t + s.price, 0);
  const duration = chosen.reduce((t, s) => t + (s.category.startsWith('Forfait') ? 0 : s.duration || 0), 0);
  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const toggle = (id) => setSelected((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const buildMessage = () => {
    const lines = [
      `Bonjour ${site.owner}, je souhaite prendre rendez-vous.`,
      '',
      `Prestations :`,
      ...chosen.map((s) => `• ${s.name}${s.duration ? ` (${formatDuration(s.duration)})` : ''} – ${s.price} CHF`),
      `Total indicatif : ${total} CHF`,
      '',
      form.date && `Date souhaitée : ${new Date(`${form.date}T12:00`).toLocaleDateString('fr-CH', { weekday: 'long', day: 'numeric', month: 'long' })}`,
      form.moment && `Moment : ${form.moment}`,
      `Lieu : ${form.lieu}${form.lieu === 'À domicile' && form.adresse ? ` – ${form.adresse}` : ''}`,
      '',
      `Nom : ${form.name}`,
      form.phone && `Téléphone : ${form.phone}`,
      form.message && `Message : ${form.message}`,
    ];
    return lines.filter((l) => typeof l === 'string').join('\n').replace(/\n{3,}/g, '\n\n');
  };

  const validate = () => {
    if (!chosen.length) return 'Sélectionnez au moins une prestation.';
    if (!form.name.trim()) return 'Indiquez votre nom.';
    return '';
  };

  const send = (channel) => (e) => {
    e.preventDefault();
    const err = validate();
    setError(err);
    if (err) return;
    const text = buildMessage();
    const href =
      channel === 'mail'
        ? `mailto:${site.email}?subject=${encodeURIComponent('Demande de rendez-vous')}&body=${encodeURIComponent(text)}`
        : waHref(text);
    window.open(href, channel === 'mail' ? '_self' : '_blank', 'noopener');
  };

  return (
    <>
      <PageHero kicker="Rendez-vous" title="Réserver un soin" breadcrumbs={meta.breadcrumbs}>
        Composez votre demande en quelques secondes : elle est envoyée directement à {site.owner}, qui vous confirme
        votre créneau personnellement.
      </PageHero>

      <section className="section !pt-16">
        <div className="container-site grid gap-12 lg:grid-cols-[1.25fr_.75fr]">
          <form onSubmit={send('wa')} noValidate className="space-y-12">
            <fieldset>
              <legend className="display text-2xl tracking-[0.06em] text-bordeaux md:text-3xl"><span className="mr-3 font-serif italic normal-case text-gold-dark">01</span>Vos prestations</legend>
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
                            <span className={`font-serif text-lg ${on ? 'text-gold-light' : 'text-bordeaux'}`}>{s.price} CHF</span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="display text-2xl tracking-[0.06em] text-bordeaux md:text-3xl"><span className="mr-3 font-serif italic normal-case text-gold-dark">02</span>Vos préférences</legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="kicker">Date souhaitée</span>
                  <input type="date" min={today} value={form.date} onChange={set('date')} className={`${field} mt-2`} />
                </label>
                <div>
                  <span className="kicker">Moment de la journée</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {moments.map((m) => (
                      <button type="button" key={m} aria-pressed={form.moment === m} onClick={() => setForm((f) => ({ ...f, moment: f.moment === m ? '' : m }))}
                        className={`rounded-full border px-4 py-2.5 text-[0.9rem] transition-colors ${form.moment === m ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40 hover:border-bordeaux'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <span className="kicker">Lieu du soin</span>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {['Au cabinet', 'À domicile'].map((l) => (
                      <button type="button" key={l} aria-pressed={form.lieu === l} onClick={() => setForm((f) => ({ ...f, lieu: l }))}
                        className={`rounded-full border px-5 py-2.5 text-[0.9rem] transition-colors ${form.lieu === l ? 'border-bordeaux bg-bordeaux text-cream' : 'border-gold/40 hover:border-bordeaux'}`}>
                        {l}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {form.lieu === 'À domicile' && (
                      <motion.label initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease }} className="block overflow-hidden">
                        <span className="kicker mt-5 block">Commune / adresse</span>
                        <input type="text" autoComplete="street-address" value={form.adresse} onChange={set('adresse')} placeholder="Ex. Carouge, rue…" className={`${field} mt-2`} />
                      </motion.label>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend className="display text-2xl tracking-[0.06em] text-bordeaux md:text-3xl"><span className="mr-3 font-serif italic normal-case text-gold-dark">03</span>Vos coordonnées</legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="kicker">Nom et prénom *</span>
                  <input required type="text" autoComplete="name" value={form.name} onChange={set('name')} className={`${field} mt-2`} />
                </label>
                <label className="block">
                  <span className="kicker">Téléphone</span>
                  <input type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={set('phone')} placeholder="+41…" className={`${field} mt-2`} />
                </label>
                <label className="block sm:col-span-2">
                  <span className="kicker">Message (facultatif)</span>
                  <textarea rows={3} value={form.message} onChange={set('message')} placeholder="Type de peau, première visite, question…" className={`${field} mt-2 resize-none`} />
                </label>
              </div>
            </fieldset>

            <div>
              <p role="alert" className={`mb-4 text-bordeaux-soft ${error ? '' : 'hidden'}`}>{error}</p>
              <div className="flex flex-wrap gap-3">
                <button type="submit" className="btn-primary">
                  <span className="flex items-center gap-2"><MessageCircle size={16} aria-hidden="true" /> Envoyer par WhatsApp</span>
                </button>
                {site.email && (
                  <button type="button" onClick={send('mail')} className="btn-ghost"><Mail size={15} aria-hidden="true" /> Envoyer par e-mail</button>
                )}
              </div>
              <p className="mt-4 max-w-lg text-sm text-taupe">
                Votre demande s’ouvre dans WhatsApp, prête à être envoyée. Aucune donnée n’est enregistrée sur ce site.
                Le rendez-vous est validé après confirmation de {site.owner}.
              </p>
            </div>
          </form>

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
            </div>

            <Reveal className="rounded-[2rem] bg-bordeaux p-8 text-cream">
              <p className="kicker !text-gold-light">Contact direct</p>
              <ul className="mt-5 space-y-4">
                <li><a href={telHref} className="flex items-center gap-3 font-serif text-2xl"><Phone size={18} strokeWidth={1.4} aria-hidden="true" /> {site.phoneDisplay}</a></li>
                <li><a href={waHref('Bonjour, je souhaite prendre rendez-vous.')} target="_blank" rel="noopener" className="flex items-center gap-3"><MessageCircle size={18} strokeWidth={1.4} aria-hidden="true" /> <span className="link-line">WhatsApp</span></a></li>
                {site.email && <li><a href={`mailto:${site.email}`} className="flex items-center gap-3"><Mail size={18} strokeWidth={1.4} aria-hidden="true" /> <span className="link-line">{site.email}</span></a></li>}
                <li className="flex items-start gap-3 text-cream/80"><MapPin size={18} strokeWidth={1.4} className="mt-1 shrink-0" aria-hidden="true" />
                  <span>{site.address.streetAddress && <>{site.address.streetAddress}<br /></>}{site.address.postalCode} {site.address.locality}, Suisse<br />et à domicile sur rendez-vous</span>
                </li>
                <li className="flex items-start gap-3 text-cream/80"><Clock size={18} strokeWidth={1.4} className="mt-1 shrink-0" aria-hidden="true" />
                  <span>{site.openingHoursText.map(([d, h]) => <span key={d} className="block">{d} : {h}</span>)}</span>
                </li>
              </ul>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
