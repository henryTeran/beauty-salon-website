import { useCart } from "../context/CartContext";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const stripePromise = loadStripe("pk_test_51R1db7FMBmNofPohDc4SoHISZIpztqsowxCwhJy2TQeB6MxBBHXKOpEUJhkJFxi6U4Nq8GlIrCVpIBzfB94wHAkd00YkpIw1Dc");

function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
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
    <form onSubmit={handleSubmit} className="bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-gold mb-4">Paiement sécurisé</h2>
      <p className="text-lg mb-4">Montant total : <strong>{totalAmount} CHF</strong></p>

      <CardElement className="border rounded-lg p-2" />
      {error && <p className="text-red-500 mt-2">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-gold text-white px-4 py-2 rounded-full hover:bg-dark transition duration-300"
      >
        {loading ? "Paiement en cours..." : "Payer"}
      </button>
    </form>
  );
}

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <div className="container mx-auto p-6">
        <CheckoutForm />
      </div>
    </Elements>
  );
}
