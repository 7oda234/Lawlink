// /**
//  * Notification Model
//  * 
//  * Represents notifications sent to users (lawyers, clients, admins)
//  * Supports different notification types with real-time delivery via Socket.IO
//  */

// export const notificationSchema = {
//   notification_id: { type: 'INT', primaryKey: true, autoIncrement: true },
//   title: { type: 'VARCHAR(255)', required: true },
//   message: { type: 'TEXT', required: true },
//   type: { 
//     type: 'ENUM(...)', 
//     values: [
//       'OFFER_ACCEPTED',
//       'AWAITING_RESPONSE',
//       'DOCUMENT_UPLOADED',
//       'CASE_STATUS_CHANGED',
//       'PAYMENT_RECEIVED',
//       'INVOICE_CREATED',
//       'COURT_SESSION',
//       'MESSAGE_RECEIVED',
//       'ANNOUNCEMENT',
//       'CASE_COMPLETED'
//     ],
//     required: true 
//   },
//   related_case_id: { type: 'INT', nullable: true, foreignKey: 'cases.case_id' },
//   sender_id: { type: 'INT', nullable: true, foreignKey: 'users.user_id' },
//   receiver_id: { type: 'INT', required: true, foreignKey: 'users.user_id' },
//   is_read: { type: 'BOOLEAN', default: false },
//   action_url: { type: 'VARCHAR(500)', nullable: true },
//   metadata: { type: 'JSON', nullable: true },
//   created_at: { type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP' },
//   updated_at: { type: 'TIMESTAMP', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' }
// };

// /**
//  * SQL CREATE TABLE statement for notifications
//  */
// export const createNotificationTableSQL = `
//   CREATE TABLE IF NOT EXISTS notifications (
//     notification_id INT PRIMARY KEY AUTO_INCREMENT,
//     title VARCHAR(255) NOT NULL,
//     message TEXT NOT NULL,
//     type ENUM(
//       'OFFER_ACCEPTED',
//       'AWAITING_RESPONSE',
//       'DOCUMENT_UPLOADED',
//       'CASE_STATUS_CHANGED',
//       'PAYMENT_RECEIVED',
//       'INVOICE_CREATED',
//       'COURT_SESSION',
//       'MESSAGE_RECEIVED',
//       'ANNOUNCEMENT',
//       'CASE_COMPLETED'
//     ) NOT NULL,
//     related_case_id INT NULLABLE,
//     sender_id INT NULLABLE,
//     receiver_id INT NOT NULL,
//     is_read BOOLEAN DEFAULT FALSE,
//     action_url VARCHAR(500) NULLABLE,
//     metadata JSON NULLABLE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
//     FOREIGN KEY (related_case_id) REFERENCES cases(case_id) ON DELETE SET NULL,
//     FOREIGN KEY (sender_id) REFERENCES users(user_id) ON DELETE SET NULL,
//     FOREIGN KEY (receiver_id) REFERENCES users(user_id) ON DELETE CASCADE,
    
//     INDEX idx_receiver_id (receiver_id),
//     INDEX idx_is_read (is_read),
//     INDEX idx_type (type),
//     INDEX idx_created_at (created_at),
//     INDEX idx_receiver_read (receiver_id, is_read)
//   );
// `;

// export default notificationSchema;
