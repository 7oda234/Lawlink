import Notification from '../../models/Notification.js'; 

export const getUserNotifications = async (req, res) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.find({ recipientId: userId })
                                              .sort({ createdAt: -1 })
                                              .limit(50);
        res.status(200).json({ success: true, data: notifications });
    } catch (error) {
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

// ✅ تم التحديث ليدعم (الاسم، الأيقونة، والرابط)
export const createNotification = async (recipientId, data) => {
    try {
        let notifData = { recipientId };
        
        // لو بعتنا نص عادي (للتوافق مع الكود القديم)
        if (typeof data === 'string') {
            notifData.message = data;
        } else {
            // لو بعتنا أوبجكت فيه كل التفاصيل الجديدة
            notifData.message = data.message;
            notifData.senderName = data.senderName || 'نظام LawLink';
            notifData.type = data.type || 'INFO';
            notifData.actionUrl = data.actionUrl || '#';
        }

        const newNotification = await Notification.create(notifData);
    } catch (error) {
        console.error("❌ خطأ في إنشاء الإشعار في MongoDB:", error);
    }
};