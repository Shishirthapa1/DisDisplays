// src/controllers/product.controller.ts
import { Request, Response } from "express";
import { Product } from "../models/product.model";

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      name,
      price,
      description,
      image,
      stock,
      category,
      discount,
      productType,
    } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      image: image || "",
      stock: stock ?? 0,
      category,
      productType,
      discount: discount ?? 0,
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Product created",
      product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create product",
      error,
    });
  }
};

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find()
      .populate("category")
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch products",
      error,
    });
  }
};

// Get Single Product by ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate("category");

    if (!product) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Error getting product",
      error,
    });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      price,
      description,
      image,
      stock,
      category,
      discount,
      productType,
    } = req.body;

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        image: image || "",
        stock,
        category,
        productType,
        discount,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product updated",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to update product",
      error,
    });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to delete product",
      error,
    });
  }
};
