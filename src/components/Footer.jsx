import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Facebook, Instagram, MapPin, Phone, Mail, Heart } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="md:col-span-2"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold to-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">G</span>
              </div>
              <h3 className="text-3xl font-bold">
                <span className="text-gold">GiZo</span> Beauty
              </h3>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Votre destination de choix pour des soins de beauté exceptionnels. 
              Nous nous engageons à révéler votre beauté naturelle avec expertise et passion.
            </p>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-all duration-300"
              >
                <Facebook className="w-6 h-6" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                href="#"
                className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-gold/20 transition-all duration-300"
              >
                <Instagram className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-gold mb-6">Contact</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-gold" />
                <span>123 Rue de la Beauté, Genève</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-gold" />
                <span>+41 22 123 45 67</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-gold" />
                <span>contact@gizobeauty.ch</span>
              </div>
            </div>
          </motion.div>

          {/* Hours */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-xl font-bold text-gold mb-6">Horaires</h4>
            <div className="space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Lun - Ven</span>
                <span>9h - 19h</span>
              </div>
              <div className="flex justify-between">
                <span>Samedi</span>
                <span>9h - 17h</span>
              </div>
              <div className="flex justify-between">
                <span>Dimanche</span>
                <span>Fermé</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="border-t border-white/20 pt-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 flex items-center justify-center gap-2"
          >
            © 2025 GiZo Beauty - {t('footer.rights')} 
            <Heart className="w-4 h-4 text-red-400 fill-current" />
          </motion.p>
        </div>
      </div>
    </footer>
  );
}