import express from "express";
import { login, register, profile, logout, changePassword, forgotPassword, resetPassword } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/login", login);
router.post("/register", register);
router.get("/profile", protect, profile);
router.post("/logout", protect, logout);
router.put("/change-password", protect, changePassword);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;