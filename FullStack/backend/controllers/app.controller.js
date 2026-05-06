import OpenAI from "openai";

// ✅ الموديولات الجاهزة
import authRouter from "../modules/auth/auth.routes.js"; // Fixed import path
import userRouter from "../modules/user/user.routes.js";
import casesRouter from "../modules/Cases/cases.routes.js";
import aiRouter from "../modules/Ai_tools/ai_tools.routes.js";
import messageRouter from "../modules/Message/message.routes.js";

// 📄 موديول المستندات
import documentsRouter from "../modules/Document_folder/document_folder.routes.js"; 

// 💳 موديول المدفوعات (تم التفعيل)
import paymentRouter from "../modules/Payment/payment.routes.js"; 

// 📅 موديول المواعيد (تم تفعيله الآن)
import appointmentRouter from "../modules/Appointment/appointment.routes.js"; 


/**
 * 🛠️ إعداد كافة مسارات التطبيق (Routing Hub)
 */
export const setupAppRoutes = (app) => {
    // 🔐 مسارات الدخول والتسجيل
    app.use("/api/auth", authRouter); 
    
    // 📂 مسارات القضايا
    app.use("/api/cases", casesRouter); 
    
    // 👥 مسارات المستخدمين
    app.use("/api/users", userRouter);

    // 💬 موديول المراسلات
    app.use("/api/messages", messageRouter);

    // 📁 موديول المستندات
    app.use("/api/documents", documentsRouter);

    // 💳 موديول المدفوعات
    app.use("/api/payments", paymentRouter);

    // 📅 موديول المواعيد 
    app.use("/api/appointments", appointmentRouter);

    // 🤖 أدوات الذكاء الاصطناعي (المسار القديم)
    app.use("/ai", aiRouter);
    
    // 🤖 موديول الذكاء الاصطناعي (المسار الجديد المربوط مع React Frontend)
    app.use('/api/v1/ai-tools', aiRouter);

    // 🤖 AI chatbot endpoint
    app.post('/api/chat', handleChat);

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
        
        if (!message) {
            return res.status(400).json({ 
                success: false, 
                message: "يرجى كتابة سؤالك أولاً." 
            });
        }

        // Initialize OpenAI with your environment variable
        const openai = new OpenAI({ apiKey: process.env.GOOGLE_API_KEY });
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        });

        res.status(200).json({ 
            success: true, 
            response: completion.choices[0].message.content 
        });

    } catch (error) {
        console.error("Chatbot Error:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};
