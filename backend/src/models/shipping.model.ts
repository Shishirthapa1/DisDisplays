import mongoose from "mongoose";

export interface IShipping extends Document {
  //   method: string;
  cost: number;
  estimatedDays?: number;
  //   description?: string;
  //   createdAt: Date;
  //   updatedAt: Date;
}

const ShippingSchema = new mongoose.Schema<IShipping>(
  {
    // method: { type: String, required: true },
    cost: { type: Number, required: true, min: 0 },
    estimatedDays: { type: Number, default: 0 },
    // description: { type: String },
  },
  { timestamps: true }
);

export const Shipping = mongoose.model<IShipping>("Shipping", ShippingSchema);
export type ShippingDocument = mongoose.InferSchemaType<typeof ShippingSchema>;
