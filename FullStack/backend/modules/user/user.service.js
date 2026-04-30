import pool from '../../db/Connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "lawlink_secret_key"; 

// ✅ 1. جلب التخصصات الفريدة (قديم)
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

// ✅ 2. البحث (Search - قديم)
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

// ✅ 3. تسجيل مستخدم جديد (معدل لتجنب التعارض مع الـ Trigger)
export const registerUserService = async (userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // 1. الإدخال في جدول users (الـ Trigger هيشتغل هنا وينشئ صف فارغ في lawyer أو client)
        const [userResult] = await connection.query(
            `INSERT INTO users (name, role, email, password, gender, Phone_no1, Phone_no2, image_url, Date_of_Birth) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userData.name, userData.role, userData.email, hashedPassword, userData.gender, userData.Phone_no1, userData.Phone_no2 || null, userData.image_url || null, userData.Date_of_Birth]
        );
        const userId = userResult.insertId;

        // 2. استخدام UPDATE بدلاً من INSERT لتحديث البيانات الإضافية في الصف اللي أنشأه الـ Trigger
        if (userData.role === 'Lawyer') {
            await connection.query(
                `UPDATE lawyer SET license_number = ?, years_experience = ?, verified = ? WHERE user_id = ?`, 
                [userData.license_number, userData.years_experience || 0, userData.verified || 0, userId]
            );
            if (userData.specializations && Array.isArray(userData.specializations)) {
                const specValues = userData.specializations.map(spec => [userId, spec]);
                await connection.query(`INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, [specValues]);
            }
        } else if (userData.role === 'Admin') {
            await connection.query(`UPDATE admin SET authority_level = ? WHERE user_id = ?`, [userData.authority_level, userId]);
        } else if (userData.role === 'Client') {
            // التعديل هنا: UPDATE للموكل عشان ما يضربش مع الـ Trigger
            await connection.query(`UPDATE client SET income_level = ? WHERE user_id = ?`, [userData.income_level || 0, userId]);
        }

        await connection.commit();
        return userId;
    } catch (error) { 
        await connection.rollback(); 
        console.error("Database Error during registration:", error); 
        throw error; 
    } finally { 
        connection.release(); 
    }
};

// ✅ 4. التحديث الشامل (تمت إضافة الهواتف المستقلة، الصور، التخصصات، ودخل العميل)
export const updateUserService = async (userId, userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        // أ. تحديث الباسورد إذا تم إرساله
        if (userData.password && userData.password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            await connection.query(`UPDATE users SET password = ? WHERE user_id = ?`, [hashedPassword, userId]);
        }

        // ب. تحديث جدول users (دعم الهواتف والصورة والبيانات الأساسية)
        await connection.query(
            `UPDATE users SET 
                name = COALESCE(?, name), 
                email = COALESCE(?, email), 
                Phone_no1 = ?, 
                Phone_no2 = ?, 
                gender = COALESCE(?, gender),
                Date_of_Birth = COALESCE(?, Date_of_Birth),
                image_url = COALESCE(?, image_url)
             WHERE user_id = ?`,
            [
                userData.name || null, 
                userData.email || null, 
                userData.Phone_no1, 
                userData.Phone_no2, 
                userData.gender || null,
                userData.Date_of_Birth || null,
                userData.image_url || null, 
                userId
            ]
        );

        // ج. تحديث بيانات المحامي (الرخصة والخبرة)
        await connection.query(
            `UPDATE lawyer SET 
                license_number = COALESCE(?, license_number),
                years_experience = COALESCE(?, years_experience)
             WHERE user_id = ?`,
            [userData.license_number || null, userData.years_experience || null, userId]
        );

        // د. تحديث بيانات العميل (الدخل)
        if (userData.income_level !== undefined) {
            await connection.query(
                `UPDATE client SET income_level = ? WHERE user_id = ?`,
                [userData.income_level, userId]
            );
        }

        // هـ. تحديث التخصصات (حذف القديم وإضافة الجديد في spec_name)
        if (userData.specializations !== undefined) {
            await connection.query(`DELETE FROM lawyer_specializations WHERE lawyer_id = ?`, [userId]);
            
            let specsArray = [];
            if (Array.isArray(userData.specializations)) {
                specsArray = userData.specializations;
            } else if (typeof userData.specializations === 'string') {
                specsArray = userData.specializations.split(/,|و|،/).map(s => s.trim()).filter(s => s !== "");
            }

            if (specsArray.length > 0) {
                const specValues = specsArray.map(spec => [userId, spec]);
                await connection.query(`INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, [specValues]);
            }
        }

        await connection.commit();
        return true;
    } catch (error) { await connection.rollback(); throw error; } finally { connection.release(); }
};

// ✅ 5. تسجيل الدخول (Login)
export const loginService = async (email, password) => {
    const [users] = await pool.promise().query(`SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`, [email]);
    if (users.length === 0) throw new Error("الحساب غير موجود");
    
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("كلمة المرور غير صحيحة.");
    
    const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    
    return { 
        token, 
        user: { 
            id: user.user_id, 
            name: user.name, 
            role: user.role, 
            email: user.email, 
            image_url: user.image_url 
        } 
    };
};

// ✅ 6. جلب بيانات البروفايل الكاملة (محدثة لتشمل كل البيانات لكل الأدوار)
export const getUserProfileService = async (userId) => {
    const [rows] = await pool.promise().query(
        `SELECT 
            u.user_id, u.name, u.email, u.image_url, u.Phone_no1, u.Phone_no2, u.gender, u.Date_of_Birth, u.role,
            l.license_number, l.rating_avg, l.verified, l.years_experience,
            c.income_level,
            GROUP_CONCAT(ls.spec_name SEPARATOR ' و ') AS specialization 
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN client c ON u.user_id = c.user_id
         LEFT JOIN lawyer_specializations ls ON l.user_id = ls.lawyer_id
         WHERE u.user_id = ?
         GROUP BY u.user_id`, 
        [userId]
    );
    if (rows.length === 0) throw new Error("المستخدم غير موجود");
    return rows[0];
};

// ✅ 7. الحذف المنطقي (Logic Delete)
export const deleteUserService = async (userId) => {
    try {
        await pool.promise().query(`UPDATE users SET deleted_at = NOW() WHERE user_id = ?`, [userId]);
    } catch (error) { 
        throw new Error("خطأ أثناء الحذف: " + error.message); 
    }
};
