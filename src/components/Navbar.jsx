import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <h1 className="text-3xl font-semibold tracking-wider text-gray-900">
          <span className="text-gold">GiZo</span> Beauty
        </h1>
        <div className="space-x-8 text-lg uppercase tracking-wide font-medium">
          <Link to="/" className="text-gray-700 hover:text-gold transition duration-300">Accueil</Link>
          <Link to="/services" className="text-gray-700 hover:text-gold transition duration-300">Visage</Link>
          <Link to="/booking" className="text-gray-700 hover:text-gold transition duration-300">Corps</Link>
          <Link to="/epilation" className="text-gray-700 hover:text-gold transition duration-300">Épilation</Link>
          <Link to="/contact" className="text-gray-700 hover:text-gold transition duration-300">Contact</Link>
          <Link to="/cart" className="relative text-gray-700 hover:text-gold transition duration-300">
            🛒
          </Link>
        </div>
      </div>
    </nav>
  );
}
