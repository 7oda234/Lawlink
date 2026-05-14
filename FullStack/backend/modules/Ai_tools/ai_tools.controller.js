import axios from 'axios';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import FormData from 'form-data';

// بنجيب عنوان سيرفر البايثون من الـ Environment Variables أو نستخدم المحلي بورت 8000
const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

// دالة (Helper) عشان نرجع رسالة الخطأ بشكل نضيف للـ Frontend
const buildErrorPayload = (error) => {
    if (error.response) return error.response.data; // لو الخطأ جاي من سيرفر البايثون نفسه
    return { message: error.message }; // لو الخطأ في السيرفر بتاعنا (الـ Node)
};

/** * 1. البحث القانوني الذكي (RAG)
 * بياخد السؤال وبيرجع إجابة بناءً على الداتا اللي في الـ ChromaDB
 */
export const conductResearch = async (req, res) => {
    try {
        const { query } = req.body;
        // بنعمل Post Request لسيرفر البايثون
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/research`, { query });
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

/** * 2. مراجعة العقود (PDF Review)
 * بياخد ملف PDF، بيبعته للبايثون، وبيرجع تحليل للمخاطر والالتزامات
 */
export const contractReview = async (req, res) => {
    const filePath = req.file?.path; // بنجيب مسار الملف اللي الـ Middleware رفعه
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'فين الملف يا ريس؟ ارفع ملف PDF.' });
        }

        
        // بنقرأ الملف من الهارد عشان نبعته للبايثون
        const fileBuffer = await fsPromises.readFile(filePath);
        
        // بنجهز الـ FormData كأننا بنرفع ملف من Browser
        const formData = new FormData();
        formData.append('file', fileBuffer, req.file.originalname);
        
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/contract-review`, formData, {
            headers: formData.getHeaders(), // لازم نبعت الـ Headers الصح عشان بايثون يفهم الـ Multi-part
            timeout: 60000, // بنديله دقيقة كاملة عشان لو الملف كبير والذكاء الاصطناعي خد وقت
        });
        
        // بعد ما خلصنا، بنمسح الملف المؤقت عشان مياخدش مساحة على السيرفر
        if (filePath) await fsPromises.unlink(filePath);
        
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Contract Review Error:', error.message);
        // حتى لو حصل غلط، بنحاول نمسح الملف عشان النظافة
        if (filePath) {
            try { await fsPromises.unlink(filePath); } catch (e) { console.error('Unlink Error:', e.message); }
        }
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

/** * 3. الشات القانوني السريع
 * استفسارات عامة في القانون المصري
 */
export const handleLegalChat = async (req, res) => {
    try {
        const { message } = req.body;
        // بنبعت السؤال للبايثون على الـ endpoint بتاع الشات
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/chat`, { query: message });
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

/** * 4. توقع نتيجة القضية (Predict Outcome)
 * بياخد وقائع القضية وبيرجع نسبة النجاح المتوقعة
 */
export const predictOutcome = async (req, res) => {
    try {
        // بنبعت الـ facts والـ jurisdiction من الـ req.body مباشرة
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/predict`, req.body);
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

/** * 5. كتابة مسودات العقود (Drafting)
 * بياخد نوع العقد والأطراف والشروط وبيولد نص قانوني احترافي
 */
export const draftDocument = async (req, res) => {
    try {
        // بيبعت الـ documentType والـ parties والـ keyTerms
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/draft`, req.body);
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

/** * 6. شات خدمة العملاء (Customer Support AI)
 * ده اللي عملناه مخصوص عشان يساعد المستخدمين في استخدام تطبيق LawLink نفسه
 */
export const handleCustomerServiceChat = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'لازم تكتب رسالة عشان نرد عليك يا بطل.' });
        }

        // بنبعت السؤال لسيرفر البايثون على المسار الجديد بتاع الدعم الفني
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/customer-support`, { 
            query: message 
        });

        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};
