import axios from 'axios';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import FormData from 'form-data';

// بنجيب عنوان سيرفر البايثون من الإعدادات أو نستخدم المحلي
const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

// دالة عشان نرجع رسالة غلط شكلها شيك لو حصلت مشكلة
const buildErrorPayload = (error) => {
    if (error.response) return error.response.data;
    return { message: error.message };
};

// فنكشن البحث القانوني
export const conductResearch = async (req, res) => {
    try {
        const { query } = req.body;
        // بنبعت السؤال لسيرفر البايثون
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/research`, { query });
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

// فنكشن مراجعة العقود الملفات
export const contractReview = async (req, res) => {
    const filePath = req.file?.path;
    try {
        if (!req.file) return res.status(400).json({ success: false, message: 'فين الملف يا ريس؟' });
        
        // بنقرأ الملف كـ buffer عشان تحاشي مشاكل الـ streams
        const fileBuffer = await fsPromises.readFile(filePath);
        
        // بنجهز الملف عشان نبعته للبايثون كأنه فورم
        const formData = new FormData();
        formData.append('file', fileBuffer, req.file.originalname);
        
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/contract-review`, formData, {
            headers: formData.getHeaders(),
            timeout: 60000, // 60 second timeout for large files
        });
        
        // بنمسح الملف المؤقت من عندنا عشان منملاش الهارد
        try {
            if (filePath) await fsPromises.unlink(filePath);
        } catch (unlinkError) {
            console.error('Error deleting temp file:', unlinkError.message);
        }
        
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        console.error('Contract Review Error:', error.message);
        // بنحاول نمسح الملف حتى لو حصل خطأ
        if (filePath) {
            try {
                await fsPromises.unlink(filePath);
            } catch (unlinkError) {
                console.error('Error deleting temp file after error:', unlinkError.message);
            }
        }
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

// فنكشن الشات بوت
export const handleLegalChat = async (req, res) => {
    try {
        // بنمرر رسالة المستخدم للبايثون
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/chat`, { query: req.body.message });
        return res.status(200).json({ success: true, data: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

// فنكشن توقع نتيجة القضية
export const predictOutcome = async (req, res) => {
    try {
        // بنبعت الوقائع والمنطقة الجغرافية
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/predict`, req.body);
        return res.status(200).json({ success: true, data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};

// فنكشن كتابة العقود
export const draftDocument = async (req, res) => {
    try {
        // بنبعت نوع المستند والأطراف والشروط
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/draft`, req.body);
        return res.status(200).json({ success: true, data: response.data.data });
    } catch (error) {
        res.status(500).json({ success: false, error: buildErrorPayload(error) });
    }
};
