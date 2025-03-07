import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gold mb-4">Votre Panier</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow p-4 rounded-lg my-2">
              <img src={item.img} alt={item.title} className="w-20 h-20 object-cover rounded-lg"/>
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p>{item.price} CHF</p>
              <p>Quantité : {item.quantity}</p>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-700 transition duration-300"
                onClick={() => removeFromCart(item.id)}
              >
                Supprimer
              </button>
            </div>
          ))}
          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"
              onClick={clearCart}
            >
              Vider le panier
            </button>
            <Link to="/booking" className="bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300">
              Finaliser la réservation
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
