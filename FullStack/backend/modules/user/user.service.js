import pool from '../../db/Connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "lawlink_secret_key"; 

// دالة الـ runQuery
const runQuery = (sql, params = []) =>
  new Promise((resolve, reject) => {
    pool.query(sql, params, (err, result) => {
      if (err) return reject(err); 
      resolve(result); 
    });
  });

// ✅ 1. جلب التخصصات الفريدة
export const getLawyerSpecializationsService = async () => {
    try {
        const rows = await runQuery(`SELECT DISTINCT spec_name FROM lawyer_specializations`);
        return rows.map(row => row.spec_name);
    } catch (error) {
        throw new Error("خطأ في جلب التخصصات: " + error.message);
    }
};

// ✅ رفع صورة البروفايل
export const updateProfilePictureService = async (userId, imageUrl) => {
    try {
        await runQuery(`UPDATE users SET image_url = ? WHERE user_id = ?`, [imageUrl, userId]);
        return true;
    } catch (error) {
        throw new Error("خطأ في تحديث صورة البروفايل: " + error.message);
    }
};

// ✅ 2. البحث (Search)
export const searchUsersService = async (searchTerm) => {
    const term = `%${searchTerm || ''}%`;
    const [rows] = await pool.promise().query(
        `SELECT 
            u.user_id, u.name, u.email, u.role, u.gender, u.image_url, 
            l.rating_avg, l.verified, l.years_experience,
            lo.office_address,
            GROUP_CONCAT(ls.spec_name) AS all_specializations 
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN lawyer_office lo ON u.user_id = lo.lawyer_id
         LEFT JOIN lawyer_specializations ls ON u.user_id = ls.lawyer_id
         WHERE (u.name LIKE ? OR u.email LIKE ? OR u.Phone_no1 LIKE ?) 
         AND u.deleted_at IS NULL
         GROUP BY u.user_id, lo.office_address`, 
        [term, term, term]
    );
    return rows;
};

