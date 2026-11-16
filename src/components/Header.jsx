import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { ChevronDown, Phone } from 'lucide-react';
import { categories, renataFranca } from '../data/services.js';
import { site, telHref } from '../config/site.js';
import { Monogram, ease } from './ui.jsx';

const soins = [...categories, renataFranca].map((c) => ({ to: c.slug, label: c.navLabel }));
const links = [
  { to: '/forfaits', label: 'Forfaits' },
  { to: '/soins-a-domicile-geneve', label: 'À domicile' },
  { to: '/a-propos', label: 'À propos' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [drop, setDrop] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > 160 && y > prev);
    setScrolled(y > 24);
  });

  useEffect(() => {
    setOpen(false);
    setDrop(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <motion.header
        animate={{ y: hidden && !open ? '-110%' : 0 }}
        transition={{ duration: 0.6, ease }}
        className={`fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,padding] duration-500 ${
          scrolled && !open ? 'bg-cream/85 py-2 shadow-[0_1px_0_rgba(169,129,79,.25)] backdrop-blur-md' : 'py-4'
        }`}
      >
        <div className="container-site flex items-center justify-between">
          <Link to="/" aria-label={`${site.name} – accueil`} className="relative z-10 flex items-center gap-3">
            <Monogram className="h-9 w-12" />
            <span className="leading-none">
              <span className="block whitespace-nowrap font-serif text-[0.92rem] uppercase tracking-[0.22em] text-bordeaux sm:text-[1.05rem] sm:tracking-[0.3em]">María Fernanda</span>
              <span className="mt-1 block text-[0.58rem] uppercase tracking-luxe text-gold-dark">Beauté &amp; bien-être</span>
            </span>
          </Link>

          <nav aria-label="Navigation principale" className="hidden items-center gap-9 text-[0.78rem] uppercase tracking-wide2 lg:flex">
            <div className="relative" onMouseEnter={() => setDrop(true)} onMouseLeave={() => setDrop(false)}>
              <NavLink
                to="/soins-et-tarifs"
                className="link-line flex items-center gap-1 py-3"
                aria-haspopup="true"
                aria-expanded={drop}
                onFocus={() => setDrop(true)}
              >
                Soins &amp; tarifs <ChevronDown size={13} className={`transition-transform duration-300 ${drop ? 'rotate-180' : ''}`} />
              </NavLink>
              <AnimatePresence>
                {drop && (
                  <motion.ul
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.35, ease }}
                    className="absolute left-1/2 top-full w-72 -translate-x-1/2 rounded-2xl border border-gold/25 bg-cream/95 p-3 shadow-soft backdrop-blur-md"
                  >
                    {soins.map((s) => (
                      <li key={s.to}>
                        <NavLink
                          to={s.to}
                          onBlur={(e) => !e.currentTarget.closest('ul').contains(e.relatedTarget) && setDrop(false)}
                          className="block rounded-xl px-4 py-2.5 normal-case tracking-normal text-[0.95rem] text-ink transition-colors hover:bg-ivory hover:text-bordeaux"
                        >
                          {s.label}
                        </NavLink>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className="link-line py-3">
                {l.label}
              </NavLink>
            ))}
            <Link to="/reservation" className="btn-primary !px-6 !py-3">
              <span>Réserver</span>
            </Link>
          </nav>

          <div className="relative z-10 flex items-center gap-2 lg:hidden">
            <a href={telHref} aria-label={`Appeler le ${site.phoneDisplay}`} className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-bordeaux">
              <Phone size={17} strokeWidth={1.5} />
            </a>
            <button
              type="button"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
              aria-controls="menu-mobile"
              onClick={() => setOpen((o) => !o)}
              className="grid h-11 w-11 place-items-center rounded-full bg-bordeaux text-cream"
            >
              <span className="relative block h-3 w-5">
                <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-500 ${open ? 'top-1.5 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-500 ${open ? 'top-1.5 -rotate-45' : 'top-3'}`} />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            initial={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.4rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 2.6rem) 2.4rem)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 2.6rem) 2.4rem)' }}
            transition={{ duration: 0.8, ease }}
            className="fixed inset-0 z-40 overflow-y-auto bg-ivory pt-24 lg:hidden"
            data-lenis-prevent
          >
            <nav aria-label="Navigation mobile" className="container-site flex min-h-full flex-col pb-10">
              <p className="kicker mb-4">Soins &amp; tarifs</p>
              <ul className="space-y-1">
                {[{ to: '/soins-et-tarifs', label: 'Tous les soins' }, ...soins].map((l, i) => (
                  <motion.li key={l.to} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.7, ease }}>
                    <NavLink to={l.to} className="block py-1.5 font-serif text-[1.7rem] leading-tight text-bordeaux">
                      {l.label}
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
              <div className="hairline my-6" />
              <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[0.8rem] uppercase tracking-wide2">
                {links.map((l) => (
                  <li key={l.to}>
                    <NavLink to={l.to}>{l.label}</NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-10">
                <Link to="/reservation" className="btn-primary w-full">
                  <span>Réserver un soin</span>
                </Link>
                <a href={telHref} className="btn-ghost w-full">
                  {site.phoneDisplay}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
