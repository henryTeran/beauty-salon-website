import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartPage from "./pages/Cart";  // Nouvelle page Panier
import { CartProvider } from "./context/CartContext";  // Contexte panier
import Reservations from "./pages/Reservations";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

export default function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/cart" element={<CartPage />} />  {/* Ajout de la route panier */}
          <Route path="/reservations" element={<Reservations />} /> {/* Nouvelle Route */}
          <Route path="/payment" element={<Payment />} /> {/* Nouvelle route */}
          <Route path="/success" element={<Success />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}
