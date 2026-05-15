import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    recipientId: { type: Number, required: true },
    message: { type: String, required: true },
    
    // ✅ الإضافات الجديدة للإشعارات الاحترافية
    senderName: { type: String, default: 'نظام LawLink' }, // اسم اللي بعت الإشعار
    type: { type: String, default: 'INFO' }, // نوع الإشعار (CHAT, APPOINTMENT, CASE, DOCUMENT)
    actionUrl: { type: String, default: '#' }, // الرابط اللي هيروحله لما يدوس
    
    isRead: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Notification', notificationSchema);