-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 05, 2026 at 01:27 AM
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
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 10:15 PM
--

DROP TABLE IF EXISTS `activity_log`;
CREATE TABLE `activity_log` (
  `log_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `action` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `activity_log`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`log_id`, `user_id`, `action`, `created_at`) VALUES
(1, 7, 'Viewed consultation schedule', '2026-03-01 08:15:22'),
(2, 8, 'Uploaded new contract template', '2026-03-01 09:05:10'),
(3, 11, 'Modified system backup settings', '2026-03-02 07:00:00'),
(4, 10, 'Searched for \"intellectual property precedents\"', '2026-03-02 12:33:45'),
(5, 12, 'Downloaded invoice #4092', '2026-03-03 14:20:11');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--
-- Creation: Mar 04, 2026 at 10:17 PM
-- Last update: Mar 04, 2026 at 10:21 PM
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `user_id` bigint(20) NOT NULL,
  `authority_level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `admin`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`user_id`, `authority_level`) VALUES
(11, 'Level 3');

-- --------------------------------------------------------

--
-- Table structure for table `ai_tools`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 10:15 PM
--

DROP TABLE IF EXISTS `ai_tools`;
CREATE TABLE `ai_tools` (
  `ai_id` bigint(20) NOT NULL,
  `confidence_score` decimal(4,2) DEFAULT NULL,
  `input_text` text DEFAULT NULL,
  `response_text` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `ai_tools`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `ai_tools`
--

INSERT INTO `ai_tools` (`ai_id`, `confidence_score`, `input_text`, `response_text`, `created_at`, `user_id`) VALUES
(1, 0.94, 'Summarize the changes to the 2025 corporate tax code.', 'The 2025 amendments introduce three major changes to corporate tax deductions...', '2026-03-01 10:45:00', 8),
(2, 0.88, 'What is the standard procedure for filing a trademark?', 'Filing a trademark requires submitting form TM-1 alongside the proposed visual asset...', '2026-03-02 08:12:30', 9),
(3, 0.97, 'Draft a standard non-disclosure agreement for a tech startup.', 'Here is a standard mutual NDA tailored for software development contexts...', '2026-03-03 13:50:22', 10),
(4, 0.76, 'Can I sue my landlord for a broken AC?', 'Tenant rights regarding appliance maintenance depend on the specific terms of your lease...', '2026-03-04 07:20:10', 7);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--
-- Creation: Mar 05, 2026 at 12:26 AM
--

DROP TABLE IF EXISTS `appointment`;
CREATE TABLE `appointment` (
  `appointment_id` bigint(20) NOT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `appointment`:
--   `client_id`
--       `client` -> `user_id`
--   `lawyer_id`
--       `lawyer` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--   `client_id`
--       `users` -> `user_id`
--   `lawyer_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `appointment_date`, `status`, `client_id`, `lawyer_id`, `case_id`) VALUES
(21, '2026-02-10 09:30:00', 'Completed', 7, 8, 101),
(22, '2026-02-12 11:00:00', 'Completed', 9, 10, 102),
(23, '2026-02-15 14:00:00', 'Cancelled', 12, 8, 103),
(24, '2026-02-18 10:15:00', 'Completed', 7, 10, 104),
(25, '2026-02-20 16:30:00', 'Completed', 9, 8, 105),
(26, '2026-02-22 13:00:00', 'No Show', 12, 10, 106),
(27, '2026-02-25 09:00:00', 'Completed', 7, 8, 101),
(28, '2026-02-28 15:45:00', 'Completed', 9, 10, 102),
(29, '2026-03-01 10:00:00', 'Completed', 12, 8, 107),
(30, '2026-03-02 11:30:00', 'Completed', 7, 10, 108),
(31, '2026-03-03 14:00:00', 'Rescheduled', 9, 8, 109),
(32, '2026-03-04 09:15:00', 'Scheduled', 12, 10, 110),
(33, '2026-03-05 13:30:00', 'Scheduled', 7, 8, 101),
(34, '2026-03-08 10:00:00', 'Scheduled', 9, 10, 102),
(35, '2026-03-10 11:45:00', 'Scheduled', 12, 8, 107),
(36, '2026-03-12 15:00:00', 'Scheduled', 7, 10, 108),
(37, '2026-03-15 09:30:00', 'Scheduled', 9, 8, 105),
(38, '2026-03-18 14:15:00', 'Scheduled', 12, 10, 110),
(39, '2026-03-20 16:00:00', 'Scheduled', 7, 8, 111),
(40, '2026-03-25 10:30:00', 'Scheduled', 9, 10, 112);

-- --------------------------------------------------------

--
-- Table structure for table `calls`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 10:31 PM
--

DROP TABLE IF EXISTS `calls`;
CREATE TABLE `calls` (
  `call_id` bigint(20) NOT NULL,
  `quality_score` decimal(3,2) DEFAULT NULL,
  `duration` int(11) DEFAULT NULL,
  `appointment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `calls`:
--   `appointment_id`
--       `appointment` -> `appointment_id`
--

--
-- Dumping data for table `calls`
--

INSERT INTO `calls` (`call_id`, `quality_score`, `duration`, `appointment_id`) VALUES
(9, 4.85, 1800, 21),
(10, 3.50, 2400, 22),
(11, 5.00, 900, 24),
(12, 4.20, 3600, 25),
(13, 2.10, 120, 27),
(14, 4.90, 2100, 28),
(15, 4.50, 1500, 29),
(16, 4.75, 2700, 30);

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--
-- Creation: Mar 05, 2026 at 12:26 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `cases`:
--   `client_id`
--       `client` -> `user_id`
--   `lawyer_id`
--       `lawyer` -> `user_id`
--   `client_id`
--       `users` -> `user_id`
--   `lawyer_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`case_id`, `title`, `category`, `description`, `status`, `created_at`, `deleted_at`, `client_id`, `lawyer_id`) VALUES
(101, 'Corporate Tax Audit', 'Tax Law', 'Review and preparation of 2025 financial statements for annual audit.', 'Ongoing', '2026-03-04 22:24:59', NULL, 7, 8),
(102, 'Trademark Infringement Claim', 'Intellectual Property', 'Filing a cease and desist against a competitor for unauthorized logo use.', 'Ongoing', '2026-03-04 22:24:59', NULL, 9, 10),
(103, 'Commercial Lease Review', 'Real Estate', 'Reviewing standard commercial lease terms for a new office space.', 'Closed', '2026-03-04 22:24:59', NULL, 12, 8),
(104, 'Employment Dispute Defense', 'Labor Law', 'Defending against a wrongful termination claim from a former employee.', 'Ongoing', '2026-03-04 22:24:59', NULL, 7, 10),
(105, 'Supplier Breach of Contract', 'Corporate Law', 'Litigation regarding a supplier failing to deliver manufacturing goods on schedule.', 'Pending', '2026-03-04 22:24:59', NULL, 9, 8),
(106, 'Divorce Mediation', 'Family Law', 'Asset division and custody mediation settlement.', 'Closed', '2026-03-04 22:24:59', NULL, 12, 10),
(107, 'Commercial Property Dispute', 'Real Estate', 'Boundary line and easement disagreement with adjacent commercial lot.', 'Ongoing', '2026-03-04 22:24:59', NULL, 12, 8),
(108, 'Tech Startup Incorporation', 'Corporate Law', 'Drafting articles of incorporation and initial founder agreements.', 'Pending', '2026-03-04 22:24:59', NULL, 7, 10),
(109, 'Software Patent Application', 'Intellectual Property', 'Drafting and filing a utility patent for a proprietary backend algorithm.', 'Ongoing', '2026-03-04 22:24:59', NULL, 9, 8),
(110, 'Personal Injury Compensation', 'Civil Litigation', 'Filing a claim for medical compensation following a minor traffic accident.', 'Pending', '2026-03-04 22:24:59', NULL, 12, 10),
(111, 'Firm Merger & Acquisition', 'Corporate Law', 'Due diligence and legal structuring for acquiring a smaller agency.', 'Ongoing', '2026-03-04 22:24:59', NULL, 7, 8),
(112, 'Unpaid Invoice Debt Collection', 'Civil Litigation', 'Recovering outstanding balances exceeding $50,000 from a corporate client.', 'Closed', '2026-03-04 22:24:59', NULL, 9, 10);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 10:29 PM
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `user_id` bigint(20) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `income_level` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `client`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`user_id`, `date_of_birth`, `income_level`) VALUES
(7, '1985-06-15', 75000.00),
(9, '1992-11-03', 120000.50),
(12, '1988-02-21', 54000.00);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 10:49 PM
--

DROP TABLE IF EXISTS `document`;
CREATE TABLE `document` (
  `document_id` bigint(20) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `document`:
--   `user_id`
--       `users` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`document_id`, `file_path`, `created_at`, `user_id`, `case_id`) VALUES
(1, '/uploads/cases/101/2025_financial_statements.pdf', '2026-03-04 22:49:23', 7, 101),
(2, '/uploads/cases/101/audit_response_draft_v1.docx', '2026-03-04 22:49:23', 8, 101),
(3, '/uploads/cases/102/original_trademark_registration.pdf', '2026-03-04 22:49:23', 9, 102),
(4, '/uploads/cases/102/competitor_website_screenshots.png', '2026-03-04 22:49:23', 9, 102),
(5, '/uploads/cases/102/cease_and_desist_final.pdf', '2026-03-04 22:49:23', 10, 102),
(6, '/uploads/cases/103/commercial_lease_agreement_signed.pdf', '2026-03-04 22:49:23', 12, 103),
(7, '/uploads/cases/104/employee_onboarding_contract.pdf', '2026-03-04 22:49:23', 7, 104),
(8, '/uploads/cases/104/hr_termination_notice.pdf', '2026-03-04 22:49:23', 7, 104),
(9, '/uploads/cases/106/asset_declaration_form.pdf', '2026-03-04 22:49:23', 12, 106),
(10, '/uploads/cases/106/mediation_settlement_draft.docx', '2026-03-04 22:49:23', 10, 106),
(11, '/uploads/users/id_verification/user_7_passport.pdf', '2026-03-04 22:49:23', 7, NULL),
(12, '/uploads/users/id_verification/user_9_national_id.pdf', '2026-03-04 22:49:23', 9, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--
-- Creation: Mar 05, 2026 at 12:26 AM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `feedback`:
--   `client_id`
--       `client` -> `user_id`
--   `lawyer_id`
--       `lawyer` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--   `client_id`
--       `users` -> `user_id`
--   `lawyer_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`feedback_id`, `rating`, `comment`, `created_at`, `client_id`, `lawyer_id`, `case_id`) VALUES
(1, 5, 'Excellent representation. The audit process was smooth and stress-free.', '2026-03-04 23:31:34', 7, 8, 101),
(2, 4, 'Good work on the cease and desist, but communication could be slightly faster.', '2026-03-04 23:31:34', 9, 10, 102),
(3, 5, 'Very thorough review of my commercial lease. Caught several unfavorable clauses!', '2026-03-04 23:31:34', 12, 8, 103),
(4, 3, 'Mediation is ongoing, but progress feels a bit slow right now.', '2026-03-04 23:31:34', 12, 10, 106);

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
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 11:31 PM
--

DROP TABLE IF EXISTS `installment`;
CREATE TABLE `installment` (
  `installment_id` bigint(20) NOT NULL,
  `payment_id` bigint(20) NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `due_date` date NOT NULL,
  `status` enum('Pending','Paid','Overdue') DEFAULT 'Pending',
  `paid_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `installment`:
--   `payment_id`
--       `payment` -> `payment_id`
--

--
-- Dumping data for table `installment`
--

INSERT INTO `installment` (`installment_id`, `payment_id`, `amount`, `due_date`, `status`, `paid_at`) VALUES
(1, 2, 12500.00, '2026-02-28', 'Paid', '2026-02-27 08:15:00'),
(2, 2, 12500.00, '2026-03-30', 'Pending', NULL),
(3, 5, 15000.00, '2026-02-15', 'Paid', '2026-02-14 07:00:00'),
(4, 5, 15000.00, '2026-03-01', 'Overdue', NULL),
(5, 5, 10000.00, '2026-04-01', 'Pending', NULL);

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
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 11:31 PM
--

DROP TABLE IF EXISTS `invoice`;
CREATE TABLE `invoice` (
  `invoice_id` bigint(20) NOT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `invoice`:
--   `payment_id`
--       `payment` -> `payment_id`
--

--
-- Dumping data for table `invoice`
--

INSERT INTO `invoice` (`invoice_id`, `invoice_number`, `issue_date`, `payment_id`) VALUES
(1, 'INV-2026-001', '2026-02-12', 1),
(2, 'INV-2026-002', '2026-02-15', 2),
(3, 'INV-2026-003', '2026-02-20', 3),
(4, 'INV-2026-004', '2026-02-25', 4),
(5, 'INV-2026-005', '2026-03-01', 5);

-- --------------------------------------------------------

--
-- Table structure for table `knowledge_base`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 05, 2026 at 12:21 AM
--

DROP TABLE IF EXISTS `knowledge_base`;
CREATE TABLE `knowledge_base` (
  `knowledge_id` bigint(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `admin_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `knowledge_base`:
--   `admin_id`
--       `admin` -> `user_id`
--

--
-- Dumping data for table `knowledge_base`
--

INSERT INTO `knowledge_base` (`knowledge_id`, `title`, `content`, `category`, `created_at`, `admin_id`) VALUES
(1, 'How to Upload Secure Documents', 'Step-by-step guide for clients to safely upload identification and contracts...', 'System Guide', '2026-03-05 00:21:40', 11),
(2, '2025 Corporate Tax Amendments', 'A quick reference guide for our legal staff regarding the recent tax bracket changes...', 'Legal Resource', '2026-03-05 00:21:40', 11);

-- --------------------------------------------------------

--
-- Table structure for table `lawyer`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 05, 2026 at 12:27 AM
--

DROP TABLE IF EXISTS `lawyer`;
CREATE TABLE `lawyer` (
  `user_id` bigint(20) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `rating_avg` decimal(3,2) DEFAULT 0.00,
  `specialization` varchar(255) DEFAULT NULL,
  `license_number` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `lawyer`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `lawyer`
--

INSERT INTO `lawyer` (`user_id`, `verified`, `rating_avg`, `specialization`, `license_number`) VALUES
(8, 1, 5.00, 'Corporate & Real Estate Law', 'EGY-L-00892'),
(10, 1, 3.50, 'Intellectual Property & Family Law', 'EGY-L-01045');

-- --------------------------------------------------------

--
-- Table structure for table `lawyer_office`
--
-- Creation: Feb 26, 2026 at 09:05 AM
--

DROP TABLE IF EXISTS `lawyer_office`;
CREATE TABLE `lawyer_office` (
  `office_id` bigint(20) NOT NULL,
  `office_address` varchar(255) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL
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
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 05, 2026 at 12:21 AM
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `message_id` bigint(20) NOT NULL,
  `message_text` text NOT NULL,
  `send_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `message`:
--

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `message_text`, `send_at`, `is_read`) VALUES
(1, 'Hello, could we reschedule our 3 PM meeting to 4 PM?', '2026-03-05 00:21:40', 0),
(2, 'Yes, 4 PM works perfectly for me. I will update the calendar.', '2026-03-05 00:21:40', 1),
(3, 'I just reviewed the draft. It looks great, go ahead and file it.', '2026-03-05 00:21:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 05, 2026 at 12:21 AM
--

DROP TABLE IF EXISTS `notification`;
CREATE TABLE `notification` (
  `notification_id` bigint(20) NOT NULL,
  `message` text DEFAULT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `notification`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `message`, `is_read`, `created_at`, `user_id`) VALUES
(1, 'Your consultation has been confirmed for tomorrow.', 0, '2026-03-05 00:21:40', 7),
(2, 'New evidence document uploaded to Case 102.', 1, '2026-03-05 00:21:40', 10),
(3, 'Payment received for Invoice #INV-2026-001.', 0, '2026-03-05 00:21:40', 8),
(4, 'Reminder: Your installment of 12,500 EGP is due soon.', 0, '2026-03-05 00:21:40', 9);

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 04, 2026 at 11:30 PM
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `payment`:
--   `client_id`
--       `client` -> `user_id`
--   `case_id`
--       `cases` -> `case_id`
--

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `status`, `currency`, `amount`, `created_at`, `deleted_at`, `client_id`, `case_id`) VALUES
(1, 'Paid', 'EGP', 15000.00, '2026-03-04 23:30:47', NULL, 7, 101),
(2, 'Partial', 'EGP', 25000.00, '2026-03-04 23:30:47', NULL, 9, 102),
(3, 'Paid', 'EGP', 8500.00, '2026-03-04 23:30:47', NULL, 12, 103),
(4, 'Pending', 'EGP', 12000.00, '2026-03-04 23:30:47', NULL, 7, 104),
(5, 'Partial', 'EGP', 40000.00, '2026-03-04 23:30:47', NULL, 12, 106);

-- --------------------------------------------------------

--
-- Table structure for table `task`
--
-- Creation: Feb 26, 2026 at 09:05 AM
-- Last update: Mar 05, 2026 at 12:21 AM
--

DROP TABLE IF EXISTS `task`;
CREATE TABLE `task` (
  `task_id` bigint(20) NOT NULL,
  `title` varchar(200) DEFAULT NULL,
  `deadline` date DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `task`:
--   `case_id`
--       `cases` -> `case_id`
--

--
-- Dumping data for table `task`
--

INSERT INTO `task` (`task_id`, `title`, `deadline`, `status`, `case_id`) VALUES
(1, 'Draft initial NDA agreement', '2026-03-10', 'In Progress', 101),
(2, 'Review competitor website evidence', '2026-03-12', 'Pending', 102),
(3, 'File employment termination response', '2026-03-15', 'Pending', 104),
(4, 'Schedule client deposition prep', '2026-03-18', 'Not Started', 101);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--
-- Creation: Feb 26, 2026 at 09:52 AM
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `name` varchar(100) NOT NULL,
  `role` enum('Client','Lawyer','Admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `users`:
--

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `gender`, `deleted_at`) VALUES
(7, 'Karim Adel', 'Client', '2026-02-26 07:10:00', 'karim.adel@email.com', 'male', NULL),
(8, 'Laila Mostafa', 'Lawyer', '2026-02-26 08:45:00', 'laila.mostafa@email.com', 'female', NULL),
(9, 'Hassan Tarek', 'Client', '2026-02-26 10:30:00', 'hassan.tarek@email.com', 'male', NULL),
(10, 'Yara Samir', 'Lawyer', '2026-02-26 12:20:00', 'yara.samir@email.com', 'female', NULL),
(11, 'Mohamed Khaled', 'Admin', '2026-02-26 14:00:00', 'Mk71295535@gmail.com', 'male', NULL),
(12, 'Farah Nabil', 'Client', '2026-02-26 15:15:00', 'farah.nabil@email.com', 'female', NULL);

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
-- Table structure for table `user_phone_number`
--
-- Creation: Feb 26, 2026 at 10:04 AM
-- Last update: Mar 05, 2026 at 12:21 AM
--

DROP TABLE IF EXISTS `user_phone_number`;
CREATE TABLE `user_phone_number` (
  `phone_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `user_phone_number`:
--   `user_id`
--       `users` -> `user_id`
--

--
-- Dumping data for table `user_phone_number`
--

INSERT INTO `user_phone_number` (`phone_id`, `user_id`, `phone_number`, `created_at`) VALUES
(6, 7, '01012345678', '2026-03-05 00:21:40'),
(7, 8, '01123456789', '2026-03-05 00:21:40'),
(8, 9, '01234567890', '2026-03-05 00:21:40'),
(9, 10, '01512345678', '2026-03-05 00:21:40'),
(10, 11, '01098765432', '2026-03-05 00:21:40'),
(11, 12, '01298765432', '2026-03-05 00:21:40');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--
-- Creation: Mar 05, 2026 at 12:24 AM
--

DROP TABLE IF EXISTS `wallet`;
CREATE TABLE `wallet` (
  `wallet_id` bigint(20) NOT NULL,
  `balance` decimal(12,2) DEFAULT 0.00,
  `currency` varchar(10) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- RELATIONSHIPS FOR TABLE `wallet`:
--   `user_id`
--       `users` -> `user_id`
--   `user_id`
--       `client` -> `user_id`
--

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
-- Indexes for table `user_phone_number`
--
ALTER TABLE `user_phone_number`
  ADD PRIMARY KEY (`phone_id`),
  ADD KEY `idx_user_phone_user_id` (`user_id`);

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
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `ai_tools`
--
ALTER TABLE `ai_tools`
  MODIFY `ai_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `calls`
--
ALTER TABLE `calls`
  MODIFY `call_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `case_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=113;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `document_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `installment`
--
ALTER TABLE `installment`
  MODIFY `installment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `invoice`
--
ALTER TABLE `invoice`
  MODIFY `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `knowledge_base`
--
ALTER TABLE `knowledge_base`
  MODIFY `knowledge_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `lawyer_office`
--
ALTER TABLE `lawyer_office`
  MODIFY `office_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_phone_number`
--
ALTER TABLE `user_phone_number`
  MODIFY `phone_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- Constraints for table `user_phone_number`
--
ALTER TABLE `user_phone_number`
  ADD CONSTRAINT `user_phone_number_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `fk_wallet_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `client` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