// ✅ 3. تسجيل مستخدم جديد
export const registerUserService = async (userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        const [userResult] = await connection.query(
            `INSERT INTO users (name, role, email, password, gender, Phone_no1, Phone_no2, image_url, Date_of_Birth) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [userData.name, userData.role, userData.email, hashedPassword, userData.gender, userData.Phone_no1, userData.Phone_no2 || null, userData.image_url || null, userData.Date_of_Birth]
        );
        const userId = userResult.insertId;

        if (userData.role === 'Lawyer') {
            await connection.query(
                `UPDATE lawyer SET license_number = ?, years_experience = ?, verified = ? WHERE user_id = ?`, 
                [userData.license_number, userData.years_experience || 0, userData.verified || 0, userId]
            );
            
            if (userData.specializations && Array.isArray(userData.specializations)) {
                const specValues = userData.specializations.map(spec => [userId, spec]);
                await connection.query(`INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, [specValues]);
            }
            
            // إضافة عنوان المكتب عند التسجيل
            if (userData.office_address && userData.office_address.trim() !== "") {
                await connection.query(
                    `INSERT INTO lawyer_office (lawyer_id, office_address) VALUES (?, ?)`, 
                    [userId, userData.office_address]
                );
            }
        } else if (userData.role === 'Admin') {
            await connection.query(`UPDATE admin SET authority_level = ? WHERE user_id = ?`, [userData.authority_level, userId]);
        } else if (userData.role === 'Client') {
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

// ✅ 4. التحديث الشامل (تم إضافة فحص نوع المستخدم لمنع التداخل)
export const updateUserService = async (userId, userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        // فحص نوع المستخدم أولاً
        const [userRows] = await connection.query(`SELECT role FROM users WHERE user_id = ?`, [userId]);
        if (userRows.length === 0) throw new Error("المستخدم غير موجود");
        const userRole = userRows[0].role;

        // تحديث كلمة المرور إن وجدت
        if (userData.password && userData.password.trim() !== "") {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            await connection.query(`UPDATE users SET password = ? WHERE user_id = ?`, [hashedPassword, userId]);
        }

        // تحديث البيانات الأساسية لجدول users
        await connection.query(
            `UPDATE users SET 
                name = COALESCE(?, name), 
                email = COALESCE(?, email), 
                Phone_no1 = COALESCE(?, Phone_no1), 
                Phone_no2 = COALESCE(?, Phone_no2), 
                gender = COALESCE(?, gender),
                Date_of_Birth = COALESCE(?, Date_of_Birth),
                image_url = COALESCE(?, image_url)
             WHERE user_id = ?`,
            [
                userData.name || null, 
                userData.email || null, 
                userData.Phone_no1 || null, 
                userData.Phone_no2 || null, 
                userData.gender || null,
                userData.Date_of_Birth || null,
                userData.image_url || null, 
                userId
            ]
        );

        // التحديثات الخاصة بناءً على نوع المستخدم
        if (userRole === 'Lawyer') {
            await connection.query(
                `UPDATE lawyer SET 
                    license_number = COALESCE(?, license_number),
                    years_experience = COALESCE(?, years_experience)
                 WHERE user_id = ?`,
                [userData.license_number || null, userData.years_experience || null, userId]
            );

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

            if (userData.office_address !== undefined) {
                const [existingOffice] = await connection.query(
                    `SELECT office_id FROM lawyer_office WHERE lawyer_id = ?`, 
                    [userId]
                );

                if (existingOffice.length > 0) {
                    await connection.query(
                        `UPDATE lawyer_office SET office_address = ? WHERE lawyer_id = ?`, 
                        [userData.office_address, userId]
                    );
                } else if (userData.office_address.trim() !== "") {
                    await connection.query(
                        `INSERT INTO lawyer_office (lawyer_id, office_address) VALUES (?, ?)`, 
                        [userId, userData.office_address]
                    );
                }
            }
        } else if (userRole === 'Client') {
            if (userData.income_level !== undefined) {
                await connection.query(
                    `UPDATE client SET income_level = ? WHERE user_id = ?`,
                    [userData.income_level, userId]
                );
            }
        } else if (userRole === 'Admin') {
             if (userData.authority_level !== undefined) {
                await connection.query(
                    `UPDATE admin SET authority_level = ? WHERE user_id = ?`,
                    [userData.authority_level, userId]
                );
            }
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

// ✅ 5. تسجيل الدخول
export const loginService = async (email, password) => {
    const [users] = await pool.promise().query(
        `SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`, 
        [email]
    );

    if (users.length === 0) throw new Error("الحساب غير موجود");
    
    const user = users[0];
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("كلمة المرور غير صحيحة.");
    
    const token = jwt.sign(
        { userId: user.user_id, role: user.role }, 
        JWT_SECRET, 
        { expiresIn: '1d' }
    );
    
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

// ✅ 6. جلب بيانات البروفايل الكاملة
export const getUserProfileService = async (userId) => {
    const [rows] = await pool.promise().query(
        `SELECT 
            u.user_id, u.name, u.email, u.image_url, u.Phone_no1, u.Phone_no2, u.gender, u.Date_of_Birth, u.role,
            l.license_number, l.rating_avg, l.verified, l.years_experience,
            c.income_level,
            lo.office_address,
            GROUP_CONCAT(ls.spec_name SEPARATOR ' و ') AS specialization 
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN client c ON u.user_id = c.user_id
         LEFT JOIN lawyer_specializations ls ON u.user_id = ls.lawyer_id
         LEFT JOIN lawyer_office lo ON u.user_id = lo.lawyer_id
         WHERE u.user_id = ?
         GROUP BY u.user_id, lo.office_address`, 
        [userId]
    );
    if (rows.length === 0) throw new Error("المستخدم غير موجود");
    return rows[0];
};

// ✅ 7. جلب كل المستخدمين
export const getAllUsersService = async () => {
    const [rows] = await pool.promise().query(
        `SELECT u.user_id, u.name, u.email, u.role, u.gender, u.Phone_no1, u.Phone_no2, u.Date_of_Birth,
                u.image_url, u.created_at, l.license_number, l.years_experience, l.verified,
                a.authority_level, c.income_level, lo.office_address
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN admin a ON u.user_id = a.user_id
         LEFT JOIN client c ON u.user_id = c.user_id
         LEFT JOIN lawyer_office lo ON u.user_id = lo.lawyer_id
         WHERE u.deleted_at IS NULL
         ORDER BY u.created_at DESC`
    );
    return rows;
};

// ✅ 8. جلب مستخدم بالإيميل
export const getUserByEmailService = async (email) => {
    const [rows] = await pool.promise().query(
        `SELECT u.user_id, u.name, u.email, u.role, u.gender, u.Phone_no1, u.Phone_no2, u.Date_of_Birth,
                u.image_url, u.created_at, l.license_number, l.years_experience, l.verified,
                a.authority_level, c.income_level, lo.office_address,
                GROUP_CONCAT(ls.spec_name SEPARATOR ',') AS specializations
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN admin a ON u.user_id = a.user_id
         LEFT JOIN client c ON u.user_id = c.user_id
         LEFT JOIN lawyer_office lo ON u.user_id = lo.lawyer_id
         LEFT JOIN lawyer_specializations ls ON u.user_id = ls.lawyer_id
         WHERE u.email = ? AND u.deleted_at IS NULL
         GROUP BY u.user_id, lo.office_address
         LIMIT 1`, [email]
    );
    return rows.length > 0 ? rows[0] : null;
};

// ✅ 9. جلب مستخدم بالـ ID
export const getUserByIdService = async (userId) => {
    const [rows] = await pool.promise().query(
        `SELECT u.user_id, u.name, u.email, u.role, u.gender, u.Phone_no1, u.Phone_no2, u.Date_of_Birth,
                u.image_url, u.created_at, l.license_number, l.years_experience, l.verified,
                a.authority_level, c.income_level, lo.office_address,
                GROUP_CONCAT(ls.spec_name SEPARATOR ',') AS specializations
         FROM users u
         LEFT JOIN lawyer l ON u.user_id = l.user_id
         LEFT JOIN admin a ON u.user_id = a.user_id
         LEFT JOIN client c ON u.user_id = c.user_id
         LEFT JOIN lawyer_office lo ON u.user_id = lo.lawyer_id
         LEFT JOIN lawyer_specializations ls ON u.user_id = ls.lawyer_id
         WHERE u.user_id = ? AND u.deleted_at IS NULL
         GROUP BY u.user_id, lo.office_address
         LIMIT 1`, [userId]
    );
    return rows.length > 0 ? rows[0] : null;
};

// ✅ 10. الحذف المنطقي (Logic Delete)
export const deleteUserService = async (userId) => {
    try {
        await runQuery(`UPDATE users SET deleted_at = NOW() WHERE user_id = ?`, [userId]); 
    } catch (error) { 
        throw new Error("خطأ أثناء الحذف: " + error.message); 
    }
};

// 🚀✅ 11. جلب كل المحامين للفرونت إند مع تخصصاتهم ومكاتبهم
export const getLawyersService = async () => {
    const query = `
      SELECT 
        u.user_id, 
        u.name, 
        u.image_url,
        l.verified, 
        l.rating_avg, 
        l.license_number,
        l.years_experience,
        lo.office_address,
        GROUP_CONCAT(ls.spec_name SEPARATOR ',') AS specializations 
      FROM users u
      LEFT JOIN lawyer l ON u.user_id = l.user_id
      LEFT JOIN lawyer_specializations ls ON u.user_id = ls.lawyer_id 
      LEFT JOIN lawyer_office lo ON u.user_id = lo.lawyer_id
      WHERE u.role = 'Lawyer' AND u.deleted_at IS NULL
      GROUP BY u.user_id, u.name, u.image_url, l.verified, l.rating_avg, l.license_number, l.years_experience, lo.office_address;
    `;

    const [results] = await pool.promise().query(query);

    return results.map(lawyer => ({
        ...lawyer,
        specializations: lawyer.specializations ? lawyer.specializations.split(',') : []
    }));
};
