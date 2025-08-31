import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importer useCart
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';


export default function Navbar() {
  const { cart } = useCart(); // Récupérer le panier depuis le contexte
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white/95 backdrop-blur-md shadow-lg py-4 fixed top-0 left-0 w-full z-50 border-b border-gold/20"
    >
      <div className="container mx-auto flex justify-between items-center px-6">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-gold to-dark-gold rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">G</span>
          </div>
          <h1 className="text-3xl font-bold tracking-wider text-gray-900">
            <span className="text-gold">GiZo</span> Beauty
          </h1>
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          <div className="flex space-x-8 text-lg font-medium">
            <Link to="/" className="text-gray-700 hover:text-gold transition duration-300 relative group">
              {t('nav.home')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-gold transition duration-300 relative group">
              {t('nav.services')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/booking" className="text-gray-700 hover:text-gold transition duration-300 relative group">
              {t('nav.booking')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/reservations" className="text-gray-700 hover:text-gold transition duration-300 relative group">
              {t('nav.reservations')}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative group">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gold/10 hover:bg-gold/20 transition-colors"
              >
                <ShoppingBag className="w-6 h-6 text-gold" />
                {cart.length > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                  >
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </motion.span>
                )}
              </motion.div>
            </Link>
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-6 h-6 text-gold" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
          <LanguageSwitcher />
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isMenuOpen ? 'auto' : 0,
          opacity: isMenuOpen ? 1 : 0
        }}
        className="lg:hidden overflow-hidden bg-white border-t border-gray-200"
      >
        <div className="container mx-auto px-6 py-4 space-y-4">
          <Link 
            to="/" 
            className="block text-gray-700 hover:text-gold transition duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.home')}
          </Link>
          <Link 
            to="/services" 
            className="block text-gray-700 hover:text-gold transition duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.services')}
          </Link>
          <Link 
            to="/booking" 
            className="block text-gray-700 hover:text-gold transition duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.booking')}
          </Link>
          <Link 
            to="/reservations" 
            className="block text-gray-700 hover:text-gold transition duration-300 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            {t('nav.reservations')}
          </Link>
        </div>
      </motion.div>
    </motion.nav>
  );
}
