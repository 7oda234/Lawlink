import express from "express";
import { registerController, loginController, getMeController } from "./auth.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// مسارات التحقق
router.post("/register", registerController);
router.post("/login", loginController);
router.get("/me", authMiddleware, getMeController);

export default router;
