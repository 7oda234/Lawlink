import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/Connection.js";

const JWT_SECRET = "lawlink_secret_key";

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// ------------------------------------
// 📝 REGISTER
// ------------------------------------
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, Phone_no1, gender, Date_of_Birth, specialization, license_number } = req.body;
    const hashedPassword = await bcrypt.hash(String(password), 10);

    const userRes = await runQuery(
      `INSERT INTO users (name, role, email, password, gender, Phone_no1, Date_of_Birth) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, role || 'Lawyer', normalizeEmail(email), hashedPassword, gender || 'ذكر', Phone_no1, Date_of_Birth]
    );

    const userId = userRes.insertId;

    if (role?.toLowerCase() === 'lawyer') {
      await runQuery(
        `UPDATE lawyer SET specialization = ?, license_number = ? WHERE user_id = ?`,
        [specialization, license_number, userId]
      );
    }

    return res.status(201).json({ ok: true, message: "User registered successfully" });
  } catch (err) {
    return next(err);
  }
};

// ------------------------------------
// 🔐 LOGIN
// ------------------------------------
export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = normalizeEmail(email);

    const users = await runQuery("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    if (!users.length) return res.status(401).json({ ok: false, message: "بيانات الدخول غير صحيحة" });

    const userRow = users[0];
    const isMatch = await bcrypt.compare(String(password), userRow.password);
    if (!isMatch) return res.status(401).json({ ok: false, message: "بيانات الدخول غير صحيحة" });

    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.rating_avg, l.verified
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      WHERE u.user_id = ?`, [userRow.user_id]);

    const token = jwt.sign({ id: userRow.user_id, role: userRow.role }, JWT_SECRET, { expiresIn: "7d" });

    return res.status(200).json({ ok: true, token, data: { user: fullProfile[0] } });
  } catch (err) {
    return next(err);
  }
};

// ------------------------------------
// ✅ ME (الدالة اللي كانت ناقصة وعاملة Error)
// ------------------------------------
export const me = async (req, res, next) => {
  try {
    // req.user بييجي من الـ Middleware بتاع الـ Protect/Auth
    const userId = req.user.id; 

    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.rating_avg, l.verified
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      WHERE u.user_id = ?`, [userId]);

    if (!fullProfile.length) return res.status(404).json({ ok: false, message: "User not found" });

    return res.status(200).json({ ok: true, data: { user: fullProfile[0] } });
  } catch (err) {
    return next(err);
  }
};
