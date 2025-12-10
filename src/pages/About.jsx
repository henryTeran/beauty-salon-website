import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Award, Heart, Sparkles, Star, Users, Clock } from 'lucide-react';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <SEO
        title="À Propos - GiZo Beauty | Esthéticienne Diplômée Genève"
        description="Découvrez l'histoire de GiZo Beauty et rencontrez Gisèle Zoungrana, esthéticienne diplômée d'État avec 8 ans d'expérience. Passion, excellence et proximité à Genève."
        keywords="esthéticienne genève, institut beauté genève, CAP esthétique, BP esthétique, formation soins visage, certification massage"
        canonical="/about"
      />
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-gold/10"></div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-6">
              À propos de GiZo Beauty
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Votre oasis de beauté et de bien-être, où l'excellence rencontre l'élégance
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Institut de beauté GiZo Beauty - Espace de soins premium"
                loading="lazy"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-full font-semibold">
                <Sparkles className="w-5 h-5" />
                Notre Histoire
              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Un sanctuaire dédié à votre beauté
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Fondé en 2019, GiZo Beauty est né d'une passion pour l'excellence et le désir d'offrir
                une expérience de soin unique. Notre institut combine techniques modernes et savoir-faire
                traditionnel pour révéler votre beauté naturelle.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Chaque traitement est personnalisé selon vos besoins spécifiques, dans un environnement
                luxueux et apaisant où vous pouvez vous détendre en toute confiance.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: <Heart className="w-8 h-8" />,
                title: "Passion",
                description: "Notre amour pour la beauté et le bien-être guide chacune de nos actions"
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Excellence",
                description: "Des produits premium et des techniques de pointe pour des résultats exceptionnels"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Proximité",
                description: "Une écoute attentive et un accompagnement personnalisé pour chaque client"
              }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-gold to-yellow-400 text-white mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-full font-semibold mb-6">
                <Star className="w-5 h-5" />
                Votre Esthéticienne
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Gisèle Zoungrana
              </h2>
            </div>

            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Diplômée d'État en esthétique-cosmétique avec plus de 8 ans d'expérience,
                Gisèle a perfectionné son art dans les plus prestigieux instituts de beauté européens.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Formée aux dernières techniques de soins du visage, massages bien-être et épilation,
                elle met son expertise au service de votre beauté avec douceur et professionnalisme.
              </p>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Award className="w-6 h-6 text-gold" />
                  Certifications & Formations
                </h3>

                <ul className="space-y-3">
                  {[
                    "CAP Esthétique-Cosmétique-Parfumerie",
                    "BP Esthétique-Cosmétique-Parfumerie",
                    "Formation avancée en soins anti-âge",
                    "Certification massage relaxant et drainage lymphatique",
                    "Formation continue en cosmétologie naturelle"
                  ].map((certification, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                      {certification}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ma Philosophie</h3>
                <p className="text-lg text-gray-700 italic leading-relaxed">
                  "La beauté est unique à chacun. Mon rôle est de la révéler avec des soins
                  personnalisés, dans le respect de votre peau et de vos besoins. Chaque séance
                  est un moment privilégié où vous pouvez vous reconnecter avec vous-même."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Testimonials />

      <section className="bg-gradient-to-b from-white to-gray-50 py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Prêt à découvrir l'excellence ?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Réservez votre rendez-vous et offrez-vous un moment de pure détente
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
            >
              <Clock className="w-5 h-5" />
              Réserver maintenant
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
