import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cart } = useCart();
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 50);
    });
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scroll ? "bg-white shadow-lg" : "bg-transparent"
    } py-4`}>
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-bold text-gold">GiZo Beauty</h1>
        <div className="space-x-6 flex items-center">
          <Link to="/" className="text-dark hover:text-gold transition duration-300">Accueil</Link>
          <Link to="/services" className="text-dark hover:text-gold transition duration-300">Services</Link>
          <Link to="/booking" className="btn btn-gold">Prendre RDV</Link>
          <Link to="/cart" className="relative text-xl">
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
