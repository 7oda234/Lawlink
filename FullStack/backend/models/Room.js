import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    room_id: { type: String, required: true, unique: true }, 
    participants: [{ type: Number, required: true }] // أرقام الـ user_id من MariaDB
}, { timestamps: true });

export default mongoose.model('Room', roomSchema);