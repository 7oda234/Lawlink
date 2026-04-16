import express from 'express';
import * as userController from './user.controller.js';
import { validateRegister } from '../../middleware/Uservalidation.js';

const router = express.Router();

// 1. التخصصات (GET /api/users/specializations)
router.get('/specializations', userController.getSpecializations);

// 2. البحث (GET /api/users/search)
router.get('/search', userController.searchUsers);

// 3. تسجيل مستخدم جديد
router.post('/register', validateRegister, userController.register);

// 4. تسجيل الدخول (POST /api/auth/login)
router.post('/login', userController.login);

// 5. تحديث بيانات مستخدم (PUT /api/auth/:id) - لتغيير الباسورد
router.put('/:id', userController.updateUser);

// 6. حذف مستخدم
router.delete('/:id', userController.deleteUser);

export default router;
