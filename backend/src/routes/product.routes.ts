import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
} from "../controllers/product.controller";
import { protect, adminOnly } from "../middlewares/auth.middleware";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/category/:categoryId", getProductsByCategory);
router.get("/:productId", getProductById);

// Protected (admin only)
router.post("/", protect, adminOnly, createProduct);
router.put("/:id", protect, adminOnly, updateProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
