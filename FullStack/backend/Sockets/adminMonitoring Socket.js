import { nanoid } from 'nanoid';

// Admin Monitoring Socket handlers
// Uses the existing Socket.IO instance created in ./Sockets/chat Socket.js (global.io)

const ADMIN_MONITORING_ROOM = 'admin-monitoring';

export const registerAdminMonitoringSocketHandlers = () => {
  const io = global.io;
  if (!io) {
    console.error('registerAdminMonitoringSocketHandlers: global.io missing');
    return;
  }

  io.on('connection', (socket) => {

    const joinId = nanoid(8);

    // Admin subscriptions (auto join)
    socket.join(ADMIN_MONITORING_ROOM);

    // Optional: let client request specific case room
    socket.on('admin:subscribe_case', ({ caseId } = {}) => {
      if (caseId === undefined || caseId === null) return;
      socket.join(`case-${caseId}`);
    });

    socket.on('admin:unsubscribe_case', ({ caseId } = {}) => {
      if (caseId === undefined || caseId === null) return;
      socket.leave(`case-${caseId}`);
    });

    socket.on('disconnect', () => {
      // Rooms are cleaned automatically by Socket.IO when socket disconnects.
      // Keeping hook for future audit/logging.
    });

    // Useful handshake for debugging
    socket.emit('admin:socket_ready', { joinId });
  });
};

export const emitToAdminMonitoring = (event, payload) => {
  const io = global.io;
  if (!io) return;
  io.to(ADMIN_MONITORING_ROOM).emit(event, payload);
};

export const emitToCaseRoom = (caseId, event, payload) => {
  const io = global.io;
  if (!io) return;
  io.to(`case-${caseId}`).emit(event, payload);
};

