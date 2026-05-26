import axios from 'axios'; // بنستورد أكسيوس عشان ده اللي هيعمل الريكويستات لسيرفر البايثون

// بنحدد عنوان السيرفر بتاع البايثون، يا إما من المتغيرات أو بياخد بورت 8000 كديفولت
const PYTHON_AI_SERVICE_URL = process.env.PYTHON_AI_SERVICE_URL || 'http://localhost:8000';

// دي الدالة اللي بتبعت أي داتا عادية (JSON) لسيرفر البايثون
export const fetchAiResponse = async (endpoint, payload) => {
    try {
        // بنعمل POST ريكويست للمسار المطلوب وبنبعت الداتا
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}${endpoint}`, payload);
        
        // بنرجع الداتا اللي سيرفر البايثون رد بيها
        return response.data;
    } catch (error) {
        // لو حصل مشكلة، بنرمي إيرور جديد جواه تفاصيل المشكلة عشان الكنترولر يهندلها
        throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
    }
};

// دي الدالة المخصصة لرفع الملفات (زي الـ PDF) لسيرفر البايثون
export const uploadFileToAi = async (endpoint, formData, headers) => {
    try {
        // بنعمل POST ريكويست وبنبعت الفورم داتا (اللي فيها الملف) وبنظبط الهيدرز والتايم أوت
        const response = await axios.post(`${PYTHON_AI_SERVICE_URL}${endpoint}`, formData, {
            headers: headers, // الهيدرز مهمة جداً هنا عشان البايثون يفهم إن ده ملف مرفوع
            timeout: 60000 // بنديله تايم أوت دقيقة كاملة عشان لو الملف كبير بياخد وقت في القراية
        });
        
        // بنرجع الداتا لو الريكويست نجح
        return response.data;
    } catch (error) {
        // لو فشل، بنرمي الإيرور عشان الكنترولر يتعامل معاه
        throw new Error(error.response ? JSON.stringify(error.response.data) : error.message);
    }
};
