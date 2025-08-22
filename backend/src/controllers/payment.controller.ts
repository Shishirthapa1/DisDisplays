import { Request, Response } from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  throw new Error("STRIPE_SECRET_KEY environment variable is not defined.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2025-07-30.basil", // use latest stable version
});

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = "usd" } = req.body;

    if (!amount) {
      return res.status(400).json({
        success: false,
        message: "Amount is required",
      });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card"],
    });

    return res.status(201).json({
      success: true,
      message: "Payment Intent created",
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Stripe error:", error);
    return res.status(500).json({
      success: false,
      message: "Payment processing failed. Please try again.",
    });
  }
};
