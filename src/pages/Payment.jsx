import { useCart } from "../context/CartContext";
import { useBooking } from "../context/BookingContext";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { CreditCard, Lock, Shield, Calendar, Clock, User } from 'lucide-react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const { bookingData, clearBookingData } = useBooking();
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const hasBookingData = bookingData.date && bookingData.time && bookingData.customer.name;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const totalAmount = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  useEffect(() => {
    if (totalAmount > 0) {
      axios.post("http://localhost:4000/create-payment-intent", { amount: totalAmount })
        .then((res) => setClientSecret(res.data.clientSecret))
        .catch((err) => console.error("Erreur Stripe :", err));
    }
  }, [totalAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    console.log("Client Secret : ", clientSecret);
    console.log("Stripe instance : ", stripe);
    console.log("Elements instance : ", elements);

    if (!stripe || !elements || !clientSecret) {
      setError("Erreur avec Stripe.");
      setLoading(false);
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log("Card Element : ", cardElement);
    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: { name: "Client" },
      },
    });

    if (error) {
        console.error("Erreur Stripe :", error);
      setError(error.message);
      setLoading(false);
    } else {
      console.log("Paiement réussi :", paymentIntent);

      // Enregistrer dans Firestore
      await addDoc(collection(db, "reservations"), {
        services: cart.map((item) => ({ id: item.id, title: item.title, price: item.price })),
        total: totalAmount,
        createdAt: serverTimestamp(),
        status: "payé",
      });

      clearCart();
      navigate("/success");
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-2xl p-8 rounded-3xl max-w-2xl mx-auto"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-gold to-yellow-400 text-black px-6 py-3 rounded-full mb-4">
          <Shield className="w-6 h-6" />
          <h2 className="text-2xl font-bold">{t('payment.secure_payment')}</h2>
        </div>
        <p className="text-2xl text-gray-700">
          {t('payment.total_amount')} : <strong className="text-gold">{totalAmount} CHF</strong>
        </p>
      </div>

      <div className="mb-6">
        <div className="border-2 border-gray-200 rounded-xl p-4 focus-within:border-gold transition-colors">
          <CardElement 
            options={{
              style: {
                base: {
                  fontSize: '18px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
              },
            }}
          />
        </div>
        {error && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-3 text-center font-medium"
          >
            {error}
          </motion.p>
        )}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-gradient-to-r from-gold to-yellow-400 text-black px-8 py-4 rounded-xl text-xl font-bold hover:shadow-2xl hover:shadow-gold/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        <CreditCard className="w-6 h-6" />
        {loading ? t('payment.processing') : t('payment.pay')}
      </motion.button>
      
      <div className="flex items-center justify-center gap-2 mt-6 text-gray-500">
        <Lock className="w-4 h-4" />
        <span className="text-sm">Paiement 100% sécurisé avec Stripe</span>
      </div>
    </motion.form>
  );
}

export default function Payment() {
  const { t } = useTranslation();

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
            {t('payment.secure_payment')}
          </h1>
        </motion.div>
        
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
