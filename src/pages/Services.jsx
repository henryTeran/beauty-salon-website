import { useCart } from "../context/CartContext";
import fotoMassageRelaxant from "../assets/images/services/MassageRelaxant.jpg";
import fotoSoinDuVisage from "../assets/images/services/SoinDuVisage.jpg";
import fotoManucurePedicure from "../assets/images/services/ManucurePedicure.jpg";

export default function Services() {
  const { addToCart } = useCart();

  const services = [
    { id: 1, title: "Massage Relaxant", price: 50, img: fotoMassageRelaxant },
    { id: 2, title: "Soin du Visage", price: 70, img: fotoSoinDuVisage },
    { id: 3, title: "Manucure & Pédicure", price: 40, img: fotoManucurePedicure },
  ];

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold text-gold mb-6">Nos Services</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition duration-300">
            <img src={service.img} alt={service.title} className="w-full h-48 object-cover"/>
            <div className="p-4">
              <h2 className="text-xl font-bold text-dark">{service.title}</h2>
              <p className="text-gray-700 mt-2">{service.price} CHF</p>
              <button
                className="mt-4 bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300"
                onClick={() => addToCart(service)}
              >
                Ajouter au panier
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


//import { useCart } from "../context/CartContext";
//import fotoMassageRelaxant from "../assets/images/services/MassageRelaxant.jpg";
//import fotoSoinDuVisage from "../assets/images/services/SoinDuVisage.jpg";
//import fotoManucurePedicure from "../assets/images/services/ManucurePedicure.jpg";

// export default function Services() {
//   const { addToCart } = useCart();

//   const services = [
//     { id: 1, title: "Massage Relaxant", price: 50, img: fotoMassageRelaxant },
//     { id: 2, title: "Soin du Visage", price: 70, img: fotoSoinDuVisage },
//     { id: 3, title: "Manucure & Pédicure", price: 40, img: fotoManucurePedicure },
//   ];

//   return (
//     <div className="container mx-auto p-6 text-center">
//       <h1 className="text-4xl font-bold text-gold mb-6">Nos Services</h1>
//       <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
//         Découvrez notre gamme de soins relaxants et régénérants pour le visage, le corps et la beauté des ongles.
//       </p>
//       <div className="grid md:grid-cols-3 gap-6">
//         {services.map((service) => (
//           <div key={service.id} className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition duration-300">
//             <img src={service.img} alt={service.title} className="w-32 h-32 mx-auto rounded-full shadow-md"/>
//             <h2 className="text-xl font-bold text-gray-900 mt-4">{service.title}</h2>
//             <p className="text-gray-700 mt-2">{service.price} CHF</p>
//             <button
//               className="mt-4 bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300"
//               onClick={() => addToCart(service)}
//             >
//               Ajouter au panier
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
