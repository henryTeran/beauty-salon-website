import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import fotoBackGround from "../assets/images/home/Home.jpg"; // Ton image

export default function Home() {
  return (
    <div>
      {/* Section d'accueil */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fotoBackGround})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-4">
            Bienvenue chez <span className="text-gold">GiZo Beauty</span>
          </h1>
          <p className="text-lg text-white mb-6 max-w-2xl">
            Offrez-vous un moment de bien-être et de relaxation grâce à nos soins spécialisés.
          </p>
          <Link to="/services" className="bg-gold text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-gold transition duration-300">
            Découvrir nos soins
          </Link>
        </div>
      </section>

      {/* Section Témoignages */}
      <Testimonials />
    </div>
  );
}
