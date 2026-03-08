-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 26, 2026 at 11:07 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

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
CREATE TABLE IF NOT EXISTS `activity_log` (
  `log_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `activity_log`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `user_id` bigint(20) NOT NULL,
  `authority_level` int(11) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `admin`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `ai_tools`
--

DROP TABLE IF EXISTS `ai_tools`;
CREATE TABLE IF NOT EXISTS `ai_tools` (
  `ai_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `confidence_score` decimal(4,2) DEFAULT NULL,
  `input_text` text DEFAULT NULL,
  `response_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`ai_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `ai_tools`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE IF NOT EXISTS `appointment` (
  `appointment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `appointment_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `client_id` (`client_id`),
  KEY `lawyer_id` (`lawyer_id`),
  KEY `case_id` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `appointment`:
--   `client_id`
--       `client` -> `user_id`
--   `lawyer_id`
--       `lawyer` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--

DROP TABLE IF EXISTS `calls`;
CREATE TABLE IF NOT EXISTS `calls` (
  `call_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quality_score` decimal(3,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `appointment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`call_id`),
  KEY `appointment_id` (`appointment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `calls`:
--   `appointment_id`
--       `appointment` -> `appointment_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

DROP TABLE IF EXISTS `cases`;
CREATE TABLE IF NOT EXISTS `cases` (
  `case_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` enum('Pending','Ongoing','Closed') DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `client_id` bigint(20) NOT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`case_id`),
  KEY `idx_cases_client` (`client_id`),
  KEY `idx_cases_lawyer` (`lawyer_id`),
  KEY `idx_cases_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `cases`:
--   `client_id`
--       `client` -> `user_id`
--   `lawyer_id`
--       `lawyer` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `user_id` bigint(20) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `income_level` decimal(12,2) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `client`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE IF NOT EXISTS `document` (
  `document_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`document_id`),
  KEY `user_id` (`user_id`),
  KEY `case_id` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `document`:
--   `user_id`
--       `users` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

DROP TABLE IF EXISTS `feedback`;
CREATE TABLE IF NOT EXISTS `feedback` (
  `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `rating` int(11) DEFAULT NULL CHECK (`rating` between 1 and 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `client_id` bigint(20) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`feedback_id`),
  KEY `client_id` (`client_id`),
  KEY `case_id` (`case_id`),
  KEY `idx_feedback_lawyer` (`lawyer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `feedback`:
--   `client_id`
--       `client` -> `user_id`
--   `lawyer_id`
--       `lawyer` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--

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
CREATE TABLE IF NOT EXISTS `installment` (
  `installment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `payment_id` bigint(20) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('Pending','Paid','Overdue') DEFAULT 'Pending',
  `paid_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`installment_id`),
  KEY `payment_id` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `installment`:
--   `payment_id`
--       `payment` -> `payment_id`
--

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
CREATE TABLE IF NOT EXISTS `invoice` (
  `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `invoice_number` varchar(100) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`invoice_id`),
  UNIQUE KEY `invoice_number` (`invoice_number`),
  KEY `payment_id` (`payment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `invoice`:
--   `payment_id`
--       `payment` -> `payment_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_base`
--

DROP TABLE IF EXISTS `knowledge_base`;
CREATE TABLE IF NOT EXISTS `knowledge_base` (
  `knowledge_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `admin_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`knowledge_id`),
  KEY `admin_id` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `knowledge_base`:
--   `admin_id`
--       `admin` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `lawyer`
--

DROP TABLE IF EXISTS `lawyer`;
CREATE TABLE IF NOT EXISTS `lawyer` (
  `user_id` bigint(20) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `rating_avg` decimal(3,2) DEFAULT 0.00,
  `specialization` varchar(255) DEFAULT NULL,
  `license_number` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `license_number` (`license_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `lawyer`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `lawyer_office`
--

DROP TABLE IF EXISTS `lawyer_office`;
CREATE TABLE IF NOT EXISTS `lawyer_office` (
  `office_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `office_address` varchar(255) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`office_id`),
  KEY `lawyer_id` (`lawyer_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `lawyer_office`:
--   `lawyer_id`
--       `lawyer` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `message_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message_text` text NOT NULL,
  `send_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`message_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `message`:
--

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE IF NOT EXISTS `notification` (
  `notification_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`notification_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `notification`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
CREATE TABLE IF NOT EXISTS `payment` (
  `payment_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `status` enum('Pending','Partial','Paid') DEFAULT 'Pending',
  `currency` varchar(10) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL CHECK (`amount` > 0),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `idx_payment_case` (`case_id`),
  KEY `idx_payment_client` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `payment`:
--   `client_id`
--       `client` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE IF NOT EXISTS `task` (
  `task_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `case_id` (`case_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `task`:
--   `case_id`
--       `cases` -> `case_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `role` enum('Client','Lawyer','Admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `idx_users_email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

-- --------------------------------------------------------

--
-- Table structure for table `user_phone_number`
--

DROP TABLE IF EXISTS `user_phone_number`;
CREATE TABLE IF NOT EXISTS `user_phone_number` (
  `phone_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`phone_id`),
  KEY `idx_user_phone_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_phone_number`:
--   `user_id`
--       `users` -> `user_id`
--

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE IF NOT EXISTS `wallet` (
  `wallet_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `balance` decimal(12,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`wallet_id`),
  UNIQUE KEY `client_id` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `wallet`:
--   `client_id`
--       `client` -> `user_id`
--

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
  ADD CONSTRAINT `appointment_ibfk_3` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`);

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
  ADD CONSTRAINT `cases_ibfk_2` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

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
  ADD CONSTRAINT `feedback_ibfk_3` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`);

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
-- Constraints for table `user_phone_number`
--
ALTER TABLE `user_phone_number`
  ADD CONSTRAINT `user_phone_number_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `client` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
