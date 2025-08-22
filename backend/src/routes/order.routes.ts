// src/routes/order.routes.ts
import express from "express";
import {
  createOrder,
  getOrderById,
  getAllOrders,
  updateOrder,
} from "../controllers/order.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.post("/", createOrder);
router.put("/:orderId", protect, adminOnly, updateOrder);
router.get("/:orderId", getOrderById);
router.get("/", getAllOrders);

export default router;
