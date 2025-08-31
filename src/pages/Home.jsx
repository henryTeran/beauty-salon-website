import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Star, Award } from 'lucide-react';
import Scene3D from '../components/Scene3D';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section with 3D Background */}
      <section className="relative min-h-screen flex items-center justify-center text-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <Scene3D />
        
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
            className="text-6xl md:text-7xl text-white font-bold mb-6 leading-tight"
          >
            {t('home.welcome')} <span className="text-gold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent">GiZo Beauty</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl leading-relaxed"
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
      <section className="container mx-auto py-20 text-center bg-gradient-to-b from-white to-gray-50">
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
              gradient: "from-pink-400 to-rose-400"
            },
            { 
              title: t('home.body'), 
              desc: t('home.body_desc'), 
              icon: <Sparkles className="w-8 h-8" />,
              gradient: "from-purple-400 to-indigo-400"
            },
            { 
              title: t('home.epilation'), 
              desc: t('home.epilation_desc'), 
              icon: <Award className="w-8 h-8" />,
              gradient: "from-emerald-400 to-teal-400"
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

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-gold to-yellow-400 py-16">
        <div className="container mx-auto text-center">
          <div className="grid md:grid-cols-3 gap-8 text-white">
            {[
              { number: "500+", label: "Clients satisfaits" },
              { number: "5", label: "Années d'expérience" },
              { number: "15+", label: "Soins disponibles" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt pour une expérience unique ?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Réservez dès maintenant votre soin personnalisé
          </p>
          <Link 
            to="/services"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
          >
            <Star className="w-5 h-5" />
            Réserver maintenant
          </Link>
        </motion.div>
      </section>

      {/* Testimonials */}
      <Testimonials />
    </div>
  );
}