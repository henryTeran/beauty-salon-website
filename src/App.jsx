import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Booking from "./pages/Booking";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./context/CartContext";
import { BookingProvider } from "./context/BookingContext";
import Reservations from "./pages/Reservations";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <CartProvider>
      <BookingProvider>
        <Router>
          <Navbar />
          <CartDrawer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/success" element={<Success />} />
          </Routes>
          <Footer />
        </Router>
      </BookingProvider>
    </CartProvider>
  );
}
