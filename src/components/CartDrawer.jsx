import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, X, Package, Sparkles, Calendar, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';

export default function CartDrawer() {
  const { cart, clearCart, removeFromCart, isCartOpen, closeCart } = useCart();
  const { t } = useTranslation();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen]);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={closeCart}
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-xl lg:max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="sticky top-0 z-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-6 border-b border-slate-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-gold/20 to-yellow-400/20 rounded-xl backdrop-blur-sm">
                    <ShoppingBag className="w-7 h-7 text-gold" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">{t('cart.title')}</h1>
                    <p className="text-sm text-slate-300">{cart.length} service{cart.length > 1 ? 's' : ''} sélectionné{cart.length > 1 ? 's' : ''}</p>
                  </div>
                </div>
                <button
                  onClick={closeCart}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {cart.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center px-8 py-16 h-full"
                >
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-yellow-400/20 rounded-full blur-2xl"></div>
                    <div className="relative p-8 bg-gradient-to-br from-slate-50 to-white rounded-full shadow-xl">
                      <Package className="w-24 h-24 text-slate-300" />
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-3">Votre panier est vide</h2>
                  <p className="text-slate-600 text-center mb-8 max-w-sm">
                    Découvrez nos soins d'exception et ajoutez vos services préférés
                  </p>
                   <Link
                        to="/services"
                        onClick={closeCart}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-2xl text-lg font-bold hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 transform hover:scale-105"
                   >
                   <Sparkles className="w-5 h-5" />
                    Découvrir nos services
                    <ArrowRight className="w-5 h-5" />
                   </Link>
      
                </motion.div>
              ) : (
                <>
                  <div className="px-8 py-6 space-y-4">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20, height: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          layout
                          className="group relative bg-gradient-to-br from-slate-50 to-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100"
                        >
                          <div className="flex gap-4 p-4">
                            <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 shadow-lg">
                              <img
                                src={item.img || item.image_url}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h3 className="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-gold transition-colors">
                                  {item.title}
                                </h3>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="p-1.5 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-500 transition-all duration-300 flex-shrink-0"
                                  aria-label="Supprimer"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-slate-600 mb-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span>{item.duration || '60 min'}</span>
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="text-2xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
                                  {item.price} CHF
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  <div className="sticky bottom-0 border-t border-slate-200 bg-white px-8 py-6 space-y-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Sous-total</span>
                        <span className="font-semibold">{totalAmount} CHF</span>
                      </div>
                      <div className="flex items-center justify-between text-slate-600">
                        <span>Services</span>
                        <span className="font-semibold">{cart.length}</span>
                      </div>
                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent"></div>

                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-slate-900">Total</span>
                      <span className="text-3xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
                        {totalAmount} CHF
                      </span>
                    </div>

                    <div className="space-y-3">
                      <Link
                        to="/booking"
                        onClick={closeCart}
                        className="flex items-center justify-center gap-3 w-full bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-2xl hover:shadow-2xl hover:shadow-gold/30 transition-all duration-300 font-bold text-lg group"
                      >
                        <Calendar className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        Réserver maintenant
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </Link>

                      <button
                        className="flex items-center justify-center gap-2 w-full bg-slate-100 text-slate-700 px-6 py-3 rounded-xl hover:bg-slate-200 transition-all duration-300 font-semibold"
                        onClick={clearCart}
                      >
                        <Trash2 className="w-4 h-4" />
                        Vider le panier
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
