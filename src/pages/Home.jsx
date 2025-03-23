import { Link } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import fotoBackGround from "../assets/images/home/Home.jpg";

export default function Home() {
  return (
    <div>
      {/* Section d'accueil améliorée */}
      <section 
        className="relative min-h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${fotoBackGround})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center animate-fadeIn p-6">
          <h1 className="text-5xl text-white font-bold mb-4">Bienvenue chez <span className="text-gold">GiZo Beauty</span></h1>
          <p className="text-lg text-white mb-6 max-w-2xl">Offrez-vous un moment de bien-être et de relaxation avec nos soins experts.</p>
          <Link to="/services" className="btn bg-gold text-white px-6 py-3 rounded-full text-lg hover:bg-white hover:text-gold transition duration-300 shadow-lg">
            Découvrir nos soins
          </Link>
        </div>
      </section>

      {/* Section des services mis en avant */}
      <section className="container mx-auto py-12 text-center">
        <h2 className="text-4xl font-bold text-dark mb-6">Nos soins d'exception</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
          Découvrez nos soins premium pour le visage, le corps et l'épilation, réalisés avec expertise.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gold">Visage</h3>
            <p className="text-gray-700 mt-2">Soin hydratant, anti-âge et éclat</p>
            <Link to="/services#visage" className="text-gold mt-4 inline-block">En savoir plus →</Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gold">Corps</h3>
            <p className="text-gray-700 mt-2">Massage relaxant, minceur et bien-être</p>
            <Link to="/services#corps" className="text-gold mt-4 inline-block">En savoir plus →</Link>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-2xl font-bold text-gold">Épilation</h3>
            <p className="text-gray-700 mt-2">Épilation douce et efficace</p>
            <Link to="/services#epilation" className="text-gold mt-4 inline-block">En savoir plus →</Link>
          </div>
        </div>
      </section>

      {/* Témoignages Clients */}
      <Testimonials />
    </div>
  );
}
