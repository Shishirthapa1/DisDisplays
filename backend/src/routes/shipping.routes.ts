import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware";
import {
  getAllShipping,
  createShipping,
  updateShipping,
  deleteShipping,
} from "../controllers/shipping.controller";
const router = express.Router();

router.get("/", getAllShipping);
router.post("/", protect, adminOnly, createShipping);
router.put("/:id", protect, adminOnly, updateShipping);
router.delete("/:id", protect, adminOnly, deleteShipping);

export default router;
