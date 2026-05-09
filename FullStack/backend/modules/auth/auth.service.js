import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/Connection.js"; // مسار الاتصال بقاعدة البيانات

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
    const cleanEmail = normalizeEmail(email); // بننظف الإيميل الأول

    // بنروح ندور في جدول users على حد عنده الإيميل ده
    const users = await runQuery(
      "SELECT * FROM users WHERE email = ? LIMIT 1", 
      [cleanEmail]
    );
    
    if (!users.length) {
      return { ok: false, message: "عفواً، هذا البريد الإلكتروني غير مسجل لدينا." }; // لو ملقيناش حد
    }

    const userRow = users[0];
    const isMatch = await bcrypt.compare(String(password), userRow.password); // بنفك شفرة الباسورد ونشوفه صح ولا لاء
    if (!isMatch) return { ok: false, message: "كلمة المرور غير صحيحة." };

    // بنعمل "أمارة" (Token) للمستخدم عشان يفضل فاتح حسابه 7 أيام
    const token = jwt.sign({ id: userRow.user_id, role: userRow.role }, JWT_SECRET, { expiresIn: "7d" });
    
    return { 
      ok: true, 
      token, 
      user: { id: userRow.user_id, name: userRow.name, role: userRow.role } 
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
    const { name, email, password, role, Phone_no1, gender, Date_of_Birth, authority_level, image_url } = userData;
    const cleanEmail = normalizeEmail(email);

    // تشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(String(password), 10);

    // الإدخال في جدول users (الـ Trigger في SQL هيكريت باقي الجداول تلقائياً)
    const sqlInsert = `
      INSERT INTO users (name, role, email, password, gender, Phone_no1, Date_of_Birth, image_url) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    // إرسال الـ image_url للداتابيز وقت التسجيل
    const result = await runQuery(sqlInsert, [
      name, 
      role, 
      cleanEmail, 
      hashedPassword, 
      gender, 
      Phone_no1, 
      Date_of_Birth, 
      image_url || null
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
    // ✅ تم التعديل هنا: نستخدم n.receiver_id بدلاً من n.user_id عشان يطابق الجدول الجديد
    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth, u.image_url, 
            l.license_number, l.rating_avg, l.verified, l.years_experience,
            a.authority_level,
            (SELECT COUNT(*) FROM notification n WHERE n.receiver_id = u.user_id AND n.is_read = 0) AS unread_notifications
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      LEFT JOIN admin a ON u.user_id = a.user_id
      WHERE u.user_id = ?`, [userId]);

    return fullProfile.length > 0 ? fullProfile[0] : null; // لو لقيته هاته، ملقيتوش ارجع بإيدك فاضية
  } catch (err) {
    console.error("❌ GetMe Service Error:", err);
    throw err;
  }
};
