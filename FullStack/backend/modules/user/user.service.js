import pool from '../../db/Connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = "lawlink_secret_key"; 

// ✅ جلب التخصصات الفريدة من الجدول الجديد
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

// 1. تسجيل مستخدم جديد (Register)
export const registerUserService = async (userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        
        // إدخال البيانات في جدول users
        const [userResult] = await connection.query(
            `INSERT INTO users (name, role, email, password, gender, Phone_no1, Date_of_Birth) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userData.name, userData.role, userData.email, hashedPassword, userData.gender, userData.Phone_no1, userData.Date_of_Birth]
        );
        const userId = userResult.insertId;

        if (userData.role === 'Lawyer') {
            // إدخال بيانات المحامي الأساسية (بدون عمود التخصص القديم)
            await connection.query(
                `INSERT INTO lawyer (user_id, license_number) VALUES (?, ?)`, 
                [userId, userData.license_number]
            );
            
            // 💡 إدخال التخصصات المتعددة في الجدول الجديد
            if (userData.specializations && Array.isArray(userData.specializations)) {
                const specValues = userData.specializations.map(spec => [userId, spec]);
                await connection.query(
                    `INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, 
                    [specValues]
                );
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

// 2. البحث (Search) - مع تجميع التخصصات في Array واحد
export const searchUsersService = async (searchTerm) => {
    const term = `%${searchTerm || ''}%`;
    const [rows] = await pool.promise().query(
        `SELECT 
            u.user_id, u.name, u.email, u.role, u.Phone_no1, 
            l.rating_avg,
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

// 3. التحديث (Update) - دعم الـ Multi-valued Specializations
export const updateUserService = async (userId, userData) => {
    const connection = await pool.promise().getConnection();
    try {
        await connection.beginTransaction();

        // تحديث جدول users
        await connection.query(
            `UPDATE users 
             SET name = IFNULL(?, name), 
                 email = IFNULL(?, email), 
                 Phone_no1 = IFNULL(?, Phone_no1)
             WHERE user_id = ?`,
            [userData.name || null, userData.email || null, userData.Phone_no1 || null, userId]
        );

        // تحديث جدول lawyer (التقييم فقط)
        await connection.query(
            `UPDATE lawyer SET rating_avg = IFNULL(?, rating_avg) WHERE user_id = ?`,
            [userData.rating_avg || null, userId]
        );

        // 💡 تحديث التخصصات: نمسح القديم ونضيف الجديد من الـ Array
        if (userData.specializations && Array.isArray(userData.specializations)) {
            await connection.query(`DELETE FROM lawyer_specializations WHERE lawyer_id = ?`, [userId]);
            const specValues = userData.specializations.map(spec => [userId, spec]);
            await connection.query(
                `INSERT INTO lawyer_specializations (lawyer_id, spec_name) VALUES ?`, 
                [specValues]
            );
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

// 4. تسجيل الدخول والحذف المنطقي (كما هي)
export const loginService = async (email, password) => {
    const [users] = await pool.promise().query(`SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`, [email]);
    if (users.length === 0) throw new Error("الحساب غير موجود");
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("كلمة المرور غير صحيحة");
    const token = jwt.sign({ userId: user.user_id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });
    return { token, user: { id: user.user_id, name: user.name, role: user.role, email: user.email } };
};

export const deleteUserService = async (userId) => {
    await pool.promise().query(`UPDATE users SET deleted_at = NOW() WHERE user_id = ?`, [userId]);
};