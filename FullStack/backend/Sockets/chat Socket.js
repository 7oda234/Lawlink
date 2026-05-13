import { Server } from 'socket.io';
import Message from '../models/Message.js';
import Room from '../models/Room.js';

// مصفوفة لتخزين معرفات المستخدمين المتصلين حالياً
let onlineUsers = new Set(); 

export const initializeChatSocket = (server) => {
    const io = new Server(server, {
        cors: { origin: "*" }
    });

    io.on('connection', (socket) => {
        console.log('💬 User connected to Chat:', socket.id);

        // عند اتصال المستخدم، يرسل معرفه (userId) لتسجيله كمتصل
        socket.on('user_connected', (userId) => {
            if (userId) {
                socket.userId = userId; // تخزين المعرف في كائن الـ socket
                onlineUsers.add(Number(userId));
                // بث قائمة المستخدمين المتصلين للجميع
                io.emit('get_online_users', Array.from(onlineUsers));
            }
        });

        socket.on('join_room', async ({ room_id, participants }) => {
            socket.join(room_id);
            try {
                const existingRoom = await Room.findOne({ room_id });
                if (!existingRoom) {
                    await Room.create({ room_id, participants });
                }
            } catch (error) {
                console.error('Error creating room:', error);
            }
        });

        socket.on('send_message', async (data) => {
            const { room_id, senderId, text } = data;
            try {
                const newMessage = await Message.create({ roomId: room_id, senderId, text });
                io.to(room_id).emit('receive_message', newMessage);
            } catch (error) {
                console.error('Error saving message:', error);
            }
        });

        socket.on('disconnect', () => {
            if (socket.userId) {
                onlineUsers.delete(Number(socket.userId));
                // تحديث القائمة للجميع بعد خروج المستخدم
                io.emit('get_online_users', Array.from(onlineUsers));
                console.log(`👋 User ${socket.userId} went Offline`);
            }
        });
    });

    return io;
};