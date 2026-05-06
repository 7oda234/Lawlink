import * as authService from "./auth.service.js";

export const loginController = async (req, res, next) => {
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
};

export const registerController = async (req, res, next) => {
  try {
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
};

export const getMeController = async (req, res, next) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ ok: false, message: "Unauthorized" });
    }

    const result = await authService.getMe(userId);

    if (!result.ok) {
      return res.status(404).json({ ok: false, message: result.message });
    }

    return res.status(200).json({ ok: true, user: result.user });
  } catch (err) {
    next(err);
  }
};
