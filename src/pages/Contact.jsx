import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import SEO from '../components/SEO';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const emailParams = {
        from_name: formData.name,
        user_email: formData.email,
        user_phone: formData.phone,
        message: formData.message,
        to_name: 'GiZo Beauty'
      };

      await emailjs.send(
        'gizo_serviceId',
        'gizoBeauty_TemplateId',
        emailParams,
        'xZiaWwWG4X44LV4sB'
      );

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '' });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      setSubmitError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <SEO
        title="Contact - GiZo Beauty Genève | Réservation & Informations"
        description="Contactez GiZo Beauty à Genève. Rue de Lausanne 15, 1201 Genève. Ouvert du lundi au samedi. Réservez par téléphone +41 22 345 67 89 ou en ligne."
        keywords="contact gizo beauty, réservation institut beauté genève, prendre rendez-vous esthéticienne genève, horaires institut beauté"
        canonical="/contact"
      />
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-6">
            Contactez-nous
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Une question ? Un besoin particulier ? Notre équipe est à votre écoute
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Envoyez-nous un message</h2>

              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Message envoyé !</h3>
                  <p className="text-gray-600">Nous vous répondrons dans les plus brefs délais.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="Votre nom"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="votre@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholder="+41 XX XXX XX XX"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all resize-none"
                      placeholder="Décrivez votre demande..."
                    ></textarea>
                  </div>

                  {submitError && (
                    <p className="text-red-500 text-center">{submitError}</p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-xl text-lg font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                    {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-br from-gold to-yellow-400 rounded-3xl shadow-2xl p-8 text-black">
              <h2 className="text-3xl font-bold mb-8">Informations pratiques</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Adresse</h3>
                    <p className="text-black/80 leading-relaxed">
                      Rue de Lausanne 15<br />
                      1201 Genève, Suisse
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Téléphone</h3>
                    <a href="tel:+41223456789" className="text-black/80 hover:text-black transition-colors">
                      +41 22 345 67 89
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <a href="mailto:contact@gizobeauty.ch" className="text-black/80 hover:text-black transition-colors">
                      contact@gizobeauty.ch
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white/20 p-3 rounded-xl">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Horaires d'ouverture</h3>
                    <div className="space-y-1 text-black/80">
                      <p className="flex justify-between gap-8">
                        <span className="font-semibold">Lundi - Vendredi</span>
                        <span>9h00 - 19h00</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span className="font-semibold">Samedi</span>
                        <span>9h00 - 17h00</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span className="font-semibold">Dimanche</span>
                        <span>Fermé</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Comment nous trouver ?</h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2760.5!2d6.142!3d46.210!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDbCsDEyJzM2LjAiTiA2wrAwOCczMS4yIkU!5e0!3m2!1sfr!2sch!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localisation GiZo Beauty Genève"
                ></iframe>
              </div>
              <p className="text-gray-600 mt-4 text-sm">
                Facilement accessible en transports en commun (Tram 15, Bus 1, 5, 25)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
