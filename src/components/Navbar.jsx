import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const { cart } = useCart();
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${
        scrolled
          ? 'bg-luxury-white/95 backdrop-blur-md shadow-luxury border-b border-luxury-gold/20'
          : 'bg-transparent'
      }`}
    >
      <div className="luxury-container py-6">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 border border-luxury-gold rounded-full flex items-center justify-center">
                <span className="font-serif text-luxury-gold text-lg">G</span>
              </div>
              <h1 className="font-serif text-2xl tracking-wider">
                <span className="text-luxury-gold">GiZo</span>
                <span className={`ml-2 ${scrolled ? 'text-luxury-black' : 'text-luxury-black'}`}>Beauty</span>
              </h1>
            </motion.div>
          </Link>

          <div className="hidden lg:flex items-center gap-12">
            <div className="flex gap-10 font-sans text-sm uppercase tracking-widest">
              <Link
                to="/"
                className={`relative transition-colors duration-500 group ${
                  scrolled ? 'text-luxury-black-soft hover:text-luxury-gold' : 'text-luxury-black hover:text-luxury-gold'
                }`}
              >
                {t('nav.home')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link
                to="/services"
                className={`relative transition-colors duration-500 group ${
                  scrolled ? 'text-luxury-black-soft hover:text-luxury-gold' : 'text-luxury-black hover:text-luxury-gold'
                }`}
              >
                {t('nav.services')}
                <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link
                to="/about"
                className={`relative transition-colors duration-500 group ${
                  scrolled ? 'text-luxury-black-soft hover:text-luxury-gold' : 'text-luxury-black hover:text-luxury-gold'
                }`}
              >
                À propos
                <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
              <Link
                to="/contact"
                className={`relative transition-colors duration-500 group ${
                  scrolled ? 'text-luxury-black-soft hover:text-luxury-gold' : 'text-luxury-black hover:text-luxury-gold'
                }`}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-px bg-luxury-gold transition-all duration-500 group-hover:w-full"></span>
              </Link>
            </div>

            <div className="flex items-center gap-6">
              <Link to="/cart" className="relative group">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <ShoppingBag className={`w-5 h-5 transition-colors duration-500 ${
                    scrolled ? 'text-luxury-gold' : 'text-luxury-gold'
                  }`} />
                  {cart.length > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
                    >
                      {cart.reduce((total, item) => total + item.quantity, 0)}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
              <LanguageSwitcher />
              <Link to="/booking" className="luxury-btn text-xs py-2 px-6">
                Réserver
              </Link>
            </div>
          </div>

          <div className="lg:hidden flex items-center gap-4">
            <Link to="/cart" className="relative">
              <ShoppingBag className="w-5 h-5 text-luxury-gold" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </Link>
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 transition-colors"
            >
              {isMenuOpen ?
                <X className="w-6 h-6 text-luxury-gold" /> :
                <Menu className="w-6 h-6 text-luxury-gold" />
              }
            </button>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        className="lg:hidden overflow-hidden bg-luxury-white border-t border-luxury-gold/20"
      >
        <div className="luxury-container py-6 space-y-4 font-sans text-sm uppercase tracking-wider">
          <Link
            to="/"
            className="block text-luxury-black-soft hover:text-luxury-gold transition-colors duration-500 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link
            to="/services"
            className="block text-luxury-black-soft hover:text-luxury-gold transition-colors duration-500 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.services')}
          </Link>
          <Link
            to="/about"
            className="block text-luxury-black-soft hover:text-luxury-gold transition-colors duration-500 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            À propos
          </Link>
          <Link
            to="/contact"
            className="block text-luxury-black-soft hover:text-luxury-gold transition-colors duration-500 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Link
            to="/booking"
            className="block text-luxury-black-soft hover:text-luxury-gold transition-colors duration-500 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.booking')}
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
