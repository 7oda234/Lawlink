
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/Connection.js";

const JWT_SECRET = "lawlink_secret_key";

// ------------------------------------
// Helpers
// ------------------------------------

export const normalizeEmail = (email) =>
  String(email || "").trim().toLowerCase();

export const sanitizeUser = (row) => {
  if (!row) return null;

  return {
    id: row.id,
    fullName: row.full_name,
    email: row.email,
    phone: row.phone,
    isActive: !!row.is_active,
    createdAt: row.created_at,
  };
};

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });


// ------------------------------------
// REGISTER
// POST /auth/register
// ------------------------------------

export const register = async (req, res, next) => {
  try {
    let { fullName, email, password, phone } = req.body;

    fullName = String(fullName || "").trim();
    email = normalizeEmail(email);
    password = String(password || "");
    phone = phone ? String(phone).trim() : null;

    if (!fullName || fullName.length < 2) {
      return res.status(400).json({
        ok: false,
        message: "Full name is required.",
      });
    }

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        ok: false,
        message: "Valid email is required.",
      });
    }

    if (!password || password.length < 6) {
      return res.status(400).json({
        ok: false,
        message: "Password must be at least 6 characters.",
      });
    }

    // Check if email exists
    const existing = await runQuery(
      "SELECT id FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (existing.length) {
      return res.status(409).json({
        ok: false,
        message: "Email already exists.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertRes = await runQuery(
      `INSERT INTO users (full_name, email, password, phone)
      VALUES (?, ?, ?, ?)`,
      [fullName, email, hashedPassword, phone]
    );

    const userRows = await runQuery(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [insertRes.insertId]
    );

    const user = sanitizeUser(userRows[0]);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      ok: true,
      message: "Registered successfully",
      token,
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};


// ------------------------------------
// LOGIN
// POST /auth/login
// ------------------------------------

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = normalizeEmail(email);
    password = String(password || "");

    if (!email || !email.includes("@")) {
      return res.status(400).json({
        ok: false,
        message: "Valid email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        ok: false,
        message: "Password is required",
      });
    }

    const rows = await runQuery(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (!rows.length) {
      return res.status(401).json({
        ok: false,
        message: "Invalid email or password",
      });
    }

    const userRow = rows[0];

    if (!userRow.is_active) {
      return res.status(403).json({
        ok: false,
        message: "Account is disabled",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userRow.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        ok: false,
        message: "Invalid email or password",
      });
    }

    const user = sanitizeUser(userRow);

    const token = jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      ok: true,
      message: "Logged in successfully",
      token,
      data: { user },
    });
  } catch (err) {
    return next(err);
  }
};


// ------------------------------------
// ME
// GET /auth/me
// ------------------------------------

export const me = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const rows = await runQuery(
      "SELECT * FROM users WHERE id = ? LIMIT 1",
      [userId]
    );

    if (!rows.length) {
      return res.status(404).json({
        ok: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      ok: true,
      data: {
        user: sanitizeUser(rows[0]),
      },
    });
  } catch (err) {
    return next(err);
  }
};
