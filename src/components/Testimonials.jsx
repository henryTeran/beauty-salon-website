import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const { t } = useTranslation();
  
  const reviews = [
    { 
      name: "Sophie L.", 
      text: "Un moment magique ! Les soins sont incroyables, je me sens comme une nouvelle personne.", 
      rating: 5,
      service: "Soin du visage"
    },
    { 
      name: "Elodie M.", 
      text: "Le massage était divin, je reviendrai sans hésiter ! L'ambiance est parfaite.", 
      rating: 5,
      service: "Massage relaxant"
    },
    { 
      name: "Marc D.", 
      text: "Un service parfait, un accueil chaleureux et professionnel. Hautement recommandé !", 
      rating: 5,
      service: "Manucure"
    },
    { 
      name: "Claire B.", 
      text: "L'équipe est exceptionnelle et les résultats dépassent mes attentes à chaque fois.", 
      rating: 5,
      service: "Soin anti-âge"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">{t('testimonials.title')}</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Découvrez ce que nos clients disent de leur expérience chez GiZo Beauty
          </p>
        </motion.div>
        
        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          spaceBetween={30}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="pb-12"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-sm border border-white/20 p-8 rounded-2xl hover:bg-white/15 transition-all duration-300 h-full"
              >
                <Quote className="w-8 h-8 text-gold mb-4" />
                
                <p className="text-white text-lg italic leading-relaxed mb-6">
                  "{review.text}"
                </p>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <h3 className="font-bold text-gold text-lg">{review.name}</h3>
                  <p className="text-gray-300 text-sm">{review.service}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
