import { Request, Response } from "express";
import { Shipping } from "../models/shipping.model";

// Get all shipping options
export const getAllShipping = async (_req: Request, res: Response) => {
  try {
    const shippings = await Shipping.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      shippings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch shipping options",
      error,
    });
  }
};

// Create a new shipping option
export const createShipping = async (req: Request, res: Response) => {
  try {
    const { cost, estimatedDays } = req.body;
    const newShipping = await Shipping.create({ cost, estimatedDays });
    res.status(201).json({
      success: true,
      statusCode: 201,
      shipping: newShipping,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to create shipping option",
      error,
    });
  }
};

// Update a shipping option
export const updateShipping = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { cost, estimatedDays } = req.body;

    const updatedShipping = await Shipping.findByIdAndUpdate(
      id,
      { cost, estimatedDays },
      { new: true }
    );

    if (!updatedShipping) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Shipping option not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      shipping: updatedShipping,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update shipping option",
      error,
    });
  }
};

// Delete a shipping option
export const deleteShipping = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedShipping = await Shipping.findByIdAndDelete(id);

    if (!deletedShipping) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Shipping option not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Shipping option deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete shipping option",
      error,
    });
  }
};
