import { Request, Response } from "express";
import { Category } from "../models/category.model";
import cloudinary from "../utils/cloudinary";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, image } = req.body; // image is already a URL string

    const existing = await Category.findOne({ name });
    if (existing) {
      return res.status(400).json({ message: "Category already exists" });
    }

    // Just save the image URL directly without uploading again
    const category = await Category.create({
      name,
      description,
      image: image || "", // image URL from frontend or empty string
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: "Category created",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category", error });
  }
};

// Get All Categories
export const getCategories = async (_req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      statusCode: 200,
      categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      statusCode: 500,
      message: "Failed to fetch categories",
      error,
    });
  }
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body; // image is already a URL string

    const updated = await Category.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image: image || "", // use provided image URL or empty string
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updated) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: "Category updated",
      category: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update category", error });
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Category.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category", error });
  }
};
