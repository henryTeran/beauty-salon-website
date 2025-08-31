import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone, CheckCircle, Star } from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";  // Import Firestore
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function Booking() {
  const { cart, clearCart } = useCart();
  const { t } = useTranslation();
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gold to-yellow-400 bg-clip-text text-transparent mb-4">
            {t('booking.title')}
          </h1>
        </motion.div>

        {bookingConfirmed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center bg-gradient-to-br from-green-50 to-emerald-50 p-12 rounded-3xl border border-green-200"
          >
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-green-700 mb-4">{t('booking.booking_confirmed')}</h2>
            <p className="text-lg text-gray-700">{t('booking.confirmation_email')}</p>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white shadow-2xl rounded-3xl overflow-hidden"
            >
              {/* Selected Services */}
              <div className="bg-gradient-to-r from-gold to-yellow-400 p-8 text-center">
                <h2 className="text-2xl font-bold text-black mb-4 flex items-center justify-center gap-2">
                  <Star className="w-6 h-6" />
                  {t('booking.selected_service')}
                </h2>
                {cart.length === 0 ? (
                  <p className="text-black/70">{t('booking.empty_cart')}</p>
                ) : (
                  <div className="grid gap-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                        <div className="flex items-center gap-4">
                          <img src={item.img} alt={item.title} className="w-16 h-16 object-cover rounded-xl" />
                          <h3 className="text-lg font-bold text-black">{item.title}</h3>
                        </div>
                        <p className="text-xl font-bold text-black">{item.price} CHF</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <label className="flex items-center gap-2 text-dark font-bold mb-4 text-lg">
                      <Calendar className="w-5 h-5 text-gold" />
                      {t('booking.choose_date')}
                    </label>
                    <DatePicker
                      selected={date}
                      onChange={(date) => setDate(date)}
                      minDate={new Date()}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                      placeholderText="Sélectionnez une date"
                    />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-dark font-bold mb-4 text-lg">
                      <Clock className="w-5 h-5 text-gold" />
                      {t('booking.choose_time')}
                    </label>
                    <select
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full border-2 border-gray-200 rounded-xl p-4 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                    >
                      <option value="">{t('booking.select_time')}</option>
                      <option value="09:00">09:00</option>
                      <option value="10:00">10:00</option>
                      <option value="11:00">11:00</option>
                      <option value="14:00">14:00</option>
                      <option value="15:00">15:00</option>
                      <option value="16:00">16:00</option>
                    </select>
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <h2 className="text-2xl font-bold text-dark mb-6 flex items-center gap-2">
                    <User className="w-6 h-6 text-gold" />
                    {t('booking.your_info')}
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder={t('booking.full_name')}
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        placeholder={t('booking.email')}
                        value={customer.email}
                        onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                        className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        required
                      />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        placeholder={t('booking.phone')}
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        className="w-full border-2 border-gray-200 rounded-xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                        required
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 flex items-center justify-center gap-3"
                >
                  <CheckCircle className="w-6 h-6" />
                  {t('booking.confirm_booking')}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
