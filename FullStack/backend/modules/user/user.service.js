import pool from '../../db/Connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "lawlink_secret_key"; 

// ✅ 1. جلب التخصصات الفريدة (للفلترة في الفرونت إند)
export const getLawyerSpecializationsService = async () => {
    try {
        const [rows] = await pool.promise().query(
            `SELECT DISTINCT spec_name FROM lawyer_specializations`
        );
        return rows.map(row => row.spec_name);
    } catch (error) {
        throw new Error("خطأ في جلب التخصصات: " + error.message);
    }
};

// ✅ 2. البحث (Search) - جلب البيانات شاملة الصورة والخبرة والتوثيق والتقييم
export const searchUsersService = async (searchTerm) => {
    const term = `%${searchTerm || ''}%`;
    const [rows] = await pool.promise().query(
        `SELECT 
            u.user_id, u.name, u.email, u.role, u.gender, u.image_url, 
            l.rating_avg, l.verified, l.years_experience,
            GROUP_CONCAT(ls.spec_name) AS all_specializations 
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN lawyer_specializations ls ON l.user_id = ls.lawyer_id
         WHERE (u.name LIKE ? OR u.email LIKE ? OR u.Phone_no1 LIKE ?) 
         AND u.deleted_at IS NULL
         GROUP BY u.user_id`, 
        [term, term, term]
    );
    return rows;
};

// ✅ 3. تسجيل مستخدم جديد (Register) مع توزيع البيانات على الجداول
export const registerUserService = async (userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();
        
        // تشفير الباسورد عند التسجيل لأول مرة
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const [userResult] = await connection.query(
            `INSERT INTO users (name, role, email, password, gender, Phone_no1, image_url, Date_of_Birth) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userData.name, userData.role, userData.email, hashedPassword, userData.gender, userData.Phone_no1, userData.image_url || null, userData.Date_of_Birth]
        );
        const userId = userResult.insertId;

        // إضافة تفاصيل المحامي إذا كان الدور Lawyer
        if (userData.role === 'Lawyer') {
            await connection.query(
                `INSERT INTO lawyer (user_id, license_number, years_experience, verified) VALUES (?, ?, ?, ?)`, 
                [userId, userData.license_number, userData.years_experience || 0, userData.verified || 0]
            );
            
            if (userData.specializations && Array.isArray(userData.specializations)) {
                const specValues = userData.specializations.map(spec => [userId, spec]);
                await connection.query(`INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, [specValues]);
            }
        } else if (userData.role === 'Admin') {
            await connection.query(`INSERT INTO admin (user_id, authority_level) VALUES (?, ?)`, [userId, userData.authority_level]);
        } else if (userData.role === 'Client') {
            await connection.query(`INSERT INTO client (user_id, income_level) VALUES (?, ?)`, [userId, userData.income_level || 0]);
        }

        await connection.commit();
        return userId;
    } catch (error) { 
        await connection.rollback(); 
        throw error; 
    } finally { 
        connection.release(); 
    }
};

// ✅ 4. التحديث (Update) - يدعم تحديث الباسورد المشفر وباقي بيانات المحامي
export const updateUserService = async (userId, userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        // 💡 تحديث الباسورد: يتم تشفيره قبل التخزين لضمان نجاح تسجيل الدخول لاحقاً
        if (userData.password) {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            await connection.query(
                `UPDATE users SET password = ? WHERE user_id = ?`,
                [hashedPassword, userId]
            );
        }

        // تحديث جدول users الأساسي (الاسم، الايميل، الهاتف، رابط الصورة)
        await connection.query(
            `UPDATE users SET 
                name = IFNULL(?, name), 
                email = IFNULL(?, email),
                Phone_no1 = IFNULL(?, Phone_no1),
                image_url = IFNULL(?, image_url)
             WHERE user_id = ?`,
            [userData.name || null, userData.email || null, userData.Phone_no1 || null, userData.image_url || null, userId]
        );

        // تحديث جدول lawyer (التقييم، حالة التوثيق، سنوات الخبرة)
        await connection.query(
            `UPDATE lawyer SET 
                rating_avg = IFNULL(?, rating_avg),
                verified = IFNULL(?, verified),
                years_experience = IFNULL(?, years_experience)
             WHERE user_id = ?`,
            [userData.rating_avg || null, userData.verified !== undefined ? userData.verified : null, userData.years_experience || null, userId]
        );

        // تحديث التخصصات: حذف القديم وإضافة الجديد
        if (userData.specializations && Array.isArray(userData.specializations)) {
            await connection.query(`DELETE FROM lawyer_specializations WHERE lawyer_id = ?`, [userId]);
            const specValues = userData.specializations.map(spec => [userId, spec]);
            await connection.query(`INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, [specValues]);
        }

        await connection.commit();
        return true;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

// ✅ 5. تسجيل الدخول (Login) - التحقق من الايميل ومقارنة الباسورد الـ Hash
export const loginService = async (email, password) => {
    const [users] = await pool.promise().query(
        `SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`, 
        [email]
    );
    
    if (users.length === 0) throw new Error("الحساب غير موجود أو تم حذفه");
    
    const user = users[0];
    
    // 💡 التحقق الأمني: مقارنة النص الصريح مع الـ Hash المخزن في الداتابيز
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("كلمة المرور التي أدخلتها غير صحيحة.");

    // توليد التوكن (JWT) للصلاحيات
    const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        JWT_SECRET, 
        { expiresIn: '1d' }
    );
    
    return { 
        token, 
        user: { id: user.user_id, name: user.name, role: user.role, email: user.email } 
    };
};

// ✅ 6. الحذف المنطقي (Logical Delete)
export const deleteUserService = async (userId) => {
    try {
        await pool.promise().query(
            `UPDATE users SET deleted_at = NOW() WHERE user_id = ?`, 
            [userId]
        );
    } catch (error) {
        throw new Error("خطأ أثناء الحذف: " + error.message);
    }
};
