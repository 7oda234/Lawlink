export const validateRegister = (req, res, next) => {
    // 1. ضفنا الـ password هنا عشان نستخرجه من الـ body
    const { name, email, role, password, Phone_no1 } = req.body;
    
    // 2. تحديث شرط التحقق الأساسي ليشمل الـ password
    if (!name || !email || !role || !password || !Phone_no1) {
        return res.status(400).json({ 
            success: false, 
            message: "البيانات الأساسية مطلوبة (الاسم، الإيميل، الدور، الهاتف، وكلمة المرور)" 
        });
    }

    // 3. إضافة شرط لطول كلمة المرور (لزيادة الأمان في LawLink)
    if (password.length < 6) {
        return res.status(400).json({ 
            success: false, 
            message: "كلمة المرور ضعيفة! يجب أن تكون 6 أحرف أو أرقام على الأقل" 
        });
    }

    const validRoles = ['Client', 'Lawyer', 'Admin'];
    if (!validRoles.includes(role)) {
        return res.status(400).json({ success: false, message: "الدور الوظيفي غير صحيح" });
    }

    // شروط خاصة بناءً على الـ Role
    if (role === 'Lawyer' && (!req.body.license_number || !req.body.specialization)) {
        return res.status(400).json({ success: false, message: "المحامي يجب أن يدخل رقم الرخصة والتخصص" });
    }
    
    if (role === 'Client' && req.body.income_level === undefined) {
        return res.status(400).json({ success: false, message: "الموكل يجب أن يدخل مستوى الدخل" });
    }

    if (role === 'Admin' && !req.body.authority_level) {
        return res.status(400).json({ success: false, message: "يجب تحديد صلاحية الأدمن" });
    }

    next();
};