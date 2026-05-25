export const register = async (userData) => {
  const { username, email, password, role } = userData;
  const cleanEmail = normalizeEmail(email);

  try {
    // 1️⃣ تشفير كلمة المرور
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 2️⃣ إدخال المستخدم في الجدول الرئيسي users
    const userSql = `INSERT INTO users (username, email, password, role, created_at) VALUES (?, ?, ?, ?, NOW())`;
    const userResult = await runQuery(userSql, [username, cleanEmail, hashedPassword, role]);
    
    const newUserId = userResult.insertId;

    // 3️⃣ 🔥 الربط التلقائي بالجداول الفرعية لمنع خطأ الـ Foreign Key
    const normalizedRole = String(role).toLowerCase().trim();

    if (normalizedRole === 'client' || normalizedRole === 'عميل') {
      const clientSql = `INSERT INTO client (user_id) VALUES (?)`;
      await runQuery(clientSql, [newUserId]);
      console.log(`✅ تم تفعيل العميل تلقائياً برقم ID: ${newUserId} في جدول client`);
    } 
    else if (normalizedRole === 'lawyer' || normalizedRole === 'محامي') {
      const lawyerSql = `INSERT INTO lawyer (user_id) VALUES (?)`;
      await runQuery(lawyerSql, [newUserId]);
      console.log(`✅ تم تفعيل المحامي تلقائياً برقم ID: ${newUserId} في جدول lawyer`);
    }

    // [ملاحظة]: لو عندك أدوار تانية زي الـ admin أو الـ authority اللي كانت موجودة في كودك القديم، سيبها زي ما هي هنا

    return { 
      ok: true, 
      userId: newUserId, 
      message: "تم تسجيل الحساب بنجاح في سيستم LawLink ⚖️ وتفعيله تلقائياً!" 
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