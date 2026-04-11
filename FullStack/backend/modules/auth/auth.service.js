import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/Connection.js";

// مفتاح التشفير (تأكد إنه مطابق للي في الـ Middleware)
const JWT_SECRET = "lawlink_secret_key";

/**
 * 🛠️ دالة مساعدة لتوحيد شكل البريد الإلكتروني
 */
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

/**
 * 🛠️ دالة مساعدة لتنفيذ الاستعلامات بنظام الـ Promise
 */
const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// ------------------------------------
// 📝 تسجيل مستخدم جديد - REGISTER
// ------------------------------------
export const register = async (req, res, next) => {
  try {
    const { name, email, password, role, Phone_no1, gender, Date_of_Birth, specialization, license_number } = req.body;
    
    // تشفير كلمة المرور بـ 10 rounds
    const hashedPassword = await bcrypt.hash(String(password), 10);

    // 1. الإدخال في جدول المستخدمين الأساسي
    const userRes = await runQuery(
      `INSERT INTO users (name, role, email, password, gender, Phone_no1, Date_of_Birth) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, role || 'Client', normalizeEmail(email), hashedPassword, gender || 'ذكر', Phone_no1, Date_of_Birth]
    );

    const userId = userRes.insertId;

    // 2. لو المستخدم محامي، بنحدث بياناته في جدول الـ lawyer المربوط بـ user_id
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
// 🔐 تسجيل الدخول - LOGIN (النسخة النهائية)
// ------------------------------------
export const login = async (req, res, next) => {
  try {
    let { email, password, role } = req.body; 
    email = normalizeEmail(email);

    // 💡 التحقق المزدوج: الإيميل + الـ Role مع توحيد حالة الحروف (LOWER)
    // ده بيضمن إن المحامي ميدخلش من بوابة العميل حتى لو الإيميل صح
    const users = await runQuery(
      "SELECT * FROM users WHERE email = ? AND LOWER(role) = LOWER(?) LIMIT 1", 
      [email, role]
    );
    
    if (!users.length) {
      return res.status(401).json({ 
        ok: false, 
        message: `بيانات الدخول غير صحيحة أو هذا الحساب غير مسجل كـ ${role === 'Lawyer' ? 'محامي' : 'عميل'}` 
      });
    }

    const userRow = users[0];

    // التحقق من صحة كلمة المرور المشفرة
    const isMatch = await bcrypt.compare(String(password), userRow.password);
    if (!isMatch) return res.status(401).json({ ok: false, message: "بيانات الدخول غير صحيحة" });

    // جلب البروفايل كامل من الجداول المرتبطة (Polyglot Persistence)
    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.rating_avg, l.verified
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      WHERE u.user_id = ?`, [userRow.user_id]);

    // إنشاء توكن JWT يحتوي على الـ ID والـ Role
    const token = jwt.sign(
      { id: userRow.user_id, role: userRow.role }, 
      JWT_SECRET, 
      { expiresIn: "7d" }
    );

    // إرسال الرد النهائي شامل الـ Role الحقيقي من الداتابيز
    return res.status(200).json({ 
      ok: true, 
      token, 
      role: userRow.role, 
      user: fullProfile[0] 
    });

  } catch (err) {
    return next(err);
  }
};

// ------------------------------------
// ✅ جلب بيانات المستخدم الحالي - ME
// ------------------------------------
export const me = async (req, res, next) => {
  try {
    // req.user بييجي من الـ authMiddleware
    const userId = req.user.id; 

    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.rating_avg, l.verified
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      WHERE u.user_id = ?`, [userId]);

    if (!fullProfile.length) return res.status(404).json({ ok: false, message: "User not found" });

    return res.status(200).json({ ok: true, user: fullProfile[0] });
  } catch (err) {
    return next(err);
  }
};

// ------------------------------------
// 🔄 تحديث بيانات البروفايل - UPDATE PROFILE
// ------------------------------------
export const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name, Phone_no1, specialization } = req.body;

    // تحديث البيانات في جدول الـ users
    await runQuery(
      `UPDATE users SET name = ?, Phone_no1 = ? WHERE user_id = ?`,
      [name, Phone_no1, userId]
    );

    // تحديث بيانات التخصص لو كان المستخدم محامي
    if (req.user.role?.toLowerCase() === 'lawyer') {
      await runQuery(
        `UPDATE lawyer SET specialization = ? WHERE user_id = ?`,
        [specialization, userId]
      );
    }

    return res.status(200).json({ ok: true, message: "Profile updated successfully" });
  } catch (err) {
    return next(err);
  }
};

// ------------------------------------
// 🚪 تسجيل الخروج - LOGOUT
// ------------------------------------
export const logout = async (req, res) => {
  // في نظام JWT، الخروج الحقيقي بيتم في الـ Frontend بمسح الـ Token
  return res.status(200).json({ ok: true, message: "Logged out successfully" });
};