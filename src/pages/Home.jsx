import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import fotoBackGround from "../assets/images/home/Home.jpg";

export default function Home() {
  return (
    <div>
      {/* Section d'accueil */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fotoBackGround})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center animate-fadeIn">
          <h1 className="text-5xl text-white font-bold mb-4">
            Bienvenue chez <span className="text-gold">GiZo Beauty</span>
          </h1>
          <p className="text-lg text-white mb-6">
            Offrez-vous un moment de bien-être et de relaxation.
          </p>
          <Link to="/services" className="btn btn-gold text-lg">
            Découvrir nos soins
          </Link>
        </div>
      </section>

      {/* Section Témoignages */}
      <Testimonials />
    </div>
  );
}
