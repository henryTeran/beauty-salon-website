import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Cookie } from 'lucide-react';
import { site } from '../config/site.js';
import { t } from '../i18n/index.js';
import { ease } from './ui.jsx';

/**
 * Bandeau de consentement (nLPD) : rien de facultatif n'est chargé avant un choix explicite.
 * Le choix est conservé 12 mois dans le stockage local ; « Gérer les cookies » (pied de page) le rouvre.
 */
const KEY = 'mf-consent';
const YEAR = 365 * 24 * 3600 * 1000;
export const openConsent = () => window.dispatchEvent(new Event('mf-consent-open'));

function read() {
  try {
    const c = JSON.parse(window.localStorage.getItem(KEY));
    return c && Date.now() - c.at < YEAR ? c : null;
  } catch {
    return null;
  }
}

let loaded = false;
function applyAnalytics(allowed) {
  const id = site.analyticsId;
  if (!id || site.noindex) return; // pas de mesure sur la version de validation
  window[`ga-disable-${id}`] = !allowed;
  if (allowed && !loaded) {
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', id, { cookie_expires: 34128000, cookie_flags: 'SameSite=Lax;Secure' }); // 13 mois
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(s);
  }
  if (!allowed) {
    // retrait de l'accord : suppression des cookies de mesure déjà déposés
    document.cookie.split(';').map((c) => c.trim().split('=')[0]).filter((n) => n.startsWith('_ga')).forEach((n) => {
      document.cookie = `${n}=; Max-Age=0; path=/`;
      document.cookie = `${n}=; Max-Age=0; path=/; domain=.${window.location.hostname.replace(/^www\./, '')}`;
    });
  }
}

export default function Consent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const saved = read();
    if (saved) {
      setAnalytics(!!saved.analytics);
      applyAnalytics(!!saved.analytics);
    } else {
      setOpen(true);
    }
    const reopen = () => {
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener('mf-consent-open', reopen);
    return () => window.removeEventListener('mf-consent-open', reopen);
  }, []);

  const save = (value) => {
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics: value, at: Date.now() }));
    } catch {
      /* stockage indisponible : le choix vaut pour cette visite */
    }
    setAnalytics(value);
    applyAnalytics(value);
    setOpen(false);
    setDetails(false);
  };

  const Toggle = ({ label, text, checked, disabled, onChange }) => (
    <label className={`flex items-start gap-3 rounded-2xl border border-gold/25 p-4 ${disabled ? 'opacity-80' : 'cursor-pointer'}`}>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onChange} className="mt-1 h-5 w-5 shrink-0 accent-[#4A1A22]" />
      <span>
        <span className="block font-serif text-xl text-bordeaux">{label}</span>
        <span className="block text-[0.9rem] leading-relaxed text-taupe">{text}</span>
      </span>
    </label>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-label={t('Cookies et confidentialité')}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6, ease }}
          className="fixed inset-x-3 bottom-24 z-[65] max-h-[75vh] overflow-y-auto rounded-[1.75rem] border border-gold/35 bg-cream/95 p-6 shadow-soft backdrop-blur-md sm:inset-x-auto sm:left-6 sm:max-w-md lg:bottom-6"
          data-lenis-prevent
        >
          <p className="flex items-center gap-3 font-serif text-2xl text-bordeaux">
            <Cookie size={22} strokeWidth={1.3} className="text-gold-dark" aria-hidden="true" /> {t('Votre confidentialité')}
          </p>
          <p className="mt-3 text-[0.95rem] leading-relaxed text-taupe">
            {t('Ce site utilise uniquement les éléments nécessaires à son fonctionnement. Avec votre accord, une mesure d’audience anonyme nous aide à l’améliorer. Aucune publicité, aucun traceur de réseaux sociaux.')}{' '}
            <Link to="/confidentialite#cookies" className="link-line text-bordeaux">{t('En savoir plus')}</Link>
          </p>

          {details && (
            <div className="mt-4 space-y-3">
              <Toggle label={t('Nécessaires')} text={t('Mémorisation de votre choix et fonctionnement de la réservation. Toujours actifs.')} checked disabled />
              <Toggle label={t('Mesure d’audience')} text={t('Statistiques de fréquentation anonymes (Google Analytics). Désactivée par défaut.')} checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
            </div>
          )}

          <div className="mt-5 flex flex-wrap gap-2">
            {details ? (
              <button type="button" onClick={() => save(analytics)} className="btn-primary flex-1 !px-5 !py-3"><span>{t('Enregistrer mes choix')}</span></button>
            ) : (
              <>
                <button type="button" onClick={() => save(true)} className="btn-primary flex-1 !px-5 !py-3"><span>{t('Tout accepter')}</span></button>
                <button type="button" onClick={() => save(false)} className="btn-ghost flex-1 !px-5 !py-3">{t('Refuser')}</button>
              </>
            )}
          </div>
          {!details && (
            <button type="button" onClick={() => setDetails(true)} className="link-line mt-4 text-[0.8rem] uppercase tracking-wide2 text-taupe">{t('Personnaliser')}</button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
