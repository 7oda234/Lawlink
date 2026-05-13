import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    senderId: { type: Number, required: true }, // رقم المرسل من MariaDB
    text: { type: String, required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('Message', messageSchema);