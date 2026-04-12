import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../../db/Connection.js"; // تأكد من صحة مسار الاتصال بقاعدة البيانات

const JWT_SECRET = "lawlink_secret_key";

const normalizeEmail = (email) => String(email || "").trim().toLowerCase();

const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    db.query(sql, params, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });

// 🔐 دالة تسجيل الدخول - LOGIN
export const login = async (email, password) => {
  try {
    const cleanEmail = normalizeEmail(email);

    // البحث بالإيميل فقط لفتح المجال لكل الأدوار
    const users = await runQuery(
      "SELECT * FROM users WHERE email = ? LIMIT 1", 
      [cleanEmail]
    );
    
    if (!users.length) {
      return { ok: false, message: "عفواً، هذا البريد الإلكتروني غير مسجل لدينا." };
    }

    const userRow = users[0];

    // التحقق من كلمة المرور
    const isMatch = await bcrypt.compare(String(password), userRow.password);
    if (!isMatch) {
      return { ok: false, message: "كلمة المرور التي أدخلتها غير صحيحة." };
    }

    // جلب البروفايل كامل
    const fullProfile = await runQuery(`
      SELECT u.user_id, u.name, u.role, u.email, u.gender, u.Phone_no1, u.Date_of_Birth,
             l.specialization, l.license_number, l.rating_avg, l.verified
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      WHERE u.user_id = ?`, [userRow.user_id]);

    const token = jwt.sign(
      { id: userRow.user_id, role: userRow.role }, 
      JWT_SECRET, 
      { expiresIn: "7d" }
    );

    return { 
      ok: true, 
      token, 
      role: userRow.role, //
      user: fullProfile[0] 
    };

  } catch (err) {
    throw err;
  }
};

// يمكنك إضافة باقي الدوال (register, me) هنا بنفس النمط