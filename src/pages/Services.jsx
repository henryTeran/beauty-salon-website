import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Scissors, Leaf, Plus, Star } from 'lucide-react';
import fotoMassageRelaxant from "../assets/images/services/MassageRelaxant.jpg";
import fotoSoinDuVisage from "../assets/images/services/SoinduVisage.jpg";
import fotoManucurePedicure from "../assets/images/services/ManucurePedicure.jpg";

export default function Services() {
  const { addToCart } = useCart();
  const { t } = useTranslation();

  const categories = [
    { 
      id: "visage", 
      title: t('services.face_care'), 
      icon: <Sparkles className="w-6 h-6" />, 
      gradient: "from-pink-400 to-rose-400",
      services: [
        { id: 1, title: t('services.facial_treatment'), price: 70, img: fotoSoinDuVisage, duration: "60 min" }
      ]
    },
    { 
      id: "corps", 
      title: t('services.body_care'), 
      icon: <Heart className="w-6 h-6" />, 
      gradient: "from-purple-400 to-indigo-400",
      services: [
        { id: 2, title: t('services.relaxing_massage'), price: 40, img: fotoMassageRelaxant, duration: "45 min" }
      ]
    },
    { 
      id: "mains_pieds", 
      title: t('services.hands_feet'), 
      icon: <Leaf className="w-6 h-6" />, 
      gradient: "from-emerald-400 to-teal-400",
      services: [
        { id: 3, title: t('services.manicure_pedicure'), price: 40, img: fotoManucurePedicure, duration: "90 min" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="container mx-auto px-6 pt-20 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-6">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Découvrez notre gamme complète de soins premium, conçus pour révéler votre beauté naturelle
          </p>
        </motion.div>
      </div>
      
      {/* Services Categories */}
      <div className="container mx-auto px-6 pb-20">
        {categories.map((category, categoryIndex) => (
          <motion.div 
            key={category.id} 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="text-center mb-12">
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${category.gradient} text-white mb-4`}>
                {category.icon}
                </div>
              </motion.div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {category.services.map((service, serviceIndex) => (
                <motion.div 
                  key={service.id} 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: serviceIndex * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  viewport={{ once: true }}
                  className="group relative bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={service.img} 
                      alt={service.title} 
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                      {service.duration}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-dark mb-3 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <div className="flex items-center justify-between mb-6">
                      <span className="text-3xl font-bold text-gold">{service.price} CHF</span>
                      <div className="flex items-center gap-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black px-6 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-gold/25 transition-all duration-300 flex items-center justify-center gap-2"
                      onClick={() => addToCart(service)}
                    >
                      <Plus className="w-5 h-5" />
                      {t('services.add_to_cart')}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-900 to-black py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto px-6"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Prêt à vous faire chouchouter ?
          </h2>
          <Link 
            to="/booking" 
            className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 transform hover:scale-105"
          >
            <Star className="w-5 h-5" />
            {t('services.book_service')}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}