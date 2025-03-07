import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function Testimonials() {
  const reviews = [
    { name: "Sophie", text: "Un moment magique ! Les soins sont incroyables." },
    { name: "Elodie", text: "Le massage était divin, je reviendrai sans hésiter !" },
    { name: "Marc", text: "Un service parfait, un accueil chaleureux et professionnel." },
  ];

  return (
    <div className="bg-light py-10 text-center">
      <h2 className="text-3xl font-bold text-gold mb-6">Avis de nos clients</h2>
      <Swiper slidesPerView={1} autoplay={{ delay: 3000 }}>
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 bg-white shadow-lg rounded-lg w-3/4 mx-auto">
              <p className="text-gray-700 italic">"{review.text}"</p>
              <h3 className="mt-4 font-bold text-gold">{review.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
