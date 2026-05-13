import Message from '../../models/Message.js';

export const getChatHistory = async (req, res) => {
    try {
        const { roomId } = req.params;

        // جلب الرسائل وترتيبها من الأقدم للأحدث (عشان تظهر صح في واجهة الشات)
        const messages = await Message.find({ roomId }).sort({ createdAt: 1 });
        
        res.status(200).json({
            success: true,
            message: "تم جلب الرسائل بنجاح",
            data: messages
        });
    } catch (error) {
        console.error('❌ Error fetching chat history:', error);
        res.status(500).json({ 
            success: false, 
            message: 'حدث خطأ داخلي أثناء جلب الرسائل' 
        });
    }
};