import { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useBooking } from "../context/BookingContext";
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Clock, User, Mail, Phone, ArrowRight, Star,
  MessageSquare, AlertCircle, CheckCircle2, Loader2, Sparkles,
  MapPin, ChevronRight, Info, Shield, Users, X
} from 'lucide-react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import SEO from '../components/SEO';
import { getAvailableSlots, createBooking, getBusinessHours } from '../services/bookingService';

export default function Booking() {
  const { cart, getTotalPrice, removeFromCart } = useCart();
  const { updateBookingData } = useBooking();
  const { t } = useTranslation();
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
    preferredPractitioner: ""
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [businessHours, setBusinessHours] = useState([]);
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();

  const practitioners = [
    { id: "any", name: "Pas de préférence" },
    { id: "sophie", name: "Sophie Martin" },
    { id: "marie", name: "Marie Dubois" },
    { id: "julie", name: "Julie Blanc" }
  ];

  const totalDuration = useMemo(() => {
    return cart.reduce((total, service) => {
      const duration = parseInt(service.duration) || 60;
      return total + duration;
    }, 0);
  }, [cart]);

  useEffect(() => {
    loadBusinessHours();
  }, []);

  useEffect(() => {
    if (date) {
      loadAvailableSlots(date);
    } else {
      setAvailableSlots([]);
      setTime("");
    }
  }, [date]);

  const loadBusinessHours = async () => {
    const hours = await getBusinessHours();
    setBusinessHours(hours);
  };

  const loadAvailableSlots = async (selectedDate) => {
    setLoadingSlots(true);
    setTime("");
    try {
      const slots = await getAvailableSlots(
        selectedDate.toISOString().split('T')[0]
      );
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Error loading slots:', error);
      setError('Impossible de charger les créneaux disponibles');
    } finally {
      setLoadingSlots(false);
    }
  };

  const isDateDisabled = (date) => {
    const dayOfWeek = date.getDay();
    const businessDay = businessHours.find(h => h.day_of_week === dayOfWeek);
    return businessDay ? businessDay.is_closed : true;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone) => {
    return /^[+]?[\d\s-()]{10,}$/.test(phone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!date || !time || !customer.name || !customer.email || !customer.phone) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (!validateEmail(customer.email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }

    if (!validatePhone(customer.phone)) {
      setError("Veuillez entrer un numéro de téléphone valide.");
      return;
    }

    if (cart.length === 0) {
      setError("Votre panier est vide. Veuillez ajouter des services avant de réserver.");
      return;
    }

    setLoading(true);

    const bookingData = {
      customer_name: customer.name,
      customer_email: customer.email,
      customer_phone: customer.phone,
      booking_date: date.toISOString().split('T')[0],
      booking_time: time,
      services: cart,
      total_price: getTotalPrice(),
      notes: customer.notes
        ? `${customer.notes}${customer.preferredPractitioner && customer.preferredPractitioner !== 'any' ? `\nPraticienne préférée: ${practitioners.find(p => p.id === customer.preferredPractitioner)?.name}` : ''}`
        : customer.preferredPractitioner && customer.preferredPractitioner !== 'any'
          ? `Praticienne préférée: ${practitioners.find(p => p.id === customer.preferredPractitioner)?.name}`
          : ''
    };

    const result = await createBooking(bookingData);

    if (result.success) {
      setSuccess(true);
      updateBookingData({
        date,
        time,
        customer,
        bookingId: result.data.id
      });

      setTimeout(() => {
        navigate("/payment");
      }, 1500);
    } else {
      setError(result.error || "Une erreur est survenue. Veuillez réessayer.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <SEO
        title="Réservation - GiZo Beauty | Prendre Rendez-vous en Ligne"
        description="Réservez votre soin de beauté en ligne à Genève. Choisissez votre créneau et réservez en quelques clics. Confirmation immédiate par email."
        keywords="réservation beauté genève, rendez-vous esthéticienne, booking institut beauté, prendre rdv genève"
        canonical="/booking"
      />

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-6 pt-32 pb-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-gold/20 to-yellow-400/20 backdrop-blur-sm px-6 py-3 rounded-full border border-gold/30 mb-8"
            >
              <Calendar className="w-5 h-5 text-gold" />
              <span className="text-gold font-semibold">Réservation en ligne</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              {t('booking.title')}
            </h1>

            <p className="text-xl text-gray-300 leading-relaxed">
              Sélectionnez votre date et créneau horaire parmi nos disponibilités en temps réel
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-50 to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 py-16">
        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center bg-white p-16 rounded-3xl shadow-xl border border-slate-200"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold/20 to-yellow-400/20 text-gold mb-6">
              <Star className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Votre panier est vide</h2>
            <p className="text-lg text-slate-600 mb-8">
              Découvrez nos soins premium et ajoutez vos services préférés pour commencer votre réservation
            </p>
            <a
              href="/services"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-full text-lg font-bold hover:shadow-xl hover:shadow-gold/30 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Découvrir nos services
              <ChevronRight className="w-5 h-5" />
            </a>
          </motion.div>
        ) : (
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column - Services Summary */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden sticky top-24">
                  <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6">
                    <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <Star className="w-6 h-6 text-gold" />
                      Votre sélection
                    </h2>
                    <p className="text-slate-300 text-sm">Services choisis</p>
                  </div>

                  <div className="p-6 space-y-4">
                    {cart.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative group"
                      >
                        <div className="flex items-start gap-4 pb-4 border-b border-slate-100 last:border-0">
                          <img
                            src={item.img || item.image_url}
                            alt={item.alt || item.title}
                            loading="lazy"
                            className="w-16 h-16 object-cover rounded-xl shadow-md"
                          />
                          <div className="flex-1">
                            <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.duration}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gold">{item.price} CHF</p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-slate-400 hover:text-red-500 transition-colors mt-1"
                              title="Retirer"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    <div className="pt-4 space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Durée totale</span>
                        <span className="font-semibold text-slate-900">{totalDuration} min</span>
                      </div>
                      <div className="flex items-center justify-between text-lg pt-3 border-t border-slate-200">
                        <span className="font-bold text-slate-900">Total</span>
                        <span className="font-bold text-2xl bg-gradient-to-r from-gold to-yellow-600 bg-clip-text text-transparent">
                          {getTotalPrice()} CHF
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-slate-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Info className="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-slate-600 leading-relaxed">
                          Un acompte de 30% sera demandé pour confirmer votre réservation
                        </div>
                      </div>
                    </div>

                    {date && time && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-6 p-4 bg-gradient-to-br from-gold/10 to-yellow-400/10 border border-gold/20 rounded-xl"
                      >
                        <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-gold" />
                          Récapitulatif
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2 text-slate-700">
                            <Calendar className="w-4 h-4 text-gold" />
                            <span>{formatDate(date)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-slate-700">
                            <Clock className="w-4 h-4 text-gold" />
                            <span>{time}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Booking Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-gold to-yellow-400 p-8">
                    <h2 className="text-3xl font-bold text-black mb-2">
                      Détails de réservation
                    </h2>
                    <p className="text-black/70">Remplissez les informations ci-dessous</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-8">
                    {/* Notifications */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl"
                        >
                          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <p className="text-red-700 text-sm">{error}</p>
                        </motion.div>
                      )}

                      {success && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-xl"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <p className="text-green-700 text-sm">Réservation validée ! Redirection en cours...</p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Date Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-slate-900 font-bold mb-4 text-lg">
                        <Calendar className="w-5 h-5 text-gold" />
                        Sélectionnez une date
                        <span className="text-red-500">*</span>
                      </label>
                      <DatePicker
                        selected={date}
                        onChange={(date) => setDate(date)}
                        minDate={new Date()}
                        filterDate={(date) => !isDateDisabled(date)}
                        className="w-full border-2 border-slate-200 rounded-2xl p-4 text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                        placeholderText="Choisissez une date disponible"
                        dateFormat="dd/MM/yyyy"
                        inline
                      />
                      <p className="text-sm text-slate-500 mt-3 flex items-center gap-2">
                        <Info className="w-4 h-4" />
                        Les dates fermées ne sont pas sélectionnables
                      </p>
                    </div>

                    {/* Time Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-slate-900 font-bold mb-4 text-lg">
                        <Clock className="w-5 h-5 text-gold" />
                        Choisissez votre horaire
                        <span className="text-red-500">*</span>
                      </label>

                      {!date ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                          <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-medium">Sélectionnez d'abord une date</p>
                        </div>
                      ) : loadingSlots ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl">
                          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-3" />
                          <p className="text-slate-600 font-medium">Chargement des créneaux disponibles...</p>
                        </div>
                      ) : availableSlots.length === 0 ? (
                        <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                          <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-600 font-medium mb-2">Aucun créneau disponible</p>
                          <p className="text-sm text-slate-500">Veuillez choisir une autre date</p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                          {availableSlots.map((slot) => (
                            <button
                              key={slot.time}
                              type="button"
                              onClick={() => setTime(slot.time)}
                              className={`p-4 rounded-xl font-semibold transition-all duration-300 ${
                                time === slot.time
                                  ? 'bg-gradient-to-r from-gold to-yellow-400 text-black shadow-lg scale-105'
                                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:scale-105'
                              }`}
                            >
                              {slot.time}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Customer Information */}
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <User className="w-6 h-6 text-gold" />
                        Vos informations
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Nom complet <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              placeholder="Votre nom"
                              value={customer.name}
                              onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                              className="w-full border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Email <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="email"
                              placeholder="votre@email.com"
                              value={customer.email}
                              onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                              className="w-full border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Téléphone <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="tel"
                              placeholder="+41 XX XXX XX XX"
                              value={customer.phone}
                              onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                              className="w-full border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all"
                              required
                            />
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Praticienne préférée (optionnel)
                          </label>
                          <div className="relative">
                            <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <select
                              value={customer.preferredPractitioner}
                              onChange={(e) => setCustomer({ ...customer, preferredPractitioner: e.target.value })}
                              className="w-full border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all appearance-none bg-white"
                            >
                              {practitioners.map((practitioner) => (
                                <option key={practitioner.id} value={practitioner.id}>
                                  {practitioner.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Notes ou demandes spéciales (optionnel)
                          </label>
                          <div className="relative">
                            <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                            <textarea
                              placeholder="Ajoutez des notes pour votre rendez-vous (allergies, préférences, etc.)..."
                              value={customer.notes}
                              onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                              rows={4}
                              className="w-full border-2 border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-lg focus:border-gold focus:ring-4 focus:ring-gold/20 transition-all resize-none"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      whileHover={{ scale: loading ? 1 : 1.02 }}
                      whileTap={{ scale: loading ? 1 : 0.98 }}
                      type="submit"
                      disabled={loading || success}
                      className={`w-full px-8 py-5 rounded-2xl text-xl font-bold transition-all duration-300 flex items-center justify-center gap-3 ${
                        loading || success
                          ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                          : 'bg-gradient-to-r from-gold to-yellow-400 text-black hover:shadow-2xl hover:shadow-gold/40'
                      }`}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-6 h-6 animate-spin" />
                          Vérification...
                        </>
                      ) : success ? (
                        <>
                          <CheckCircle2 className="w-6 h-6" />
                          Réservation confirmée
                        </>
                      ) : (
                        <>
                          Continuer vers le paiement
                          <ArrowRight className="w-6 h-6" />
                        </>
                      )}
                    </motion.button>

                    <p className="text-center text-sm text-slate-500">
                      En continuant, vous acceptez nos conditions générales de vente
                    </p>
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-12 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
                <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Confirmation immédiate</h4>
                  <p className="text-sm text-slate-600">Par email et SMS</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
                <Shield className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Paiement sécurisé</h4>
                  <p className="text-sm text-slate-600">Transaction cryptée</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-md">
                <MapPin className="w-8 h-8 text-gold flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-slate-900">Accès facile</h4>
                  <p className="text-sm text-slate-600">Centre de Genève</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
