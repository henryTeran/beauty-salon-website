require("dotenv").config();
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log("Clé API Stripe utilisée :", process.env.STRIPE_SECRET_KEY);


const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  try {
    const { amount } = req.body;
    console.log("Montant reçu :", amount);

    if (amount < 1) {
      return res.status(400).json({ error: "Le montant doit être supérieur à 0." });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convertir en centimes
      currency: "chf",
      payment_method_types: ["card"],
    });

    console.log("Client Secret généré :", paymentIntent.client_secret);

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Erreur Stripe Backend :", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Serveur Stripe lancé sur le port ${PORT}`));
