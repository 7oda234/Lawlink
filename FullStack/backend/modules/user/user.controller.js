import * as userService from './user.service.js';

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

export const searchUsers = async (req, res) => {
    try {
        const data = await userService.searchUsersService(req.query.term);
        res.status(200).json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const updateUser = async (req, res) => {
    try {
        await userService.updateUserService(req.params.id, req.body);
        res.status(200).json({ success: true, message: "تم التحديث" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};

export const deleteUser = async (req, res) => {
    try {
        await userService.deleteUserService(req.params.id);
        res.status(200).json({ success: true, message: "تم الحذف" });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
};