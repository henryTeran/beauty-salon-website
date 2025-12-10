import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function ServicesPreview() {
  const { t } = useTranslation();

  const services = [
    {
      title: 'Soin du Visage',
      description: 'Nettoyage en profondeur, gommage doux et masque hydratant pour une peau éclatante',
      duration: '60 min',
      price: '120 CHF',
      image: 'https://images.pexels.com/photos/3997999/pexels-photo-3997999.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Massage Relaxant',
      description: 'Massage aux huiles essentielles pour détendre corps et esprit',
      duration: '90 min',
      price: '150 CHF',
      image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=600'
    },
    {
      title: 'Manucure & Pédicure',
      description: 'Soin complet des mains et des pieds avec vernis premium',
      duration: '75 min',
      price: '90 CHF',
      image: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=600'
    }
  ];

  return (
    <section className="section-padding bg-luxury-white">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-black mb-6">
            Nos Soins Signature
          </h2>
          <div className="gold-divider mb-8"></div>
          <p className="font-sans text-lg text-luxury-black-soft max-w-2xl mx-auto">
            Des expériences uniques conçues pour sublimer votre beauté naturelle
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="luxury-card group overflow-hidden"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/60 to-transparent"></div>
              </div>

              <div className="p-8">
                <h3 className="font-serif text-2xl text-luxury-black mb-3">
                  {service.title}
                </h3>

                <p className="font-sans text-luxury-black-soft mb-6 leading-relaxed">
                  {service.description}
                </p>

                <div className="flex items-center justify-between mb-6 pb-6 border-b border-luxury-gold/20">
                  <span className="font-sans text-sm text-luxury-black-soft tracking-wider">
                    {service.duration}
                  </span>
                  <span className="font-serif text-xl text-luxury-gold">
                    {service.price}
                  </span>
                </div>

                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 font-sans text-sm text-luxury-gold uppercase tracking-wider group-hover:gap-4 transition-all duration-500"
                >
                  Voir le soin
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link to="/services" className="luxury-btn">
            Découvrir tous nos soins
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
