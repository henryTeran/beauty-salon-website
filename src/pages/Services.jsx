import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

import { FaSpa, FaHeart, FaCut, FaLeaf } from "react-icons/fa";

import fotoMassageRelaxant from "../assets/images/services/MassageRelaxant.jpg";
import fotoSoinDuVisage from "../assets/images/services/SoinduVisage.jpg";
import fotoManucurePedicure from "../assets/images/services/ManucurePedicure.jpg";

export default function Services() {
  const { addToCart } = useCart();

  const categories = [
    { id: "visage", title: "Soin du Visage", icon: <FaSpa />, services: [
        { id: 1, title: "Soin du Visage", price: 70, img: fotoSoinDuVisage }
      ]
    },
    { id: "corps", title: "Soins du Corps", icon: <FaHeart />, services: [
        { id: 1, title: "Massages relaxant", price: 40, img: fotoMassageRelaxant }
 ]
    },
    { id: "mains_pieds", title: "Soins des mains / pieds", icon: <FaLeaf />, services: [
        { id: 3, title: "Manucure & Pédicure", price: 40, img: fotoManucurePedicure }
      ]
    },
    // { id: "corps", title: "Soins du Corps", icon: <FaHeart />, services: [
    //     { id: 3, title: "Manucure & Pédicure", price: 40, img: fotoManucurePedicure }
    //   ]
    // },
  ];

  return (
    <div className="container mx-auto p-8 text-center">
      <h1 className="text-5xl font-bold text-gold mb-10">Nos Services</h1>
      
      {categories.map((category) => (
        <div key={category.id} className="mb-12">
          <h2 className="text-3xl font-semibold text-dark flex items-center justify-center gap-2">
            {category.icon} {category.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-8 mt-6">
            {category.services.map((service) => (
              <div key={service.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
                <img src={service.img} alt={service.title} className="w-full h-56 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark">{service.title}</h3>
                  <p className="text-gray-700 mt-2">{service.price} CHF</p>
                  <button
                    className="mt-4 bg-gold text-white px-6 py-2 rounded-full hover:bg-dark transition duration-300"
                    onClick={() => addToCart(service)}
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="mt-10">
        <Link to="/booking" className="bg-gold text-white px-8 py-3 rounded-full text-lg hover:bg-dark transition duration-300">
          Réserver un soin
        </Link>
      </div>
    </div>
  );
}
