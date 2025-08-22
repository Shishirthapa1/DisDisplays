import express from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
} from "../controllers/user.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);

export default router;
