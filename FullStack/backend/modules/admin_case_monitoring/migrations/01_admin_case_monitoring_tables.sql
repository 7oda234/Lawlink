-- Admin Case Monitoring schema (MariaDB/MySQL)
-- NOTE: Execute manually or via a migration runner.

-- case_activities
CREATE TABLE IF NOT EXISTS case_activities (
  activity_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NOT NULL,
  type VARCHAR(64) DEFAULT 'NOTE',
  text TEXT NULL,
  actor_user_id BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_case_activities_case_created (case_id, created_at),
  CONSTRAINT fk_case_activities_case FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

-- case_messages
CREATE TABLE IF NOT EXISTS case_messages (
  message_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NOT NULL,
  sender_user_id BIGINT NOT NULL,
  text TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_case_messages_case_created (case_id, created_at),
  CONSTRAINT fk_case_messages_case FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

-- hearings
CREATE TABLE IF NOT EXISTS hearings (
  hearing_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NOT NULL,
  hearing_type VARCHAR(128) NULL,
  due_date DATETIME NULL,
  notes TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_hearings_case_due (case_id, due_date),
  CONSTRAINT fk_hearings_case FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

-- documents
CREATE TABLE IF NOT EXISTS documents (
  document_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NOT NULL,
  file_url VARCHAR(512) NULL,
  file_name VARCHAR(255) NULL,
  uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  uploaded_by BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_documents_case_uploaded (case_id, uploaded_at),
  CONSTRAINT fk_documents_case FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

-- escalations
CREATE TABLE IF NOT EXISTS escalations (
  escalation_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NOT NULL,
  reason VARCHAR(512) NULL,
  actor_user_id BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_escalations_case_created (case_id, created_at),
  CONSTRAINT fk_escalations_case FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

-- notifications (used for alerts)
CREATE TABLE IF NOT EXISTS notifications (
  notification_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NULL,
  type VARCHAR(64) DEFAULT 'ALERT',
  message TEXT NULL,
  is_read TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_notifications_case_created (case_id, created_at)
);

-- admin_logs
CREATE TABLE IF NOT EXISTS admin_logs (
  log_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NULL,
  action VARCHAR(128) NOT NULL,
  actor_user_id BIGINT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_admin_logs_case_created (case_id, created_at)
);

-- lawyer_performance
CREATE TABLE IF NOT EXISTS lawyer_performance (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  lawyer_id BIGINT NOT NULL,
  metric_name VARCHAR(128) NOT NULL,
  metric_value DECIMAL(10,4) DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_lawyer_performance (lawyer_id, metric_name, created_at)
);

-- case_deadlines
CREATE TABLE IF NOT EXISTS case_deadlines (
  deadline_id BIGINT AUTO_INCREMENT PRIMARY KEY,
  case_id BIGINT NOT NULL,
  due_date DATETIME NULL,
  kind VARCHAR(128) DEFAULT 'HEARING',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  deleted_at DATETIME NULL,
  INDEX idx_case_deadlines_case_due (case_id, due_date),
  CONSTRAINT fk_case_deadlines_case FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

