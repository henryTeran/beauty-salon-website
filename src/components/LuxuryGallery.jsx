import { motion } from 'framer-motion';

export default function LuxuryGallery() {
  const images = [
    {
      url: 'https://images.pexels.com/photos/3997386/pexels-photo-3997386.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Spa Ambiance'
    },
    {
      url: 'https://images.pexels.com/photos/3997999/pexels-photo-3997999.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Soin du visage'
    },
    {
      url: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Massage relaxant'
    },
    {
      url: 'https://images.pexels.com/photos/3997987/pexels-photo-3997987.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Manucure premium'
    },
    {
      url: 'https://images.pexels.com/photos/3764013/pexels-photo-3764013.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Institut moderne'
    },
    {
      url: 'https://images.pexels.com/photos/3997990/pexels-photo-3997990.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'Espace détente'
    }
  ];

  return (
    <section className="section-padding bg-luxury-black relative">
      <div className="luxury-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-gold mb-6">
            Notre Univers
          </h2>
          <div className="gold-divider mb-8"></div>
          <p className="font-sans text-lg text-luxury-cream max-w-2xl mx-auto">
            Découvrez l'ambiance raffinée de notre institut
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <motion.div
              key={image.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-square overflow-hidden"
            >
              <div className="absolute inset-0 border border-luxury-gold/20 group-hover:border-luxury-gold transition-all duration-700 z-10"></div>

              <img
                src={image.url}
                alt={image.title}
                loading="lazy"
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-luxury-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="w-12 h-px bg-luxury-gold mb-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
                <h3 className="font-serif text-xl text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {image.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
