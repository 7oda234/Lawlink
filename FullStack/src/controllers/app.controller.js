import express from "express";

//  Import your module routers 
import authRouter from "./modules/auth/auth.controller.js";
// import userRouter from "./modules/user/user.controller.js";


export const bootstrap = () => {
  const app = express();

  // -----------------------------
  // Middlewares
  // -----------------------------
  app.use(express.json());



  // -----------------------------
  // Main Router (API Mount)
  // -----------------------------
  app.use("/auth", authRouter);

  // -----------------------------
  // 404 Handler
  // -----------------------------
  app.use((req, res) => {
    res.status(404).json({ ok: false, message: "Route not found" });
  });

  // -----------------------------
  // Error Handler
  // -----------------------------
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500).json({
      ok: false,
      message: err.message || "Server error",
    });
  });

  return app;
};