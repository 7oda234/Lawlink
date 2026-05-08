import axios from 'axios'; // بنستخدم اكسيوس عشان نكلم سيرفر البايثون

// بنجيب عنوان سيرفر البايثون من ملف الـ .env أو نستخدم المحلي بورت 8000
const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

/**
 * وظيفة الملف ده (Service) هي "التواصل" فقط.
 * بياخد البيانات من الكنترولر، يبعتها للبايثون، ويرجع النتيجة.
 */

// 1. خدمة البحث القانوني والدردشة العامة
export const fetchAiResponse = async (endpoint, payload) => {
    try {
        // بنبعت طلب للمسار اللي حددناه في بايثون (زي /api/ai/research أو /api/ai/chat)
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}${endpoint}`, payload);
        
        // بنرجع الداتا اللي رجعت من Gemini [cite: 5]
        return response.data;
    } catch (error) {
        // لو حصل مشكلة في الاتصال ببايثون بنرمي الخطأ للكنترولر عشان يتعامل معاه
        throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
    }
};

// 2. خدمة مراجعة العقود (عشان بتحتاج التعامل مع الملفات المرفوعة)
export const uploadFileToAi = async (endpoint, formData, headers) => {
    try {
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}${endpoint}`, formData, {
            headers: headers,
            timeout: 60000 // دقيقة كاملة عشان ملفات الـ PDF التقيلة
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
    }
};
