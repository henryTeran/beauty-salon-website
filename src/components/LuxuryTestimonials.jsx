import { motion } from 'framer-motion';
import { useState } from 'react';

export default function LuxuryTestimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sophie M.',
      service: 'Soin du Visage Premium',
      rating: 5,
      text: 'Une expérience absolument divine. L\'ambiance est apaisante et les soins sont d\'une qualité exceptionnelle. Ma peau n\'a jamais été aussi lumineuse.',
      location: 'Genève'
    },
    {
      name: 'Marie L.',
      service: 'Massage Relaxant',
      rating: 5,
      text: 'Un moment de pur bonheur ! L\'équipe est professionnelle et attentionnée. Je ressors complètement détendue à chaque visite.',
      location: 'Lausanne'
    },
    {
      name: 'Claire D.',
      service: 'Manucure & Pédicure',
      rating: 5,
      text: 'Le meilleur institut de beauté que j\'ai fréquenté. Le soin aux détails est remarquable et les produits utilisés sont de grande qualité.',
      location: 'Genève'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="section-padding bg-luxury-cream relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold rounded-full blur-3xl"></div>
      </div>

      <div className="luxury-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-luxury-black mb-6">
            Témoignages
          </h2>
          <div className="gold-divider mb-8"></div>
          <p className="font-sans text-lg text-luxury-black-soft max-w-2xl mx-auto">
            L'avis de nos clientes qui nous font confiance
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.6 }}
            className="luxury-card p-12 text-center"
          >
            <div className="flex justify-center mb-6">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-luxury-gold fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            <div className="mb-8">
              <svg
                className="w-12 h-12 text-luxury-gold/30 mx-auto"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>

            <p className="font-sans text-lg text-luxury-black-soft mb-8 leading-relaxed italic">
              {testimonials[activeIndex].text}
            </p>

            <div className="space-y-2">
              <h4 className="font-serif text-2xl text-luxury-black">
                {testimonials[activeIndex].name}
              </h4>
              <p className="font-sans text-sm text-luxury-gold uppercase tracking-wider">
                {testimonials[activeIndex].service}
              </p>
              <p className="font-sans text-sm text-luxury-black-soft">
                {testimonials[activeIndex].location}
              </p>
            </div>
          </motion.div>

          <div className="flex items-center justify-center gap-8 mt-12">
            <button
              onClick={prevTestimonial}
              className="group p-3 border border-luxury-gold/30 rounded-full hover:border-luxury-gold transition-all duration-500"
              aria-label="Témoignage précédent"
            >
              <svg
                className="w-6 h-6 text-luxury-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    index === activeIndex
                      ? 'bg-luxury-gold w-8'
                      : 'bg-luxury-gold/30'
                  }`}
                  aria-label={`Aller au témoignage ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="group p-3 border border-luxury-gold/30 rounded-full hover:border-luxury-gold transition-all duration-500"
              aria-label="Témoignage suivant"
            >
              <svg
                className="w-6 h-6 text-luxury-gold"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
