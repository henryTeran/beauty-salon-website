import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LotusBackground from './LotusBackground';

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-white">
      <LotusBackground />

      <div className="luxury-container relative z-10 text-center py-32">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
          className="space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          >
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl text-luxury-black mb-6 leading-tight">
              <span className="block mb-2">GiZo Beauty</span>
              <span className="block text-gold-gradient">Excellence & Bien-être</span>
            </h1>
          </motion.div>

          <motion.div
            className="gold-divider mb-8"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '5rem', opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          />

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="font-sans text-lg md:text-xl text-luxury-black-soft max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            Soins du visage · Massages relaxants · Beauté premium
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="pt-8"
          >
            <Link to="/services" className="luxury-btn">
              Réserver maintenant
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-luxury-gold text-sm uppercase tracking-widest font-medium">
              Découvrir
            </span>
            <svg
              className="w-6 h-6 text-luxury-gold"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
