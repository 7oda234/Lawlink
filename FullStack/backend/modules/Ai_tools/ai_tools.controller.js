import fs from 'fs'; // بنستورد مكتبة fs عشان نتعامل مع الملفات
import { promises as fsPromises } from 'fs'; // بنستورد نسخة الـ promises عشان نستخدم async/await مع الملفات
import FormData from 'form-data'; // بنستورد مكتبة FormData عشان نجهز الملفات كأننا بنرفعها من المتصفح
import { fetchAiResponse, uploadFileToAi } from './ai_tools.service.js'; // بنستورد دوال التواصل مع البايثون

// دالة ذكية عشان تطلع الإيرور الحقيقي اللي جاي من سيرفر البايثون بدل رسالة 500 المبهمة
const getErrorMessage = (error) => {
    try {
        // بنحاول نحول رسالة الإيرور لـ JSON عشان الفاست آي بي آي بيبعتها كده
        const parsed = JSON.parse(error.message); 
        // بنرجع تفاصيل الخطأ (detail) لو موجودة، أو الرسالة العادية
        return parsed.detail || parsed.message || error.message;
    } catch {
        // لو مقدرناش نحولها، بنرجع الرسالة الأصلية أو رسالة عامة
        return error.message || 'Internal Server Error';
    }
};

// مسار البحث القانوني
export const conductResearch = async (req, res) => {
    try {
        // بنبعت الداتا لسيرفر البايثون ونستنى الرد
        const data = await fetchAiResponse('/api/ai/research', req.body);
        // لو كله تمام بنرجع حالة 200 والداتا
        return res.status(200).json({ success: true, data });
    } catch (error) {
        // هنا التعديل المهم: بنرجع الإيرور الحقيقي في حقل message عشان الريأكت يعرضه
        res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
};

// مسار مراجعة العقود
export const contractReview = async (req, res) => {
    // بنجيب مسار الملف اللي اترفع
    const filePath = req.file?.path;
    try {
        // لو مفيش ملف بنرجع إيرور 400
        if (!req.file || !filePath) {
            return res.status(400).json({ success: false, message: 'file is required.' });
        }
        // بنقرأ الملف من الهارد ونحطه في الميموري
        const fileBuffer = await fsPromises.readFile(filePath);
        // بنعمل فورم داتا جديدة
        const formData = new FormData();
        // بنحط الملف جوه الفورم داتا
        formData.append('file', fileBuffer, req.file.originalname);
        
        // بنبعت الملف للبايثون
        const data = await uploadFileToAi('/api/ai/contract-review', formData, formData.getHeaders());
        // بنرجع النتيجة
        return res.status(200).json({ success: true, data });
    } catch (error) {
        // لو حصل مشكلة بنحاول نمسح الملف من الهارد عشان منسيبش زبالة
        if (filePath) { try { await fsPromises.unlink(filePath); } catch (e) {} }
        // بنرجع الإيرور الحقيقي للفرونت إند
        res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
};

// مسار الشات القانوني
export const handleLegalChat = async (req, res) => {
    try {
        // بنبعت رسالة اليوزر للبايثون
        const data = await fetchAiResponse('/api/ai/chat', { query: req.body.message });
        // بنرجع الرد
        return res.status(200).json({ success: true, data });
    } catch (error) {
        // بنرجع الإيرور الحقيقي للفرونت إند
        res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
};

// مسار توقع الأحكام
export const predictOutcome = async (req, res) => {
    try {
        // بنبعت وقائع القضية للبايثون
        const data = await fetchAiResponse('/api/ai/predict', req.body);
        // بنرجع النتيجة
        return res.status(200).json({ success: true, data });
    } catch (error) {
        // بنرجع الإيرور الحقيقي للفرونت إند
        res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
};

// مسار صياغة العقود
export const draftDocument = async (req, res) => {
    try {
        // بنبعت بيانات العقد للبايثون
        const data = await fetchAiResponse('/api/ai/draft', req.body);
        // بنرجع المسودة
        return res.status(200).json({ success: true, data });
    } catch (error) {
        // بنرجع الإيرور الحقيقي للفرونت إند عشان يظهر في المربع الأحمر
        res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
};

// مسار خدمة العملاء
export const handleCustomerServiceChat = async (req, res) => {
    try {
        // بنتأكد إن اليوزر باعت رسالة
        if (!req.body.message) {
            return res.status(400).json({ success: false, message: 'لازم تكتب رسالة عشان نرد عليك يا بطل.' });
        }
        // بنبعت الرسالة للبايثون
        const data = await fetchAiResponse('/api/ai/customer-support', { query: req.body.message });
        // بنرجع الرد
        return res.status(200).json({ success: true, data });
    } catch (error) {
        // بنرجع الإيرور الحقيقي للفرونت إند
        res.status(500).json({ success: false, message: getErrorMessage(error) });
    }
};
