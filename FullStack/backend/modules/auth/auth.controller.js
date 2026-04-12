import express from "express";
import * as authService from "./auth.service.js";

const authRouter = express.Router();

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);

    if (!result.ok) {
      return res.status(401).json({ ok: false, message: result.message });
    }

    return res.status(200).json({ 
      ok: true, 
      token: result.token, 
      role: result.role, 
      user: result.user 
    });
  } catch (err) {
    next(err);
  }
});

// ✅ السطر ده هو اللي هيحل مشكلة الـ "argument handler must be a function"
export default authRouter;