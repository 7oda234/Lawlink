// ✅ الموديولات الجاهزة
import authRouter from "../modules/auth/auth.routes.js"; 
import userRouter from "../modules/user/user.routes.js";
import casesRouter from "../modules/Cases/cases.routes.js";
import aiRouter from "../modules/Ai_tools/ai_tools.routes.js";
import messageRouter from "../modules/Message/message.routes.js";
import knowledgeBaseRouter from "../modules/Knowledge_base/knowledge_base.routes.js";

// 📄 موديول المستندات
import documentsRouter from "../modules/Document_folder/document_folder.routes.js"; 

// 💳 موديول المدفوعات 
import paymentRouter from "../modules/Payment/payment.routes.js"; 

// 📅 موديول المواعيد 
import appointmentRouter from "../modules/Appointment/appointment.routes.js"; 

// ❌ (تم إيقافه - كود قديم) 
// import OpenAI from "openai";

/**
 * 🛠️ الكود الجديد: إعداد كافة مسارات التطبيق (Routing Hub)
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

    // � موديول قاعدة المعرفة
    app.use("/api/knowledge-base", knowledgeBaseRouter);

    // �📁 موديول المستندات
    app.use("/api/documents", documentsRouter);

    // 💳 موديول المدفوعات
    app.use("/api/payments", paymentRouter);

    // 📅 موديول المواعيد 
    app.use("/api/appointments", appointmentRouter);
    
    // 🤖 الكود الجديد: موديول الذكاء الاصطناعي (المربوط مع React وسيرفر البايثون)
    app.use('/api/v1/ai-tools', aiRouter);

    // ⚠️ معالج المسارات غير الموجودة (404 Error Handler)
    app.use((req, res) => {
        res.status(404).json({ 
            ok: false, 
            message: `المسار ${req.originalUrl} غير موجود في سيستم LawLink ⚖️` 
        });
    });
};

/* =========================================================================
   🗑️ الكود القديم (Old Code)
   تم وضعه داخل تعليقات (Comments) لأنه كان يسبب تعارض مع سيرفر البايثون
   ========================================================================= */

/*
// 🤖 أدوات الذكاء الاصطناعي (المسار القديم اللي كان عامل زحمة)
// app.use("/ai", aiRouter);

// 🤖 AI chatbot endpoint (المسار القديم اللي كان بيلغي شغل البايثون)
// app.post('/api/chat', handleChat);

export const handleChat = async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ 
                success: false, 
                message: "يرجى كتابة سؤالك أولاً." 
            });
        }

        // المشكلة كانت هنا: استخدام OpenAI مع مفتاح Google API
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
*/