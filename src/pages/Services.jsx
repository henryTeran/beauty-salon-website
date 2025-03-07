import { useCart } from "../context/CartContext";

export default function Services() {
  const { addToCart } = useCart();

  const services = [
    { id: 1, title: "Massage Relaxant", price: 50, img: "https://source.unsplash.com/400x300/?massage" },
    { id: 2, title: "Soin du Visage", price: 70, img: "https://source.unsplash.com/400x300/?facial" },
    { id: 3, title: "Manucure & Pédicure", price: 40, img: "https://source.unsplash.com/400x300/?nails" },
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
