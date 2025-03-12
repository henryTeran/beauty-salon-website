import { useState } from "react";
import { useCart } from "../context/CartContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";  // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Booking() {
  const { cart, clearCart } = useCart();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date || !time || !customer.name || !customer.email || !customer.phone) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    const reservationData = {
      services: cart.map((item) => ({ id: item.id, title: item.title, price: item.price })),
      date: date.toLocaleDateString(),
      time,
      customer,
      createdAt: serverTimestamp(),
    };

    try {
      // Enregistrer dans Firestore
      await addDoc(collection(db, "reservations"), reservationData);
      console.log("Réservation enregistrée dans Firestore");

      // Envoyer l'email de confirmation
      const emailParams = {
        from_name: "Gizo Beauty",
        user_name: customer.name,
        user_email: customer.email,
        reservation_date: date.toLocaleDateString(),
        reservation_time: time,
        selected_services: cart.map((item) => item.title).join(", "),
      };

      await emailjs.send("gizo_serviceId", "gizoBeauty_TemplateId", emailParams, "xZiaWwWG4X44LV4sB");
      console.log("Email envoyé avec succès !");

      setBookingConfirmed(true);
      clearCart();

      // Rediriger après 3 secondes
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      console.error("Erreur lors de l'enregistrement :", error);
      alert("Erreur lors de l'enregistrement de la réservation.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gold mb-6">Réservez votre soin</h1>

      {bookingConfirmed ? (
        <div className="text-center bg-green-100 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-green-700">Réservation confirmée !</h2>
          <p className="mt-4 text-gray-700">Un e-mail de confirmation vous a été envoyé.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-bold text-dark mb-4">Soin sélectionné</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Votre panier est vide.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-light p-3 rounded-lg mb-3">
                <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p>{item.price} CHF</p>
              </div>
            ))
          )}

          <div className="mt-6">
            <label className="block text-dark font-bold mb-2">Choisissez une date :</label>
            <DatePicker
              selected={date}
              onChange={(date) => setDate(date)}
              minDate={new Date()}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mt-6">
            <label className="block text-dark font-bold mb-2">Choisissez une heure :</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full border rounded-lg p-2"
            >
              <option value="">Sélectionnez une heure</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
              <option value="14:00">14:00</option>
              <option value="15:00">15:00</option>
              <option value="16:00">16:00</option>
            </select>
          </div>

          <h2 className="text-xl font-bold text-dark mt-6 mb-4">Vos informations</h2>
          <input
            type="text"
            placeholder="Nom complet"
            value={customer.name}
            onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={customer.email}
            onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />
          <input
            type="tel"
            placeholder="Téléphone"
            value={customer.phone}
            onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
            className="w-full border rounded-lg p-2 mb-3"
            required
          />

          <button
            type="submit"
            className="w-full bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300 mt-4"
          >
            Confirmer la réservation
          </button>
        </form>
      )}
    </div>
  );
}
