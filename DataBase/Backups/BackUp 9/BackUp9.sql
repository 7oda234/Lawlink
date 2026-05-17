-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: Apr 28, 2026 at 10:13 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

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

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

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
(7, 'SuperAdmin'),
(12, 'SuperAdmin');

-- --------------------------------------------------------

--
-- Table structure for table `ai_tools`
--

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
(1, 0.95, 'ما هي حالة القضية رقم 101؟', 'القضية حالياً قيد النظر في المحكمة وموعدها القادم 15 مارس.', '2026-03-11 23:10:35', 2),
(2, 0.88, 'لخص محضر الجلسة الأخير', 'تم الاستماع لشهادة الشهود وتأجيل القضية لتقديم المستندات.', '2026-03-11 23:10:35', 3);

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

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

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`case_id`, `title`, `category`, `description`, `status`, `created_at`, `deleted_at`, `client_id`, `lawyer_id`) VALUES
(1, 'قضية نزاع عقاري', 'مدني', 'مطالبة باسترداد وحدة سكنية.', 'Ongoing', '2026-04-13 14:10:51', NULL, 13, 11),
(2, 'قضية تعويض', 'مدني', 'طلب تعويض عن أضرار حادث سير.', 'Pending', '2026-04-13 14:33:25', '2026-04-13 14:40:06', 13, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `user_id` bigint(20) NOT NULL,
  `income_level` decimal(12,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`user_id`, `income_level`) VALUES
(1, 15000.00),
(2, 12000.50),
(3, 8500.00),
(4, NULL),
(13, 10000.00);

-- --------------------------------------------------------

--
-- Table structure for table `document`
--

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

CREATE TABLE `lawyer` (
  `user_id` bigint(20) NOT NULL,
  `verified` tinyint(1) DEFAULT 0,
  `rating_avg` decimal(3,2) DEFAULT 0.00,
  `license_number` varchar(200) DEFAULT NULL,
  `years_experience` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lawyer`
--

INSERT INTO `lawyer` (`user_id`, `verified`, `rating_avg`, `license_number`, `years_experience`) VALUES
(2, 0, 0.00, NULL, 15),
(6, 0, 0.00, 'L12345', 10),
(8, 0, 4.90, 'AAST-2026', 15),
(9, 0, 0.00, 'LC-9988', 7),
(11, 0, 0.00, 'LC-2026-XYZ', 12);

-- --------------------------------------------------------

--
-- Table structure for table `lawyer_office`
--

CREATE TABLE `lawyer_office` (
  `office_id` bigint(20) NOT NULL,
  `office_address` varchar(255) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lawyer_specializations`
--

CREATE TABLE `lawyer_specializations` (
  `lawyer_id` bigint(20) NOT NULL,
  `spec_name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lawyer_specializations`
--

INSERT INTO `lawyer_specializations` (`lawyer_id`, `spec_name`) VALUES
(2, 'أسرة'),
(2, 'جنائي'),
(2, 'مدني'),
(6, 'جنائي'),
(8, 'تجاري'),
(8, 'جنائي'),
(8, 'نقض وإداري'),
(9, 'جنائي'),
(11, 'اموال عامة');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` bigint(20) NOT NULL,
  `message_text` text NOT NULL,
  `send_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` tinyint(1) DEFAULT 0,
  `sender_id` bigint(20) NOT NULL,
  `receiver_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `message_text`, `send_at`, `is_read`, `sender_id`, `receiver_id`) VALUES
(1, 'يا أستاذ يوسف، هل متاح مقابلة غداً؟', '2026-04-20 14:30:17', 1, 13, 11),
(2, 'يا أستاذ يوسف، هل متاح مقابلة غداً؟', '2026-04-20 14:30:27', 1, 13, 11),
(3, 'يا أستاذ يوسف، هل متاح مقابلة غداً؟', '2026-04-20 14:32:25', 1, 13, 11),
(4, 'يا أستاذ يوسف، هل استلمت أوراق القضية؟', '2026-04-20 14:41:13', 1, 13, 11);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

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

CREATE TABLE `users` (
  `user_id` bigint(20) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` enum('Client','Lawyer','Admin') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `Phone_no1` varchar(11) NOT NULL,
  `image_url` longtext DEFAULT NULL,
  `Phone_no2` varchar(11) DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  `Date_of_Birth` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(1, 'أحمد خالد', 'Admin', '2026-03-11 23:05:05', 'admin@gmail.com', '', 'ذكر', '01012345678', NULL, NULL, NULL, NULL),
(2, 'سارة الحلي', 'Lawyer', '2026-03-11 23:05:05', 'sara.lawyer@gmail.com', '$2b$10$WELOwn.9EUCjDRYxJUlr9OcaFvlVJSLgX2U42Oq9FGk13lZdNNRzK', 'أنثى', '01011599422', 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg', '01016629430', NULL, NULL),
(3, 'محمد خالد', 'Client', '2026-03-11 23:05:05', 'm.client@gmail.com', '', 'ذكر', '01555554444', NULL, NULL, NULL, NULL),
(4, 'محمود', 'Client', '2026-03-12 21:58:41', '', '', NULL, '', NULL, NULL, NULL, NULL),
(5, 'ياسين المدير', 'Admin', '2026-04-01 21:22:30', 'mahmoud@aast.edu', '', 'ذكر', '01200000000', NULL, NULL, NULL, '2002-01-01'),
(6, 'المحامي أحمد رأفت', 'Lawyer', '2026-04-01 21:34:08', 'ahmed.lawyer@lawlink.com', '', 'ذكر', '01099887766', 'https://xsgames.co/randomusers/assets/avatars/male/6.jpg', NULL, NULL, '1985-05-20'),
(7, 'محمود المدير', 'Admin', '2026-04-01 21:45:21', 'admin.mahmoud@lawlink.com', '', 'ذكر', '01122334455', NULL, NULL, NULL, '1995-01-01'),
(8, 'محمود BIS', 'Lawyer', '2026-04-01 22:27:25', 'mahmoud.test@aast.edu', '$2b$10$49CaH0sNiL6R93p32TlfM.gz4TsAfzGZlStu28g7ymHuRnzFHg1zW', 'ذكر', '01001122334', 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg', NULL, NULL, '2002-05-15'),
(9, 'محمود خالد', 'Lawyer', '2026-04-01 22:34:07', 'mahmoud.test2026@aast.edu', '$2b$10$zkoehbxTKKutbua4Uuy5DuWru5C6ghhDvPwFscvefiut5.5tFu5le', 'ذكر', '01022334455', 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg', NULL, NULL, '2000-05-20');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(11, 'يوسف علي', 'Lawyer', '2026-04-11 15:54:55', 'youssef.law@aast.edu', '$2b$10$v/wGqSQ8UvMSXGrQIhdzH.8eoTmD9kBiUpqIEqVcFJp7M6T76.SuO', 'ذكر', '01288776655', 'data:image/jpeg;base64,/9j/4RBlRXhpZgAATU0AKgAAAAgADAEAAAMAAAABAH0AAAEBAAMAAAABAH0AAAECAAMAAAADAAAAngEGAAMAAAABAAIAAAESAAMAAAABAAEAAAEVAAMAAAABAAMAAAEaAAUAAAABAAAApAEbAAUAAAABAAAArAEoAAMAAAABAAIAAAExAAIAAAAhAAAAtAEyAAIAAAAUAAAA1YdpAAQAAAABAAAA7AAAASQACAAIAAgACvyAAAAnEAAK/IAAACcQQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkAMjAyMjowMzoyNSAxNDoyMTo0MwAAAAAABJAAAAcAAAAEMDIzMaABAAMAAAAB//8AAKACAAQAAAABAAABAKADAAQAAAABAAABAAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAFyARsABQAAAAEAAAF6ASgAAwAAAAEAAgAAAgEABAAAAAEAAAGCAgIABAAAAAEAAA7bAAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAC/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgAoACgAwEiAAIRAQMRAf/dAAQACv/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A7iEoU4ShJTGEoUoShJTHalCnCQaXGAkphtlNGhMiAJLp0AHmua6r9bcO1t1OC7fVTZ6e/cGG8jSxtX7tW78//CLl8/60dUyKTh0sdVjgEOY3s0cuts/9FtTDPsF4j3fS6LKMifQsFgb9It4E/wApQ+04fr/Z/tFYvIkMLgCf6q8q6b9Yup0V2urvdThNgO1ne/8ANdW0/wAlTyes129SZlY7WvyLG7Hu8HDh7EOOSeGL6oywP3bQCB3kCfgkLKnGA8A+BK81q+vV2PfVR1CsZVIO1wrDWvH9tq1sr65Y17GMxGfZWA/pC+C9k/Rd+7/moGch0Twgvatc17dzHB7eNwSXIdE601ufUftVdleQSDrtZDWy8P3e1r3O+gumf1TCbW2wvaC8ja0EO0PjtThMHfRaYENlJSaWvaHtILXCQRwlCetYJlOEtqSmCYqcJoSU/wD/0O9hKFKEoSUxhKFKE8JKYws/6xZn2D6u9Tyw7a6vGe1p/lWfom/9WtKFzP8AjHD3/VZ+NX/2puY1x8mn1f8AviB2SHyGm+4PbY50ua0NBOoAA/6pWBfQYda5zzyWEkNJ/lBquDprWN2iTGuvn4K10n6v2ZmSGNECfc49gmEhkAJcfI+15DmEAuaf5tsQGDyaP+qUK6rse1pghwMk+BXq+D0bpmJTsbUHOiHPdqVJ/SOn3H3VMIGkQEw5aXjDfV8lfVUx3qveXOmeO6b1XPcXuHPDV6236s9GeBOJWfDRVc3/ABfdGyAbKGnGeedhkT/VKQyXuFHFXV84x8rLcK627BXTJawkNEn6R1+m5Xsbq9zyW1smqtwJYDBH72xXOpfUXq2PkhuK05LOzxpA+H7y2fqz9Sc6jMa/K21CxpaXyHOaOXRX++/6KNxK3hkN3tOia9HxdCPZMHmCZV2E9dTKq21ViGMENHwTwphswlhCUKcJoSUwhMQpkJoSS//R9AhOnhKElLQlCdOkpaFyn+MYn9ndObJDTkuLgODDPzl1i5v690ep03BdrDMokx/UchLZMdw8ji4lb2+o+SDoB5re6ZRXTMaO7wsudrGS2Ph5rXx2hlYjuFDLZngNW2HbnR2KLW0h0dkCmBL3ENa3VzjxCdvWeiDV+ZXX298jVRUz2HSrOghWWOhsdlm4fWOjZJ20ZtVrgYgGDP8AaWlWGubynBadUdkHsg1PFeQw+JA+/RWXsEcgeZ0CB6BssZtLXHcDAMmAUv0gR3VKuEjwdJzYJTQiO5J81EhWmkwhMQpwmhJTCE0KcJoSU//S9DSSTwipUJJQnSUssH6w9Ro+2Dpd9LLseqv7ReXyC1x0Y6st/Oa1b8LkvrgTh592cGNeb6WNYHcQ32mf7aizE8Gndm5YAz17GvNybKGVVgufNZd7SefdqxaVQBpYB4aLJoN+Z0l4yXiy6uxodZ893H9VbLNoYAPoxootwz8NSLn9Wfh+lGWXOqYJNbSRJ+SyKcrGyc+rpjOjtZ9pLWVZF7XPYJ/Osf8Am/1l1Yx8e4bbqw8dgVZx+mUsM1PsaOzQeEwS11FrjAkaGni7ekHpWe6t2FWxzHD9LQSWc6RK7bp1wswH3Od/Ntlw76BCzsWtmORBO49+SUuj1FrbKSZ3jUIE6rhHR4fq3Urus9VGHmNtY1paKsdtvpNdvOxnu/Pf7vctXpfTKKurswaPtfTc7ByGeqH2eoxzQf8AB2fnseusqw23M3SWFpiWgdviE32eqm5j/pPDm+8888J3FoNOo6sZhrI3eh6O7Z9N3xUCER30ioEK20mKZShMkpjCaFJMkp//0/RQEkk6Klk6SSSlLK+snTjmYbLa2B78c++twkPqP843+z9Na0JxomyjYI7roSMZCQ6PnYqoxsm+2p2yjJDWsq/Ma8dw7+Ur1RDa2tmY0la3Xel4AyqntqDN7dxj6O4H6ez6O5YmN7WvrIh1Ty0j8irSBjYbYkJUR1bddkO1WphZLI8CsYAnjuqvUvrDR0csqDfVybQdjewj/wAkma9GTiAGrrdWy92Tj0V/SsJA+IUsC6qrKa03Vkgw7a9riP6zWn2rlupdfzMiqqt+E9j9LN0EEeTXBBxWZE25OP0x3q+n6lltLTLtfzv3k4Dut4w+hUXUtsuY1zXAO5Go1Ve/9LfVUzl72/l1XK/t7qOBj2n7ETSCx5JaQ4bud7l03QcivPzKMmozW2tz48JGxKNmQj4olICMj4PQWfSMcSoFTKgVbaLFMpQmSUsmTpJKf//U9GSSSRUpOkkkpQTplIJKcb6wH9JRHOw/lXMZL2497rSTtyhsJ5AtH0d/7rbFv9cyBblHYZbU3YD5zLlz91rW7mvEsd9IFVZm5Ft4xUAxyM800kCDaDtdGoBVPEODn9br+0M3ucz3uOrWyNrfTWfnU20PO1zn4zjILfpNnkPVFmSR1QOqfDA4AAGCTH/RSEdNEGR2L1B6G6iwtxcixrA4/oi6QP6jnz7Vo4jMqqva/NsqjtuEfeoYuRRk0sGQ4VvsEGDIH9Y/ylkZHQ8jIy2MreW4YJlocQSGpl92YSoaAF2f2fVk4+Vfl2m5oY5zX7pggeX0le/xd+ld0P7dU0iuxzqqS7ktaf0jh/J9Vc71yw304vQeiTW3LtZjsH50u/nn/wBhm+xeh4WDjdNwqOn4o24+JW2qsdyGj6Tv5T/pPUuGN+pr8xOzX2pSolSKiVO12JTJ0ySlkinTJKf/1fRkkkkVLpJJQdpdHA0HcpKXGqr5mR6VTg0+4jlPkZIGOL69axq4Dw/8xWdmONjd7SHMcJaR4KPKSBp1ZMUQTq5OSefElY+ZPZamQSXEKlfXuCq9W1TjbnBxmfgsnqHTi55vxDts13Vu4JP7v7q6B+OZMDhQ+xB+pCeJUsMLebq6plYJFj2v3sAbBEt/BXq/rXn5VjaKq7Lbrnbaaq6yS53g1buN0xrnjTTvPC6jof6PPpr4DGmOwkiNEeKJIBG+iOGQBIOzQ+pP1X6lRlu6911npZe11eFiEgmpjvpX27Z22ub7GfyF2RKMQywbu6E6tw41VkChQaxJOpYFRKkQRoRCiUkLFMnTJKWSSTJKf//W9GSSAJMBTjaEVK9rBLtT4IVtp89FJ33oFmoOuqKnNvtuw73WsBfi3GL6wJLHO0+0N/kO/wAK1VbbW4hdSRtx50A12k+f7jlo3DRzSJaRrCpXVseNturQNHd2/wDkkCARRSCQbDSurmHN1B4IQHVHuErK78LWs+rQTqBwJVnFsoyva0w/jYedP3VWniI21DYhlvfdo+kPmpipgOo18Vb9CLdp4RDiAkRqoqLLbXpAna0LQxPbex/7hChRjBj/ACTMt25TKR5uefAf4Mf2k+EfUFk5ekvSY79I7DVFlU6bACJ4IVlrp0VtqJN2iYtY7kBRlMXJKY2VQJbx4ISMX6IZ92o5HKVKYJk6ZBT/AP/X9HFjRoAn9RVK8iq6sX47xbU785vIjs5v5rkzcqre1jnAOdwD4pym0TI+KDZqI7oVmRsdtsG3sE7nECeR4pKQ2DmfuVW5rZjkuEq08g8oNnGog9ikpomQdvLTy0BUbMZjn7qga3tMhwPHwWhbuDYBDSTrCrvc06F0fukIKVXmloDMsepH+FYPcP67fz1pVGq1gfS9tjT3bz8wsex20yHABRaWteHtd6bzMPaYP4KM4wWSOQjfV3LHV1MddadlbBLifyLPwffkPucAC8zHJA/NVex99rqxfZ6tYkcaAhWMfUEN9jQdAOSPFGEKNlU53oHZY8ke3hWWWmBKzKrT9HwGiN6sgeAUjG6QsnVM50qnXb3dojNfI8ElJCRCGLNtkzo7T5p3O0QLyGV7vHnyQU2DHPimKBjXeoCPAoxQKn//0Np9ttN4vwn+le/lv5lh/wBHa3/0YrdWZjdXpupqYaOp0De6mZMt5WW86WVRtsr91Z7yFVynXi3F6rgODc9hJaBoH7fp0v8A6zU5D09WW3Iwa73w4j22eRGigy51boreX1u/MPb5/uqh0vqFGdi3vo+hd+l28Frmn9I1w/ro7S+zZs9gcJA7JKbYvJ7EE8DlDsdoY18T4pnVFsaiPEamfBCNgI8+D5JJVZtdr3/KqxA9zhyY0PiiSZgCSOJQ3hrhq0iDPKapG7dEk7ddQexUWAud7Y07BSfrOnGp15UBBMlh01ASUma9zRLf808FWmWbxIZsdOvgVTr3k+1hG4Tp4+SNW8Ag75PgipuNdrPBCkLHETOnYBVQ8bZ4+amLCREgHw7JKbIfrPB8Eeu2TJKoBwgiZI+9SrcQdD8Qkp0ha0iJlVepX7aAwab/AKJ8YQ2XaciOFU6rc4YjnSNpHuHgez2JKS9Oyf1ksJ0McLaXIdNudU919nh9y60GWtI4IB+9BT//2f/tGCBQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAABxwCAAACAAAAOEJJTQQlAAAAAAAQ6PFc8y/BGKGie2etxWTVujhCSU0EOgAAAAABJQAAABAAAAABAAAAAAALcHJpbnRPdXRwdXQAAAAFAAAAAFBzdFNib29sAQAAAABJbnRlZW51bQAAAABJbnRlAAAAAENscm0AAAAPcHJpbnRTaXh0ZWVuQml0Ym9vbAAAAAALcHJpbnRlck5hbWVURVhUAAAAIQBIAFAAIABFAE4AVgBZACAANQAwADAAMAAgAHMAZQByAGkAZQBzACAAWwBGAEUAQQBBADQANgBdACAAKAA0ACkAAAAAAA9wcmludFByb29mU2V0dXBPYmpjAAAADABQAHIAbwBvAGYAIABTAGUAdAB1AHAAAAAAAApwcm9vZlNldHVwAAAAAQAAAABCbHRuZW51bQAAAAxidWlsdGluUHJvb2YAAAAJcHJvb2ZDTVlLADhCSU0EOwAAAAACLQAAABAAAAABAAAAAAAScHJpbnRPdXRwdXRPcHRpb25zAAAAFwAAAABDcHRuYm9vbAAAAAAAQ2xicmJvb2wAAAAAAFJnc01ib29sAAAAAABDcm5DYm9vbAAAAAAAQ250Q2Jvb2wAAAAAAExibHNib29sAAAAAABOZ3R2Ym9vbAAAAAAARW1sRGJvb2wAAAAAAEludHJib29sAAAAAABCY2tnT2JqYwAAAAEAAAAAAABSR0JDAAAAAwAAAABSZCAgZG91YkBv4AAAAAAAAAAAAEdybiBkb3ViQG/gAAAAAAAAAAAAQmwgIGRvdWJAb+AAAAAAAAAAAABCcmRUVW50RiNSbHQAAAAAAAAAAAAAAABCbGQgVW50RiNSbHQAAAAAAAAAAAAAAABSc2x0VW50RiNQeGxAUgAAAAAAAAAAAAp2ZWN0b3JEYXRhYm9vbAEAAAAAUGdQc2VudW0AAAAAUGdQcwAAAABQZ1BDAAAAAExlZnRVbnRGI1JsdAAAAAAAAAAAAAAAAFRvcCBVbnRGI1JsdAAAAAAAAAAAAAAAAFNjbCBVbnRGI1ByY0BZAAAAAAAAAAAAEGNyb3BXaGVuUHJpbnRpbmdib29sAAAAAA5jcm9wUmVjdEJvdHRvbWxvbmcAAAAAAAAADGNyb3BSZWN0TGVmdGxvbmcAAAAAAAAADWNyb3BSZWN0UmlnaHRsb25nAAAAAAAAAAtjcm9wUmVjdFRvcGxvbmcAAAAAADhCSU0D7QAAAAAAEABIAAAAAQACAEgAAAABAAI4QklNBCYAAAAAAA4AAAAAAAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAAzcAAAAGAAAAAAAAAAAAAAEAAAABAAAAAAEANwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAQAAAAAAUmdodGxvbmcAAAEAAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAEAAAAAAFJnaHRsb25nAAABAAAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAAC2JnQ29sb3JUeXBlZW51bQAAABFFU2xpY2VCR0NvbG9yVHlwZQAAAABOb25lAAAACXRvcE91dHNldGxvbmcAAAAAAAAACmxlZnRP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cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJCQTM1Qjk4OTY0RkVBNzMwNUFBRUIzOTA4RUQzMkJCRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYzhjMjM1Ny0zNTkzLTQzOTMtODdkOC0yMjdhNzNmZDEyNmIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iQkEzNUI5ODk2NEZFQTczMDVBQUVCMzkwOEVEMzJCQkQiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDMtMjVUMDk6MjI6MTkrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTAzLTI1VDE0OjIxOjQzKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTI1VDE0OjIxOjQzKzAxOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZmM4YzIzNTctMzU5My00MzkzLTg3ZDgtMjI3YTczZmQxMjZiIiBzdEV2dDp3aGVuPSIyMDIyLTAzLTI1VDE0OjIxOjQzKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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', '', NULL, '1998-10-12');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(12, 'محمود المدير العام', 'Admin', '2026-04-13 13:16:34', 'mahmoud.admin.2026@lawlink.com', '$2b$10$njmQDV.635jvbajjlrqCuOU04px.Y6bzrArdSM10mquik/DnwWN3a', 'ذكر', '01099887766', NULL, NULL, NULL, '1995-01-01');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(13, 'أحمد العميل التجريبي', 'Client', '2026-04-13 14:00:24', 'ahmed.client@lawlink.com', '$2b$10$oYMeEzQ5wMuqT8HYyvP0eOAMEXheUHlWBKNPl1Ih03SFEPFkVb0Ce', 'ذكر', '01511599422', 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAEAAQADASIAAhEBAxEB/8QAHgAAAAYDAQEAAAAAAAAAAAAAAgMGBwgJAQQFCgD/xABCEAACAgIBAgUDAwMCAwYFAwUBAgMEBRESBiEABxMxQRQiUQgyYRUjcQmBJEKhFhczUpGxJTRigsEYcuEmc9Hw8f/EABwBAAAHAQEAAAAAAAAAAAAAAAACAwQFBgcBCP/EADoRAQACAQMCBAQEBQMDBAMAAAECEQMEEiEAMQUiQVEGEzJhcYGR8BQjQqGxB8HxM1JiJHKC0QgV4f/aAAwDAQACEQMRAD8A9t5kAXQIA/aF3tQdqdAj217aOvzvx8JWG/cbAK+7ex37/HYHWyN/z8a7EhuIPsf8g9t+w37b/P8A6/AiSCN/b2/d3/AH57DQYgjuCB3/ADIddLeKu/wL9e/f+/WwJG2AD3G9bBJG97AJA79x/P8AA8C9T+dn2JJ76II9wdkj49t/kEdygCQCCR779yQNAjWtAEa2N9+/YE7PgYOgdAn3PbetD+QR3HyD7fnxyj1X2u6ea9q+3RxG14BH39r/AFo6GZDv8EDtvZ/27e2jof4O/g+Mep7a5a1snehtvj27/O/YaA7dvAQdEjXydaB9tdgT3AI2DrZ0e3c6IEB7+4O/c79wSQFJOz7kHZPfuPAoP0ru9v2dCLFfv6Fdvz+9D0MMdHudkHtscToAEnXb4G9699fz4NDcV5nX27JLE6H+dBd/kD/l9t8Tx8Fx67t337nv+PyTrWvY7A7a9ySfDB+e/m3/AN3uGTGYaxRXq7MVbUuMkyXJsbgsdXCRZLqvNIHjaTHYh3jWvV9SNsnknr0InVGsT10s+aGnxyy5HbCAq2XVhQKCrQXwPdC+nGLFPNkhixx3TnIjEC/blAeALeFo7L1yvO7z/wAR5dQWMTj7FSz1IYI3aGxZiSnhK86yivkc1KrM1eKVkY0qiq1u+6yypE1KvbswUa+bvmqetus44cdeyXmD1ZdmMc030ha3AY5Q3HHUZXmhx1CORTwu2DYaMFYhA6mMUSPMnqzqfzQzWQw/TORu/wDZmjk526i61zxeQy3ptHLdQZeb+wMz1PdCxfRYSnNFSwtf6LGLUWlVjGNT3S2Gq4ahLifLh5aOLRnGb6+ylaLIZ+6knKWapiakddqkcsx5GLccgii9IpVsCCORMz8Y8aza/KwJuPTQaw4oKZJ0FzBSKPIZcke30cO00fwrwjT6DFeyM9TOAZckom2N1UGhmJEEx43df1LUZ9cSDozE4nIQP1ZSwtzq27Obtfprp8NbkiquUMYydiCKa0bEK6kayJ6sdZxLPTuWoZrMDKMwWLSHhhOm+nKVYlooJ61m1Nyj3zyEdmtNQjq5UBBs2bdiTkI0nk4wxuUDmPNrojoGzka5mpxy2zLLcu/1CimXytpXjEkt29LYklmnml3K0KpVoIivGHthhH4jl1X+omtauLMr4XIPKUGPXMTzdRzNycpAIMZjYrePpSux1B66VofUcIkiIOBrTrMmSe3HKcjdW2N0Ah5ptSkne7PZBrqaNKASlEOBF93ioY+CJxx9citwysepGX6GAkS162Ws5gSH07NMY/GYfFSSEklrVeKtLcvTAffMyPlP7u3QJLpvGrHd6XxkUFKDAUrpRTNXrZrjj8ZQCl/UuITTms56VF1EgtwTTIh+nT04+UJjdDb83Os5K0tnJW+kMdLFG1atewmPv5PJQsFYQUcPDTyc1mvIp3xFiutRkUSX6ujX8OhgfJ6r9C8WWoY+eW5Itm3kOqoqry2p1Oq0Rw0OVoESctFQkuXtL3rmFm4kLRlqY0/Pr0fMWfTVqp7d5PZT3E5mGuY+vFRUXgs2kDiqqNPFNjXSjn6iz2dWaDG2unM1ErGGOKnWwkWBggf7ljaGA2ZHswRFxJBXxkDymFgyJJJKR38d0h1tlK8UFrqOfF42L02nx2L6B6YpYZwSWHPIWo0yFwqyjdiWOGRlQOkaAs3jrU+iug+npa9/Ov0rQtNCY3twYbJ42tXgBK7jms5SpTryJxIYGWUshDhN9z14+svI+lYaxWK9UWKa+iJMZC1+lWJK7F91uW4K6bfiZ5HhaOPbNsA818eoY8Sz8q8ynPntz/Ur+Xr3LOmk8TOtmJY0PlxxsV4S0D9O9d+el10t5d9PQIEyOOx+XXmC4SKrR7kNuVop7sscMshZjKYaendyeTFhycC35W+WU0LusvVGCmKhvRw9mlkKqqupCjQRwCWONQWET1o4bCK8scciIVQR66h8wZXMEXT8eS6dglUrVx2Neph7VmfkG9aCzELNXLVG9bmkmOyrTFVAs0a9iPi6RrU/MVJY7tjrKrjbluTlUjzeX6uo2UQhj9OJ7d1+cgBXTJEUcHlsoGSNSOozyajDeHFzNp2ObkL68Aldmu4RxQjtk5ZQV4IMmViUbYgIHdBK55KF4Mt5XR0Kt6703nYblFZGa9TeG6cetH1I3njyeAys1zIUMizASV8xiZcLGrxCzFZjnWS2W3xtrpPIZOTDTUsYblea1CHxORFfMQzGjKscc2PylKa3ZgydF5mglx9aaC4WgeG3kmvTWkWuAxvmhAY7OfyeDnqVyktLKZO5lpLFR5om+yhlUxmEnuw2pF4NFagykE6KKrNMrMjd7I4fpHIyGHr/AKZxFmCtKbNfL4HJV8Vl8XOwkk+srYi08Waxzu5NjnjZq2OaZvWMHIsStHHOdBIhYXGTLavC81IjHvajfdl7c+awOd0wOJRrfGyPo7Ccng2WPc288p+KtWhq4/I4CZbctmdAsObuxxT2oazV4nhxWbjpx1bs6yNFLPiMtice1m2ZHqqjetenkr5X9VGzWemT6NuG1KkgaE1JRcgZYpA8aj14JZ5YtSRSK8iTF9ySCwHdnLnT2G6i6WyUXTHU+G65q13IQZyrjYuqKkVkVKVg5DJQR1nvpUqmyIsi39RyReeq7JYnrQLZarp2tk8HUs4S/wBU1rGTxk7XsBmLGSmheAc1pxdK5+SzXpXZKFuHL16VC3JVSGndirXIIY4ENeNxAy6XLjlYiXFjIYS45SQzjFlIspQXtGr6SXHqsU4eYmJFjOCTjFqrjIi8cb7Be4y4iTP6y83cvgqs6UDYlV5jbdsheaHCxzCvCk1y4sETzyvFSqrDDOkXrVnH2yTgzwspfIv9QHS88tW51FZyX9Sa5JAubSxPawbxLEVuVKN6ujrZIV2i9G2kIil3y9N1DCMNjN9LddYRcFn5Za1mSILJGJf71bL0p1OWwVlYCLMUbOBbpLE6PZx1pKErJIWEzY9b+X+LyWQwvTeEz9COfDxKK3SuMr1atY45PVl/qNHH5ArBLnWkSJxdmmEn0tNFxr1LFarIGniGi0uq1UddmwfOy4nHlwGPVSxOTNKUZPzY45EZm0JBLGsniQrJ6mvDPE8+i0WTQYNT/DY80Z4tTjyaL52OOKMSJLHNjKULQgkZxicpJqJ1fb0Z59+VFZKtLM9Y9O4LL5JrNql05YngoSiithoq70KKFVkppCsa/VQqInkSV/dJAkg6OexWVhSfGXI565A4OhdlIccwAQAhVgQyhTtlZH0EcMPMT0p1R1BjcjL0x1PTk6t6SpTJYr4/Ot6mVwtyn6ZazhcukYsHIx2EKw1rcyyosYirzYmaGOcy36D82epek8bF1R5ddQZrO9IxWfTyGNNiaxlMCYnMNlBTvtPM/wBIQ5tI0FtEkRxPin51bctw8N+I2MYYs+CJix44wl8u45oGMhGU3EszJjvm4S3xjTKAdUjxT4fhLJky4M0nJlyfMHJtlhl8xZRh8wjj+VJuiOSO22ozavq9xZmKqd9v2kghlHbsSQBsaGx+dn214HzbvtySd+2t7/AB/wAn+e/t4i75J+fuB8yK0GNnt1o84IBKrwg14L6rxLEVZJJmq2YRIosVvUnWOXcgnMc8SPJlHYgEnsfg+/fZ3vuPfWt+3f3B8W7DmxajHHLhmZISupRbLKsaUE4s/P16p2fDl0+VxZsbinGnalcNIjRY+jz7e/W36ra1v3I9iB7+x+Rr8jtsAk+3cQlf3I9jr3Ojr30d9we3f/p4IGx37n8dta7aB/cN9v57a/B2c+x9h7nQ99A/yFHt/PuNDtrwrX7t/fp+7ekhPWj70cevYOb7ft6NMpGjvt30ANL8lgQpHbXbQPz7fbojjmfmCBv27bA5H/JG2UbPuDsEgdtgk+zA8t/Cj2P87OgWOvk7PbZ37+DF5clPc/cQd9z7DXuR8ntyPfv7EnwP1/V9P8ddHuNcpXB3eH0rtXRJOmPYjZPvsnQH4H+f9v8AoMoe/cDXcjRJ7/8Al1ogH22df/nwHZYnX52p12/B79yO2xsHv/08CBPvx3777bHtsHYPfsNfj/28Don49HAEkAa1ruux7H9vud9wAPbWyASCSPAwPY8tEA9yAQT3PyND8e4+Pc68A2CPgHe++tH5/wCYDuQDoa+P58CPccRrWvtA17ga0fwo330NqNkHufA6OT9/T09//qv79CUBf3A9tgD432Ox3GwN+3t7b+PBoT279t+4+QO5PYnR133o/jY7EgU+57lSNAnW++tdv8a+DvX+3g9AO5bsQe/yNke+zxKjt8b1vQPx44od+jxbLrvXPvXH5dJvq7qnCdE9N5fqfqDIQYrDYilNeyN+w2o69eJdk8V28krt/aghiMktiVlhjUySKpos88vNLL+dGfzF2vBaxuOzlivWpwmwKmRnw9FZmpVXVyExWLp+pJZmtWVexYyE+Qv04bFiCEPMP9avmOM51HiPKmvcWp09gakfWPWdkSBYbGSjdpMBi7LFVQ08dC39Zsq0hDXJqEaqz1JXr1U9d+YmKqC7FFNdr2b0LwrFFWE96LHGRY/qq0Ewn5ZLJMypwaCetX9eJJK9qRJ4LtD+JvEZTm6SEtuHFzljH6suRCTci9sIRkFUMpbxuMTq8fDWhhCJrJRJZ8vGJeY48VlJEPNkyJu3XUIxjVSkoT1v1FRu4yfAZHIQYfy46ZqhMq1CUUTkpOCz2ai5Lmk1Gk8ZEk1qORLpqGKzYvGWZEaDnmL+oXqjqrDSYLy2rQdJeXNTljEtQyPisdcoooVzBeriWX6OzIqw+hXjt5DMyhyglyRSrjGz82Ou7vV+bXATXKdjDUrdirT6JxNq3mLeWyEbMZUzNuqk+FFuEhnyn9dv5W6bMdqxkcbYkk+igbAmrcvwQdQZBMlk4vRjxnReNqtZq0qBVkhJgDiD13RvRWGvTjqwSNLJJhLtWVGjoebM5lYyYwTbJOZzAKiF7mIen01S1ydXzBgjiBmEmNsL5hjffttlOTVyeD+n1etnAdHdQdb5KOHDvLkJZkmsW+puqKrTYurTrvuUYXpqVp8ctaIceVrKplpIZ0Y5E4eTjPHJDovG+Tvl/LI+ZyWQ666kqL6l2lhEW5Ux9pkQSw2J0hnx9eE8ggxmCa87RSRCfKzg6DX1Vy2emr9PX1GHg9Nnr9OYSWfL5KSCukaJJmYMTMkEASIpHDYnymLrUItpPxowrXVzsZ0Riaiwx5THY65YibjE2btIauKhhJ5hiIUxElqMueGOoGrBTUMY5zH+9P50cYDDYckf+9qi30viud1PpGr67PHLLdzlO03AoF9xbGkbNpDtdz4tYXf1AdRTwT1eg+jsN0xjY5FQ2MvextSAyO3L1P6ZipXv2AqlRGMlPJdld1hStBvkzUdQ+ZXmHdinhjy3U+esuQbdPDuvTeDkuSKCtUNjFtTzR8Fkl+niv3LTRrIl+lxDRB37FHpSzHXgj6rjvsI2dIOlemsPlYBDH9rgXJbsvp+mSY2kfJQiNWKsyMdHcfq7y66XjkjjzmETJel9LPJ1Li8NBJG2ohJC1+x1SkbrE8axpBVqyz9wOEpCk8M2JkSlklP12yVO41E+j7Bzf4WdEMbCNRwkarkOeDiUpIz9+Sqb9eox4vy880+t5IpT0TAmOuTRyT53q2/amVGJ/bUqZSfqgZmKGNB9N9Hj6SE8Y5Y4ImdVkb0d5H0ej8lVv9cdS2MWIuKQyJ1FSe/JU9JVeKDpPp7DLPi6/F5D9FezOOjerF6rgLHMkXOr+ZNDN5VYG66yLVzMYIoOheksbSS5Kw2wtdU5vJmK7DyClhTZKukZpeBZkjlD0n5dwYzH087YiytizO8LRYgfTtlr7TMslaZ5T6McL8NXPVs5CziIajLahjtzHVN/jd0Lx4YUA22hdUEI1uk+xKwvu9M8zKMgyZpQ3f0hIWu/8yakTn/s28l1x0tMBkMFSxcOL6E6T6jke/8A8NHksrjsJh4gHARcllamQxRjajKWWPHmWxPYyuxFQXJsrmNVYfpCY6yNbpTB9U5NZAi5PNwQYnpPGGPiGnx1OhFROWvoyoJJq+Ms00kMktfNVoq7U35VvOYjpuO1D1P1BTwRRooJumejPpreeMuRj9WKnm+o8x60dK5eUGX6Jal55I1meCSL0JB4il5jfq2xXReXt1MH0xhzcqRtHBP1PlIup8tC8SLGr/8AZXI9T4S4IYkYCOzTxJx83BpVeNTGk/ZZ/lbTcykG3ZGvJ9IIRGJy1zLcem216Li0c8o7YbdyScjQzHnzLKM5HIG2Gy/6ZjRP+thX9dZb3UPTVPJycZ2moYzGKarLsLjmgtWJrVisQYkPo29cZGZI05KE2bcHRFOFKfV1nAZFLc3r28Ze8vMfJkLFmUEJLjrdCTGPDCwkKh5oclOpcskrfeRRznv15fqhz2RlwnR+OyCz5OSI4tMgatKjFBKZCJIemMKKcUCyROrDF5nJZKRXVhJNHEgkbYwn6jP1OdR2YsNalluwS28nh+r+rqPTy0Y+m7tf6CWjXrzVJpmXpCdWsxW7mNaHMSCWSeLmMLFipj49a4xbjwrT5r4FJQ3ZLX03S5tEaDoz4TkkhKh49akdjh+XDbEOOI/VtItqlwVjqLoDpmbISJ0lnJ4r5hpVKuH6CxFZkooyyCxHkqdCs9yxVeCNTJk6l+Zk9J0uSc0EcSs71f5edVdRdSWKc3VmIdbUOIsrdrYuZGnlIkgq2abUTmK9hoqMbQrVq20njcNEsxmmZkj5I4HzywvnBiumcz1P1D1j0X1Ni8lWyGFyOTsZmtjssIqVuzlMjZcQ0enfRx9uqMWlEyV8gb8wrQtKapmmHivJTpbo3M5N6tmDLZabqLIZee/bpwzUMHWmuzyWDCLJuQ3MzK0djH4aKxHKtTG+tlTRgjarBO+x5MmpxxlLZ8qM6lGcYwIsh54SUgf+2UWIeYAtbS0+LSZGPzMjlnjjODiWbKmIxkSikeL5nGQq7WUrOtjy+8s8hUoYm7lJ6dy3LVmks3p7SM+TlqU4nx8zwXamKy1izNDjsPHl7ceMetZUtXeWSeV1l4/nH1r0X0fmJLuQzNXGQ1BjkpWqaiLNY+7dE9iiLCemalWFadKtHFcnsRTf3pvqKlynJXlieyR6nXpvY7pXJ1bzI6r1BRgyLX8zbxVVZJq2KlWKWaevayuRAu5GazKY3W9YrzPNLZvKtcPmD5X9V9aZrzWxGYitZbL5+fqnJ11sI0foZyxi81lenViCOGr0EimhWlxJaOF6yoAsTR+H+oniMEMGCEZLkjEzISGUYlkZBa3tjbcrkqryx2lx5vn5M2pnPHGMN08SMZEZSibmK7RiWseI1XAtEpshn63UmFoeanSwmsfTsMZ1fiFgajl69to0klp2MbMQsOTCGLIY6OwRHfSSKCrYjhnxsrqTpzI2MPnIOqMJKJOneqaG7FGnGYPTz2Mjhmty1JPWMc65DCzw3KtCct9HewNwUp4oHZpYL/oE6t66wmUueTPmdG/UnTXVVXIYjBXbbSNlMJdqNNeGEyM0gaeWhw9W5g4p569yrLWyNHCyV5GZLU3KnTOV8qcl1V0HmXl/oFuZOsOgc7Issy1IXnZoqRng20jR2Zb1Sdk+nf8Ap0/GMrFbqOSYoxyRM0WmVMuEcecI1IvgMp5ZK1vk8WxAuplLDldPIJRx0QLH5mmZFilXLDIJR4vZFpobfPo22tHLQ9S9JyPSyizteiixQkWLL/RiNJ5adOdUkoZeuipBkcJJxWxXYx1kjWOKOG23yQ828f5k4SMTCStmaMQjuQsAEkYKObRvthvcsfKPe1jsVZQqCb0YaO+ms3JhbMXIiRbFqtJmIYGhjXHz2Av9I6ioJqPnVnDwRTNVAgMTwwoyJOadadvk7nH6Y6mx/UVKVjRzNqFM1VXkqJflhZku1m2edbIVZ7XENI4S6lauI3sPA0ct4HrZ4NQQfJizTI58aVGM5FRyR7AkqJvqSd1yjKUorxvSY82nZXvyYoE8E1VYFSlCTTJixtLSJIEKYhaiAOx7du47H9pJPvsa/GtHXc+M+/caJ2DoAgHZHww0ew0Don31r2OvWnWzBFOrK6SojbBBUlgTsEAgggBhptdxonv42EJ49jogqe2/9t6I7nsd/wC358XvqivF+vt/ZH8z09Oha9yCNkEduxBJ2BreiCDvv7Hf58CHZl13GwAWJ7aAB+Roa0ANb/H8A2SwLAa9wARskb2f2/8A7ux/Gz/Bq7JB7AE617s3+57kgew+f4Hgddj37W+nNdutYnZ/6HQb+Pbvse2/ff2nRG/BnuexAOm1y+exHcBta7bO99iPyR4KIYkkEHuQRr7WGh+d/wDMF/2Kk9+wEAd9yQVPv8/HY/PY7+NHfYnR8DovR6d+3uN6JGt79+PY7Pz32N+2vbwaqqSVB1oEjjskn8jegTxGj79iG7e3gpWI1vSnetkE9x3P4377Pbtsfnfg8E7BAIHyPcjZJGwPf37dxsdx8gDo8UHlr7Vd9/06Ee/3bU7XsND376JPft21rkO/yfjgdadUYnobpHqTrHqCzFTw/TeDymayNueT0oa9TG0prk89iRxqOCKGGQyOdH0+ZQFwPCiUbIK7HuNdjrZ122xB9vtGvz/vVv8A6tvm2PL/APTlQ6Cx4jt9Qec3VON6LqYeSSSNsrixYr2MrSYRfdJDbaajXsqrKkuPe/G5CM22mt1UdJps2olTHDjlNEu0rZH0+qVR73z71080ennq9Th00S5ZskYd62xs3Sv/AMYEpL6V9uq18r5sWfMOx1b1/wBQytBTz+Tv9RXorTmvHRoTM83TmGszCQj67IrYo3rkPMVsfHcFeN5UmhWSv79SvmxjulcFQxi5KWlluooi+Snxjyf13NRFmilxuPdeU2Kw0byRYutehjrWbcjZaeNa8aV5Y1P155g4TpbpuajmMnYyGB6DotleqJ29WvL1X1ZkZHTH42RVjAb+p5579qaAJJHHHjKMA/4eSNYqw5sp1X5r9R3MvmLEAzXVTvbmktdqPTfS8ckkUlqTTE1KyVS1OrjoGMxx1WatXlVbEEs+N6jUZNRKW5d+VWc5tsySSnK2wButon1NVQ7DpNJjw0kf5eLaQhGNAYwjCMR+p7Lu5phfNvTjeWWLzXmhat2MBFB030xiPXoZLI250o05FrOLFqhXuxKzxUkCCxkZa0c9iw3pm3PMdGeUeKg6K6XimkoVXsNPGTat0KyUs9mFjhUTrFPKJ4+mumy/pgXpt5CZkmu3cxXtWYMnE3/SH0cFfDdDYSq1DpXp6vAcw9qAfXWrM9jji6lmnGD6uZyliGTLT0tiCmjWJLcRetXrV0N5n+aWIpRiv0yJrFSSxNVxdfGRLbu5vJV5Xgs5SaeGVP8AgoLSWa2JXkZr00dqaSWnjadelLH5cpijtxccgSbZzuhe1VuLPsHcL6kseGWef8w47sDiMA21FeZWirXNbm4yRHiyPX8kojxc1jF9L42Qq9PpjDMtHEqkRjc3M9fqzQXeorkSMGs2L9iOrXnaVxmslRsejMGXqXpGGlLlMjSp2KfpCume6pkWjjEkiYgwdKdPTVq8marxAxiKy1axWIJA9cQCnJEGGzmKMUORzOOSXM2iJcb0ekr3ntOzt6d3rS1GoVKUSCaSlgq6VDHbgmtNXqE2Hudmn0T1T1bl4sz1bk4szelrxpUx9ueaTG1EjcTK9mBR6f8ASKaeqTURJWuWpIqcKshu2ImTJZs8k47qLb+nbtKF9K9boDu9iQjpVjCMISMd1EBiXxcqK5o3W3K7W+XpfdZebFe1RjFfII2KtBxi4KVSxSfLrXDxI+OweNKtVrIyui35LtU2VDwU5oq3rFGnwPRWX6zlTJZHHWMP0/BIiGe5TqQC5baTUVWvUgFrJZm8WkU0sS2TFWsVjs5ie5TM1OxLfo7yJityrYnrXsxbt+mZ8nYgVJJAqkJWq+2PxtFIgsUWpBFVrwxqsZX7onYrYPG1szj+nUt1LWcdBXqYXH3HnhxWOjRxcu3ssI3r4qjWiUS5a7UW81muJacdqEzieE+LOb6hjit0STv9LZ7xj63a/ar6Vy6KMMQs5XTKUISAOD0LS1OXbEaG1Dpx/wBNHl0nTy0OobfTtKxFgZDVxEduvXtyHKNEtiPHYekkchnz9ivuzkrgjkr4OhLA8dqafUVR5vMzz4m6eNrpzpg/1DzAmi+myeWoLHkT0pTeVmOPwlSOX6eTOy/aqx1fU1cD5DIXZK1Oe1kN2vil6J6RpyVZ1xmXu4mSPGSxwSpD0T0w6SPPna1eG0rHN9Vc5LtsyTNfaxcq4OKybCWZ4I8dOdOV7+fnbD1LdLFxmSzl828v/wDUedSQhJq9m8+kx62UBEsOI+hElYpBPJZUovhfP4hLEGLHJiDc5XTukBKkajZW5jzE45krFlpfCZavJLPkxjGPliP0kYy4tkNq8xj9M5cptrpAtiepurrk8uWzt7J3Y5Z0kwU+Ys2qpmtSmS4c1kIJIZr16Yas5KvSfDxIF52/71eeSF0umPI6aCnJdGOrmGeWSpjaxix8VELAriaWUS1GtSRieOVKdVZ5a0cENi7fMVOGGXxKHy18tKFKGLKZ+vFXhtr/AFBKFOjEk4iTUeKx0cfNlSPhylKzJLNLBZMtlEWOzIzs2Om6dy5FO7zRwQpEkdavT9ZnjXX01SF5bSGGpAEjk+n48mmCTvHCGSIM3K7ScaJS+mO4JN1TLlb7p37WBUep3TeHk5/KYTYnEpuOTj3eXiDEqSPClAcyVlZAfKfpv/rMd6FVMOItEG/ZUyw3s1PX4GF7sx1OcRUMQTF4gsY9Itq40luWOGk8nTH6dsXBH1DU+ghFe9TrWslaijHCCfE5ijJBOkm+fqWWe0sQkaX14mi9RZfTQrL6j0zUeOOMpakfSszTxx14mbkzsDHA8s+wASvC3HruOIJ2js4DolEqz+r6TQzQlBFFAkUYRbFWaQMVXcsrIqgyyc5ZNaDBtv4VwLKZuk/+1boSkq3vdLcnvXIo81OhjhwhHGRbOWCbqljSXF+Yqw4B420Ust0l0sOka9nOx10nu2cHTXImKIVYZ5a9mb+mUWg9VzKktzJCGYo6M0VZp+MaJIJ296pqZ9Mfe+mcf1K7I8hs2GTgjTLDLNalIXcks0yiGJS8kUYrzMyd4Xknt1L0rHLTxsEUH2y1Ks0iBOHpNFDHDCmwCOK+g8vc9pLDsNjiC0HUXl8Wh2E7MRI/ff3IxKuGXXErtAgDADkO+1Xw61WolilHFBdsYg96JTpnIO3N8W974L6j9D4Rj1GFz5oRJ5Xd9Ju2Y0IxZFc8U1QhEey9VMYr/tJ5W+ZFXO4TJzVsnlMjEl2ao80VK2YnrBIJZpzUnQpJYilEslGVZY5micfSXpmksH6wyGE6mqdDea3T0VOOXqLp7I4rM0BTRJ26pxLPD600I2ohtYzM3Lq1VeMAQV4VaaFJZo2I8yPLquluSU1jK8cskhjiZhI0iLIzxI3DSFk9WHbBQqTysQkMLOrqeVUDXehMnTtoXGJz1HqeijJJuRcwZ+n57EKFWEA9JKVr0+QUKzMzhuY8K+F6+WOc8DLdHIb4Mrdk8coSZF9rxmSLVblBGgYn4h8HjLHi1EfqxpiyESJvx5RgEohzU3HK7du2SPKdR/656Mg8o/OTCdfY2ONOluuE6Q6thmWENXt2JZZ1uPTLE8cnVEcci1YwoW81aQkzTTI0/PMfoOp1rgz0/kLIo1MliIOpeiuokJn/AKJkl39bXjnj9JrWFSWFK2VxOytrHNSeo8M7Sukcf1I4tLHkb0/Q5iOx0uOvK2MtShGIjqWsTlsYlbQ9URrXnlsW0Ri4rVJaqKiFuEofIbrGj5l/pyw02QRrtjA4WKys7nUqpkI5alms+0T14o5bt+nIhKJHFXg4hjENXHSbJ58+HnZlwQ1MBFIrjhLUY2u8C5MKpZRglPPWb67fiwYNREN+HUS0mR4uUY5Nmnyr2JyIxZ9zzTEprqHFurk8ZmshQyteSHqPperGFpRRxE5bEsor5CnDZgQxXxHaWHJYixH6T3LthbdZoqtr75b+XmcShjOmshHPNJirgFKR1WBJvShEEteTjE0ark8ef+MruImjQ1yH1pFCCyY6X6l+hwuSuHH9QXql5ML1RHzWSpdxdqWpPBceJis9QZau91IfSlRYLLTKskMsQ8dToyhe/wCyOaweSqtj8ng+pqNuyiRqi8XmycVt4NBo2hlj+leuYpjGa6LNydOIdHEz+bcFlORPJD1ScGOSGObx5mBV1tnGvWzpee1xhIDGSx45FVHZMceScCm4RlzVsoo00Ru6foiZbPTOKmhlinherH9NND/4U1ZSy1pQh7p6sCxuUJJj5cCSRsqxSpPYAn/ze2j/AMp2e3bv8jf+3hpfJQzjoDARTAhoqrxxk/MaTS6HIjsACUPY/crd2Gj4dkA70QQB89j2IJ0RrXcjuey8dDlpdnTMbKUISkVKUISSqplEU96u6vmus2yAZJxi3ElKMVq2MWh9eUC6/wAdCJI+3Y9z3OtH3O1/JPft2Pue3t4MUEsh7EdgOxO9E7Otb9gT3H4/2AF48h2LMB3IPZiN99DuOWz7k/A37+BAEkA6PcEAaHf/AM3x7dvbsd+/bwd/Xk/z/t364fVXYU479uQ/2/z0QQQx9mIJGtt29u2wGB+fbX/toQJ3vj22CNHsR89+2yOxAAHbZOxrxg+5H5Yn412UDR18Eg9v868faOxs7O/xtRo7HbvrW97/ADs/PgdF/f6dHqOwAPH3J38sPcEAHXv2P++ifBw7D3IIOt6IBO9n3B+APj/O/BSfAJIO+xAGh89/j32BvegoHvsAfIknffW9nZ9ySQR2Gu2t7B9h/PgdHA/+XFHtX9u3v27d+thNjuw7cv8A1G9An/8Ab8nf49t78ec//V+6+i//AFCeWGEs2fWodA9BRZd6SkOsWS6pyWarLJGid0ydqGvVq0DpXjmZbJYQ1yD6NI9dy3YAgnRJ7a0QN+xJG/nW/nW/HkQ/1Vup5Lv6oOuL8jqkuBsQVamzpJ3r1qPR+EqyAkM3o/W5HKxKzbEoadAroXWr/Fuf5XhMoBzmz48ZylheS+D3gcXy/wBrX8I6czeLwof5WHLMA4GTDGL+O+R347vKdVO/qL6qyOQy3QflzDNteo7mX8wepuLkPOJ/Uq9OnkvprFBDWgFuyJW9GKpatWEZZVRl3/LnHS4PA3eppsazW5a3PHVir85q09yfHdL00hlKgyTx0pMzFGRpasdWnIHImewgOsKle/50Ze5LFJNVwnQ2HoVeTc5OUWIr0IcdXMhYKbDieCZVZSYfqEk5RyaMn6+PrR4nCeqiRHG1PrSzMZI5pqS47F47Z7KEHUMk92VWcOIzPPIqohCZW5HbCJwMRkvLV979y4xv8OOtahgl5pPNyQ7sdzsaSnkSacc/YLGu6v8AMPH9DdOVOhsYZbud6jis5bP5qsXmsRULgWjlrVfkDMmSzM8MuEw80qv9LhYhkZUVsrWtRt5hcfUaRM5lWWnkbcIWnFHBLJPWxsSiLH141i0+MofS+hDVrFks2oYIVtSR1Ynr2Ux07mxkbfVnXN+u0yZrPX4unoY65l9Hp/BhMLi2SOZVUJM6R1Yq8KmEir6rkRROWXnSPTl7qvIrem9d6QmPpwuxRZCksm5JZSUD6cysRtklnE87M/qSO0Rrs/y8jCLTEIshdkT1K7Ncjzx6JR1YPDdA5sJkkLGSyIbPNkkdpClVx24fsqdPH5c9H4xosl1BklykOLE0YyGeyMlLGpPbgRzBUwWHxAe9buQB44fUsZlZCDUjikqyMFifLAVcbLMZen8FiqdiyxWm2RnuzpcjhC6t26lYxutIlZbLtlshlI2eNjE88rNZKbwvSU+WXG17cUseOxZWjisfGuoKpfmxtMuwZJ5YXM0k2iwj+okAWZ3jSUXRfRVDGlYoaoPLi9qxKrqbDR8QzSH7mhqRALFDFGjaESIsbOzc4yWqWUY7rD+rjzUVFefQ5BsexfHUzi8IuLkkSODdBlxHtJEALQ5qgqgC1QWcr5uLCPUinWOG3Eiz43DUFx1STmRuWbZkuW2lkJjgol5FmkliSCvZlYAuj5TeUuP6OlyvUWe43J5IK93NRTyGxLcsRmBsX0pLZIcw4PHStJbyVSuJFyhF9Qxr368czh1MFFcsx+kHlmjn9RbSxkpTkd0AtQI/qhsiyvwpV5A5hdhMRFO/ZX8BXepj4D6dfHobVmOGQl3nDkVq8shLF545OVied3PrWzPM6qLaxoqaiWOJIVmhEHnixWhp+56JRfRc3h8Zx+XAIwplOjaq7Q52iJRt4s4bGIqW6ntXZa9j+rH6hsij277GBbtqf0wkwistzqrCvGSGusvKeVDC1qWn9UJIJ1H0hgoK1OHKX4QpHCapio2b0HeRdVWu/wBqNbFiVWIjq8TWhheQitynmJLqY9MjdnZ1mtRJNGWWEoPVZpligpwSEMjy25ilZXZj6aF5YoiwMkbyU8KQ9KQLFLXqRu49Et6Vi82kszHlr/h60vOKkg5SNqSQrGJGHghKc471t3VHdzLuLIVeC337L3RD4NPCE4aaNhdzR22VxHs0r39quyMWuri8ZLHE8kjM9qZQLMsn2qomZSYY0jKmNeCiCNIpI3VI3kmkkWVoi4GDxc0k6hQjjsoO+4bsSVChDrfIAgAk/cx2dEnG1kdgpi255SsFH3c2I5M+tMUQf20VB3kUgltvtysDUeHUxjETF0EX7dhAeJ3sEBz2B2TrZbuO4dYsbxbdB6Pei6e9q97Wrt7BL1HFFIRCSlL2fpOC3g7lfnyddungoRGrNEXZR9wYDZIGwQS3bnG0qr7f3Rrbce66wFdJLAqFS0TTxurIVHGJFR5OJC/afVjhc77qztHretcaNWjRvWcNyJjUbYrp2K70fwxVlHxo/wDKNeFThlSi7JGS8s8IllYOUaEPKXCoewJLQxLKuwByOyx3qQxfy8hIpInZb71x7r3rjt9rqJ1i54ygyVUB5AIsWxr+n249q7PS0mEFqUOqgQ8SmiFJYwu6BgB7Eq3FhoDSrochsJ3IYSO3FKvsNSBT9hYMgPDiGI2nLTEg+ylSCGJ8dKC/FLFrQRgSYy3ccuO9NoEfd7jt3bY7FhsE9kkow/Y2gdgk99ggkMAG2ACdHseI0fuHWRlkykDac9h7fmBxz+L79EhFwxMcTZKIANPY4+0lA597K6h35jdL10tWIFgjV2AGuKsFdFAWUjQbZ5oSD2MbAMAZWiVD+XWNlx1bNwyQssTYi1XZXdmRoZZTJEAY/vEdSJSAHGiqfaAQ3iRnWuMjvZiPQYl2nQFAeWvRDEniRtVMESgluO/ub2ALcxx1unhficqjrkd+oQDwjnkPpliORcqZSBEEc8XfSN30jFcOWMywjKRYgAkT9W+Pek57dJ6vA6nExrzuOM9tLaV+JwBz25uxp6YHz9tNH0L/AEKz6C2IsXejjaQ/bXzOfw+dgnMihtqjUbk0MrMxKLAk2wEQlc/pRnkqeRWWml/4BLmQw+BESRrGtWJRFammEKqw5et61iR1JBV1D+5DRq8681cyudggImaoLktm1TjUSTW5bE//AA+Pl7skDR147UMpcKkEH9SEhb1E5SI6YzCYDy6wvSUBUGxWyOQyk1KWs8cEuSjqV6j1eTo0y43HpNPTlseipNONrOpbKobb4XqDLOU921jgyY47m0Z7IDZT9JzfoNUnGT+O6RwkcbjjIlqYZpkSqI7pvucyRDk572oRE8//ADHn6Hs9C5yCIS2KnVeEkydOVnkg/o3VnS+Po5dEqxNGiSY+PENYqKwWMNeljlV69qyUnX5T9Y0uuul9LPHWydOpXgkvxs1j6zFisUh+6TlLa/pz2568sjI86xxQykSesgaqjzhx97rnP9cVg62IIk6fr4+ZnlqwVKmJyeLoyO0pPFKlavOBBOV9UQzwpZmlkaXm+36I/NlepbE+Pr2ElWC/ckx3E8WsQV5PTngsqvKevZuVngs0lmEAsJYhjIkhrRuexzzw6mOSNBNIg9nYbOG+Hg5Kq69npKWmx5tGEhXEDJDmJlI5QkJaCysrkivN8+lPySzFLJ9EYyrWDR2MTDHStQSEGVHXvHMHQmOeK1G62EsxMY5ebMgUAgPJo/dsHj22SN/neyN9tb2Qfc+3t4hn+nzKrVydjEfUb/eawPDZpTM1gUwAOIiq25Xt1ECKIq9uauFFZYJ55mFgQv5I32IJJP4IJ/HwD9uv99W0Gf8AidJgy8CwjGQekoRBE9E4s6yzXYP4fVZsY355SjK+GM+Rtee7/jrKKV130F2w7AgDewORJ3rt/wBB768CRvuGwNg9vY99j7T379v5G96/Pgoa0TrRJGgB8g69gOwb33veh3J+Bg67jZ9wQ2t6OvbZHsePvv8A/wAu/wB/v98dNI8I+1v6HH9+tYjuSSOPIduw+ACAAD3JB2fnQ7DwId99iQW2ByJI/kEdu3z29h7jW/BbhfY9wWKk70N/B+Se5760D27ADuMdwR3Gxr2Gh8e4JBPsOxPt4HXOj0P28e5JOw34OtH2IHbTD2/n414MB0QCAf8A2+NaJZgT2I+7Y770Rs+CVOxrfft3B7aBO217/tBHYA7HYjfg8D8fd7dxvY7g79zonRA2Trf5BHgfv/HH59Gjyh6+j7evb1v79HKCYyP3aA467E70Qfkb7aJJ0e3btseUP/VL8ubeN89/MFrqbbMZzHdR4+VkYCbEW7kNoIgVeJatVyEnpaYAzwyIeLR+PV7D7Eb9tAA67hRojR9u4I/69/igb/V9rY635gdHV/p0S2nl272bAVFeYX8/mKlWvKSQ78B/egKnkkpAjIOvFV+LowfCWcnnBmxzBt3MiUNv3vdf5VXPFv8Ag+czxrFjj2zYcmOSd48wmSPwY7X/AN181T5pJ60a+bmZgsLwlv8A01arGqlwTWyj27UyMOX2xyww0oDKRzE1koGFdz4kZ1AppdJxTQSIP6jj81VqSF9pHYF3K8eCj7AnGxID92lkeuVJEBZY15nG2rfnV09Yr+smPx+KdogkwUy5G9/8SuW7IQ6sR1q9vIVYFbYpmxalBWRq6TydxTQdS4uXCpEs8lDK2JzKqKtbGpJJFNJX9UEqZ5jHCtjgrhbPqQxlGRozkGaT8uKD5oKU1TuuvxqNnPAgUc9bZpw+bKEw4ynL2XbGKldrWuz9Lw3TErD46SxUx2Phrek9YRVoEjISOCF3kZCw9jMPUeR3CjkwaRl5li0tOg+lZK9OARwHaxRBQoDKXl+0rsEcQkPoxAfaFkRlPfbHUxvlcaeULBXV/VrlUXWmEcaKCwJC+4YAqCpADnso3IjBYd6CIIYeE8m1ATejJp/vYghToyOQSSANkHY8QGpVaKb7tXfNX9ueafWz16vHhkIkSIEdoAVZxXLT6rXLw33rpU9LYqFRWjkAaSqVGwCRNZl0ZZJCRorAFjgjXsAsJYH+6dP1g8SZz6UZREVUaecngsKaHvJoDnxYfBHEsZFdWdHb3pnCKiKzyMGLtLNONh+bsWYxIx0yAHihY8TrkVYg+Hahy8OPiWnjK6S2X2QHHqLC51/eljjIexbk0oQFvs0rhkAUljCO2e6TRY7Sn0oAPTsfhQ2dTEomzbGP1WW9qdu607XzfH42ddK1Zx3S1UuE523i4Ymm6Eyl5zt8g8YVpBLOSfpncRyNA6yRBIptjhwGfUdYq9nI5axGZYw39+1LIecMTvG4YVoAOVlwP7kgkcELE3IaY/IWHkylutPeuyaFVJFCp6pUFCyopmmYoTqGtEIkjH9xp1YtGp8BjafTByPUXUEiWM3LCsccPbhQikAVadeOIszWZzpW4PLLHEioh0rK7uC5JXPyxB8z/TEq6r+qXJHuRHntXUfmwmODtuWRRCIed8oHD5YFkleVtBU6XfTmAr0Iv7gJlhgmczRqrcZljMVuaGLa7SOJmx+PVkMSyThSONpGCowBks+jNHoVon51aoIIdI5+AAkI5P69phH6zFVkAlkQFxy8IKplbmXdMd6f0t/INB9SqHh9Hjo3EnCVUO09GNwvAaQ2maMhlqR+HtwGKii4CvEVjgWOMEBFhUxLxBjGttwTaIwABlMjgLvkXWBZy3AbYVGIcXyWv2jwe+71eKa4dNLGssj5spctxcYwo7JXM26YtlUVT0s8VjU4rKYxykcPKyqeJZtOQFA/av3BSWILa9xo+F3TgdAgAWQclZm0oJU63rYA2AV+0b760dMCONRYRQIHRSvPQ2Pt0Brup4hdkFQ2+x02iQNddp4oSsgUzhPsCqwI3r/D60PcAjallPvsSeOg4a4OfTmuVrjk7pyPazoZbeAuuI+t7QAHj0ouznn06OlvejYA4gklQq7V3BduKysAWVNABhG2nZuAYActKStekbhEykARFg5P3FeSBebbDE75Egn3PYgEAI2WwtiQGGBYHlkUsW+8jkBrTdtb02t8dgcj3bwoI4bCFX7aVRtdb2GXRDaAPYDYBPYaIAJB8Bk8g90t9+bS6Gn+3p26SlihEJSjEmQsFumo9g4DuFqq8+nSpquG2HDL/cGiSo9uILEDR4HWzvWiW7nW/HWKiYckIJJ/gjWhtT9qr+4b2djfsT30hPqnT1OTEFdsQ2yCnvrQAA7AoD+Ng+wJ3/6jIIAIJ/TccHU6U7VdbU71y5e2j3G1HtostCcURO/PFWp6dy+35dNZwm9mrov0B22+vDYv5flpZen62UX09coIGLa2ObTsI15MAAW/sOfsG+xYfPhjfNGjNBVbjXLPLAGdgSmmjYBQeyopYxhS2tp2f7yoAkHFZhlDTMsck44Euu0IIXiOYbX2KrDYBI0DyP7x4TnVOKjzGPuLaREZ4wI5UdXC92WNOPcs2yORXXIfah5cR45LHHLhQl5r3InFUVdepE/G+fXrkpOKcZ7WRGNPucFoD5gbaTmqrqm7zPgle/Qy2XgltUsPYE9uKpN9NkAZ3rVIJaVl2CQG3XT+nZSScSx1qgks14pbEpQ9abzAzWeqZbIGexHaoL6c8dWP04a1SSX00mpwgkyU5HjWG/TneSZbcNkakmnpvXcjzbxsNW3YC1kkqu0qshWMhgxNaRWVuUcschRQ8cqSVnU2VcaZdMv0piTVOXs0JFsJSlq3Ja7szQvAklNjLI37/opakZxuUrTFyZVqWg8taaNwnpp5Y5DHGUgsGmraKeK3AW0ryNUolf8AFcWBxSzSx3IGUdwy2kmKhdsZLJ3JXc5SNdJ7qjH5Buguuc/TlkhvSeW3W1nh9vFMgKkNWqhBKDkuRqXMgVjAeSKGSdELQ/22P/R7lz0v130lnaEyitkZquOy6nlGPVqS5OhDcJTfKzjrs9bGoh5NLjoZXYqsEwgmTmMRT/o3UeEgEwpTYbKzV0JaWSw+WoxwU+a6U+mtrMGD0fTMbiK+SQodVgz5K9My4TLW8UA9YpJ/UccZGcFlyFGtZgYSnk3rvHYe66gc1r350A9YuvidlKUYYKbkM7rvZsfUrltDi+V7HVMjAn/FHaK40ileSQnmruREO3ax7PXpE8suqP6V1lg8hXmBbKVFlrRMx+/K1q0n9Vxsp5MpSfHw0Z6/fjLK1XlvgwFplaeOzWr2Y9GOeGOVCg2Ckq849De9EEa2AdMO2tE0u9OX54sRj74f+907mqCaBUyRTYtYbVoJ6ali8kZmilVpCClZIuAQKDcvggEw2OCkvGaVQxlghPFq6Mo+0cd8WUAqNd96A7eNI+Gc0pYc2JVImDLzxzljIkl8vMG/QoD2M2+I8UY5MOQAv52EB823E4pRJVxwZPL3bZt00dUb7jfYEAaH4GmJAB3s9yD779/Bir9yj8D3B1+PYjfft7fP57HwVrXYMNA9iCO3Yge3f5PYj/cDehggkbJ2Dx7jR927jvrXf5PcaOgNkWj/AG4/x1Whjzx6VVvNv9qr8/t1pk++u/wN7/Oz+fn+Nnfc9h4GjDR48tnZ0D3IAJ/A/n3P/p32U4GyQNA7DDS791A9tk6OvjW9AnvvwNPdtn/7u21OgN69971+T7bJOgR0X9/v9/j0ag2R7fniQD39x379yO4b8E9t9/B4Gl7nZJ77P/TXcDe9fz/Gt+NfYXv23v8AcBy2AQe3ts7AK9j8+D12Ox12+7iR7aIAAGhrud617kj42R10iv7P8KdbcRHcH4A3r86Kg9iPb8+3xsDRPn7/ANYrGXsd1d051TJJ6FBuj8FFFL9o2K+Zyv1LDvvjWdUstGP+b7ZCvIePQHG4UnvoHXYk7DbP4BIJ9+5/GvnxSD/rSWY830t5Q9B04g+b6msdUVks8VBo0JrPS9f6qaXkrx16pORt8wdj05vTAkddwHxJghm8Lz70CEsWTnndWSEap44JLXFoHa+rJ8N6jJp/GNLLGWyMuO/WO7Gy3H5wIvPBJ68yaYadurrGgK8VTF0TevDQ+mbKenbtIzBirz5COlEK8A5vHTwzxJDNJYBD09OXaOOsVumcOskEMEqy5edlPrTWbatZlFhQrOJOEhLVyT6FSaGBj6jPyQGbv1b3VV+OlX9HD1uqshIaSMUnu/0A143+okYmAm5lDg8ZFEXjEVXGMwUpOYT0+lbSr1tWwMcqPlbZGWzEBClqb3JQa9eVu7NJ6UQkkd2IjkjCj7ZUYYvrLINNm2MWTwLQBZ3OW+zSfa9w8NPm6iJ2ZSZEXmvMSkyv1jxS+/q9Tnq9Pxz1KlmJEUpGhLlVMwiADRrKy6DuoJTbE9ie/pqqsp6WNi2oMADsm1AHYaA/+7jsLrQAIO9e48dDCQ6owodemIVHDRDEgcQWJ332o3yPL7tH7gfCmq04y6cEIYnsSNjRBB1rXb37jud/aNDZrs1Sx5+xd/l+h+XPr1pGhhsInLQcdq4FHm+PZ/Ll61qGMdQFcEhztvbSA/j7fcH37aHx86cnpnBlp4gCUJY8FA4ktokyFgBxPEsXd2LkAAMFJ2XjsNLKEIBGgO5UgD8713LADe+yj4A2duLhMY0KwcgrlywbkN7TfxocQWA0FB9t9+/ZtHHImNJER/frx79yvR6lZyiR7nryxePUT2Cu3+Ou2vT8SUhGtlppJOZsPAECqXYrvkNIqbQL6bKEk27mMOgYoyz09WpTG1t7HpsGrJ3aISKvEzPM3N7M/JiolbjwjJVA3P7nspYunZhhWxGXEh0EeTiqgEgIkbcgVGySSB8bYD7vCks9K4y2qxQla0NcoFikAUSSOUjj4De1RXIYKdyEkFt9vD4xzlEQI0BXK27R/QLf92+mEMsceSsrJG7oNtG32tW+BIh3trs03RvTFiCObJXIytjJMQiFd+lCG2vwXJdl48CAugN7Kfa9mOqJBFHFw4OnH7QD9xAJI7Dvv93vx7/u7d1S2Jr0q8MEju0deFEUyKhJCxRozKAAyHmXPbvyALey64prVZ45pkefjHG7+mrJE4jXkzvsnYjHZCxBbY2gBHh3iwOPZ/VUa4fuWvPvT/z03lmMhKT5Y7zsSeOIxOa5InJyWcp11I5K7Aw2A0TDX2MF9wD7AE9gwJ0SRo7/ADvo0cfHKwZbCOJNBIeQUkaKjWtnuCdMQF2uwe2i3NKZZpX9FpkEnqJqzLyAQA7PJ2UhDo6cxl9EEP8AtXw8nTMby0zJNDGJIwnpND9oKK4Qt3bm8Z7heKqGJUb+7Ydwqcvpu+1WFFW0cd/f/D031L/DRvc8IMarzNHBK+L4abou307uHwEEqiaSEK6kIdHW4+S8pGfZB+eJ3sAqPgoFbNiaqqIqix+toOUUDajsSSAFbbAEqHHt3+4kDxq42dUKhXVUMIICnYDft77CE71xB1xI3pmBJG7alCGUx7jkEfMsuu42Pt335a7bG/x7bPh3DaRLiJwLxforF95cFc8v26hcmTJPNwyj/wBtstpZGPmG7ibjt+p36bTP1hX9Sfk20LAKoJITsu5NkgqBGm9dz+Ox2jHuSqvrRKX4gtxJAHFl4MADpdhiOJPYMoPFj4da7SW6zSTFm2FjkCjgG+8EgBOJZiSrbDew7oSNLybHTCNE00IcBgVCfaUCycztiOx2Q2/fvr+Nt5Y5rJIrQNevoc37vH689P4anDjgGT1kFvAvAxurteba4fwOkrjLkksSyMhVl1yLqdyDlrYCE8lI327Fhs7bTctnLXZkhmliEZVoHVQ3Isrld6G/sKckXSggyce5CjkM2MdPSkMbswVIQUZ96XX2sNgnRK8eJLb05ILa7JnM2Eas0aP6ToC6cPbmdoQCSGA7OAd9uLLoBSqlZIBTFH/kpHoSYTisa2Sv/wAqi0nJz7chxzR1CXzOpNPBcr8F9XlK1bmDylUuWaCQFht5GQcBth6i99Sy68RY8pcuV8xv6ahT08mlvF/S2Yy8L3bfKOs8yvvjUTIzwVrkD8RwnJBTm6Qy/wDMOnPNZtyvGyJIj8lUaHMBjyjHZDMjlZFXt35Iw9OR1eB2eabAeYNLL1WdJRl6EtuLsDJOt2qsGSgkXRlqXRLVWxw04tFbMgSaw7Bvjy/Kz4p39M4yavmMZHBxxxZ6qLfbmK8S0/zdJqIB/wBTHMjV8ST6u/PKJ7S5O9dSEkx/9N8zKGKX1IqF+OvPj4bHKblVyFOK0ce4k5xsmBnyFviqaSaSNpkjkjiYFjMZi6/T13IZe7V+psYXq+5i8ZUiZVsXJobOYxn0zF2WCeCSTH3LCsr8q1CCCNUd7EKTSB8zMlVw/V3llZiZFS3h8lkKMrLy9NsTclnikYnRZRjMwkcyqo4JAhVSUiXwwHmFn5MX5xdIY6aFRF09NTynVFeD7vp+p+q4qVm3SsFQsU1nBYIY6KeYRlv6javxuI5AqvYpIQzStSGaJAThckYSY+n00yo7px2azwJSyYBs+Zp5ORZemLJIv1QlZBT6ZSt4Q6sp8kMhJ1RjOp+nFlWa5PmJMoihgSnOx9VNOjIWYlDBIWVSqLHZI0eSxte7h6v0WIxdXkD9NRqVeRBDP6FeOPvr9u2B7A/PfevFEn6WKNbF/qMo40yxNheo+nPpq1UoVWOS7VadJFYhSweHEQ8XHM+qGWT7pX53zxDjDGNdlUAnXuAF/aN67779gfyDyGtG+EY3os2Vbl835D9o4iU4vPNPzkB/H1ozv4sn/wCrwY4iQ+T88/8AdlMeOXe3j5JZ7vQlG9+y6bZ7aH7t/HHWySPf32D7DYyfvUEkgd+WtkkDfue5B0FAJ/C/z4Ds7IYb3o+29HtofBGw357HQ9jsDVQW7dl7kdidAAkH8HQ+SN9+52NeLb1VQvsdu/Pe+3vX7uutEjuR2IDb0Rv/AD32Nf7DsND48DB2PYAex9yewPHQBOtaG/ff8fAWGmY7B3vvr27gD86I3+3vsn57eMqB867gj8a0N7Hf237/AONb7+B0X9/8+vRm22PuGj8sQAdk73rWwQN6Pz7H38bAB12IHYhuWySAWB38aAI2f+nggHWiT8kb1sjuR8D+Px8jwaB89jtvnWz8nYIIGu/uR7+B0eN3wX7nB711sxkAbI7D/wBP57HZ9vjf/Xx5kv8AV5837FH9Sdbpqe0iQ4Py/wAXQwlcqHeOqZJclnMsvBuXrxZTqPGyMiorPUwdldSkrEvpujIHZhx5fAO9LoDXEA/ne9HYBI0fHkh/1m+hrUX61MZl4eYhznQHQ0VbmWarFVt5+0l+e4NkKS9WaMzIFeKlEqczwQNWviuGTJ4UxhLaOfGzbeYRJSrhOGZC+Ht79Wv4Tljj4tH5hf8AIyOPtxNnijfP/gy/K/zrl8qsFBcD5e5IJkx8UWfsGy8h+szF6a9caGyhdmX+kzJWeZH9TcsdaST1RLHHGX+lbHxdW+Z3md1lYYWI1zz0qEvdm9KtGqrCN6HGqoWNwARLMC55BFAVNCWHDdHTSwLDUizuVvYtmULHNDGti/ZnsoJZeAky1qIwuA7usOKgjVgEZm2v0MdOT43CdZ3bsMteXIdY5maGKUlSkJu2I14qwDLH6iyJFv8AciK/fYJyDxGKYJgcDCHDdEkUV7vlFCqv79bX4AE9fGU+OJSjdcgALHk43IK9o13rqxPGQCOGPimjsj2/+odiSfYHTf52fnXhYY8QgmR3WNYiOTSfbzJ7sEU6Y+yjRRCQR6aMAfCN9cVqrOh7RxyyM+1UIFZSdBm2HOggUqQd7YqPDWZbqTIk/wBQnuzxxTLK1DF0oykgro00azzGQ7MllkZ1eVdeiwmMb+sqpBgRhHjkrhXbSDftzVFN3y8dXzFmd8qdvPBy9qeC/wC8qPzTqWlPM0qS/USTiFO3ITEj7NbdyWIVAg+5tE6PEtotoL/pzM4O/PEK+ShIBUlWmjI254oFEZZmXZBVVH9zg/DkCR4rPynWnWkdKaapQnoRkJBAGhlydiSMj7OTV3jUtJpeDQwRhB2X0nB03cfmR1z0o39SXDdTJaDPY/8Al1q1JORBMn08M7eh6hCszCRpnU/esj8GRKM4khYiFAXX34Xhvnuf3L6efPZFD5nuxN3sUhceL7klv0a6vGiMkE8RjlWQQsCgTZ+5hseoQAgckg8djejrQG2Uy5mCOZIZoVjkI5cmdXRZ3YB5h/8A2gSgUKACGPIhvto+xH6wvNmWQUpaqVqiEwvGsQ+oiTSK7QjiGl/tn1BGYjMFRiLD8lBfrA/qC6sWXF2bWZ/qVEqUatNTjSzFFMwZlhli5CzGodWLALGIwwUMGKldzHJG6mifSh27+vBVd+x2eeuYgntZ7RjZwTHks7BzvS7K5eb7WwZjMRJXFgSoYCTyPNWBZ5ELE6QaKA8AO3HbqACA3hBW+qMeKcm3CSNGWdgwVIkK8tAsWYFwFI7M53ti2lAY7G+Y1XKYWTjbEjVoZTPXZgkcNjgrIoMp7tJtH5tv1C8XE8HJRExy5nMNYhEzvzjMYYMyBiVARdo3Y9yDxZo2O2SfuAyrqPloyq5Fekgsj+AtXXdrgq+Hem0uGW4XaY0bBLrkPVoKe9Kj71I/F9T45mWITLKSyKoA+9GVl0fu5KSddi4b7gexHs9+B6mhqxBpuJUovCNH3y5F1RWBLbfkPvAJ0XAZiPtFftSzdxliOC2JhKjI7LGxTgF1osCWMisVHdpCFGgFIA8crrbzttYD6erK301eJJQYl5mSwUUKjFxE3NkcLuJyqsp0qNIDx4a2MOaaCIxKvuc288Xwl+h6dc1WghmSMbSSvPtV2UiXXsB3a7to1fqrC2IZTHerK0TkAeqEETg/fpVdvUOtt25AhtK7Fgz9Cl1XgLaKLOQg+wiPk0nBJ2i0z8fU00kff9y8e4UOVkBjHntz/wCpTzEhu3LWNxuQnSV5AsUM7qErJ3WOZIZOQjfcTGMhWnbkryFS0SJGH9XXXV62K2U6fsRNGwUmKFgyDi0RkUSzBCSr8Q6ozcWZY4B6nqBxHxCQbjHCSBYy7ljyPPHPb1e7XUBqNBtWJkycKxntqUOC6lwNp3ZXxf8A5Hpibqrpl44/Rt4+RB6R360O5CdEqAHLOz70IwC3YhvnkmbnmXg68p9EpZTbK3Fox9OVfg4lhPJ17xljpFAVebHSAijfo7zp69yk0b0KOSqY9d/V2MlYL1WjUKriZ7c3KWeSPvtDJ6exGFh0EEh8f1obsY425nsSwh4pakjQLWkZVJVIlkdGj+4BohuJ1JbTQufC0fGO27DGD6ziH2KLtaAObeTmyxh/+oirWSc4x/pV4tOZI0P9+OzwNltnqTD5xTGJ4YmubWrIBxCTsuoPUVjxMDtIv9xWaKVJCAQNOGryEc8bTpaQi3FPJG47hVhbiQGBB4tGCg3zICsPYFAYeYXzHyta+lFbzm7CE+lqz8WrTfe/qV1HpkwCxGzj0uDxmSSQBArho5U4/KWs5iKOSUySevB6NyKSOaKeGWqSiGdpgxkkjgZGkPqblFUuD9xcqOTFqTfG98eXtTFC7LXcWUn9N9uEMafNo6hLZ8rJQNyokIlSQ8soXdrcgBvs3HVeKW1Xnec73GWiAPYsVIVmUDa8R/bB5aA2Sf2g17eZPT9lc3QZYFVVy+PSOyULLWqWLyTPXuFPuhhQD1BJoRySCFmk9VJke0XNVPUoSj0y0rxSHgAoCKf7YHYLxBl9d+JbXH0+AOwWg15hU7NPLGwlX6iAM0d2B+yy15BweKTZIZJneMOzEqhMO+JiDmOzQ25Ito2bk5u0e3r2/J/A6XyxZ6TJKIWFU9g+zaR3env24Hjl9WW6+QyX6f8AqeeINiui+ler+v8ANWpYfWifF4fFQGhjrFVG4vXv5OClDPW2ztV9Q8dldtLT8uOqupM5T8w81YZbfU0M1vIVyI/Umu2bN3JXMnErRJDcsrMZq2Sp15zPXr0HyUUARrckcgeuOmjB5bf9m8XYgXM4TCYnGZQCB7qqrV+n2v4dWXb2/wCk1qEsmXWJZIPq/qKcqKY7SR7UlK3kelK2Nx0zQepeh6jxVirK8BxHULwTUbP087iR0pwZIVlhMTvHLjLccxknBvyG0VAjEythD5tRSnLtxwezywIPfkZUIdsql8yc3+HLZZXFTHkxb3LZFO0nKIjTHH2s2kr/ACJpwf8AeZ5GdRJqOVK5pZAhX9UJE1emyjcRiKI084LsY1jWJ3bsSovNjUhNL7e2u+xv57aHb8gnjr+fFKnkfblzvVvl5CBNU/o+YhpZa3Esi4+W9flM9e0z7edBPMi1JVWZo4ZGj5RMwYx3XK3JP2k6Xl7DQ5A6IOh22d777LDWuPfRPhHJDJo9TLHKM4ufH5o8eb5GMlZb6gX2UkHbigfGGmz6XV6WGoxZMU5afJKMchT8tzy2NoWJyFWRYr9XQQAO2h8EfGtfk9wANEjue299/GQSCACCAQQNb7a1vsD3BB7nQX/c+Mfk9tft0uvxrsf53pu2z22e3cQPJgeQGjo70SOw0CRsHeyO5J7e/ftbeqjG+aa92h9/3xfWmd8iQe59xsHfYAnXsd9/bYG++/AgN6Cn4BHv76A37n313H/1E9z4LfsfcqTv/H59+w7/AM67Ej58ZBG9jXsO50Ox9x32Rr2bY7Ht314HROjl0f29tqTrj8Ee3uO7a0Adj3Oj20NCdg8TrjonR7aAJ/2BPfft4L2SN6/jtonv7a/jsd60e3v4GpYdtgew7kE9hr+e34Pb3A14HRoyR+3qer1tR9v3b2e2idgE/aR8b0DxUaHf576FG3+sX5TUb6+X3mylEz3Ti7vR1mdOSLEcLYlzVF5JFKkSzRZm76ILud40Eq6x9rxUOiOxOzy+DptkaGvg6Hf5129vEbf1keXtfzI/Tb5q4dqsVjIYvpi51XhWKBpa2W6XjfMK9Vj3iltU697HSMP31r1iJiUcgxfjOH5/h2qgAzjillxjbcsNZa/+RBj/APLjnqc8CyRx+MeHfMlKOLLqsWnzSjwxx6mccMp8V/02Zl9vJyJx147cT0zS6gxGRzNm1Jbw/QSZS7kK8sEki5uzJUkv4WzTjfTSPat5jIoRMPTggkjMsRgmibw8HkZVaHBwZZkQDMXmScxuGrxWahZZYVdFCMQ0hjBiZ/VMbTerMrCd+TmUq9JeXnVFMwpJds52VaEBiYUwuRVLNcruQ/W2ls7pwQhEgWFYIir7UK7Plxg56/QlCC4ogs1Y68orQRQxVccipCn0NOKFljWKFS/IKkTOG9XUiSLIcU8SnGcBiUTPmSCXAslo49hKafW6Ot98J0+TTa/Jimk3TycEZerUYVJOF3Mrs4+xXSnz1yRVlpwvJ6k59INGxHD2ebSg7d5EUHguyF1xUhW3xocBirWrebhWdyqqoLSpBEqKqRQxRqqk+knpxpyKABA7AvvXQlsUvVZrU9KJdcybduOn6ci7VWEhjljc925CRGZizIzJvZaDzO6syM9CXDdGZauOock/0FSSFvqhVebaixIx5QR+ivJxISq+pxDcl/titZssDh5/pC/dAWv6aeVqu346HodHNuSIBe/keYnq+3tdPB+Ch6s83fK7ythc5zLUaLwQqBRih+syCxNxMQatWRzCszHis8ywiViAJGIA8Ra60/Xr09X/AKpT6Z8v8pkVx9aGae3nzQwlTjdmirUeTXZi3/Gyui1EELNZmaJV0Dz8bfTX6FshnLy5jqbzIz2ayFiyuSngtyVZcY10qJTKRJBJJZZHJCLdNiOEAJFGgBXwqOtv0DYrrVsyepclk8hVz+KxuDzcNSTFR47LVccxekZaxqCWmarlX54+WCR200hbggEpocPh08kDWTyMJBuljY448MFBYsjhly8WRDvxH+Kz8XjppvhWHRuoJEYx1UprtePmUEMSkgSG9lW5vguI9r9QnXHmHewsFfp7p/pmXqNsp/Q5UWLO1MvNgn3k6seUwt1WxuSoakjlhuQqbBSxXruZIyfHVo+b/UWEsR0eqKn9JsBg9LLVp5bWOuPG6hjVnYK0E0Mu0mhaMTIxJbmGZi+3R/6I+mfI6Lp6XpvKzVrPTOWymVxOOf8Av4pJ8rG0c01rHyNJLceEFWjFcQMxiiDSkIU8IvqTyKzlzqa5mMd1HgpIstYN7I4vMR2ko2HY6uN/TpJ4qlUSxmIxTQVIbUZh2Jjzk5q63HoDMw0cLwBxKVSyHIFseVRFGNVySLeh4VDxV0Ucvic8UdS3vMdGG/LbGMSwJbkd27sUx5ZC+Qfm9LncqtK7dWw85VoZOSBuRCAGQoCVBGyrKI5HYECbs4Fu/lF0imdFOUMh9QsZFBVQAWJYqzBx35DRH39xy4nt4pZ6F8vsX0pm8M+HeqLCWVXIVa396EShl5+jY4w8YCWEicVKuOLMqkeLuf065VhTpQkFV9OWUbJKEjTMzE8Q3qpyVNtrQ0FVmG4TKYzNAFlFaRfN3B+36jx3GurBjM89LknW2eziQUVVlidgLr0bL7isPM7yorVcY9qOusEggcBx3cMUDEoSfUOuQ25K7dQQVCsFqs85uoqvS83oWYkszwqyNYmdtRje3JLck1xUEHiCSABojYvp6wxz5PCPy1yaoyKxAYAcdswILEszD7W37Oui+uQqT89f09ydTPmb6V6NqzXr2GxNK20i15rbRkRvcMYLmBnKhwFLJEzyAhwqsvn00Mc1xjSH58Hr682HDb2r0j9Hr5ZIRhnnG9+1kr6MRG6eKtOOPyGqTL+cXUF6SxV6GxVG5FyYX8tl4Go4WmUbjuWYE2bTRIwEghYodg+ojEIyNyX6oOufLe7lIeovL7FZ+p0/isdm8rbeinSlCKjlMhBjaVqrey2Vlt2Xns2YmThQYiuvrvC0YB8P70v5B9VdPdTG/n+qKNawJyYsdhWrTYGB4WX0y2KtxyQuy9gZS6SNoOzyNsle9ffpWbzovWrmfv3M0MlgIel8pUqQY2THZjEw25bNM3qUjR/38dJbmNezWkisBTxkll478PPCTwzJlDXxmQvvHiRJ21UpcVx3In4t8NfiLD41jwk/Bv4aeW4r8+XloeauG1UapmX6duUX0R+ubpl8T0zd6w8k+qsPh+rGmr4LJ07VPLYvMT1XuRSRU7cclNlmSTH3Asb10RjCzI5KO6Su6B8+fIrrwxQ4LMtgMlORHHQyZEMrSk8Xoq8hkhacMhDQxyM6sGIQKwZmj8q/9IzpfFVun7Ml3qCvHhrn12HqT5kUcZjZP7zI8MdB1sJwNqx6azS2ADI52RJGwfTNf6YXllFamy0GWysOVuEPct1shZHrSoWkQ25ZpXDMjAN6hWNuSiWP0mY6lNbo/DoSf4GU5RAby/LeHbwtRTj2WuOfeF8M1niTAfFHTRzbmKaRytVVyV3Y+ErsWnaL2kJW6NxueFJsYTM8ddnVYDHK6A8WLsrKIUJ4/cJG0VG+ajkfEq+gMN9FguLCYxO0UbvberKwtTWY6oUmspghiSAxBwkrSWOTK7IGZ/EGvKzy680vJzKw4mTN2+qOmkiEVC9mMdkc60MaFUWtayGNpyy2I1j2ElsBrGt/UWCwEkk3+jOpataOCvlMti7NczCRcPjcFlMS31EbeoqwizPL6oWRvUJMCcWRHKJ9xMVgy4cWR4ccllCW6WMj6BI3NpK+8Rfca4k9ZptRlxRYSNRiCOWPyzLKfd3wlUGEGqr5konC3zfSiymJd4JjEC0Ko8aOVKiThwilm4trauzssPFVVUQ+21Ji91t0zHNbdnJiLOvKzFI0clXRaIWo5U08EsTkss0Y9YN6SJ97IDNOecX6rzQyVykiArFEUYRgBiIlCksgHIMwYk/tGwQwEcetYVgmleXXH0+WhHtpI/WUEdyq7EgEg7qWAVNgsG8OUi5IqWW/mcf7Hp9+o9cktHmxkakgVyyLIx5923/do6bXGdA0MX029D0Z5Y6lXITxWLF62tqKCJYsjkGktyTzW0sMJcjj5UMg4xVZok5uOZ5PlLgMlnpbOPz0zXRWyliJ7Zjhia3UrNYWhYRYtJIbtaOD6qdeOzGv7CoLPrhm+uwWZj4K09np7K/QJI8Q51pqL41bLxl9zs9myRsQF3aF/Sl4Mivx/KHIRp1TToHEVqtQ5CwIPTPKVqk0iVYY55J2IYxq6ycuAJ48I1Knu+1Mscf4LFCbH58yO1s8qwib6uz3u9t977Qnwz4dl1OfxLVZMXzf4LHLJu4fPGMpjjH1uNVEpkewMmI8gfOnzS6j/Vg3QNTF1MJ0VV6vx2IoYmOqRZ9D+pVoquSuz+qTNauTBp1iijCJDLx5N3fx6VeJVF9zpRsne9+wB137n2/H+fHn+/Rf0Lkcn+tDre/cjNmHAdZ9QtJaMfFII+nHzCUYVHcAerBQjRuemLqUK7BPoCYgDt22SBoa2RrYGh8dv/x4u3+mkdQ+FeI5885SjPxXUYcEZdoYtORiETsG6chDgYoduoX/APIqOg0/xF8N+HaHBhxS0/wt4fn1MsVDlza1lk35XhlkYYYrKfmkSF72gHwPYjej7kn5HHXxvW96+d+3gwHiw7E+xJ3o9vcdl129hs/OiB8lp7fDe4PcdgSxPuSzb7nZJ9u3v4Gn7hv27fA/boEb7DtvYJBIGvbv40a+19//AOh/lP3fXnqNHL6/T/h/b1oEbP2/+bvogbPb47k6GuzHfx77AErgjfsAe4+dgnfzrtoDR/yNeMEAkgEDudb0QTsHet617kb/ABob7+PhskD7tdydfPbWj3HbvvX5A/370To5T3A0NE746+Dr/m2Pbse/+O3xkAb+CNjQA7j7uJ7cvhiCB3O9d+w2Ea77QAfG9d/8fH5332CNeBDfEnsdH9p7kEb79/fse3t3OvA6PGPey3ii69/X8ujgfb2PftsA60QPcaJ3vfxoD5PgrLQ1reFyla4ENWxjb0FhZAGRoJq8sEqsG2pUxsVYEa472CCVJwGh2UdtFgfj+d7JDf8Al0Pg7+dpfr2+2K6B62ygJVqHSPU99BvturhLtiP2IIIaNdgDfbe968I55bcU5J5IwkyuuQL7PPo/8dO9NGUs+KMV3Sy4oxSrJOSBFPuSp/xXXkJ8yemce3Rb5eSzq1jLF+ew59NXT0onaFuMkbBX4j0I5IF1A88dh5ElhrAPJjKTYnojFeoPSezXgJ5oyEiVFnkZ49+qoQSCER7AUxiME+k4DGSmXrLqybo+6skdHKQY+ZYoyFgcYvO0srZWXm+kZq1WxBZjljkKV5I39N0neJ5J9eTRtJiMfXLFvppHKgaMcAPFZJEI3yQPoiRg3NpW17Rjz9lyxy6GMwqWOcsD25WVnF+1vfsnp1601+hnofiHOSlux6nHj1cO9RAjCQcJVkeTmxa9+d0+IIiQIEslQpk9VkjjBA7PMVAUBQe3qSEgrx/uuNeO5fwOJzqejdgryJMCjQPRgaKSPX7VV4y8kXYaJ4ciFbTJrlzaK18dEsciB2SJTFAWAjWUA8rd0jRd2IYRxBj6SqOK8+RKixIW3Mszs5eYko52vIJrui7HpQ7PYEhnbTNvsTV5SkSebLCuOCwvktuv19Hnq56SMMsTy1Ue7G14Du9vVKsK9TzdI+fywytWDn0hlM3j0Xt9NNHWuY7Y7qI4Z3E8UKkjUUUyJrWkOu3Bn6P88lUw0rfTkkLKSZ7cNmpMWDLxb0YJ7rEaAYnSjkNqNjXiYuNqTtUjUKjqFTSD7VVNfIXfHkB2UHYYljriCDLstWLnDbgRpEjIRkdUWEhCR6ijYk2CF0Cdnv2HLTnHhELihXO2TE7D6AHbnnn3uzrrPJCzHKMgktSxQyIVH1lyF9144283fVfmR8pfMvJuw6h6hiXn3b+lxPThKb5Mhmm+pmk+0aL+kuh3JBIPhI5zyxx2EplRIstgESOU+8ylUALSvIWnkOz2DyMiszsFjZteJw5uR7sMjR7dY1AWYLwReLkhSRxZtlV0dHiB7BQB4YLqGrJ6jtPGCRIwVpNnemP3AkE6LAgneu40xB34MkYHlO48ruSyrttt9H8ee982Typ87IVF5hGMYF8V5Qo9Lrgoq+Xpl+mOnpYXSWQIrr6bRBuW1C6AHLfd+Ou2zyHckdvFmX6ckL2q0LpM8LBORjPJzKFHKFB27NpUY74qGGioJ8QMjYfURRRr6bFgBsaPMso0AdqQToA6bS/b87Nj36Y6r/U1+caRyRPFMqzBh2DxByAGWQAHRB9+Gt70B45gxOTPiu5XMvjktLa+3HD3ePV6Wz5DDoc8g7Y32KCPew7DScerdtdT3zWMmiwkCvE8ZMCNIk+lf00Omk0TsoxQMAeSH7dEqATGvqvoSvmoJ2kiJV+Wo1PBZDx0qMxK6J2Ad8dgkAj4mHLiwMXEJUbi9YlZZpZLBZXQKqMTxZVijiQspcsNrx0kgHhqcviJfWsBpUaFZSfWjUpGD7tDwKhWZSumYbI0TvtrxZ9Xo6kSYqVE7fSxCr4La78Vycc9ZtotakWO83/Nk7wQk7wNtSkDdERkIcdx6qu6+/T9XluNYq1pKNxyJVkpT+iYXYclEjHlHIFVWZlkDEsdPpftLfVPLbzIwdhUx3UFFynERR5DH8pAT24metLCWGtb1EOXbkNeLQsvi6+QlmMgjH05aNyq82+8KCnZdNIfd9BiGHEb4rwQ1roWFS8gMILkMSVLMiNoqnMqWYkhD+3gHJB7MQYTPgxebbjR/wDGTCVeU/ppb93txVHV20mtyzxkcsy0K3R3nO2w3iBXseoeyRMwVLz4LpFZzuBSso5IYq19gVHYbha3EhGzo/eNBt9+48P/ANPdLdYXFrvnOrUkACs0FfERLErHiWV0sz23ZGYFfU9WI9wCB22rIulbELHk49L/AJhxVV1s74kDYLAEaGwP+XRA8OXgOn4kXaudAgsGJJOwOQ4k61sHXc6Oz86LHHgkz2xjkbQ82XJZ2ujcetXZ71XRtXmiQu8LTZt0um71Eq3HOQ0ej628X1qVmyNGOOokuPvyRQgx0bSLUktCOP7+E9eJVWT0wp4PVtTctE8QRKplfK42xRtR5mi1KCCxGWFqOORqLyhColMDPDYqtvlHbG2hUsJJIpkZz3M10tWtek7c688TKUmi4FgAPsDM6MJNE6USakQgFJlDMAjLA1IiQGOnmqhMEyyBhjs5XRuZr2G+/wBORwxk77sVyf7TzRllsyBjzY2pMmNUDJkSGqFlaP8A2ikUKKlT1DkNPniShC5CTmxiQlFOdxs2x2Nty2yywZW7oWdKCWlLHZinglE1YKnCUMJI5YGHYiQAl1UKB6p/uCNlJZlDHxHTzUmjpzCa0oEEaSR+gw1HMDICObA7VOSOrRhkfZBjKsA4kp0wlZvUekTDSeQQ5DDyshfF3dcSYo+wWtvi200gBeUFuzmMf6lkGPwNh9JHK1mjDGbBYBjavx1k5E/a6mWSAyb+wygqSASS6yEo6ZyBT6nLUvSuOfWz09Szljijv1bp0WyEbupIsb4OLLOSSJUovI9M71F11kegfLbrrryrFFcylat09Rx8EqF4lEb4+zbRYVAT6cFUiEURVUWNYlCoqp4VHln+ovoHrvFdP5Wj04uBzIaC5k5ouBiaSMwmaKMoVK8nRuKsoVRviFHIlU9b9EYo+RmZe4YvQr9HHJ3mK/Y95McbZkCMpGzPHGirokOQityAJrB/Slce/m7WFZbI9TNPFTiVPvaORt8XVSOKKTslSewAPc8vETrc2qxarSJKLCcYGyUSW2TkZS2KXFkyrdGroH0rR/hHwfw3VeEeIZZYZ48ujzzyyzQlOK45aXHj2ZCKQnCMYWRnGQM1Aly+lr9H/l9jsFa82OvYqifV9Y9XuadrgjN9AKVW/aKED9tq7cDzd9lq8abCoQ02G1rsCAPb3BUknv2PE77Ar3Hb/bwxP6b4Fj8rcS2mWSxfy7sWHctWydnHx6B7jcNNB2Xt29wAA/DhSdt23rsNHuBoAgg61rvst/JPbx6J+HtLj0ng3h+LHEiS08M8gAvJqV1GSTXdlLK8+1HYA8U/Hviuo8V+LfHNXqsksmSOsdFj3KkcPh0IaHDCNstsY4tPGgotUBXovQDEjYGjr3Otgdzr31vfb/28CTuw0Njkd+wK70Pbv86Hwf5Gu4DvlvZ7AjWxvvsaOiewLHQ/kjuSB4yv3MqkaOvgDsR/nuQAR8dvc6HfxNfv9OqdGrpb9I8J37/t609kEgaBG9A6O/bR9vjv7D3/ANtfK2t+2j2JBGxvft7e3v7jsCfjwFj9x79x7gLo7PftvRbXfe/zoaBLD7v2OlGjrWx7kAjQHYH376GjvwOk/wB/r1sAkHR9yO3yO3y3b8EbP4BJ0AfGR31x7sRrvoH5/gjv8HY9tAEkAljvoEgH5Oxvt7Bjve9aG+X8/wCBgga7nY2Nb0CB8H86H+xJ9x8jowhVc97+/au/s/Y/362BrQIIXQA2dEj8dwdD+SD27b+PCE82vV/7qfMcQiIynoLrEKsg5IWPTeS4iRQyF0bQ5oHUlCw5j38Lod/cjYPf2bYAAGiD2I1vZ7HegN62TkcVXzuLyeGuH/hsxjshirJIJAgyVSenYOlIbQimkJI2dBtAkd0s8HJhy4zvPHOBzXMooN/a76e6XIYdRgyy5MWbFkkUeYx5IzSu3aP59vXryAYzpm5F5t0cwMRcxMlCIq2QLCxhc3GkrxKIYwwlp2ENmSGWRnkjdyoZSwXk9uRf0GkuWItegkaO0wPrWHiINeJfUYsVE9gWe/7HA5tI0iCNe+YvRuS8uupczWmtAVcZnbONzlWyzcahpXzXaanJoxO0ssUaOI/TZkkdwG4aDX9QSSWoJBYQ+kZo32HVHBSV3LdthK20iMugZJQGCJIEJHnhxZMOLUaecX5kMslJB5JVtJAPP0V6WqJd36/8V1mLX63Q6vFIlgnpseOMoyfNEnHIlyLtZ7g3SjVSi7aD7Hqb9isZF4B1ZpZGYMoijLDux7H7Oy7IYks57v2czDR1jLGYWURIxAdgAzEMDsbA7H4Oh9uu3v4bTHXBFXQoCTZSIrzX034SDihljGzEdfew0Nlwp392lvjLMShYkdW9IksT3Jb34qN8eJ0Rs/dr599QDDbPn0b54b4OefzX70eh1a9DWXHHa0EQORoSItHe7o7V37dSAxsokrBEI9LioX2CcxoFzsLsJv4Hpg6XewOXNy0dd1eYuvKFBvkPuYL2HbbHuTognsvYaBO0bBnSqIgbRC6AZtFFG/2g6BA32OhruffZKa6g6wSrFYeWQxhVdnDsQHX3BYKxZySNqNL7bADdi5i1E/Pv2s/t2K57h9uHEdNap+dd/S77d6efS+hdTZ7HY6GRpODJwZmjDoSNcgZAh0pDa5KhKkMNAttlETeqeuJslZtfRI0qRcv/AAwVWFYtvt2VVD8wAo4kgH2ABHhtvM3zXGYzkmHxs0jWEUhzCd+jGoJDuV0jDiAQoP7wdgj36fRvp3MKIZm3Pa+5nYD+47sNbbj9yiM8VO9DZOySR45jxuRZL5Dtu/EO329jupVjwlmIwjtj9XC/hwIc82JdJxw+qr/o5DmrUK2RNC0jxmKVywUuGBQlj8KdjWta0Ax12tV8jajUVx7uxjdCG2HblI6oqyA8gA6+kHAbfFQw4j5FanRGMKZGvWKhR6ka8pEYqqE/vH2nn9v3dtsPYEDxZl5fTLiKlSG3Yrg8YzHYLgNYYNGylSHY+wIWLetH7tEEeHumxMMpkvyxYsT8JD+F2cdleb79M9VMdO4i7yQkbY2yphSnr3Swtf16nk2TiWhG0jNr0fTYL98h9gwjTi6kICOJ13bTdwAC0fVWchnrWPSZqzoknH1QASU5IQzDSmTRZB3J9gukACKKpdhu9P12rcHIWMyOZkEjGNwRHHGxB0wjVByIUKXAA5EFC5GCMwzQzGNvuZ1SQ/eyGTv7jszLs7ICFT78Ro2LWTnlhGMaIyx2yKbsLLOCnu8X9/ShaPBgx5EkS+ZjzIRUim1Dsnde4nI8NPUQ+r/OPIdMZ+PE5CwsVKZ+1oRFXQA7ZI9PxKMqgM67BBPDQOy53TPmVh87Xi4SwQ/cnFC3rPMvsW5FS3ca+0DezpV0ATFL9S+LrDPR1qMUhE1MTBkICw2ASHWMg6AcBC3bexvsCfEfPL7r/I4TLDGXpminjKrGWY6miUhQ8YJb7xoq/wC3Tk9gAB4qWWWXBkYylKUGXG93IehbSHf04LLetO0el0mr0mPymPNsGNBHe0UsT+pvu324OercI0W47WKkqOnsFduW2AUnsBxVlLsCexDD50fCwwz+i3GXiO4B3od/t37Dt20ex77/AAO8ZOg+u4bNdQ8z8XQOCSgQtoLxGhor7jbHueIA5e70UMwZeJjkj5SIANyfaNa/8TuPu2eS6+4nupAPZ7p9RjjKLQN3S3zxff78H61XUVq9FNJYZcRHaSSmigpOLOLqr7cHI81mvHLCGjZTGVIPbmFBUhi3Hude5I0ePNEKFjyZjqmjAn1fqrLxm4rIQ3GWOSNlMdiOUMjRz1y0UgkXiFI9Vgodyiup9QvCpisTIqtpeQIOmA464j/nLD7SwH3NG/dUcFCdWWmk4emwCyKW2pDxsw/5NlW5BgeRWXcZT6lA4MabkNTlx5YkscQl6xUOfsHp7onUNp8E9LkYZJeSypjylieau9hz9rrm+hdOSS07kiSMv17RxtXvMnL6xFDRmKbWvUJ9QOV5SNGsij9vrReG08+MO3VGHp1RxgmGSoT24JPTYxR1rEczSOZFd2riVYSESORvTm9TarHM0SoxeQkaCC4Y3ZUSYsY5eRliiYRSJvueZRzIrHiQ44Eq7TMvdylKtckqS2w7vyhrO8oaGysAAmUlQoaVnkUVJ2cAiSyFKlouQTxplhOCXGURPR5BLvmVHHAsrt56jdTkcGfDmgBKEi0LOGIgXQIWDwN0Wp03HmDhq+e6GTy4r3FFzMihBeqwPGLr0YZCblZY3ISMvLEWV2YIV2e4Zdcby28p/K/yFqQZjFdLX7Wcy8rwV72biqSOk7akYxpBCqQRKoZSfTeSQFvvLFmKj6s6WuYzrQ2K8xaKRK80MjSMzgIgj3GwAJ4pHwZVYASbJ7yHa/PRNvzHynS9OhYuG7UmaolZbESCRpok4WHFhggEOmeZw0biLlsjXLwhpoS1GqYw08ZarFk+Vp4MST9UYjARN9KkQ8ylN9Ww1OPReGQhm12TD4PqsUtX4gxnPFulHCT2Z5QnBcO7HCMtz5Yk9xzxYp5JUhS8sekVAIFjHPefY1ua9as3GYe7Lyef7QCSAT4dUt7An3IPcn4O/buSe2mI777H2G+Xh8VXwWHxOHqbEGLx9ShF2K846ddIE2F1rkI1ZvjZ9t8vHQ2CSToaHcaO+3sNhfwex+f4139EaXE4NLpsEqvDgw4muy48cYNfaz168ReKas1/iOv1kb26vW6vVG5prUZ55gl25CVN9Z7DZYg+2iDsDe97OwTsgew+dn48CA0V3sMT7kgAHfsSCe5GiB23sjfz4AS3fWvcAFj/AObWtHY2CN6+PkgDfjKMA3zvf+ddvjRBIPY7127nXhfplHv2tv37fhXf8D/frVbR2Ow7k++ux/B+CN99d97Hcd/AdBT7jWtcNHfx7aI1saH+2xrx840zaGtkgjts67Anvsdyv+w7+MD7tg/Pf20fYDfud/P8eB26J0aO/v3J1r/Gwo9jvY7k7Ht+ffwaux8lTvtsb0Rsn/YkEe50e/gpWKnidD4B7a7k9gRr2+N9jrvrfcQcDSnu2vfY0Nd+wG+5B9uw7fx4HXT9T1Lq/wBvR4O9E9x3A1obI1oH+Ae5/wD+63azhHQ65cXUkBtjSsp1o7B1snZ9zvWgQF5oAA0W1vv39jxPY72SNAj27e2iR7bMbkNvvrYBBI12IB17b5Ekj88SdDfbiWI9KQXs+v0/ld/t6oZ/U9ckrdfeZ3TWYqRJvq3OWGWZVWV0u2ms0biv+94pYZoJomQkAS8ifdjDPLXK0+PBmfUogFPlsad467KXL+opVZQU2JGQkP8AYIl9QN6A/wBQ/wCjzoD9QeXxfU1/OZnpDqTHxxVLmRw8FW3Bm6ER3DBkqdgxh7NZdxVb8U8ckUf9qaK3FHCsVTv65PILpLyCynQlLpKPJ/0jP9M5BbmUylkW3vdR4zIM0lmWMCJEnnp366GKGH0o6kEMCry1L4yfxn4d12nzeK66fynRhGWKe43yjLLChgCxcZNjJnQtMd1tb54P8ZeD63RfD/heGOoh4qXDVQ+UmLHkxafazjllIjkjqHFFxkLyR5MhFiMofYq7ueM+oWq16UT+oGBaR45NCMhAE+4ksTt1J0F7KPCqx16GR5EMqVz9xWR/tUOWDRhjob2f/u9ztvhq8Xka9WnSqRoy84kcoXB4hOKSswUczH6qkI3IcuI9wxZlRinQTJNMsbISWETcz77H7ftG+Wm2DsAqGdGJUZpqCMWygu2rruUc8+pXYvv3b2zwnNWMVb2xifTaBFoj91q/QO4dOE96arGr2ZlC6HGYsFiZWAJGz3Ug9wWAOvgHQMZvOHzFlpV5cfjRJLduF461eKRS08n3MxRieccKL988hPGJAdaHEFaeYHWMeFwt+9YlK14RwijRgzTzysY68ECDkvrSSmONAARshvsRTqOXTtHKZPIvl+ovo3uWnV68MaS2I6lSYkpjY+Bl9V1H3zyKsfOUvJzEScVTxxnO64gbbppldO0aPQuivWi+pnUayGPF3iTmMT8iPNd65/A4PfpD9LdP3qU93J5Lc9y+rNYleND7jax1yHY+gingi/ZISAzlm7+NPP8Amb1T5YxLJisFU6joyMDHXns2qUkEo5MVE9aGdmjcqWUGLknJt6Gx4kjkI8FVxs0MEkcd5a8vpwAuhrv6LMyzIzcNqCCwIAUFSwUSdmM6kwli3FEkvKKtPRaWzaj5vL9Q7F4WWNlUw7lUxhVj7xtxBJLsHmKEVGR5fL6pQc0BXAhe17nqo9QufxCMI7YeeaduJNsonN23ulGuPXnjpwPJb9Q2T6szSU890Vc6TtzxiakRlVzGOvtsF4orMlTHz07JALRwTxPG/cCcO0XKzDofzNTlBXnkjjjiZE1PGHdAoUlDHKGO1I5A8QCd6JBIFGmFxWR9ZILTSxVJJ2mNdpXCxitYmjryozqjQspri2D6jBa5SNT3Ph5cR5jdVYKaFGyWQlgRnijkWSOZ3iVgvJJ2jeTfJXADNri2l7DQkJQxgMWPCXGKbWu572Jz+VHNdRWPX5pRlGcZUx8rOFSitVfAc3V0epfV2fUv6g8L0RibN69eeOvCgeCmnAZLIycZDFXxlFFDTu7LoFQkMQYPNKif3FiFV/Wr5udY9QvWo+WlfD9KmX0oLeW6oYZ2TbAhrNGpjJKMIKlD6S5O4qkkF9A6ipi+oJuq5JZbr2J7sUojQTyO87wEDiymUqzJHvkwQ70WTRPFDJvonpFsh9GI0ZltErD6TIqwyywxSF5BNEvP6ctyPpuV5A93HMRpzzkjbHfGSgclelUHbg7S3etvS2nx4ccjNngZ5VuCUUIAgrKTtnd2oRfaq6fPLZGXqmhXyVmsFuohMzMTMosTIoSL1EeRzCsbKBqJuM7ySfb/AG2SLnWuCnE00308tLIRSSSVLXpvGrupYhJDoFUY6VwOS8iWLfaviT8ePsRQSUqsc0sQjijty80kUBwXDqoijddNGzLYPqgsxjkRea+g3fV9qjfpzQtIJlRfQisylOMVhBGUjnDy+qJCH9SKTkTtAJCSrK7TLBzR3LwR+1IUX2sQ7y7c8vHT/FrSEgi7PNY8rH6ZHJx3k+Xngrgo6Tvk/wCaJYR07x42KzivNC7KrrLG3BuY5KffQ7AHYJO1BInN091CZYYbIk1FINFVViQoX3TkQvb9vYEfcGAZV34p56m+q6ayy9UY6cwCKVY8xDJJAKs5iICubCTH05GjAZLnAQ6QRzkN/cisF8muqafV3S9C9Rtxz8445IXhmVg2lVWRzyf7UBfurBG0de48MtuTDIG2KDBbHnbwolpV0not031Jy1WLU4vmifMjUc0Qv2qR9m+Hm+OpJ5bqr6Ru05En2MeTAlQDw/f3X2GiwP27ZSG0VJ8WaW9j2R3d4gjzLzVmcwSIYJa6OujySceoqEL6hEcYPPiwSOUx0mRxk8ghcz1K7NEYlfTJoMhZePZZOA4sdnWgQTyARXS3UPqYkUxG6yTyXaALdhFbeGZom2DyCiOKVi5TSKoYcXY8lo5Zkgk/XG4xObpInHJzLbdvfmqvqK1YZITY8bJw3LVhKN2VT2GkadyctHT49NoZ6EtF+LPO0b02nYGC2bABZFkUbU8w6rpOUZk9ZQYS4kWmeWWt9J6NmSSKzHbkaCRGaeskNHjaSX0pFdgjSVwkf9mWT1IJRIY0BRv+llnmxdMGKSOSK0PUiJRp6j145I31Ep9OSCaRVqyhTxQGwyqFmWUOnmgIccuTrcJ4LmLtMlkNIro0sZqxyTMy/wBuWWe1DAbAEsaS17UiKB6Zab8Nx/NlDHEd0nHE7/TJOOG+ygLe387pXi+o/h9+aW3ZCOokpXM8cCR5qoXaSKO9ge6N6d66xnWsS5B5KhkqrImwSren9gVA0rB3J0rE+nGC4JC6PeVf6bOk8nmupJ+tLsPp4TAi3Vxp9Mxx28rahWBhDxUeotGpI72H2U9eaCNSH5qqi8tf0Y+Q/SXT3Tcdbp7KSz08bRktmbqzqO5FlbTQxzTT2/XuxKVlnZ3WLHwYqoqN6UVGvXEVdJb0MfRw9Cri8RRrY7G0oxBTpU4VhgrxJ7IkaaXufuZypd3LyO7O5PjSPAfhDUaDWQ1mvy6acsUjLA08sk3Jk8rGWRnjxkSCEgNyyiXQc5z8W/6n+HeJeFZvDPAtLrsBrMTp9Rk1sMMI6fBL/qw0xiz55ZJZ4rDfP5ezHNQZ1tOZde+thvu327AjWu4+F0fwRrYHvjeu50O//T8dm+7+O/sSBonfjBO+4+DvXI+/t2A0dfb+Do9t9wfAQdEa0Ne+u3xr5IB33PfYG+3bxf8ArEpVfB+fPP69ZPsQSTsbGu2x8A+3cfI0QBs99eBDRYa7kkbA2CfYnv8Az213b/l3onwWfu3+ANk8the5LHt/JI//ANPg5N8gBo99/G9D30NHf8/+x+B0I0tJ3+9V/wA9aTbJbR4nke5AU9/8dz/IJPwdjfgKkb1snXcb79tgb0daOvc99a9vGJB9x9gwO9E9iNEbJ1sdye2+I0da34wV79geIHt8n37nR0B+Dog99714HRejN7B2ftOjvXf8f8pA/wAdiR869iOM8vuOgF3vXYH2I2vse3Lexs/J9z4J7nuNjQB0y+4PI/JIOvwQf8nfg5dEElQdH40Pb5/ke+27HsPz4HXfUq/y7/v/AI6EGBYjWvn/AD/6nR1v8e/x4PQ9tnYPYaHcFe+gCe4Hv2BBH48EA8fbW9jftsjYHYe/fuT2A33JBYeDUbuCf8D/AGPc6LDYHvv51o67eB0aHct7XR+Pf9v5dbKsT8dvjY7/AMnRHYbIH+/f4Hir/wD1QukbWV8seieqKrOp6e6qsUrIGwgr5ipBZRpF2qtxnwqqpYOAWI4gsCLOw3f8+57sNnsBsg++u3+d62PfxHf9V/Qo8wfIXzAwyBmuU8RLnsc0bhWjuYTlZZg5I2Xo/XQEbVWMw5MgAcMPFdP/ABfh2s059WTT5CHNXOJvx1998Yn9uy9S3hGrNF4poNUptw6rCzUEMcpEMljY/wAucuE68qN/Iy1quPVXkX05ZYntMnpPJGOAMUJ4ncVd1T1DJvcwbgQCqq4/T2RS9DExdDuJQitxY6UDYJYuRI5AbRIQBuUg5gHwhsjQlljvY/fGaGSSMfaBII7FmCIWFdhKTDJeChOKSlGjnTmzBj45nSF2zj7xr2GI9GSOAmXaFXUKGYxsCyPLppPTlj5qJQzrG+0Xzl4jp0lIREQ2/ceAXv69y+3d7et/BdbjkYklGUZbakUEt1W+y9njj05e5PmvTku5jp2lfR4ca0V6+LAHKF71MVRXjMfqKXYizvRPYBuQVSx8FYiaP6D0cLVMcFeSITyyzRQLEzP29GuqtIhLM0zOrpJCuneF96SSeQ6To9VYD6oorzUlnsUyrgMWeD0ZYJCwaOSFzxIU7Tksbs39tC8QvOip1x0p0lncn0LTS1l4IPvxqdpX0iJI8TbaJvQ2rvGArNxKuy818IYL8uPiI8rdWIRLXgCu53OL9CT1MpZM9LJA2m0sDdd7Ru2+Tmm2mqXZWp0nDKIsrdqK1mE2Z545oHWaQxyIq2WZpJTyP2FS+5EjIlZWcrLzhZ8vvsqvweSu8jrI7u3qoYniWIcjEpiQSGWOMICkoDDXEhqFugPNzzw6o8216V8wJMj05jT1b09RNiClLHVbp/O5ePGNPDPkJrDQWYHdOJkDVh6bK0fqsSfQD5e/o2weXsdS/wBQ6n6lzAjwVG9ifWyywyU3mFhLBjNNKolCejHMjysyqHZApVNCWnpc2BxwccZ/NjGUZY2M4u44qQUtm1AKTb3vpri8V8Dw/MNU54zwSYZYTwsJkoSxkrjJWjfHIbohKFSjwA8mLD+VEiqLUU0AeFoU4JLOkKuG27M4PPasylWL8QGIZSR41sn5RYrOwV5cDbguwK0yr6LqjrHMgjCIiDmpjVSdOrabfpsCCfD/AF/9B2R/7jumepeless23Ws96i12S68N+tNRkyIqzw2azR7ryip6kitDLGfqVjR2YFiXZt/oN6xw/TVjKdJdaS3spVx8FgY7K1uKWnSNGtLG1Wer6MjosjVlKSkT+nE5KN2UNBqdx/6XIb8WPMMQ4hM3Rle7buabixs7cLSq/EXwVlIxyeIfIn/GZdIb45NvzMDihOSY4SYYZ/MgQySlGKCpEhJI/eXfkz0tQti5m+o6OLkSZppKlqWNpn2JWEbJ9xAVpPtMcgYhQGb4Et6M3l7Rr1o6eepu0arGyxkJYLjim0chnBdd6ZmSRSwLHlEqHbpf6f8A1lP09cyc3Wh/rqY31YK/0SLRF1Y/UEU3FzOYn7Rh1mV4j9w56IOrD+h3ON5RWM/l+p8jX6yuVIrKQ00WvSx5EkZMCjUkrzNF6kTy+qeD94uLKHJjw3V4zfLS5VYTyEpRNrjxyCUg3bWmjbSvftfScvH/AIKnGsfjVkdXh0bDHjmJPNzCXnxRXDQss0ZbYAR5aFZV8P01J6E1LqXHmA0oo5I5L5SaNkYzMsvJWYoeXEnf7SFKkKiKgepMXhazS2KmQxlyEksprWAAWRX5D124SKjMSVHHaqwjkdlCqvL81P0TXum8H0R/2Y8w+pqLGO7Y6us2LSWDagXHSNXhpM4Bp8sh6ZeSSSZlgVV4OZG35Zv1O+ZX68LH6l+vvJfyN6t6gPTnTuZXE0cxBUwrVYmgFcXPrslLFLIpjeQPZdxyE8k8KrteLqw0WWeRxfLxaVjjMrkzZWMDeRkBUZXLlUB8xIBpOmOPxHwTWRZaHV63WZJSyH8Nh0G6cYwnLEzyLlgRi7CRkZETHKDJNx1el1bBgrOQvYylbxvqzLZr2qFt0sNKHV41nqTyycxag2pBEpMkYdGCsV8bn6ZGzvT2Vz3T6Ez0MPfkeqVCIGViLUlNhE6erIfVZOKLHHGWjQaXbmC/6ePJ/wA3uhZOkesPOnzCyHWnW6ywLmKkcFath0pZBDFMTQqxQpLZrxSRSG7YQyKa5j4L6r7tb8mOkK8tzI3pkWAX3nmVgNF0VnP3kcdqY0KaHcgemqIqqPEDrrg/K3wySJTFxsiO6wKZEZBfNsD8OepvRQTfl2ThiqLtyMJS20POxlF5sPM+oNdpZXs/i5Ojps1BOEaWsyiOEKi2SykFDIXYJIkqlHicxsCdqCBzWNvlxflyuTtio8yRC/LZWrKFWSlbgaMArxJcBlYOSrvHIPVLKrEL4K8z7C4voSa3Xq2p6LKsH0laWKKw62JAliaMO6BJBEOYYFX0R6BeVgh3PJ7CXBHjZI5UkyMjQNFblDCW2ItOKlyQ6QyTwGdAz+8vOZf2LGORipjWO1AL5bvaykccbr4AfT15WuTKb9RGGQlBWyaVHYMSKiiQRF4SqFHb1ObAUkgwktmQsj3LVMIUIXc71H3Hx5sVZuDGFY1ZZVIRQ0swCuH5dw0s9m+lcPZmE2PuZLHoY7iwLHLHBPkMvCn3qYZJ1vQUXjKo8gKK8G3hhjkRclk/0mvjq1bkPQkmESD0pVkqSr6qCQg/dGif2pgVV2lgkBdYjJ4dz9O3T1jJ9d0MtWsxNjen6GRcMIua2mlWGlXYyNH9NG7VWV44ligsxAWEjtCKtZM1w+GsLl8X0MI2hlizGk2DCU7OBCJIba5op75r8YagweAa6U2pbJEE4kyRx49sqWO6TDbQetsgosQjVEiUaI4qq9wD9qgKhGtljoAb13/GgAAltEnWzvsPydHtr2AGh9pJHbwFftCqd9tD867+/Ifj8bI79wfHzNsEL299+/uO/wCe2wNex3r/AD43Hv15tFO3Hv2f9us7L70NbB773vX7tHtsKDsdhv29yB4ASCSf8g6HwT7D/lP8fbs6PtvxkMp3oMR3BGvYk7OvgdiB22e3fWu4d67f4JB/j3PuPfXYd96/Hgdc6yFB1obOiQDob79t60CSd/5Gge4LMKPjyBA9jrtvR2T77Hcga7/nR1214AWBJXZBGjsga99a2NaIJG+x9/47jQhWUb7HtsAge343oDRHcAdyfwPA6NEt+3r+/wAetNz+4bIK7OttvX47gA69zo73o7HgI3vRPcg7JHY77H2Owda7j237aPgTjZI38BtjkRobB0V9/wDcfI1vv4BsbO+wKj8aPf8A6DWt7HfXv4HRejAw0SD7Aa2NfBA0NMTo9+3cg/jW8g8i3cexO9b2D7n4/j8n+T4KG+4OgO3HZ1rsQdEb1+Tv4G/jXgSkrviSAO5J777bAX2AAHfsT2J79hsdDo8Eb2B22SQAQRskfwTrW/f279tHeT+09wCST3HbRIDdx33r3II+BrwV3HuQQe5JBP2rs9tbBOixAP8Agfk5HEgDt2PYe3/QHR+da/Pffgdd455/A9+thCN7JIHcHl+dnR/2AHb514+tQR2a09azEk1aeGSvPBIOUc8E6NHPDIN/dFLGzI6kcSrEH48Frvexo67+3bt8kb7nWhv50Dr48Hhu49yCw9wff4H7e/z/APz4HSsbbvke3p/jsn+ez15Wv1GdDN5Vee3mD0O0ZqGfqF/6RHa3HywViVb2Jvq4Yxx/UwpHPQjdjHP6j8xHI8fpxkvRwYu6lmWzJvJShBxElieX6YV4AZZGjNessk7+oAjx2H9chRqNmN3H+qT5Pzyx9IeduEpn6ytHH0d1LJEm2aqs0mRxTElWgimuRR2KDXbKqsEWOpRh0lauiUbdZzVRi3twmSOCrDBIYKxaNHiq3f6f9KDG0Usz11/4Sx67ixIwtOskUX78R+KfDZaLxHURI/yskvmQQ4MWVJlPrttinHmEjdV16G+C/GTXeE6ZlkPnYYRxZdybnLhIkvtU4RJxoaEXt09XQ/X/AKeTgwjqPquKy+tGhmpmJHCNHc4K7PLCpESDk7bIY6jHEuJmaeNyVqSDIY6OI3iZIYlZTxqvI5CMntVRmdjGZHRuPZl7ErGPpzMQ4yULBRbIX1slAx5aPGV0jbcPqNZId0bSqY5HZFSIESzxvtgupsXksqMbZhvRZEiOU3LEbmi9kIry1Y9TWIxZhXiGETBeJMYDSQMBSs0NsqBElG2NPPF9mufyOXu8mnYMnzo4prciKl8ctVF/XvXrV93qGf6h/wBLPTWdVslj6lrGzKnKrmcS/wBJdo2RLHcIimhURTUzZggn+juRTUnnicSRPqMhiX/Ud+vbyX6vOd6Kq+WPmp07N0jS6Rm6R6kxuT6btYhqLNJF1HFerZ+pHk7kvqPLkvqMnDDKjvDSx1ZPSliuFyWKhyFKXH3StqK4DGJm5BayO3FBPIOzCQnmBrasoB4khzE7rnyvyWGtSWIYGyeNAEb3YEBl4uvD0pIlH9xljQnkuyVJPADZ8Tmm1+TFjiBDLCHfHlCRCXCSg8yhyWbWJusa5OpPB4b4P40mLxXDsz8QjqcM3DlyQiwCM5Hky0G3bmhM2g45CCMv0D+vz/UExnReA6Vg8qvK3q/PQz4+/cmsZOWnk8xBicnFlb1evRpdVNh617I4+tNj4pIKtgI8qzxY+xOFQyz6f/1j/P0YjNR1P9Ojz46mytFJYLVTDZO5YxdZ0CD1Prk6FlvMsZb1HjTHAGMr/d0/qBh6Xl95fZp4lyeNNOdZIElu1RNBNFEoYMTCWjhaTZUoWMTbj0zcm5eHI6f6Ohwas+A66yGNNclaPDI5HHSSci4AkFSWWIIwJCln0/pkkKrDxI4vEpRI7zJwsSOPNCEYxaYxISjxSvrwvCLyw8T/ANN/DtXOctJk0mNWOSJn8P1heRTfKefTa5x5B2RoMMCO1du1Fktg/wDWl8wLMyQN/p9fqj+paKSjJSsYurUxVbKoqutbIZq1j4hQrjkGnmu06wjrnkY1O/CCyv8AqFfr26i8k/8As/F5C+V3l95vZCCqq9Rjr6t1ZiacUGSjeaWTofH078dSzfxNeWtYim6omepesm5XohRBSj5dbouxkoIpM95jXsp9VZWScWc1btv6TLY5zOJYnLLE0EEcZaRWKTKo5MrBXf6W6VwBSCHpjGEs1WKKxLZdZ3ndFH1E6yzKGid5dsxR4gEDFfsLEKPiGZxfLhlYQFYzy5DLkSVEgiRpJVX1Bw9h5b+Hf6ceBaDJ/FeI4sGtIbFw6bBrNNhhkwyuOTJqdRqvNFWawNLk3cE6InRnW36k/wBQPnHP5fVumsbjehemMfgc5juu+nclWTPHqTqPLnp4VsnjssUx97F1umJMHkYsbEK9n+pxZy0L8SPDXfwjsH+nvC4lrXUMmOqN1LlbE2RyGRaBBat255WsSWbcgQeoTMWZ1i4qDwUAMX8Sv6S6No460trJV/Tmbcimbc3quqgh1YOSqKW1KzEaWQJH38d/qhZxFNJDCq+pHJFEYwSQoQfah2zQxqOyruSTke7sDtIfxDV5DHBZylMGEFIx2RoryxI9uXcjLn6pc08w6TwjQznpfB9Fj0uGeSWTNlMmXJky+Zk43LknklLHfDGEoxoraCnVa3mPgZMXnsNBPUswyS3VP1sKlYZDBIPqI3aIBjX9EsvF+/qkRqFDErLnoGWwuFU4+p9XPVWEiMDQeKbhC6hTrkVEyy74ks4ATYZ/DO9aSPfztSi9YPBE7TGTh6qJKu0E+iWVm4+sfUQsp9J5DtSnqyV8tKL4uNMuWBqV8cwsrIVnigtK6mGtGWHNZC0NuyXKlVEKbA9Th4rsRnkhG7u9021Brci8lcpft9+nWfMYdLmk7V4IQbBlxUeP+4fSgvg6bPzRqTST4npivNE0U9uKQl5EknjgqqluxqNY5YyiSsI5NvWOgVjmMiMJHy8uulzUSpPGrRQxyKZVIaGU2FKSxz1jGUIaSKV0lWPgi8uDsV9VvDKdNRnqfzG6mz2TpnG4rFzviMSY7dqatcRq1O5ZyMOOZHrqoknerG8RMsskciSq0f06rLbH46PHfTVaw4JaqEn1Sq05o3/tM8U+wKZaN/qi5TgbAIMcPNPTmYYyW2VP9NCthUSPbgUB+9pz1VJaiUIyJJFlasSx7LaJaP60KX37VjIy2b1mQWJYL+GlR69tI2iYVp+TrFZQiRJJI542RuCuktR1DMBIGaY/6TsDDDg89mX9KeezkYq0ZV3ZasVKAmOKNObwqd2p3VvSW2BYcSu9eZR4gtm8jXnsOK0ksM31taoIWLRWbEvOSKMT8JW26NFHyswL9R9PJJYmCiF3FuHlp03D0t0X0/iFSss9bF1Pq5oIIYDYstAvqzTLEWEth+wnm9WUSSh3EjctnQ/gjRXq56mSS/hscmNAm/MsI8XcUhGSNN16lPWSf6i+JpocOlhGUY6rNCKWU49NGGScRpJxMsoNFBuDnzCt30fnSgAd/wB3bY1sDfvsDXcgDsdeMb/AA9/xrsRrR33Ovf5Pb3GwcEhtnewDsEE/cfb2+B233J9/Y9vASdgfOh76BB779uOwBvsRvsNHt41DrGehcta+GXZGhrvsdh3GvnZ4/I7e/j4khiRr4387AHz7A7/kdu/gAbXvo9gBvsR2JO9H23sn3IGzrsfAeZHLsCR9wGvu1x3scT7D537dvz4HQ6MJPcj92yAu+45DXbY377OiT38Dj1z7HYbR9iPkdz7gnWtnY2ST+R4JB771r27/AJ5Dt/nv2+fffbwch+9TvX8aJAA7j3PtrZIG/ge3fwP3+/06NEFOfWzjv69abk99DX89gAR7jf3H/JA779vBXz2B+3Q7kjf5b3Hc70Tvbf7eDH7b0d9wN+xB771377Ot/wCPf58F6I7E77E60PftoltDfbsNfPbx1/3ei9GBmK/A5Dts777IPwWPsD23v2Pf3yCCRr3G9gDfyRokj+B2AG/514L2NbG/YDsSNj8/Ou+mPv8AaN/keM67D49x93uN9ixPcnYJ3vWiAQT7eOdDofLkO/bsdaGj76Pt7kAD+AQD3Oh4EDvfx8/nRHyR95HbXySd+/bwXy2SNbI7kj7VAG+w2PuPbt7eMgH32NBSNggbOu2gQfcsB79ux7g9h0OjVcnXbsf2/nv/AJOz30Dofj+B4NB1o62SAATor7judj57An5Ou2+/gpRy9/jWvx7aGx/nZ+PfXjOtEljskEEb0D+AQex/9O3z7jwOjFLXrbUvt+Dx/wA9ITza6Ax3mt5ddU9BZIIIOoMZLXgleMSirfiInxtgrscljtxxCZAVaStJMiyxMVlXyEebOEy/lp1T5j9CdRslKz0zaeSaa39PVnW3gBDaNWKzd0/12ZUo2OhsyzwzTxMQUW2lmT2bow0eR7dzoE7UEaIJ7bIG+xGgp7g8R486/wDrG+X2N6Z6q6T8wsLhqlm31kkcOfxtmAXYOo8nibFepVhZIgZ8Yy0m2LakvfvXqsZhltU0jsVn4n8PxarRmonEZadIyd21liyzjj27qQ25JkjspKYNtNs+FPEtRodc6eEpEdVGTEC9mfDBnGQEo3uxY5Re4pDcUWU4dL9VZTIdRO08M+Fr1r1tYkjgsRJbjRvTdRLIzvLDGVCyvWggXm8sZcOTuYvT+XGXgjyFN61qSnDCBLj2hijcVSyvXklggld/SnZvVZJrHrmZVd29NT4rA64zdDDZHI5GHOXUyGL6lGNix2LE+RM1DOUKUspyORVZKFSrTyj2Ioacdu3JIzNP97qZppP+V/WbYSliMNQkx9GaxxWSvKkkdLHVWLPHHM1eRfUsSRkSsOQtSTS//EZqycKyY7rvD3HF4luiG6NdpIN39263UkXzffePCPGTJKMJyNs24SVlwO2rKTgjabore3k5sMq21zlSMHcc2k5xlCHVlG+ROgSAQdSKZOeypdXLxjVntWalYVWhEr9w4tR+pFsqoQxx+yb0fUOuTngTxLk+G+6futCwuU70luP6ZXex6kMNNwkiiVkVXd5FDb94yiKE+6Y8Ionb51cnQW9PNXLIqKAzxoxbQ7E/cAG/cXdgpOh2Z9mKgyxrt7hZXPFgt2XHg5bv8Hi8YMxkjCdvllE71TxT7FvpTVc+j0z+QPTNt3hyGMswXPUaSS5WWNKybZSp9M8ZOTnQPKVRxUhmGxrSjr9IJNFJLNl4659PmrpFyncg+oYH9M8OKqWjkZXAQIHc8lIcjK4SOypmdK4JQiKRvSVlHE7XkoLNyYjlpC7qujIqnXhA2+ncwxlht16ljHqA59FxyA+0CWNg4KyMCViKOwRD6agORH4PLLOZ5iMu1eW+QO/Pp35G09Q6lsWu1eOFY8syMo83OXrtHbz39AKrsVzanrXel4Y6ox1TIyu7cpXuSV2SQk7IiMYYKDGF5d05ldgEaPiQ3QuXdwIKdSOk4kiLFmJjKlVJfbM8xDhfuG1C+qWBXgoLF9L9EWL1KuIpUpOjrwsZBTHHYkE3JOLsXSJYyIkLsW9QNMqsscrIZU9M9NmlUiGQavxroJHWMokj940UvEpkLf3SvpLxK83kPZgyeORlkLkcESwCu22491OOV4v04S2+p1WbPCMM2WU7WxlJtsbO42pELEun2HQoVnEUTMYrMkkRKHUaESKmllaTRJEbAJIqBQDzf7QxKcbIpcaGWOQetEFG5IVdFMxPD0wxQ+qsjkKwcuAB9iyAsETvUmZsYavOcTFJJedUWLlGyuFLFCod5yihQQ7ElSBHxSSI8FTlVupLhVDmKbWLC1JZo3sJLHG5RUWNdhXRbB/txostb0v7csYT+7PC/WLmbluSNMmhKafxsoWx7UIHURlyunGpQkv0RbjIfLK6sA8wDxfKj0ysuGyGR6stccen0sd14aksKxGO2jakCyIsnBledmjjjWVUSUqInPDhO7fXGUodM9J47C4+CePJdVP9PAMdG1g0p3rFrUuTE300ePVKlZo4XtSJHNWaNGA9dzGXgrmDw4mstl+eFYhrsdgBpaVkGGVKcssAjkpOkRSaJJYhFZaSKKN3rqkZ4C4yzJ1plMrctWJas6xVEq35as1HHUoZrkqWMRPDG/1Ut2FzcvrbecRGJIIvRrNKJz6bTXCeSUeJFbapqVVS39RavHlHgR6g9d4jvywxQnM2LKTcvqht3bqQEkhQS7B5iSCs6I6Zq9PYTH4v1f7z1mtRXOB9OeFoZ1sT2JFLpDGszNbdHJkZ42VTFI24lP8A1TLxco7MIsVBFPJFxNp+yLLzajYWOVp3WvGrGsywrZmaZQ5kXiqfbMXenrS04oZ7eNuzGarYkeJqM8M8dStG9eZXrvJZNeWKO1EqKOTxEyIIdeOzk4ILdnHVKtmCyzNDPalhjsCamoVeKqLMUSx35IvslnjUQrCiSQvLzMokoYIxxOabGGPFtu6F3bdsYjTNe8aCu7QHUR/E58uojpca5suoJbdg8bOJynt4wxjYzVuT5Y+ZOu75VYez1h17Vv5VXjx62YIcbQUyH05a/CKV5EeCOORzceyscrKLMdayajsxVpGu2qnUMUKgD040TRJOxGoQqT+4kAANrfwCN+KoOjcO+HrnI1GkgmrUrDUpASZoLABMEokK69Q9nUqWJfUg2wPiAP8Apef6s3VXnFkqfQ/mA1vMwV8hZxObt5Ky1jI9PyV2aulmKyUay8DTxyGWnckcrHFN6DLIh5aT8DTx5Meu3SDPmzadhHtuCOWo2cG1+xG0untmf+p2nngl4TjhFcGm0+oJyO5Nlp2c2+ZMrGaU+vIxOvTESFI1399jevnXI9j3J7b+dfxo4Ox7jexx7b9z/t3/ANv+ngENiCzFFYryJJDPEk0UiHcckMihkdSO5BXZ5A6PY70R4McAbI7HufYn29j7D50fbR33BPcX1EURE4RKR9ke3WVRl2RKab9E/Evh+34+3RXI9j3I1/I3r2+O3v7DX8A+4ECDsAjRA7cv299e3uOPYkHWyT31vQW+0njv32NAe+x7jejvWxrXz768fEnfYDYBPfWzscS2+3fYAJ1+PbXjnQ7WP4fg30IHZI0N+wOu533J3vj3AJABOgNfPY2M9x27cj29m/32dE7IGyNjfv4111sAdvgdzsE/Ot+4123vt+Bvwcmw6jsRsEAa7fHY9tk67n/214HQD/DX7+3f8q9einOyToaB7AkgjiO59u+v4GvwT4L7+w1sqPY9yd733A1yI0T3O9DuCfBzD7j79yfgdvb8e5J3rvo6JBPggkjuO+v3Dv8A7gfkD4HYD8jY8DrnXxblrRB3zAA/x39/f8+w2NHXfXj7YA5aPx8n8kDsASdAa/n8eMnt3Otjv7n23o9we/ft3Y/Pt7eA60dFuPZtaIOu7b3oAHue3c9wNjwP3+/x6HQhob0QRvvsdz/A/wDNskDv7fjRHgQ0QN60Qe6jto/9e59/x3PcjXgIG+45EH5PEk/n8H/Ykj+PAh/BJA0pJAO9Ae3+NnR/nt20AOh1ksVB0fYDX3bJA7fafn3IPc6AJ/yBSSTvQ9wNdt7P2/Htob0Qdb+fAu5I3rt7AnsSSO+tEabWhv29/wDOGaIKzySCKKNGZ3dlVUAHInZI1oAAn/BGvHJNH37Hvbx2/PpSEGXPp92uOy/av79E38lVxdOzfyFmKpVqxPNZszuEihiRDzdmY62NE6/cSdAE68efr/VG6mp+dc1HpjDvNjo8HgbEmGyM6iG2tvKWbcJyccayARNJJFGapmWRq0deG6IUnURGx3zd81D13mch0/hrjV+g+j5y/U+QHJEy12v98FCGXkFljZ14Im+LsskrdoxypS/Vh1gcr163UFC1G9HI4uhUpVIldHqQ4uxbP3c1RWRksRCNo97MbKQCB4gPiyOTTfDmuzyUlWArd9JLUYhPulg0tL245t3wHDFrPirw7TyCUL1MrQkSlHSZpflzGxrseqsSjGezB0rS6u6d65ikm63s2Lgeewkk+NxIgkiT+tTxo0DCtJnL0FO3PGtoPFJyxscaqYVWnQmZriJLM+MZLlWKGaxlbVWrhreYmjhqiP6HGsz4ihTioJdjefnLbmhSSsasoksR1na8+/LnLZbDVfMXp4uc909FdsWY0r42ea9jJZeU9ZDkIbsK24AKlymHquHJnrhi0/FYC0PNnI4HPYqxnOn6PUU8MNcyUs7LkRhobDU0r1KsmNrXRagFCXIiT+mI8NMXZIGen6EyQjPNO4vE9ITCBlqMc8LWTxExzWSnByJbuKXv1oviODN4H4hLFL5jglJyaaYeUjKW6cAjVu92otB5qQilx2A8xRbqY6ON6lKpO6R1hFMa6s8sWw9g2WLpKhCrw3YV5GYr6iiQ+JKdJZOaktWOzUsvHNWrWp55YrT13acBnMrOojWRXk4COOVSX+3Z0Ekprw/W0tuu91kgkhrTetXowpPUwv1zWFShZgsuCY6/rg16dEuK1p8ZYx+QlsyTK00++kPNGnJJhUjzFxXyONruodfWkW0UawiSRPa5/UspWUpbCGT13Q+l6LK9b1vh+XDKUgvb2a7EqXmgWTKq9Kv1Hq7eB+OYskYY8jHmtw2KvliJdhtGW5vuFcUTHkxeNNuCY17Bqyv67NI8k8UJZv2MrEKx4EiMrGoT7VYu+iXRw/TuKhUZZLi2FZ1hasAskgjYOicq8p/tcUJLStERpd65OVZoujepadzGLeU1bMDvLTjM7q4e0GaMsvOQcyTzZzEUjjH/AIku4zHIqML1fi3tsWb6E8OExjc8PXRir8lnf0yWG15Iqcl+xGkdo/EZEyRpqPm5LsCmPNx/Be3Pq1fV7x6jHlihJ2kQlySs4dqtvNfUW3zW7p/6fSGOtXkyq2IYq0UPKOvW023XmyspIjCrHGxEsnDccUjaZ0jB8OFUx+Jiqu0Shp4kWNHsqZfTRSWYyxgGMow5yggPKVjcuXWdfTZjD9UMoR4GE9OIM4jdIgkbKOTzTSyANpf3BATyUyxr6PMJCpMz1JVenVao/qf8NNPJEshZ57UrThIJFJbTrNFHyV0DJE85EY2NnjkSXMR5p9PqBsLq0eA9q4b6b6mRjxSWXEYG2gsIxPqAPqY+ZtvvwB0dmLduW9cUVYhDVkdZkZgORiP08fFlFcQFVM4lSXk6s6V5WUNyZsJsnkBLWx0teETSzfUGpE5rxGkrWBcijvshZGVGq00SaV5kmPqVXmilYo39frqrhcpm43eTJ4bKU6otLDLO9yql6WeKy8UCEGwYo4wk8FbndSwy2miZTJZGpneuHm6mxOHkFLMjKUpZsPK1c2KGXr0ILmXyGHlt7lRBFiIZZZbJAspeMU9cWFNCO87wQ+ZKEX1lAIxLZbpEe/PFUXUvbji6h4lqzZl+XEKiyMjYQIQHtdLfLaUB5i0HIq4ub6vqHH5K7FDRxTQRwWJmttHkqeW9WCKDPRNXNe5HiLCjHS2Irb2Y4WkeOrZEtJYtKycqmJXCYmslSLGQRvjVWOCfFQLC714BjskxNuR6wLevWnxod3Y165q6d42my/mTiuo1yfS9eXqGlymiees9aROrcVBIYqkN7EZmrFYrXYclDWMslSWtcF2nFUvmJUlnFRwMR05ZqYq0mUNW1iqZqVYrGRknbJZe9G9hyclTXHwVqqY/0Yniixy+oZFklaeUrIhls2HDjgRUhGOxSKlixs3NlEUblt7clldVbTajUZcrtjLJkmzAkRlUyNjtAlbI2hEfqGPk56VfT2XzeHan09k45GsXJHcwWkjmrV3c2ZmmhqS2pa9NZqywtXEVRphzSJl+mg4NILobCKbBaWNpXlk9Rnlf+5IRGQ59WbbO3LYZ2HyST6Z8MNjqsUVulPHHI5gWtZlkm9J2ikd1FmVSixhkaCWSROYZkjKjkyxhBKvoqWvoSdk13imB4KNtqSJVIEgbkP2kRnbgBWjdg1c8R1088oYcaxw45VGN9xSmVG1e/wDSEgCgOb54L4dHQYcufIb9Xnx78065itfy4K7owKH6l5ly8dPKK6RYWZlTvFSfixQICVjPAAFTwRDtEUkaUkhFB23jQ/0pcf1zgv15+fnlvRSWGfpzM9UX8nT52Uhhkg60eiBIp1AkcT2mkjllRER68SxuYpXWX149fdX1enemMnYeX05FqTESuWEbKyMO7uVZig7gHsvyG/c3na/0aaLeZP66f9QfzzqVXi6ZsdRjprCXoyaont2eo8paH02SRklrO8VBLEyRcY5YbPGS3HplsaL8CZXJrTDFr+XjlkY+lTAoPMO3ctc0Pu9Zb/qdhMfheHUz5k6nNjxxeN0Z4t0leybo4z1RQas69inkd1LLmunJMfccfU4iUVVUtyIriINGv/iy7AAYICxKxrEeT8uXh7R3BBDAgn39tbA/nYA124+4PYa2YUdISTYfIZeGjNLXkuY3ILG0bFGWxjoHnqyqFVQJE+mmddKpY7XbKdBX4D9Qag1oc9BFKzN6Ek8FeaBlmQb16hd4Xk4hpChSMkH7XC7K7Ln0spyZ49t8EovHoAjVdkjy+nWAafORxxjMXiyi6uri0jxy8e/B1KRt77a37AjXwAPn32B8a7fnx8d/Kkj32NHidjX8/wDoRs7PhI4nrvpjNQLNWyUcZchQlk+iRLvXD1furkgkgkza+72Hyqo5o5YxLFLHPGS33xSpLHsHWucbFQd+yn5OtdwfDGWOcPqjKP4nTsnCX0yH7dn9O/Qx2Pckj3A5D/YnevnZIHY+D41JYe5Oh3BHcHft8Hf3dvjfufBXbsd7B1+5hyOx2HcsR3AP+3g+MrzGj799b9/b52QT7+29b/wPBOjhyfd/f7/v7FnZJI9wQV0RviD8aB0Rsf8A413PgvRXZ/do9xvfcf8AL3PfRI37chsdux8GcGcEjtvejyXXfv2+G76II7dtg+AlWUciDvetka7j8nXY99L/AL78D8n9P379c6CQACT7E7PfvsA60D2I+NfG/wCe33HuDvWiT/8Ax+AO3ck+59jvsIgqDodzvvxBPbkSB21vt8lf9/AvuI0IyO299yT/AJ0P2jX/AK6Pgc+z+j9v/s/Xrv2967p/vX5fjXRSgDW9ggA9zv2A7HfY6Pcj+QN9tnChTscST3PYkf7/ALe2z24njrWwvv4SHVnVtXp2tIsUbZHLNHyhxkBPqDZPF7MwVkrVxx3uTjJJsLGje/iPtnr3OXbEtm3duxRylkSnE4ijpSqNqipCse62th5WAYOA8jMpL+HeLR5MhulcIe6cvpYNcf5/R6a5NVig0eeR3D6T7bi+fsDXZb7SrsXadSMtbtQQoFJIkljVjrsAByJ5Md6HudHWz7Rb/UJ5rWMP08uB6ddv6lnia0csfMSrWlJhklBXbgPsxg6O9ORrQPgrFLcnE2Zzkkho1Y5bJjmaZuRhjZ3lsRsAQsUevp4FRGkdkcnsU8MRQfMde9bZLqazQsDDYQmxUSUMyytW5JSqa4a/cosScO6iKVGGiB4Xx6SMMhLme2qZBzKrjwegt+rYeldJy1Up4yIhdCR9DhRlx5q49i+eS+o8ee/UdDyx6JpdHVpS+WtUJMpmDG45zZGyNyNZYkEeiqiNGb7Y4wSp5MSKbr/UcnWNnMmSb6psTcSu5BZo0SzX9RY1I2p4srglDvZ76bj4m5+p/wAy8J1F1R1DisVZbKZRnerkcjAyyUa0UPZ6deXUscgBR2ndQyEgksyr4rZ8qrFSLzI88umPrfqXx2V6LySRqpMdeHLYO8n0yLyVVLPj5JHZOClZ4mCqW4+Kp8fEcnw3q8eNsh8hlLiTf8Rht+/Pd9Xn79X7/TPdD4q8OlND5n8UROYiy0mYiDXc7FLxZzYdOnSx62cX9HM7GF1BKyJIjBkjKzDRAJ+4SEBWDsHDRsrKxWvb9SvlJZqdU4XM4DEr6N6x/wAUtbFi81aObinOvRjV1a1ZsvNKZrM3q1iEkrywD1S0/cfbNKxbgM4aFJnkQle9dHkTkUC/cQWDcVdVATnCA7hFPbv1Y8m0FgwV5VrzRycHSKfhLzMkU0EUyMPR2C8YL8ncs7xqV5eME8N8Ry+HaiGWB8zHxDJjVDJBDyrzSDcV7PJ16Q8Z8Iw+M6SemySjHNHz4c4ebHk4pDuxSoyHhPU79VH3shdrPmaudx1qhdg/pOKivrFIMrZaqKFqu5oRzwRV62NeCKtHHSxsdK9DkK7WLsdmWtJC6XT+azy5DCWraVcXfgpQPZEt0zLewLw2Mnj8vHBPZrIIFrY21PXT0YrcAs37NosZFSvKjzp8kunuuum8hm6cDm/9XWksyVhjKnrcJpJ74msWYHuPcsxzV66WLFkV69LEqt+SKKtQrrHpeiKcfV+Pwk0Ah3icrkrtGplGo1aMeP6a5U6FrI3sdLSW7SjB9aB57UNzJz2H+qutNP6l9j/C+J4ZOGd/MhjGDEJxGr5piyjXEt26g7F3kmXFr/BdRjjqMYfKnMjkHdjk3VlIhIbYpXLfNVKHojzIsV8L9FT9V7McdkIyT1bUMpjkr168nqqXjFWDlJduOiV2Po+rAHgr8q/Sr+bcmNvSLK8/ET+vxO3cKRFylcRxuUgEU8UhLhHCHmVRoyqwfx3VOPwGOx16vZkQ5xbNq7YinMt1kOSWvkrGWjsLDTrT2oUNKDHYyKClZihgc8rLSF+XhPMtuoLrXZY4RgaPCMc3nrZGKdI7sz0rxldn+kixqz0EtyREt61VaMXqFCsNl8Ek7tsaAEra8JdBUfppi8/VTwdrDpvibJCMf5ilgxbOSXqjK48lW8nZZd7iOjPNxZqNuMcIBPCsUUKpLxdJK8s89owlW9WGp6Uo+qjkkWY15U5AV5SqO6t88P6fkJKBtSWDeilnsCJ/qYYpq7xMqTKWlVk+lityyCuyNYVy/Iho1MK38xsf01cSxbykl2lhUpJJZpus1+vVsXMTA+MR4yJqlArkcsY6BgShG8dqAy/UQ2YJkfkstJYwdvL15XyGWqYutN6Oq31Fm11Y9qathp7VuR4Rax/07lnWtO1lZ7Vc18Z/TJo/DGHg2SE7fp8v1SiVI2SX1Ejvvv5qKLepTN8TuaCWuR9IxkkzdIjG3gVxG4/pUu6DqVdDzHp9Q6ko2xWzGEgys0UuMt1VJtUa9e3DSu0Q6l/WozTKlRlElqWorQTgxr6fQy/mv0r1Bm8b0hibmNzdf6nFzV2iykuGtn0Z2hlzXTNq5h2gsXknv36eYxliEwz4yKCao1eWNj4jH0zj6eOyqtBkrFXIy9P4TFZKWi/rLE1bH4PKSS3QxqY8X89DJHWwzwC1LBHha9exSWoxMz+9P9A9OV8i/U8uPpx2BJcbERX5Ii2OxV+nD9H9ZcmW/amWq2qsOOUuYYa9d7IQH0JXHy8Ohx75pLIowFvasYl02sWdqbGW0Kb56aY/4zxWfy4QY4YKSalGU9shoQIiQoPMRJconHUgeiLVCpexl/InMTL9IK2IVrk0mUuRYq0KnT5sQWOdY2oj9dbguY6eUKTLLBFJFFUkMrcRct9RQyvkGjRmjMFeAuvoQ1zE0ZQ8fRjM0zH1S4jjBUFA3FV4xl6R6dt+tXs35nr0I2FiM2XRzGsiq0zqiIhUS8y/0sCIspYK0ETKzvI7p67VaRYo+C04EcmSQLFNbm4AetIe68RHpP7Zl0zIPUJSVBXtTq55ZyLlImeZfKIglAqRjflvt2rh6uOg8Jw6THCW2O6D/LS5bGjcq8SnLbGyJxylW0vKrfVYujK4QmOoVNcsRJHGIm/vA7DrFHKY0kUs5Uv2ZFJVni6TzLQIJZVkXYU8FAQwAdpI2fuCdfsBBkY7kIiVuasfTuRxRU40eJplE8a+m/Hmofs6+/HQjRikT8idBFBDcdyPqutRqWJ3soFAYyzBiyo6oYtngOy7GnGyQxDLpVdvEXNCcV4ULaOUrvd13r2rg79WDFC4SuIRtQ545toaC+X8TsFnTKf6h/n+nll5E+Y/UcFn07GO6ayUeOidikkuSt1Hr4+NQzsf/nZoGAEjhgrKhI+0c/8A0MvImx5V/oo6c6xz9GSj1b519T5zzLyovQiO/bxuQsJS6dWKeIxWJa1vH0qGagqWDeMsOQszItVZ5Unrd/XFD1N+qPzc8jf0o9L2LYt+aXmDi16gNIrN/T+lMdaSbLZG393FaVCit3JqJD6chx5Cq0rCIeqHoLonGdL9N9M9LYKj/TcJ0vgsT03gqdZZK0FHD4iolSpHWi9OOSGuYYFjsTRASS/S+lbjgSCuy7Z/ph4dL5Oq8SnHjNMxY1KWGMaR71zkvm3fG+O3nf8A1j8Xjk1Wg8IxSSOmxSzZDdw5Mso9wT+mOKr5KkHYpw8QFr5jG2Zv/BNgQ2FU8Rwuo9SZDyAIZRaOyVXsNEAMdNXcwq18lmMdMBYVZ24GVHVVZH/tyMhAV+AZXaNHjsADnTM1iOOu7zChNUlxonikDy5GiAXSQlnEhYM55uGkbhvYYssUaF0I0QhrFWxZ6rySNGY7MlkERoHjV1kA5KwcyIBLsMW0QjFZt/23ca9HbGKLapXD6p+PtzdUd+HrCjdLIglRFRSNoDfLz37HL7NdJjp7qOXE5FKFj6iOq5jRnSaSWKQ6TgRGRI9aRU1J6fJ4JAV+nkevNI0D2V87k6EgapdfHGZRLBPF6sdOxy0zxrLG0kUasjozNK8icZEmURKZYoWB6jrx0MxcClHWCRY/VCCOusfMzPGfWi9CaDmr/wBkOIoQpLRGSCBiv+ncjWWtLFZWX6D6d5p4ZILMcIkjc87WPlSNnjngeVvr0lIes4aScRmeQShjGTybjj3LCn05/G/v+atyiRVCz7NPHa1q/t/aq6fPD+a2SWRaGQrwy5BFcipcVK1m1GhA507ld3qylgSzbLSKOKMqEvpwML5nYbJ2oa0lS/StM7rwkVZYi6FuYWVAnLspOygHAFt8NEsFN07UzFGv9Fd9azEkC1sitORZ8e3FlWDn/a5w+qCroAk9RnEaSCJjx7tHF3HeFbLvFdX7LjmdkjtwxhjI0UgWSRX5Iik+nGQS8DAbZ1RdLil9UK5K5p4rvXrz+nPe3o5qpxHbKTxaPJzXaywePWvt26//2Q==', '01016629430', NULL, '1998-10-04');

--
-- Triggers `users`
--
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
-- Indexes for table `lawyer_specializations`
--
ALTER TABLE `lawyer_specializations`
  ADD PRIMARY KEY (`lawyer_id`,`spec_name`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `fk_msg_sender` (`sender_id`),
  ADD KEY `fk_msg_receiver` (`receiver_id`);

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
  MODIFY `case_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `message_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- Constraints for table `lawyer_specializations`
--
ALTER TABLE `lawyer_specializations`
  ADD CONSTRAINT `lawyer_specializations_ibfk_1` FOREIGN KEY (`lawyer_id`) REFERENCES `lawyer` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `fk_msg_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_msg_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

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
