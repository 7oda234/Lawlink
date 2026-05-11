import * as userService from './user.service.js';

export const getSpecializations = async (req, res) => {
    try {
        const specs = await userService.getLawyerSpecializationsService();
        res.status(200).json({ success: true, specializations: specs });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const register = async (req, res) => {
    try {
        const userId = await userService.registerUserService(req.body);
        res.status(201).json({ success: true, userId });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const login = async (req, res) => {
    try {
        const data = await userService.loginService(req.body.email, req.body.password);
        res.status(200).json({ success: true, ...data });
    } catch (error) { res.status(401).json({ success: false, message: error.message }); }
};

export const getUserProfile = async (req, res) => {
    try {
        const data = await userService.getUserProfileService(req.params.id);
        res.status(200).json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userService.getAllUsersService();
        res.status(200).json(users);
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getUserByEmail = async (req, res) => {
    try {
        const user = await userService.getUserByEmailService(req.query.email);
        if (!user) {
            return res.status(404).json({ success: false, message: 'المستخدم غير موجود.' });
        }
        res.status(200).json(user);
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const getUserById = async (req, res) => {
    try {
        const user = await userService.getUserByIdService(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'المستخدم غير موجود.' });
        }
        res.status(200).json(user);
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const searchUsers = async (req, res) => {
    try {
        if (req.query.email) {
            const user = await userService.getUserByEmailService(req.query.email);
            return user ? res.status(200).json(user) : res.status(404).json({ success: false, message: 'المستخدم غير موجود.' });
        }
        const data = await userService.searchUsersService(req.query.term);
        res.status(200).json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateUser = async (req, res) => {
    try {
        await userService.updateUserService(req.params.id, req.body);
        res.status(200).json({ success: true, message: "تم التحديث بنجاح" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUserService(req.params.id);
        res.status(200).json({ success: true, message: "تم الحذف" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

// 🚀✅ (الجديد) دالة جلب كل المحامين للفرونت إند
export const getLawyers = async (req, res) => {
    try {
        const data = await userService.getLawyersService();
        res.status(200).json({ success: true, data });
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
};

// رفع صورة البروفايل
export const uploadProfilePicture = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'لم يتم رفع أي ملف' });
        }

        const userId = req.params.id;
        const imageUrl = `/uploads/${req.file.filename}`;

        await userService.updateProfilePictureService(userId, imageUrl);

        res.status(200).json({ 
            success: true, 
            message: 'تم رفع الصورة بنجاح',
            imageUrl 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
