import express from 'express';
import * as userController from './user.controller.js';
import { validateRegister } from '../../middleware/Uservalidation.js';

const router = express.Router();

// 🚀✅ (الجديد) المسار الجديد للمحامين (لازم يكون فوق خالص)
router.get('/lawyers', userController.getLawyers);

// 1. التخصصات (GET /api/users/specializations)
router.get('/specializations', userController.getSpecializations);

// 2. البحث (GET /api/users/search)
router.get('/search', userController.searchUsers);

// 3. تسجيل مستخدم جديد
router.post('/register', validateRegister, userController.register);

// 4. تسجيل الدخول (POST /api/users/login)
router.post('/login', userController.login);

// 5. جلب بيانات البروفايل بالـ ID
router.get('/profile/:id', userController.getUserProfile);

// 6. تحديث بيانات مستخدم (PUT /api/users/:id)
router.put('/:id', userController.updateUser);

// 7. حذف مستخدم
router.delete('/:id', userController.deleteUser);

export default router;