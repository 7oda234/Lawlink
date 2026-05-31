import Notification from '../../models/Notification.js'; 

export const getUserNotifications = async (req, res) => {
    try {
        // ✅ استخدام معرف المستخدم القادم من الرابط ومطابقته للـ Router
        const userId = req.params.userId || req.query.userId;
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "معرف المستخدم مطلوب لجلب الإشعارات" });
        }

        const notifications = await Notification.find({ recipientId: userId })
                                              .sort({ createdAt: -1 })
                                              .limit(50);
                                              
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
        console.error("❌ خطأ في جلب إشعارات MongoDB:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndUpdate(id, { isRead: true });
        res.status(200).json({ success: true, message: "تم قراءة الإشعار" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createNotification = async (recipientId, data) => {
    try {
        let notifData = { recipientId };
        
        if (typeof data === 'string') {
            notifData.message = data;
        } else {
            notifData.message = data.message;
            notifData.senderName = data.senderName || 'نظام LawLink';
            notifData.type = data.type || 'INFO';
            notifData.actionUrl = data.actionUrl || '#';
        }

        await Notification.create(notifData);
    } catch (error) {
        console.error("❌ خطأ في إنشاء الإشعار في MongoDB:", error);
    }
};
