import OpenAI from "openai";
import userRouter from "../modules/user/user.routes.js";
import aiRouter from "../modules/Ai_tools/ai_tools.routes.js";
// ✅ الربط الصحيح مع الـ Router بتاع الـ Auth (تأكد من وجود الامتداد .js)
import authRouter from "../modules/auth/auth.controller.js"; 

/**
 * 🛠️ إعداد كافة مسارات التطبيق (Routing Hub)
 */
export const setupAppRoutes = (app) => {
    // 🔐 مسارات الدخول والتسجيل (يوسف وكل المستخدمين)
    // هنا app.use هتاخد الـ router اللي إحنا عملنا له export default من ملف auth.controller
    app.use("/api/auth", authRouter); 
    
    // 👥 مسارات إدارة المستخدمين
    app.use("/api/users", userRouter);
    
    // 🤖 مسارات أدوات الذكاء الاصطناعي
    app.use("/ai", aiRouter);
    
    // ⚠️ معالج المسارات غير الموجودة (404 Error Handler)
    app.use((req, res) => {
        res.status(404).json({ 
            ok: false, 
            message: `المسار ${req.originalUrl} غير موجود في سيستم LawLink ⚖️` 
        });
    });
};

/**
 * 🤖 محرك الدردشة الذكي (Legal AI Assistant)
 */
export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user?.id; 
        const userRole = req.user?.role || 'user';

        if (!message) {
            return res.status(400).json({ success: false, message: "يرجى كتابة سؤالك القانوني أولاً." });
        }

        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { 
                    role: "system", 
                    content: `أنت مساعد قانوني خبير في القانون المصري لمشروع LawLink. أنت تساعد مستخدم برتبة (${userRole}).` 
                },
                { role: "user", content: message },
            ],
        });

        res.status(200).json({ 
            success: true, 
            reply: completion.choices[0].message.content 
        });

    } catch (error) {
        console.error("❌ OpenAI Error:", error.message);
        res.status(500).json({ 
            success: false, 
            message: "نظام الـ AI غير متاح حالياً." 
        });
    }
};