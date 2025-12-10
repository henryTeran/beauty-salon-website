import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Star, Award } from 'lucide-react';
import { lazy, Suspense, useState, useEffect } from 'react';
import SEO from '../components/SEO';

const Scene3D = lazy(() => import('../components/Scene3D'));

export default function Home() {
  const { t } = useTranslation();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);

    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  return (
    <div>
      <SEO
        title="GiZo Beauty - Institut de Beauté Premium à Genève | Soins du Visage & Massages"
        description="Découvrez GiZo Beauty, votre institut de beauté premium à Genève. Soins du visage personnalisés, massages relaxants, manucure & pédicure. Réservez en ligne votre moment de détente."
        keywords="institut beauté genève, spa genève, massage relaxant, soin du visage, manucure pédicure, esthéticienne genève, beauté suisse"
        canonical="/"
      />
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gold/10">
        {isDesktop && (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        )}
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <Sparkles className="w-16 h-16 text-gold mx-auto mb-4" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-7xl text-gray-900 font-bold mb-6 leading-tight"
          >
            {t('home.welcome')} <span className="text-gold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">GiZo Beauty</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl leading-relaxed"
          >
            {t('home.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <Link 
              to="/services" 
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              {t('home.discover')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="container mx-auto py-20 text-center bg-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold text-dark mb-6">{t('home.exceptional_services')}</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            {t('home.services_description')}
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 px-6">
          {[
            {
              title: t('home.face'),
              desc: t('home.face_desc'),
              icon: <Star className="w-8 h-8" />,
              gradient: "from-rose-400 to-pink-400"
            },
            {
              title: t('home.body'),
              desc: t('home.body_desc'),
              icon: <Sparkles className="w-8 h-8" />,
              gradient: "from-gold to-yellow-400"
            },
            {
              title: t('home.epilation'),
              desc: t('home.epilation_desc'),
              icon: <Award className="w-8 h-8" />,
              gradient: "from-amber-400 to-orange-400"
            }
          ].map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              viewport={{ once: true }}
              className="group relative bg-white shadow-xl rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
              
              <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${service.gradient} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gold mb-4">{service.title}</h3>
              <p className="text-gray-700 mb-6 leading-relaxed">{service.desc}</p>
              
              <Link 
                to="/services" 
                className="inline-flex items-center gap-2 text-gold font-semibold hover:text-dark transition-colors group-hover:gap-3 duration-300"
              >
                {t('home.learn_more')} →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5"></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6 relative z-10"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Prêt pour une expérience unique ?
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
            Réservez dès maintenant votre soin personnalisé
          </p>

          <Link
            to="/services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
          >
            <Star className="w-5 h-5" />
            Réserver maintenant
          </Link>

          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "5", label: "Années d'expérience" },
              { number: "15+", label: "Soins disponibles" }
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gold mb-1">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
}