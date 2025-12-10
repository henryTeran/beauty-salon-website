import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-luxury-black text-luxury-cream border-t border-luxury-gold/20">
      <div className="luxury-container py-20">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="mb-6">
              <h3 className="font-serif text-4xl text-luxury-gold mb-2">
                GiZo Beauty
              </h3>
              <div className="w-16 h-px bg-luxury-gold"></div>
            </div>
            <p className="font-sans text-luxury-cream/80 leading-relaxed mb-8 max-w-md">
              Votre destination de choix pour des soins de beauté exceptionnels.
              Nous nous engageons à révéler votre beauté naturelle avec expertise et passion.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-12 h-12 border border-luxury-gold/30 rounded-full flex items-center justify-center hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 text-luxury-gold" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-12 h-12 border border-luxury-gold/30 rounded-full flex items-center justify-center hover:border-luxury-gold hover:bg-luxury-gold/10 transition-all duration-500"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-luxury-gold" />
              </motion.a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-serif text-xl text-luxury-gold mb-6">Contact</h4>
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-start gap-3 text-luxury-cream/80">
                <MapPin className="w-5 h-5 text-luxury-gold flex-shrink-0 mt-0.5" />
                <span>123 Rue de la Beauté, Genève</span>
              </div>
              <div className="flex items-center gap-3 text-luxury-cream/80">
                <Phone className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <span>+41 22 123 45 67</span>
              </div>
              <div className="flex items-center gap-3 text-luxury-cream/80">
                <Mail className="w-5 h-5 text-luxury-gold flex-shrink-0" />
                <span>contact@gizobeauty.ch</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-serif text-xl text-luxury-gold mb-6">Horaires</h4>
            <div className="space-y-3 font-sans text-sm text-luxury-cream/80">
              <div className="flex justify-between">
                <span>Lundi - Vendredi</span>
                <span className="text-luxury-gold">9h - 19h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span className="text-luxury-gold">9h - 17h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span className="text-luxury-cream/50">Fermé</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-luxury-gold/20 pt-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-sans text-sm text-luxury-cream/60 tracking-wide"
          >
            © 2025 GiZo Beauty · Tous droits réservés · Fait avec excellence
          </motion.p>
        </div>
      </div>
    </footer>
  );
}