import express from "express";
import {
  getAllUsers,
  registerUser,
  loginUser,
  getUserById,
  sendVerificationEmail,
  verifyOtp,
  changePassword,
} from "../controllers/user.controller";
import { adminOnly, protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", protect, adminOnly, getUserById);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/send-email", protect, adminOnly, sendVerificationEmail);
router.post("/verify-otp", protect, adminOnly, verifyOtp);
router.post("/change-password", protect, adminOnly, changePassword);

export default router;
