import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CheckCircle, Mail, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Success() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pt-20 flex items-center justify-center">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto text-center bg-white rounded-3xl shadow-2xl p-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-8"
          >
            <CheckCircle className="w-24 h-24 text-green-600 mx-auto" />
          </motion.div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-6">
            {t('success.payment_success')}
          </h1>
          
          <p className="text-xl text-gray-700 mb-8 leading-relaxed">
            {t('success.thank_you')}
          </p>
          
          <div className="flex items-center justify-center gap-2 text-gray-500 mb-8">
            <Mail className="w-5 h-5" />
            <span>Vérifiez votre boîte e-mail</span>
          </div>
          
          <Link 
            to="/"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-gold/25 transition-all duration-300"
          >
            <Home className="w-5 h-5" />
            Retour à l'accueil
          </Link>
        </motion.div>
      </div>
    </div>
  );
}