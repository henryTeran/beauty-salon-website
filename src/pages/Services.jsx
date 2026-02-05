import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, Heart, Leaf, Plus, Star, Clock, Check,
  Award, Shield, Zap, Filter, ChevronRight, Loader2
} from 'lucide-react';
import SEO from '../components/SEO';
import { useServices } from '../hooks/useServices';

export default function Services() {
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredService, setHoveredService] = useState(null);
  const { services: dbServices, loading, error } = useServices();

  const getCategoryInfo = (categoryId) => {
    const categoryMap = {
      visage: {
        title: t('services.face_care'),
        icon: <Sparkles className="w-6 h-6" />,
        gradient: "from-rose-400 to-pink-400",
        description: "Révélez l'éclat naturel de votre peau"
      },
      corps: {
        title: t('services.body_care'),
        icon: <Heart className="w-6 h-6" />,
        gradient: "from-gold to-yellow-400",
        description: "Détendez-vous et rechargez vos énergies"
      },
      mains_pieds: {
        title: t('services.hands_feet'),
        icon: <Leaf className="w-6 h-6" />,
        gradient: "from-amber-400 to-orange-400",
        description: "Beauté et soin jusqu'au bout des doigts"
      }
    };
    return categoryMap[categoryId] || {};
  };

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(dbServices.map(s => s.category))];
    return uniqueCategories.map(catId => ({
      id: catId,
      ...getCategoryInfo(catId)
    }));
  }, [dbServices, t]);

  const allServices = useMemo(() => {
    return dbServices.map(service => {
      const categoryInfo = getCategoryInfo(service.category);
      return {
        ...service,
        categoryId: service.category,
        categoryTitle: categoryInfo.title,
        categoryGradient: categoryInfo.gradient,
        img: service.image_url,
        duration: `${service.duration} min`,
        popular: service.is_popular,
        benefits: service.benefits || []
      };
    });
  }, [dbServices, t]);

  const filteredServices = useMemo(() => {
    if (selectedCategory === "all") return allServices;
    return allServices.filter(service => service.categoryId === selectedCategory);
  }, [selectedCategory, allServices]);

  const features = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Expertise Certifiée",
      description: "Esthéticiennes diplômées avec plus de 10 ans d'expérience"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Produits Premium",
      description: "Soins biologiques et produits haut de gamme uniquement"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Résultats Visibles",
      description: "Des effets immédiats et durables garantis"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-gold animate-spin mx-auto mb-4" />
          <p className="text-xl text-slate-600">Chargement des services...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-red-800 mb-4">Erreur de chargement</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-gold to-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300"
            >
              Réessayer
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <SEO
        title="Nos Services - GiZo Beauty | Soins Premium Genève"
        description="Découvrez notre gamme de soins premium : soins du visage anti-âge, massages relaxants aux huiles essentielles, manucure & pédicure. Prix à partir de 40 CHF."
        keywords="soins visage genève, massage relaxant, manucure pédicure, épilation, beauté genève, esthéticienne professionnelle"
        canonical="/services"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 pt-32 pb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-yellow-400/20 backdrop-blur-sm px-6 py-3 rounded-full border border-gold/30 mb-8"
            >
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold">Excellence & Bien-être</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Découvrez nos
              <span className="block bg-gradient-to-r from-gold via-yellow-300 to-gold bg-clip-text text-transparent">
                Soins d'Exception
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12">
              Une expérience unique alliant techniques professionnelles, produits premium
              et expertise reconnue pour sublimer votre beauté naturelle
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/booking"
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/40 transition-all duration-300 transform hover:scale-105"
              >
                <span>Réserver maintenant</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href="#services"
                className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Découvrir les soins
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-slate-200/50 hover:border-gold/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-yellow-400/20 text-gold mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div id="services" className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <div className="flex items-center gap-2 text-slate-600 font-semibold">
            <Filter className="w-5 h-5" />
            <span>Filtrer par:</span>
          </div>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === "all"
                ? "bg-gradient-to-r from-gold to-yellow-400 text-black shadow-lg shadow-gold/25"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            Tous les services
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? `bg-gradient-to-r ${category.gradient} text-white shadow-lg`
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category.icon}
              {category.title}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Services Grid */}
      <div className="container mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setHoveredService(service.id)}
                onMouseLeave={() => setHoveredService(null)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500"
                style={{ willChange: 'transform' }}
              >
                {service.popular && (
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-gold to-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold shadow-lg flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Populaire
                  </div>
                )}

                <div className="relative h-72 overflow-hidden">
                  <motion.img
                    src={service.img}
                    alt={service.alt || service.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    animate={{
                      scale: hoveredService === service.id ? 1.1 : 1
                    }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${
                    hoveredService === service.id ? 'opacity-100' : 'opacity-60'
                  }`}></div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r ${service.categoryGradient} text-white text-sm font-semibold`}>
                        <Clock className="w-4 h-4" />
                        {service.duration}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="mb-6 space-y-2">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-gold flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
                    <div>
                      <div className="text-sm text-slate-500 mb-1">À partir de</div>
                      <div className="text-3xl font-bold bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
                        {service.price} CHF
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black px-6 py-4 rounded-2xl font-bold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => addToCart(service)}
                    >
                      <Plus className="w-5 h-5" />
                      Ajouter au panier
                    </motion.button>

                    <Link
                      to="/booking"
                      className="block w-full text-center bg-slate-100 text-slate-700 px-6 py-4 rounded-2xl font-semibold hover:bg-slate-200 transition-all duration-300"
                    >
                      Réserver ce soin
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Trust Section */}
      <div className="bg-slate-900 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-3 bg-gold/10 backdrop-blur-sm px-6 py-3 rounded-full border border-gold/30 mb-8">
                <Shield className="w-5 h-5 text-gold" />
                <span className="text-gold font-semibold">Garantie Satisfaction</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Votre satisfaction, notre priorité
              </h2>

              <p className="text-xl text-gray-300 mb-12 leading-relaxed">
                Nous nous engageons à vous offrir une expérience exceptionnelle.
                Si vous n'êtes pas entièrement satisfait, nous reprenons le soin gratuitement.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-bold text-gold mb-2">500+</div>
                  <div className="text-gray-300">Clientes satisfaites</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-bold text-gold mb-2">10+</div>
                  <div className="text-gray-300">Ans d'expérience</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="text-4xl font-bold text-gold mb-2">98%</div>
                  <div className="text-gray-300">Taux de satisfaction</div>
                </div>
              </div>

              <Link
                to="/booking"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/40 transition-all duration-300 transform hover:scale-105"
              >
                <Star className="w-6 h-6" />
                Réserver maintenant
                <ChevronRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}