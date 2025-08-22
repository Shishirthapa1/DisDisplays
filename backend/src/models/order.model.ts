// src/models/Order.ts
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      fullname: { type: String, required: true, trim: true },
      email: { type: String, required: true, lowercase: true },
      phoneNumber: { type: String, required: true },
    },
    shippingAddress: {
      street: { type: String, required: true, trim: true },
      addressLine: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
