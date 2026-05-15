import { Server } from 'socket.io';
import Message from '../models/Message.js';
import Room from '../models/Room.js';
// ✅ استيراد الدالة الجديدة
import { createNotification } from '../modules/Notification/notification.controller.js';

export const initializeChatSocket = (server) => {
    const io = new Server(server, { cors: { origin: "*" } });

    io.on('connection', (socket) => {
        socket.on('join_room', async ({ room_id, participants }) => {
            socket.join(room_id);
            try {
                const existingRoom = await Room.findOne({ room_id });
                if (!existingRoom) await Room.create({ room_id, participants });
            } catch (error) { console.error('Error creating room:', error); }
        });

        socket.on('send_message', async (data) => {
            const { room_id, senderId, text } = data;
            try {
                const newMessage = await Message.create({ roomId: room_id, senderId, text });
                io.to(room_id).emit('receive_message', newMessage);

                // 🔔 إرسال الإشعار وتمرير الـ senderId عشان يجيب اسمه
                const ids = room_id.replace('room_', '').split('_');
                const targetUserId = ids.find(id => Number(id) !== Number(senderId));

                if (targetUserId) {
                    const previewText = text.length > 20 ? text.substring(0, 20) + '...' : text;
                    await createNotification(
                        Number(targetUserId), // المستقبل
                        Number(senderId),     // الراسل (عشان يجيب اسمه من ماريا دي بي)
                        `لديك رسالة جديدة 💬: ${previewText}`,
                        'CHAT',               // أيقونة ولون الشات
                        '/chat'               // الرابط اللي هيروحله
                    );
                }
            } catch (error) { console.error('Error saving message:', error); }
        });

        socket.on('disconnect', () => { /* ... */ });
    });

    return io;
};