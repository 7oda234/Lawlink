import { Router } from "express";
import { handleChat } from "./ai_tools.controller.js"; // افصل منطق الـ AI هنا
import { verifyToken } from "../../middleware/authMiddleware.js";

const aiRouter = Router();
aiRouter.post("/chat", verifyToken, handleChat);

export default aiRouter;