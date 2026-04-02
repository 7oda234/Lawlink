import pool from '../../db/Connection.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// 👈 توحيد المفتاح عشان الـ Middleware يشوفه صح
const JWT_SECRET = "lawlink_secret_key"; 

// 1. تسجيل مستخدم جديد
export const registerUserService = async (userData) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const [userResult] = await connection.query(
            `INSERT INTO users (name, role, email, password, gender, Phone_no1, Date_of_Birth) 
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [userData.name, userData.role, userData.email, hashedPassword, userData.gender, userData.Phone_no1, userData.Date_of_Birth]
        );
        const userId = userResult.insertId;

        if (userData.role === 'Lawyer') {
            await connection.query(`INSERT INTO lawyer (user_id, specialization, license_number) VALUES (?, ?, ?)`, 
            [userId, userData.specialization, userData.license_number]);
        } else if (userData.role === 'Admin') {
            await connection.query(`INSERT INTO admin (user_id, authority_level) VALUES (?, ?)`, 
            [userId, userData.authority_level]);
        } else if (userData.role === 'Client') {
            await connection.query(`INSERT INTO client (user_id, income_level) VALUES (?, ?)`, 
            [userId, userData.income_level || 0]);
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

// 2. تسجيل الدخول (Login) - الجزء اللي كان فيه المشكلة 👈
export const loginService = async (email, password) => {
    const [users] = await pool.query(`SELECT * FROM users WHERE email = ? AND deleted_at IS NULL`, [email]);
    
    if (users.length === 0) throw new Error("الحساب غير موجود أو تم حذفه");

    const user = users[0];
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("كلمة المرور غير صحيحة");

    // ✅ إنشاء التوكن بالمفتاح الموحد اللي في الـ Middleware
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

// 3. البحث (Search)
export const searchUsersService = async (searchTerm) => {
    const term = `%${searchTerm}%`;
    const [rows] = await pool.query(
        `SELECT user_id, name, email, role, Phone_no1 FROM users 
         WHERE (name LIKE ? OR email LIKE ? OR Phone_no1 LIKE ?) AND deleted_at IS NULL`, 
        [term, term, term]
    );
    return rows;
};

// 4. التعديل الذكي (Update & Role Switch)
export const updateUserService = async (userId, userData) => {
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();

        const [oldUser] = await connection.query(`SELECT role FROM users WHERE user_id = ?`, [userId]);
        const oldRole = oldUser[0]?.role;

        await connection.query(
            `UPDATE users SET name = IFNULL(?, name), role = IFNULL(?, role), Phone_no1 = IFNULL(?, Phone_no1) WHERE user_id = ?`,
            [userData.name, userData.role, userData.Phone_no1, userId]
        );

        if (userData.role && oldRole && userData.role !== oldRole) {
            await connection.query(`DELETE FROM ${oldRole.toLowerCase()} WHERE user_id = ?`, [userId]);
            
            const newTable = userData.role.toLowerCase();
            if (newTable === 'admin') {
                await connection.query(`INSERT INTO admin (user_id, authority_level) VALUES (?, ?)`, [userId, userData.authority_level || 'Standard']);
            } else if (newTable === 'lawyer') {
                await connection.query(`INSERT INTO lawyer (user_id, specialization) VALUES (?, ?)`, [userId, userData.specialization || 'عام']);
            } else if (newTable === 'client') {
                await connection.query(`INSERT INTO client (user_id, income_level) VALUES (?, ?)`, [userId, userData.income_level || 0]);
            }
        } else {
            const currentTable = (userData.role || oldRole).toLowerCase();
            if (currentTable === 'admin') {
                await connection.query(`UPDATE admin SET authority_level = IFNULL(?, authority_level) WHERE user_id = ?`, [userData.authority_level, userId]);
            } else if (currentTable === 'lawyer') {
                await connection.query(`UPDATE lawyer SET specialization = IFNULL(?, specialization) WHERE user_id = ?`, [userData.specialization, userId]);
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

// 5. الحذف المنطقي (Soft Delete)
export const deleteUserService = async (userId) => {
    await pool.query(`UPDATE users SET deleted_at = NOW() WHERE user_id = ?`, [userId]);
};