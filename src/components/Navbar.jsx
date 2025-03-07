import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext"; // Importer useCart

export default function Navbar() {
  const { cart } = useCart(); // Récupérer le panier depuis le contexte

  return (
    <nav className="bg-white shadow-lg py-4">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-gold">GiZo Beauty</h1>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-dark hover:text-gold transition duration-300">Accueil</Link>
          <Link to="/services" className="text-dark hover:text-gold transition duration-300">Services</Link>
          <Link to="/booking" className="bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300">
            Réserver
          </Link>
          <Link to="/cart" className="relative">
            🛒
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
