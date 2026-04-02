import OpenAI from "openai";
import userRouter from "../modules/user/user.routes.js";
import aiRouter from "../modules/Ai_tools/ai_tools.routes.js";

// 1. الموزع القديم (setupAppRoutes) - عشان السيرفر يقوم وما يديش Error
export const setupAppRoutes = (app) => {
    // مسار المستخدمين
    app.use("/api/users", userRouter);
    
    // مسار الـ AI
    app.use("/ai", aiRouter);
    
    // الـ 404 Handler
    app.use((req, res) => {
        res.status(404).json({ 
            ok: false, 
            message: `المسار ${req.originalUrl} غير موجود في سيستم LawLink ⚖️` 
        });
    });
};

// 2. دالة الـ AI المدمجة (handleChat)
export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        // استلام بيانات المستخدم من الـ Token (القديم)
        const userId = req.user?.userId; 
        const userRole = req.user?.role;

        if (!message) {
            return res.status(400).json({ success: false, message: "يرجى كتابة سؤالك القانوني أولاً." });
        }

        // تهيئة الـ OpenAI جوه الدالة لضمان قراءة الـ env صح بعد ما السيرفر يقوم
        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY, 
        });

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

        // الرد النهائي المدمج (البيانات القديمة + رد الـ AI)
        res.status(200).json({ 
            success: true, 
            user: { id: userId, role: userRole }, 
            reply: completion.choices[0].message.content 
        });

    } catch (error) {
        // 🔥 ده اللي هيعرفك العيب فين بالظبط وأنت شغال
        console.error("❌ OpenAI Error Details:", error.message);
        
        res.status(500).json({ 
            success: false, 
            message: error.message.includes("insufficient_quota") 
                ? "عفواً، رصيد الـ API خلص.. محتاج تشحن حساب OpenAI" 
                : "نظام الـ AI غير متاح حالياً." 
        });
    }
};