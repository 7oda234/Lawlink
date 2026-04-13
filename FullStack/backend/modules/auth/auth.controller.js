import express from "express";
import * as authService from "./auth.service.js";

const authRouter = express.Router();

// ------------------------------------
// 🔐 تسجيل الدخول - LOGIN
// ------------------------------------
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

// ------------------------------------
// 📝 تسجيل مستخدم جديد (Admin/Lawyer/Client) - REGISTER
// ------------------------------------
authRouter.post("/register", async (req, res, next) => {
  try {
    // إرسال البيانات للـ Service للتعامل مع الـ SQL
    const result = await authService.register(req.body);

    if (!result.ok) {
      return res.status(400).json({ ok: false, message: result.message });
    }

    return res.status(201).json({ 
      ok: true, 
      message: "تم تسجيل المستخدم بنجاح في سيستم LawLink ⚖️",
      userId: result.userId
    });
  } catch (err) {
    next(err);
  }
});

export default authRouter;