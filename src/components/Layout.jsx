import { t } from '../i18n/index.js';
import { useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig, motion, useScroll, useSpring } from 'framer-motion';
import { CalendarHeart, MessageCircle } from 'lucide-react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Consent from './Consent.jsx';
import { getRouteMeta } from '../seo/routes.js';
import { applyHead } from '../seo/head.js';
import { waHref } from '../config/site.js';

function useLenis() {
  const lenisRef = useRef(null);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf;
    let lenis;
    let cancelled = false;
    import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.15, smoothWheel: true });
      lenisRef.current = lenis;
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return lenisRef;
}

export default function Layout({ children }) {
  const { pathname, hash } = useLocation();
  const lenisRef = useLenis();
  const first = useRef(true);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    applyHead(getRouteMeta(pathname));
    // Lien vers une section (#cookies…) : on y va une fois la page affichée ; sinon retour en haut
    const target = hash && document.getElementById(hash.slice(1));
    if (target) target.scrollIntoView();
    else if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash, lenisRef]);

  const onReservation = pathname === '/reservation' || pathname === '/admin';

  return (
    <MotionConfig reducedMotion="user">
      <a href="#contenu" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bordeaux focus:px-5 focus:py-3 focus:text-cream">
        {t("Aller au contenu")}
      </a>
      <motion.div aria-hidden="true" style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-gold-dark via-gold-light to-gold" />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main key={pathname} id="contenu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
          {children}
        </motion.main>
      </AnimatePresence>
      <Footer />
      {pathname !== '/admin' && <Consent />}

      {!onReservation && (
        <div className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-gold/25 bg-cream/90 p-3 backdrop-blur-md lg:hidden">
          <Link to="/reservation" className="btn-primary flex-1 !py-3.5">
            <span className="flex items-center gap-2"><CalendarHeart size={16} aria-hidden="true" />{" "}{t("Réserver")}</span>
          </Link>
          <a href={waHref('Bonjour, je souhaite prendre rendez-vous.')} target="_blank" rel="noopener" aria-label={t("Écrire sur WhatsApp")} className="grid h-[3.1rem] w-[3.1rem] place-items-center rounded-full border border-gold/50 text-bordeaux">
            <MessageCircle size={19} strokeWidth={1.5} />
          </a>
        </div>
      )}
      {!onReservation && (
        <a
          href={waHref('Bonjour, je souhaite prendre rendez-vous.')}
          target="_blank"
          rel="noopener"
          aria-label={t("Écrire sur WhatsApp")}
          className="fixed bottom-7 right-7 z-30 hidden h-14 w-14 place-items-center rounded-full bg-bordeaux text-cream shadow-soft transition-transform duration-500 hover:scale-110 lg:grid"
        >
          <MessageCircle size={22} strokeWidth={1.5} />
        </a>
      )}
    </MotionConfig>
  );
}
