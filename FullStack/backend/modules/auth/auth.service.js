import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/Connection.js"; // تأكد أن المسار يوجه لمجلد الاتصال بقاعدة البيانات

const JWT_SECRET = process.env.JWT_SECRET || "lawlink_secret_key";

/**
 * دالة مساعدة لتنفيذ الاستعلامات بشكل Async/Await
 */
const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

/**
 * تنظيف الإيميل وتحويله لصيغة موحدة
 */
const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

// ---------------------------------------------------------
// 🔐 1. دالة تسجيل الدخول - LOGIN
// ---------------------------------------------------------
export const login = async (email, password) => {
  try {
    const cleanEmail = normalizeEmail(email);

    // البحث في جدول users
    const users = await runQuery(
      "SELECT * FROM users WHERE email = ? LIMIT 1", 
      [cleanEmail]
    );
    
    if (!users.length) {
      return { ok: false, message: "عفواً، هذا البريد الإلكتروني غير مسجل لدينا." };
    }

    const userRow = users[0];

    // التحقق من كلمة المرور المشفرة
    const isMatch = await bcrypt.compare(String(password), userRow.password);
    if (!isMatch) {
      return { ok: false, message: "كلمة المرور التي أدخلتها غير صحيحة." };
    }

    // جلب البروفايل كامل مع الربط (JOIN) بناءً على الدور
    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.rating_avg, l.verified,
             a.authority_level
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      LEFT JOIN admin a ON u.user_id = a.user_id
      WHERE u.user_id = ?`, [userRow.user_id]);

    // إنشاء توكن الدخول
    const token = jwt.sign(
      { id: userRow.user_id, role: userRow.role }, 
      JWT_SECRET, 
      { expiresIn: "7d" }
    );

    return { 
      ok: true, 
      token, 
      role: userRow.role, 
      user: fullProfile[0] 
    };

  } catch (err) {
    console.error("❌ Login Service Error:", err);
    throw err;
  }
};

// ---------------------------------------------------------
// 📝 2. دالة تسجيل مستخدم جديد - REGISTER
// ---------------------------------------------------------
export const register = async (userData) => {
  try {
    const { name, email, password, role, Phone_no1, gender, Date_of_Birth, authority_level } = userData;
    const cleanEmail = normalizeEmail(email);

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(String(password), 10);

    // الإدخال في جدول users
    // 💡 ملاحظة: الـ Trigger 'after_user_insert' في SQL هيقوم بإنشاء سجل في جدول (admin/lawyer/client) تلقائياً
    const sqlInsert = `
      INSERT INTO users (name, role, email, password, gender, Phone_no1, Date_of_Birth) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    
    const result = await runQuery(sqlInsert, [
      name, 
      role, 
      cleanEmail, 
      hashedPassword, 
      gender, 
      Phone_no1, 
      Date_of_Birth
    ]);

    const newUserId = result.insertId;

    // تحديث البيانات الإضافية للـ Admin (مثل SuperAdmin) لو تم إرسالها
    if (role === 'Admin' && authority_level) {
      await runQuery(
        "UPDATE admin SET authority_level = ? WHERE user_id = ?", 
        [authority_level, newUserId]
      );
    }

    return { 
      ok: true, 
      userId: newUserId, 
      message: "تم تسجيل الحساب بنجاح في سيستم LawLink ⚖️" 
    };

  } catch (err) {
    // التعامل مع خطأ تكرار الإيميل
    if (err.code === 'ER_DUP_ENTRY') {
      return { ok: false, message: "هذا البريد الإلكتروني مسجل بالفعل، جرب إيميل آخر." };
    }
    console.error("❌ Register Service Error:", err);
    throw err;
  }
};

// ---------------------------------------------------------
// 👤 3. دالة التحقق من المستخدم الحالي - GET ME
// ---------------------------------------------------------
export const getMe = async (userId) => {
  try {
    const profile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.verified,
             a.authority_level
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      LEFT JOIN admin a ON u.user_id = a.user_id
      WHERE u.user_id = ?`, [userId]);

    if (!profile.length) return { ok: false, message: "المستخدم غير موجود." };

    return { ok: true, user: profile[0] };
  } catch (err) {
    throw err;
  }
};