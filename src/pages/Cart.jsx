import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShoppingBag, Trash2, CreditCard, Package } from 'lucide-react';

export default function Cart() {
  const { cart, clearCart } = useCart();
  const { t } = useTranslation();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-4 flex items-center justify-center gap-4">
            <ShoppingBag className="w-12 h-12 text-gold" />
            {t('cart.title')}
          </h1>
        </motion.div>
      
        <div className="max-w-4xl mx-auto">
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center bg-white rounded-3xl shadow-xl p-12"
            >
              <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
              <p className="text-2xl text-gray-600 mb-8">{t('cart.empty')}</p>
              <Link 
                to="/services"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl transition-all duration-300"
              >
                Découvrir nos services
              </Link>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="p-8">
                <div className="space-y-6">
                  {cart.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-6">
                        <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded-xl shadow-md" />
                        <div className="text-left">
                          <h2 className="text-xl font-bold text-dark">{item.title}</h2>
                          <p className="text-gray-500">Durée: {item.duration || '60 min'}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gold">{item.price} CHF</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total and Actions */}
                <div className="border-t border-gray-200 pt-8 mt-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-dark">{t('cart.total')} :</h2>
                    <span className="text-4xl font-bold text-gold">{totalAmount} CHF</span>
                  </div>

                  <div className="flex flex-col md:flex-row gap-4 justify-between">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center justify-center gap-2 bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition duration-300 font-semibold"
                      onClick={clearCart}
                    >
                      <Trash2 className="w-5 h-5" />
                      {t('cart.clear_cart')}
                    </motion.button>
                    
                    <Link 
                      to="/payment" 
                      className="flex items-center justify-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-3 rounded-xl hover:shadow-xl hover:shadow-gold/25 transition-all duration-300 font-bold text-lg"
                    >
                      <CreditCard className="w-5 h-5" />
                      {t('cart.proceed_payment')}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}