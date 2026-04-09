import express from "express";
import { register, login, me } from "../auth/auth.service.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, me);

export default router;