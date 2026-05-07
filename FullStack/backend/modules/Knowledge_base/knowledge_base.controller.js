import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';

const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

export const uploadToKnowledgeBase = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'فين الملف يا ريس؟ لازم ترفع PDF' });
        }

        // بنجهز الملف عشان نبعته للبايثون
        const formData = new FormData();
        formData.append('file', fs.createReadStream(req.file.path), req.file.originalname);

        // بنبعت الملف لنقطة النهاية في البايثون (هنكريتها في الخطوة الجاية)
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}/api/ai/ingest`, formData, {
            headers: formData.getHeaders(),
        });

        // بنمسح الملف من السيرفر بعد ما اتبعت عشان الزحمة
        fs.unlink(req.file.path, () => {});

        return res.status(200).json({
            success: true,
            message: 'تم إضافة المعلومات لمخ الذكاء الاصطناعي بنجاح!',
            data: response.data
        });
    } catch (error) {
        console.error('Knowledge Base Upload Error:', error.message);
        res.status(500).json({ success: false, message: 'حصل مشكلة وأحنا بنعلم الذكاء الاصطناعي' });
    }
};
