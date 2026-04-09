import express from 'express';
import * as userController from './user.controller.js';
import { validateRegister } from '../../middleware/Uservalidation.js';

const router = express.Router();

// 1. تسجيل مستخدم جديد (مع الـ Validation اللي عملناه)
router.post('/register', validateRegister, userController.register);

// 2. تسجيل الدخول
router.post('/login', userController.login);

// 3. البحث (يجب أن يكون قبل الـ /:id عشان م يحصلش تضارب)
router.get('/search', userController.searchUsers);

// 4. تحديث بيانات مستخدم
router.put('/:id', userController.updateUser);

// 5. حذف مستخدم (Soft Delete)
router.delete('/:id', userController.deleteUser);

export default router;