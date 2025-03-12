import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, clearCart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gold mb-4">Votre Panier</h1>
      
      {cart.length === 0 ? (
        <p className="text-gray-600">Votre panier est vide.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-white shadow p-4 rounded-lg my-2">
              <h2 className="text-lg font-bold">{item.title}</h2>
              <p>{item.price} CHF</p>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-4">Total : {totalAmount} CHF</h2>

          <div className="mt-6 flex justify-between">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition duration-300"
              onClick={clearCart}
            >
              Vider le panier
            </button>
            <Link to="/payment" className="bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300">
              Procéder au paiement
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
