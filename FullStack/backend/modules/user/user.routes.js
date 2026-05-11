import express from 'express';
import * as userController from './user.controller.js';
import { validateRegister } from '../../middleware/Uservalidation.js';
import { uploadSingle, handleUploadError } from '../../middleware/upload.js';

const router = express.Router();

// 🚀✅ (الجديد) المسار الجديد للمحامين (لازم يكون فوق خالص)
router.get('/lawyers', userController.getLawyers);

// 0. جلب كل المستخدمين (GET /api/users)
router.get('/', userController.getAllUsers);

// 1. التخصصات (GET /api/users/specializations)
router.get('/specializations', userController.getSpecializations);

// 1.5. جلب بيانات مستخدم بواسطة البريد الإلكتروني
router.get('/edit-details', userController.getUserByEmail);

// 2. البحث (GET /api/users/search)
router.get('/search', userController.searchUsers);

// 1.6. جلب بيانات مستخدم بواسطة الـ ID
router.get('/:id', userController.getUserById);

// 3. تسجيل مستخدم جديد
router.post('/', validateRegister, userController.register);
router.post('/register', validateRegister, userController.register);

// 4. تسجيل الدخول (POST /api/users/login)
router.post('/login', userController.login);

// 5. جلب بيانات البروفايل بالـ ID
router.get('/profile/:id', userController.getUserProfile);

// 6. تحديث بيانات مستخدم (PUT /api/users/:id)
router.put('/:id', userController.updateUser);

// 7. حذف مستخدم
router.delete('/:id', userController.deleteUser);

// 8. رفع صورة البروفايل
router.post('/upload-profile-picture/:id', uploadSingle('profilePicture'), handleUploadError, userController.uploadProfilePicture);

export default router;
