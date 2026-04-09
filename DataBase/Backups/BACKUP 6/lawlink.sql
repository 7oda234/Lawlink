-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 02, 2026 at 02:28 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `lawlink`
--
CREATE DATABASE IF NOT EXISTS `lawlink` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `lawlink`;

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

DROP TABLE IF EXISTS `activity_log`;
CREATE TABLE `activity_log` (
  `log_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `user_id` bigint(20) NOT NULL,
  `authority_level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`user_id`, `authority_level`) VALUES
(1, '[level 5]'),
(5, 'SuperAdmin'),
(7, 'SuperAdmin');

-- --------------------------------------------------------

--
-- Table structure for table `ai_tools`
--

DROP TABLE IF EXISTS `ai_tools`;
CREATE TABLE `ai_tools` (
  `ai_id` bigint(20) NOT NULL,
  `confidence_score` decimal(4,2) DEFAULT NULL,
  `input_text` text DEFAULT NULL,
  `response_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ai_tools`
--

INSERT INTO `ai_tools` (`ai_id`, `confidence_score`, `input_text`, `response_text`, `created_at`, `user_id`) VALUES
(1, '0.95', 'ما هي حالة القضية رقم 101؟', 'القضية حالياً قيد النظر في المحكمة وموعدها القادم 15 مارس.', '2026-03-11 23:10:35', 2),
(2, '0.88', 'لخص محضر الجلسة الأخير', 'تم الاستماع لشهادة الشهود وتأجيل القضية لتقديم المستندات.', '2026-03-11 23:10:35', 3);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
  `appointment_id` bigint(20) NOT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--

DROP TABLE IF EXISTS `calls`;
CREATE TABLE `calls` (
  `call_id` bigint(20) NOT NULL,
  `quality_score` decimal(3,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `appointment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

DROP TABLE IF EXISTS `cases`;
CREATE TABLE `cases` (
  `case_id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','Ongoing','Closed') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `client_id` bigint(20) NOT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `user_id` bigint(20) NOT NULL,
  `income_level` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`user_id`, `income_level`) VALUES
(1, '15000.00'),
(2, '12000.50'),
(3, '8500.00'),
(4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE `document` (
  `document_id` bigint(20) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `feedback_id` bigint(20) NOT NULL,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `client_id` bigint(20) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers `feedback`
--
DROP TRIGGER IF EXISTS `update_lawyer_rating`;
DELIMITER $$
CREATE TRIGGER `update_lawyer_rating` AFTER INSERT ON `feedback` FOR EACH ROW BEGIN
  UPDATE lawyer
  SET rating_avg = (
    SELECT AVG(rating)
    FROM feedback
    WHERE lawyer_id = NEW.lawyer_id
  )
  WHERE user_id = NEW.lawyer_id;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `installment`
--

DROP TABLE IF EXISTS `installment`;
CREATE TABLE `installment` (
  `installment_id` bigint(20) NOT NULL,
  `payment_id` bigint(20) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('Pending','Paid','Overdue') DEFAULT 'Pending',
  `paid_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Triggers `installment`
--
DROP TRIGGER IF EXISTS `update_payment_status`;
DELIMITER $$
CREATE TRIGGER `update_payment_status` AFTER UPDATE ON `installment` FOR EACH ROW BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM installment
    WHERE payment_id = NEW.payment_id
      AND status != 'Paid'
  ) THEN
    UPDATE payment
    SET status = 'Paid'
    WHERE payment_id = NEW.payment_id;
  ELSE
    UPDATE payment
    SET status = 'Partial'
    WHERE payment_id = NEW.payment_id;
  END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice` (
  `invoice_id` bigint(20) NOT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_base`
--

DROP TABLE IF EXISTS `knowledge_base`;
CREATE TABLE `knowledge_base` (
  `knowledge_id` bigint(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `admin_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lawyer`
--

DROP TABLE IF EXISTS `lawyer`;
CREATE TABLE `lawyer` (
  `user_id` bigint(20) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `rating_avg` decimal(3,2) DEFAULT 0.00,
  `specialization` varchar(255) DEFAULT NULL,
  `license_number` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lawyer`
--

INSERT INTO `lawyer` (`user_id`, `verified`, `rating_avg`, `specialization`, `license_number`) VALUES
(2, 0, '0.00', NULL, NULL),
(6, 0, '0.00', 'جنائي', 'L12345'),
(8, 0, '0.00', 'تجاري', 'AAST-2026'),
(9, 0, '0.00', 'جنائي', 'LC-9988'),
(10, 0, '0.00', 'نقض وإداري', 'LC-2026-XYZ');

-- --------------------------------------------------------

--
-- Table structure for table `lawyer_office`
--

DROP TABLE IF EXISTS `lawyer_office`;
CREATE TABLE `lawyer_office` (
  `office_id` bigint(20) NOT NULL,
  `office_address` varchar(255) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `message_id` bigint(20) NOT NULL,
  `message_text` text NOT NULL,
  `send_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `notification_id` bigint(20) NOT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `status` enum('Pending','Partial','Paid') DEFAULT 'Pending',
  `currency` varchar(10) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL CHECK (`amount` > 0),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `task_id` bigint(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` enum('Client','Lawyer','Admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `Phone_no1` varchar(11) NOT NULL,
  `Phone_no2` varchar(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `Date_of_Birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(1, 'أحمد خالد', 'Admin', '2026-03-11 23:05:05', 'admin@gmail.com', '', 'ذكر', '01012345678', NULL, NULL, NULL),
(2, 'سارة الحلي', 'Lawyer', '2026-03-11 23:05:05', 'sara.l@gmail.com', '', 'أنثى', '01198765432', '01234567890', NULL, NULL),
(3, 'محمد خالد', 'Client', '2026-03-11 23:05:05', 'm.client@gmail.com', '', 'ذكر', '01555554444', NULL, NULL, NULL),
(4, 'محمود', 'Client', '2026-03-12 21:58:41', '', '', NULL, '', NULL, NULL, NULL),
(5, 'ياسين المدير', 'Admin', '2026-04-01 21:22:30', 'mahmoud@aast.edu', '', 'ذكر', '01200000000', NULL, NULL, '2002-01-01'),
(6, 'المحامي أحمد رأفت', 'Lawyer', '2026-04-01 21:34:08', 'ahmed.lawyer@lawlink.com', '', 'ذكر', '01099887766', NULL, NULL, '1985-05-20'),
(7, 'محمود المدير', 'Admin', '2026-04-01 21:45:21', 'admin.mahmoud@lawlink.com', '', 'ذكر', '01122334455', NULL, NULL, '1995-01-01'),
(8, 'محمود BIS', 'Lawyer', '2026-04-01 22:27:25', 'mahmoud.test@aast.edu', '$2b$10$49CaH0sNiL6R93p32TlfM.gz4TsAfzGZlStu28g7ymHuRnzFHg1zW', 'ذكر', '01001122334', NULL, NULL, '2002-05-15'),
(9, 'محمود خالد', 'Lawyer', '2026-04-01 22:34:07', 'mahmoud.test2026@aast.edu', '$2b$10$zkoehbxTKKutbua4Uuy5DuWru5C6ghhDvPwFscvefiut5.5tFu5le', 'ذكر', '01022334455', NULL, NULL, '2000-05-20'),
(10, 'يوسف علي', 'Lawyer', '2026-04-01 22:39:33', 'youssef.law@aast.edu', '$2b$10$UAah5XBRWZgzfGsz1OO7UOuWySBj7QesGNY4k6omA3S9bDt40lYzO', 'ذكر', '01288776655', NULL, NULL, '1998-10-12');

--
-- Triggers `users`
--
DROP TRIGGER IF EXISTS `after_user_insert`;
DELIMITER $$
CREATE TRIGGER `after_user_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    IF NEW.role = 'lawyer' THEN
        INSERT INTO lawyer (user_id)
        VALUES (NEW.user_id);

    ELSEIF NEW.role = 'client' THEN
        INSERT INTO client (user_id)
        VALUES (NEW.user_id);

    ELSEIF NEW.role = 'admin' THEN
        INSERT INTO admin (user_id)
        VALUES (NEW.user_id);
    END IF;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `wallet_id` bigint(20) NOT NULL,
  `balance` decimal(12,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD PRIMARY KEY (`log_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `ai_tools`
--
ALTER TABLE `ai_tools`
  ADD PRIMARY KEY (`ai_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `appointment`
--
ALTER TABLE `appointment`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `case_id` (`case_id`),
  ADD KEY `fk_app_client` (`client_id`),
  ADD KEY `fk_app_lawyer` (`lawyer_id`);

--
-- Indexes for table `calls`
--
ALTER TABLE `calls`
  ADD PRIMARY KEY (`call_id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Indexes for table `cases`
--
ALTER TABLE `cases`
  ADD PRIMARY KEY (`case_id`),
  ADD KEY `idx_cases_client` (`client_id`),
  ADD KEY `idx_cases_lawyer` (`lawyer_id`),
  ADD KEY `idx_cases_status` (`status`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `document`
--
ALTER TABLE `document`
  ADD PRIMARY KEY (`document_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_id`),
  ADD KEY `case_id` (`case_id`),
  ADD KEY `idx_feedback_lawyer` (`lawyer_id`),
  ADD KEY `fk_feedback_client` (`client_id`);

--
-- Indexes for table `installment`
--
ALTER TABLE `installment`
  ADD PRIMARY KEY (`installment_id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD UNIQUE KEY `invoice_number` (`invoice_number`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `knowledge_base`
--
ALTER TABLE `knowledge_base`
  ADD PRIMARY KEY (`knowledge_id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `lawyer`
--
ALTER TABLE `lawyer`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `license_number` (`license_number`);

--
-- Indexes for table `lawyer_office`
--
ALTER TABLE `lawyer_office`
  ADD PRIMARY KEY (`office_id`),
  ADD KEY `lawyer_id` (`lawyer_id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `idx_payment_case` (`case_id`),
  ADD KEY `idx_payment_client` (`client_id`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`task_id`),
  ADD KEY `case_id` (`case_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_email` (`email`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`wallet_id`),
  ADD UNIQUE KEY `User_ID` (`user_id`) USING BTREE;

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity_log`
--
ALTER TABLE `activity_log`
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ai_tools`
--
ALTER TABLE `ai_tools`
  MODIFY `ai_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `calls`
--
ALTER TABLE `calls`
  MODIFY `call_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `case_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `document_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `installment`
--
ALTER TABLE `installment`
  MODIFY `installment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `knowledge_base`
--
ALTER TABLE `knowledge_base`
  MODIFY `knowledge_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lawyer_office`
--
ALTER TABLE `lawyer_office`
  MODIFY `office_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `activity_log`
--
ALTER TABLE `activity_log`
  ADD CONSTRAINT `activity_log_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `admin_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ai_tools`
--
ALTER TABLE `ai_tools`
  ADD CONSTRAINT `ai_tools_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `appointment`
--
ALTER TABLE `appointment`
  ADD CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`user_id`),
  ADD CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer` (`user_id`),
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`),
  ADD CONSTRAINT `fk_app_client` FOREIGN KEY (`client_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_app_lawyer` FOREIGN KEY (`lawyer_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `calls`
--
ALTER TABLE `calls`
  ADD CONSTRAINT `calls_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointment` (`appointment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cases`
--
ALTER TABLE `cases`
  ADD CONSTRAINT `cases_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cases_ibfk_2` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_cases_client` FOREIGN KEY (`client_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_cases_lawyer` FOREIGN KEY (`lawyer_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `client`
--
ALTER TABLE `client`
  ADD CONSTRAINT `client_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `document`
--
ALTER TABLE `document`
  ADD CONSTRAINT `document_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `document_ibfk_2` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`user_id`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer` (`user_id`),
  ADD CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`),
  ADD CONSTRAINT `fk_feedback_client` FOREIGN KEY (`client_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_feedback_lawyer` FOREIGN KEY (`lawyer_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `installment`
--
ALTER TABLE `installment`
  ADD CONSTRAINT `installment_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`);

--
-- Constraints for table `knowledge_base`
--
ALTER TABLE `knowledge_base`
  ADD CONSTRAINT `knowledge_base_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`user_id`);

--
-- Constraints for table `lawyer`
--
ALTER TABLE `lawyer`
  ADD CONSTRAINT `lawyer_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lawyer_office`
--
ALTER TABLE `lawyer_office`
  ADD CONSTRAINT `lawyer_office_ibfk_1` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer` (`user_id`);

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`user_id`),
  ADD CONSTRAINT `payment_ibfk_2` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`);

--
-- Constraints for table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `fk_wallet_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `fk_wallet_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
