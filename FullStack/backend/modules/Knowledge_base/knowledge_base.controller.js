import axios from 'axios';
import fs from 'fs';
import { promises as fsPromises } from 'fs';
import FormData from 'form-data';

const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

export const uploadToKnowledgeBase = async (req, res) => {
    const filePath = req.file?.path;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'فين الملف يا ريس؟ لازم ترفع PDF' });
        }

        // بنقرأ الملف كـ buffer عشان تحاشي مشاكل الـ streams
        const fileBuffer = await fsPromises.readFile(filePath);

        // بنجهز الملف عشان نبعته للبايثون
        const formData = new FormData();
        formData.append('file', fileBuffer, req.file.originalname);

        // بنبعت الملف لنقطة النهاية في البايثون (هنكريتها في الخطوة الجاية)
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/ingest`, formData, {
            headers: formData.getHeaders(),
            timeout: 60000, // 60 second timeout for large files
        });

        // بنمسح الملف من السيرفر بعد ما اتبعت عشان الزحمة
        try {
            if (filePath) await fsPromises.unlink(filePath);
        } catch (unlinkError) {
            console.error('Error deleting temp file:', unlinkError.message);
        }

        return res.status(200).json({
            success: true,
            message: 'تم إضافة المعلومات لمخ الذكاء الاصطناعي بنجاح!',
            data: response.data
        });
    } catch (error) {
        // بنحاول نمسح الملف حتى لو حصل خطأ
        if (filePath) {
            try {
                await fsPromises.unlink(filePath);
            } catch (unlinkError) {
                console.error('Error deleting temp file after error:', unlinkError.message);
            }
        }
        console.error('Knowledge Base Upload Error:', error.message);
        res.status(500).json({ success: false, message: 'حصل مشكلة وأحنا بنعلم الذكاء الاصطناعي', error: error.message });
    }
};
