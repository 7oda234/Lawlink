import OpenAI from "openai";
// ✅ الموديولات الجاهزة
import authRouter from "../modules/auth/auth.controller.js"; 
import userRouter from "../modules/user/user.routes.js";
import casesRouter from "../modules/Cases/cases.routes.js";
import aiRouter from "../modules/Ai_tools/ai_tools.routes.js";
import messageRouter from "../modules/Message/message.routes.js";

// 📄 الموديول الجديد الخاص بالمستندات (تمت الإضافة)
import documentsRouter from "../modules/Document_folder/document_folder.routes.js"; // تأكد من مسار الفولدر عندك

// ❌ الموديولات اللي لسه مكرتناش ملفاتها (عطلناها عشان السيرفر ما يضربش)
// import appointmentRouter from "../modules/appointments/appointments.routes.js";
// import paymentRouter from "../modules/payments/payments.routes.js";


/**
 * 🛠️ إعداد كافة مسارات التطبيق (Routing Hub)
 */
export const setupAppRoutes = (app) => {
    // 🔐 مسارات الدخول والتسجيل
    app.use("/api/auth", userRouter); 
    
    // 📂 مسارات القضايا
    app.use("/api/cases", casesRouter); 
    
    // 👥 مسارات المستخدمين
    app.use("/api/users", userRouter);

    // 🤖 أدوات الذكاء الاصطناعي
    app.use("/ai", aiRouter);
    
    // 💬 موديول المراسلات
    app.use("/api/messages", messageRouter);

    // 📁 موديول المستندات (تمت الإضافة هنا)
    app.use("/api/documents", documentsRouter);

    // ⚠️ معالج المسارات غير الموجودة (404 Error Handler)
    app.use((req, res) => {
        res.status(404).json({ 
            ok: false, 
            message: `المسار ${req.originalUrl} غير موجود في سيستم LawLink ⚖️` 
        });
    });
};

/**
 * 🤖 محرك الدردشة الذكي (AI Assistant)
 */
export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        if (!message) return res.status(400).json({ success: false, message: "يرجى كتابة سؤالك أولاً." });

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        });
        res.status(200).json({ success: true, response: completion.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};