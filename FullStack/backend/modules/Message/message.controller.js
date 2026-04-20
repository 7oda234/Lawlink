import * as messageService from './message.service.js';

/**
 * ✅ جلب المحادثة + تحديث حالة القراءة (Seen) تلقائياً
 */
export const getHistory = async (req, res) => {
    try {
        const { receiverId } = req.params; // ID الشخص الآخر (المرسل الأصلي للرسائل)
        const senderId = req.user.userId;  // ID المستخدم الحالي (المستلم الذي يقرأ الآن)

        // 1. جلب تاريخ المحادثة
        const history = await messageService.getChatHistoryService(senderId, receiverId);

        // 2. تحديث الرسائل التي استلمها المستخدم الحالي لتصبح "مقروءة"
        // نمرر senderId (المستلم الحالي) و receiverId (المرسل الآخر)
        await messageService.markAsReadService(senderId, receiverId);

        res.status(200).json({ 
            success: true, 
            message: "تم جلب المحادثة وتحديث حالة القراءة بنجاح ✅",
            history 
        });
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
};

/**
 * ✅ إرسال رسالة جديدة
 */
export const sendMessage = async (req, res) => {
    try {
        const { receiverId, messageText } = req.body;
        const senderId = req.user.userId;
        
        const messageId = await messageService.sendMessageService(senderId, receiverId, messageText);
        
        res.status(201).json({ success: true, messageId });
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
};

/**
 * ✅ تعديل رسالة
 */
export const editMessage = async (req, res) => {
    try {
        const { messageId } = req.params;
        const { newMessageText } = req.body;
        const senderId = req.user.userId;

        const isUpdated = await messageService.updateMessageService(messageId, senderId, newMessageText);
        
        if (!isUpdated) return res.status(403).json({ success: false, message: "لا يمكن التعديل (قد لا تكون صاحب الرسالة)" });
        
        res.status(200).json({ success: true, message: "تم التعديل بنجاح" });
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
};

/**
 * ✅ تحديث يدوي للحالة (Seen) - اختياري بعد تعديل getHistory
 */
export const markSeen = async (req, res) => {
    try {
        const { senderId } = req.params; 
        const receiverId = req.user.userId; 
        await messageService.markAsReadService(receiverId, senderId);
        res.status(200).json({ success: true, message: "Marked as seen" });
    } catch (error) { 
        res.status(500).json({ success: false, message: error.message }); 
    }
};