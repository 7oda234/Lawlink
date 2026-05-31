-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3307
-- Generation Time: May 31, 2026 at 04:20 PM
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

-- --------------------------------------------------------

--
-- Table structure for table `activity_log`
--

CREATE TABLE `activity_log` (
  `log_id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `table_name` varchar(50) DEFAULT NULL,
  `action` text DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `activity_log`
--

INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(1, 13, NULL, 'POST /api/documents', NULL, '2026-05-01 07:54:05'),
(2, 13, NULL, 'POST /api/documents', NULL, '2026-05-05 19:00:51'),
(3, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:32:58'),
(4, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:32:58'),
(5, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:32:59'),
(6, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:32:59'),
(7, NULL, NULL, 'PUT /api/appointments/update/3', NULL, '2026-05-09 17:33:12'),
(8, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:33:12'),
(9, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:33:12'),
(10, NULL, NULL, 'POST /api/auth/login', NULL, '2026-05-09 17:34:31'),
(11, NULL, NULL, 'GET /api/users/profile/11', NULL, '2026-05-09 17:34:32'),
(12, NULL, NULL, 'GET /api/users/profile/11', NULL, '2026-05-09 17:34:32'),
(13, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:34:32'),
(14, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:34:32'),
(15, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:34:32'),
(16, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:34:32'),
(17, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:34:34'),
(18, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:34:34'),
(19, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:34:44'),
(20, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:34:54'),
(21, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:35:04'),
(22, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:35:14'),
(23, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:35:24'),
(24, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:35:34'),
(25, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:35:44'),
(26, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:35:55'),
(27, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:36:55'),
(28, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:37:55'),
(29, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:38:55'),
(30, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:39:55'),
(31, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:40:55'),
(32, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:41:55'),
(33, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:42:55'),
(34, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:43:55'),
(35, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:44:55'),
(36, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:45:55'),
(37, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:46:55'),
(38, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:47:55'),
(39, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:48:55'),
(40, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:49:54'),
(41, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:50:04'),
(42, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:50:14'),
(43, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:50:22'),
(44, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:50:22'),
(45, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:50:32'),
(46, NULL, NULL, 'GET /api/users/profile/11', NULL, '2026-05-09 17:50:36'),
(47, NULL, NULL, 'GET /api/users/profile/11', NULL, '2026-05-09 17:50:36'),
(48, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:50:36'),
(49, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:50:36'),
(50, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:50:36'),
(51, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:50:36'),
(52, NULL, NULL, 'POST /api/auth/login', NULL, '2026-05-09 17:51:18'),
(53, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:51:18'),
(54, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:51:18'),
(55, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:18'),
(56, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:18'),
(57, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:51:18'),
(58, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:51:18'),
(59, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:51:41'),
(60, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:42'),
(61, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:51:42'),
(62, NULL, NULL, 'GET /api/cases?t=1778349102648', NULL, '2026-05-09 17:51:42'),
(63, NULL, NULL, 'GET /api/cases?t=1778349102651', NULL, '2026-05-09 17:51:42'),
(64, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:51:46'),
(65, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:51:46'),
(66, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:46'),
(67, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:46'),
(68, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:51:46'),
(69, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:51:46'),
(70, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:51:48'),
(71, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:51:48'),
(72, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:48'),
(73, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:48'),
(74, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:51:56'),
(75, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:51:56'),
(76, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:56'),
(77, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:51:56'),
(78, NULL, NULL, 'PUT /api/appointments/update/4', NULL, '2026-05-09 17:52:15'),
(79, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:52:15'),
(80, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:15'),
(81, NULL, NULL, 'PUT /api/appointments/update/3', NULL, '2026-05-09 17:52:23'),
(82, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:52:23'),
(83, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:23'),
(84, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:52:34'),
(85, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:52:34'),
(86, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:34'),
(87, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:35'),
(88, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 17:52:41'),
(89, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 17:52:41'),
(90, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:52:46'),
(91, NULL, NULL, 'GET /api/appointments/list?userId=15&role=lawyer', NULL, '2026-05-09 17:52:46'),
(92, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:46'),
(93, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:46'),
(94, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:52:48'),
(95, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 17:52:48'),
(96, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:48'),
(97, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:52:48'),
(98, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:52:48'),
(99, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 17:52:48'),
(100, NULL, NULL, 'POST /api/auth/login', NULL, '2026-05-09 17:53:21'),
(101, NULL, NULL, 'GET /api/users/profile/11', NULL, '2026-05-09 17:53:22'),
(102, NULL, NULL, 'GET /api/users/profile/11', NULL, '2026-05-09 17:53:22'),
(103, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:53:22'),
(104, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:53:22'),
(105, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:53:22'),
(106, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:53:22'),
(107, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:53:27'),
(108, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:53:27'),
(109, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:53:27'),
(110, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:53:28'),
(111, NULL, NULL, 'PUT /api/appointments/update/4', NULL, '2026-05-09 17:53:42'),
(112, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', NULL, '2026-05-09 17:53:42'),
(113, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 17:53:42'),
(114, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:54:35'),
(115, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:54:35'),
(116, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:54:45'),
(117, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:54:55'),
(118, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:55:05'),
(119, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:55:15'),
(120, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:55:25'),
(121, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:55:35'),
(122, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:55:45'),
(123, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:55:55'),
(124, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:56:55'),
(125, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:57:55'),
(126, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:58:55'),
(127, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 17:59:55'),
(128, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:00:55'),
(129, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:01:55'),
(130, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:02:55'),
(131, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:03:55'),
(132, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:04:55'),
(133, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:05:55'),
(134, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:06:55'),
(135, NULL, NULL, 'GET /api/notifications/11', NULL, '2026-05-09 18:07:18'),
(136, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:07:21'),
(137, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:07:21'),
(138, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:07:52'),
(139, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:08:22'),
(140, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:08:52'),
(141, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:09:22'),
(142, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:09:52'),
(143, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:10:22'),
(144, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:10:52'),
(145, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:11:44'),
(146, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:11:51'),
(147, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:11:58'),
(148, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:11:58'),
(149, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:12:28'),
(150, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:12:58'),
(151, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:13:28'),
(152, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:13:58'),
(153, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:14:28'),
(154, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:14:59'),
(155, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:15:28'),
(156, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:16:29'),
(157, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:17:30'),
(158, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:18:31'),
(159, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:19:32'),
(160, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:19:41'),
(161, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:19:41'),
(162, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:19:58'),
(163, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:19:58'),
(164, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:20:28'),
(165, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:20:58'),
(166, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:21:28'),
(167, NULL, NULL, 'GET /api/notification/11', NULL, '2026-05-09 18:21:28'),
(168, NULL, NULL, 'POST /api/auth/login', NULL, '2026-05-09 18:21:59'),
(169, NULL, NULL, 'POST /api/auth/login', NULL, '2026-05-09 18:22:03'),
(170, NULL, NULL, 'POST /api/auth/login', NULL, '2026-05-09 18:41:25'),
(171, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 18:41:26'),
(172, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 18:41:26'),
(173, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 18:41:26'),
(174, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 18:41:26'),
(175, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 18:41:26'),
(176, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 18:41:26'),
(177, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 18:42:18'),
(178, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 18:42:18'),
(179, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 18:42:18'),
(180, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 18:42:18'),
(181, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 18:42:18'),
(182, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 18:42:18'),
(183, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 18:43:13'),
(184, NULL, NULL, 'GET /api/users/profile/15', NULL, '2026-05-09 18:43:13'),
(185, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 18:43:13'),
(186, NULL, NULL, 'GET /api/cases', NULL, '2026-05-09 18:43:13'),
(187, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 18:43:13'),
(188, NULL, NULL, 'GET /api/appointments/list?userId=15&role=client', NULL, '2026-05-09 18:43:13'),
(189, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:45:30'),
(190, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:45:30'),
(191, NULL, NULL, 'DELETE /api/notification/all/15', NULL, '2026-05-09 18:45:34'),
(192, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:45:38'),
(193, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:45:38'),
(194, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:45:48'),
(195, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:45:58'),
(196, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:46:08'),
(197, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:46:18'),
(198, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:46:28'),
(199, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:46:38'),
(200, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:46:48'),
(201, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:47:49'),
(202, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:48:50'),
(203, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:49:51'),
(204, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:50:52'),
(205, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:51:53'),
(206, NULL, NULL, 'GET /api/notifications/15', NULL, '2026-05-09 18:52:05'),
(207, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:08'),
(208, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:08'),
(209, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:20'),
(210, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:28'),
(211, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:38'),
(212, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:48'),
(213, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:52:58'),
(214, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:53:08'),
(215, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:53:18'),
(216, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:53:55'),
(217, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:54:55'),
(218, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:55:55'),
(219, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:56:55'),
(220, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:57:55'),
(221, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:58:55'),
(222, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:59:52'),
(223, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:59:54'),
(224, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 18:59:54'),
(225, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:00:04'),
(226, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:00:14'),
(227, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:00:24'),
(228, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:00:54'),
(229, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:01:04'),
(230, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:07:15'),
(231, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:07:15'),
(232, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:07:25'),
(233, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:07:35'),
(234, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:07:45'),
(235, NULL, NULL, 'GET /api/notification/15', NULL, '2026-05-09 19:07:55'),
(236, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 19:56:26'),
(237, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:09:32'),
(238, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:09:41'),
(239, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:09:41'),
(240, NULL, NULL, 'GET /api/installments/case/20', '::1', '2026-05-16 20:09:43'),
(241, NULL, NULL, 'POST /api/installments/case/20/create-plan', '::1', '2026-05-16 20:09:47'),
(242, NULL, 'installments', 'CREATE: تم إضافة قسط جديد', 'DB_TRIGGER', '2026-05-16 20:09:47'),
(243, NULL, 'installments', 'CREATE: تم إضافة قسط جديد', 'DB_TRIGGER', '2026-05-16 20:09:47'),
(244, NULL, NULL, 'GET /api/installments/case/20', '::1', '2026-05-16 20:09:47'),
(245, NULL, NULL, 'POST /api/installments/4/pay', '::1', '2026-05-16 20:09:51'),
(246, NULL, 'payment', 'CREATE: تم معالجة عملية دفع جديدة', 'DB_TRIGGER', '2026-05-16 20:09:51'),
(247, NULL, 'invoices', 'CREATE: تم إصدار فاتورة جديدة', 'DB_TRIGGER', '2026-05-16 20:09:51'),
(248, NULL, 'wallet', 'UPDATE: تم تعديل رصيد محفظة', 'DB_TRIGGER', '2026-05-16 20:09:51'),
(249, NULL, 'installments', 'UPDATE: تم تحديث بيانات قسط', 'DB_TRIGGER', '2026-05-16 20:09:51'),
(250, NULL, 'cases', 'UPDATE: تم تعديل بيانات قضية', 'DB_TRIGGER', '2026-05-16 20:09:51'),
(251, NULL, NULL, 'POST /api/installments/5/pay', '::1', '2026-05-16 20:09:53'),
(252, NULL, 'payment', 'CREATE: تم معالجة عملية دفع جديدة', 'DB_TRIGGER', '2026-05-16 20:09:53'),
(253, NULL, 'invoices', 'CREATE: تم إصدار فاتورة جديدة', 'DB_TRIGGER', '2026-05-16 20:09:53'),
(254, NULL, 'wallet', 'UPDATE: تم تعديل رصيد محفظة', 'DB_TRIGGER', '2026-05-16 20:09:53'),
(255, NULL, 'installments', 'UPDATE: تم تحديث بيانات قسط', 'DB_TRIGGER', '2026-05-16 20:09:53'),
(256, NULL, 'cases', 'UPDATE: تم تعديل بيانات قضية', 'DB_TRIGGER', '2026-05-16 20:09:53'),
(257, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:09:54'),
(258, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:09:54'),
(259, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:12:46'),
(260, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:12:46'),
(261, NULL, NULL, 'GET /api/installments/case/23', '::1', '2026-05-16 20:12:51'),
(262, NULL, NULL, 'POST /api/installments/case/23/create-plan', '::1', '2026-05-16 20:12:52'),
(263, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(264, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(265, NULL, NULL, 'GET /api/installments/case/23', '::1', '2026-05-16 20:12:52'),
(266, NULL, NULL, 'POST /api/installments/6/pay', '::1', '2026-05-16 20:12:52'),
(267, NULL, 'payment', '[CREATE] Payment Transaction', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(268, NULL, 'invoices', '[CREATE] Invoice Generated', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(269, NULL, 'wallet', '[UPDATE] Wallet Balance', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(270, NULL, 'installments', '[UPDATE] Installment', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(271, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-16 20:12:52'),
(272, NULL, NULL, 'POST /api/installments/7/pay', '::1', '2026-05-16 20:12:53'),
(273, NULL, 'payment', '[CREATE] Payment Transaction', 'DB_TRIGGER', '2026-05-16 20:12:53'),
(274, NULL, 'invoices', '[CREATE] Invoice Generated', 'DB_TRIGGER', '2026-05-16 20:12:53'),
(275, NULL, 'wallet', '[UPDATE] Wallet Balance', 'DB_TRIGGER', '2026-05-16 20:12:53'),
(276, NULL, 'installments', '[UPDATE] Installment', 'DB_TRIGGER', '2026-05-16 20:12:53'),
(277, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-16 20:12:53'),
(278, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:13:37'),
(279, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:13:37'),
(280, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:13:49'),
(281, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:16:58'),
(282, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:22:03'),
(283, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:22:03'),
(284, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:22:07'),
(285, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:22:07'),
(286, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:22:09'),
(287, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:22:09'),
(288, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:22:19'),
(289, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:22:19'),
(290, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:24:55'),
(291, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:24:55'),
(292, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:24:58'),
(293, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 20:24:58'),
(294, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:25:06'),
(295, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 20:25:06'),
(296, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:25:35'),
(297, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 20:25:35'),
(298, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:16:24'),
(299, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:16:24'),
(300, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:17:44'),
(301, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:17:44'),
(302, NULL, NULL, 'GET /api/installments/case/18', '::1', '2026-05-16 21:17:48'),
(303, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-16 21:18:02'),
(304, NULL, NULL, 'POST /api/installments/case/19/create-plan', '::1', '2026-05-16 21:18:31'),
(305, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(306, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(307, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(308, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(309, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(310, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(311, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(312, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(313, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(314, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-16 21:18:31'),
(315, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-16 21:18:31'),
(316, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:21:52'),
(317, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:21:52'),
(318, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-16 21:21:55'),
(319, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:00'),
(320, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:00'),
(321, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:07'),
(322, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:07'),
(323, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:08'),
(324, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:10'),
(325, NULL, NULL, 'GET /api/admin/logs', '::1', '2026-05-16 21:22:10'),
(326, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:22:17'),
(327, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:30:01'),
(328, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:30:09'),
(329, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:30:14'),
(330, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:30:14'),
(331, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:30:35'),
(332, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:31:16'),
(333, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:34:16'),
(334, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:34:16'),
(335, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-16 21:34:46'),
(336, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-16 21:34:46'),
(337, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 21:34:48'),
(338, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 21:34:48'),
(339, NULL, NULL, 'GET /api/payments/finance/invoices/30', '::1', '2026-05-16 21:34:50'),
(340, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:34:53'),
(341, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:34:54'),
(342, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:34:54'),
(343, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:34:54'),
(344, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:35:01'),
(345, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 21:50:55'),
(346, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 21:50:55'),
(347, NULL, NULL, 'GET /api/payments/finance/invoices/30', '::1', '2026-05-16 21:50:58'),
(348, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:51:01'),
(349, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:51:01'),
(350, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-16 21:51:01'),
(351, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:51:07'),
(352, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 21:51:07'),
(353, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 21:57:20'),
(354, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 21:57:20'),
(355, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:57:23'),
(356, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:57:23'),
(357, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:57:26'),
(358, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 21:57:26'),
(359, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 21:57:28'),
(360, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 21:57:28'),
(361, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:12:46'),
(362, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:15:30'),
(363, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:15:37'),
(364, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:16:18'),
(365, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:16:49'),
(366, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:16:56'),
(367, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:14'),
(368, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:29'),
(369, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:30'),
(370, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 22:17:32'),
(371, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 22:17:32'),
(372, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:42'),
(373, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:42'),
(374, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 22:17:46'),
(375, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 22:17:46'),
(376, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:51'),
(377, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:17:51'),
(378, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-16 22:30:34'),
(379, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 22:30:36'),
(380, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-16 22:30:36'),
(381, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-16 22:30:39'),
(382, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-16 22:30:39'),
(383, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-16 22:30:43'),
(384, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 22:30:43'),
(385, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-16 22:30:43'),
(386, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 22:30:43'),
(387, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-16 22:30:43'),
(388, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-16 22:30:43'),
(389, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 22:30:44'),
(390, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-16 22:30:44'),
(391, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-16 22:30:46'),
(392, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-16 22:30:46'),
(393, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-16 22:30:50'),
(394, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 22:30:50'),
(395, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-16 22:30:50'),
(396, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-16 22:30:50'),
(397, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-16 22:30:50'),
(398, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-16 22:30:50'),
(399, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-17 05:07:48'),
(400, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:07:48'),
(401, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-17 05:07:48'),
(402, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:07:48'),
(403, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-17 05:07:48'),
(404, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-17 05:07:48'),
(405, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:07:51'),
(406, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:07:51'),
(407, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 05:07:56'),
(408, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 05:07:56'),
(409, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:07:59'),
(410, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:07:59'),
(411, NULL, NULL, 'GET /api/payments/finance/invoices/30', '::1', '2026-05-17 05:08:03'),
(412, NULL, NULL, 'GET /api/payments/finance/invoices/30', '::1', '2026-05-17 05:08:05'),
(413, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:08:07'),
(414, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:08:07'),
(415, NULL, NULL, 'GET /api/payments/finance/invoices/4', '::1', '2026-05-17 05:08:13'),
(416, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:08:17'),
(417, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:08:17'),
(418, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-17 05:08:22'),
(419, NULL, NULL, 'POST /api/installments/8/pay', '::1', '2026-05-17 05:08:23'),
(420, NULL, 'payment', '[CREATE] Payment Transaction', 'DB_TRIGGER', '2026-05-17 05:08:23'),
(421, NULL, 'invoices', '[CREATE] Invoice Generated', 'DB_TRIGGER', '2026-05-17 05:08:23'),
(422, NULL, 'installments', '[UPDATE] Installment', 'DB_TRIGGER', '2026-05-17 05:08:23'),
(423, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-17 05:08:23'),
(424, NULL, NULL, 'POST /api/installments/16/pay', '::1', '2026-05-17 05:08:25'),
(425, NULL, 'payment', '[CREATE] Payment Transaction', 'DB_TRIGGER', '2026-05-17 05:08:25'),
(426, NULL, 'invoices', '[CREATE] Invoice Generated', 'DB_TRIGGER', '2026-05-17 05:08:25'),
(427, NULL, 'installments', '[UPDATE] Installment', 'DB_TRIGGER', '2026-05-17 05:08:25'),
(428, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-17 05:08:25'),
(429, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 05:08:28'),
(430, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 05:08:28'),
(431, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 05:08:40'),
(432, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 05:08:40'),
(433, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:08:47'),
(434, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:08:47'),
(435, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 05:08:51'),
(436, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:08:51'),
(437, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:08:51'),
(438, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 05:08:51'),
(439, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:10:51'),
(440, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:10:51'),
(441, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 05:10:53'),
(442, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 05:10:53'),
(443, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:14:29'),
(444, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:14:29'),
(445, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 05:14:30'),
(446, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:14:30'),
(447, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 05:14:30'),
(448, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 05:14:30'),
(449, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:14:34'),
(450, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:14:34'),
(451, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:35:26'),
(452, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:35:26'),
(453, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:35:37'),
(454, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:35:37'),
(455, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:35:55'),
(456, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:35:55'),
(457, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:36:11'),
(458, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:36:11'),
(459, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:36:28'),
(460, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:36:28'),
(461, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:36:46'),
(462, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:36:46'),
(463, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:03'),
(464, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:04'),
(465, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:20'),
(466, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:20'),
(467, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:36'),
(468, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:36'),
(469, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:52'),
(470, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:37:52'),
(471, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:08'),
(472, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:08'),
(473, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:25'),
(474, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:25'),
(475, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:41'),
(476, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:41'),
(477, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:57'),
(478, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:38:57'),
(479, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:39:13'),
(480, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:39:13'),
(481, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:40:03'),
(482, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 05:40:03'),
(483, NULL, NULL, 'GET /api/admin/search?query=%D9%86%D8%B2%D8%A7', '::1', '2026-05-17 05:40:39'),
(484, NULL, NULL, 'GET /api/admin/search?query=%D9%86%D8%B2%D8%A7%D8%B9', '::1', '2026-05-17 05:40:40'),
(485, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6', '::1', '2026-05-17 05:40:49'),
(486, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A', '::1', '2026-05-17 05:40:50'),
(487, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A%D9%87', '::1', '2026-05-17 05:40:51'),
(488, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A%D9%87+%D9%86', '::1', '2026-05-17 05:40:53'),
(489, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A%D9%87+%D9%86%D8%B2', '::1', '2026-05-17 05:40:54'),
(490, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A%D9%87+%D9%86%D8%B2%D8%A7', '::1', '2026-05-17 05:40:54'),
(491, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A%D9%87+%D9%86%D8%B2%D8%A7%D8%B9', '::1', '2026-05-17 05:40:55'),
(492, NULL, NULL, 'GET /api/admin/search?query=%D9%82%D8%B6%D9%8A%D9%87+%D9%86%D8%B2%D8%A7', '::1', '2026-05-17 05:40:57'),
(493, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:42:38'),
(494, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:42:38'),
(495, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:42:41'),
(496, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 05:42:41'),
(497, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:47:18'),
(498, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:47:18'),
(499, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:49:34'),
(500, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:50:22'),
(501, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:50:22'),
(502, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:51:18'),
(503, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:51:18'),
(504, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:55:25'),
(505, NULL, NULL, 'GET /api/admin/cases-monitoring', '::1', '2026-05-17 05:55:25'),
(506, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 05:56:25'),
(507, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 05:56:26'),
(508, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 05:58:22'),
(509, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:05:43'),
(510, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:05:43'),
(511, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:05:43'),
(512, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:05:43'),
(513, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:05:44'),
(514, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:34:51'),
(515, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 06:34:51'),
(516, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:34:51'),
(517, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 06:34:51'),
(518, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:34:53'),
(519, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:34:53'),
(520, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 06:34:53'),
(521, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 06:34:53'),
(522, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 06:34:55'),
(523, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:34:55'),
(524, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:34:55'),
(525, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 06:34:55'),
(526, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:03'),
(527, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:35:03'),
(528, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:03'),
(529, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:35:03'),
(530, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:35:03'),
(531, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:35:03'),
(532, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:10'),
(533, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:35:10'),
(534, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:10'),
(535, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:35:10'),
(536, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:15'),
(537, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 06:35:15'),
(538, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:15'),
(539, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 06:35:15'),
(540, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:17'),
(541, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:35:17'),
(542, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:17'),
(543, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:35:17'),
(544, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:21'),
(545, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:21'),
(546, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:24'),
(547, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 06:35:24'),
(548, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:24'),
(549, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 06:35:24'),
(550, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:27'),
(551, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:35:27'),
(552, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:27'),
(553, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:35:27'),
(554, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:57'),
(555, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:35:57'),
(556, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:35:57'),
(557, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:35:57'),
(558, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:35:57'),
(559, NULL, NULL, 'GET /api/cases/monitor?sort=days_active_asc', '::1', '2026-05-17 06:35:59'),
(560, NULL, NULL, 'GET /api/cases/monitor?sort=days_active_asc', '::1', '2026-05-17 06:36:01'),
(561, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:36:04'),
(562, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:36:04'),
(563, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:36:04'),
(564, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:36:04'),
(565, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:38:25'),
(566, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:28'),
(567, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 06:38:28'),
(568, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:28'),
(569, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 06:38:28'),
(570, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:32'),
(571, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 06:38:32'),
(572, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:32'),
(573, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 06:38:32'),
(574, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:35'),
(575, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:35'),
(576, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 06:38:36'),
(577, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 06:38:36'),
(578, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:52'),
(579, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:38:52'),
(580, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:52'),
(581, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:38:52'),
(582, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:56'),
(583, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:38:56'),
(584, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:38:56'),
(585, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:38:56'),
(586, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:39:01'),
(587, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:39:01'),
(588, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:39:01'),
(589, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:39:01'),
(590, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-17 06:39:09'),
(591, NULL, NULL, 'GET /api/installments/case/8', '::1', '2026-05-17 06:39:23'),
(592, NULL, NULL, 'GET /api/installments/case/20', '::1', '2026-05-17 06:39:27'),
(593, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:25'),
(594, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 06:40:25'),
(595, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:25'),
(596, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 06:40:25'),
(597, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:27'),
(598, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:40:27'),
(599, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:27'),
(600, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:40:27'),
(601, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:28'),
(602, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:40:28'),
(603, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:40:28'),
(604, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:28'),
(605, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:40:28'),
(606, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:40:28'),
(607, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:31'),
(608, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:31'),
(609, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:31'),
(610, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:31'),
(611, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:31'),
(612, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:33'),
(613, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:40:33'),
(614, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:33'),
(615, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:40:34'),
(616, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:36'),
(617, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:36'),
(618, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:40:36'),
(619, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:36'),
(620, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:36'),
(621, NULL, NULL, 'GET /api/cases/monitor?status=Ongoing&sort=created_at_desc', '::1', '2026-05-17 06:40:40'),
(622, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:40:42'),
(623, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:43:54'),
(624, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:43:54'),
(625, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:43:54'),
(626, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:43:54'),
(627, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:43:54'),
(628, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:43:54'),
(629, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:43:57'),
(630, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:43:57'),
(631, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:43:57'),
(632, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 06:43:57'),
(633, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:43:59'),
(634, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 06:43:59'),
(635, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:43:59'),
(636, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 06:43:59'),
(637, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:44:01'),
(638, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:44:01'),
(639, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:44:18'),
(640, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:44:18'),
(641, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:44:18');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(642, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:44:18'),
(643, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:44:19'),
(644, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:44:19'),
(645, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:44:19'),
(646, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:44:19'),
(647, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:15'),
(648, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:52:15'),
(649, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:15'),
(650, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:52:15'),
(651, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:17'),
(652, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 06:52:17'),
(653, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:17'),
(654, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 06:52:17'),
(655, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:19'),
(656, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:19'),
(657, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:21'),
(658, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:52:21'),
(659, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:52:21'),
(660, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:21'),
(661, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 06:52:21'),
(662, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 06:52:21'),
(663, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:23'),
(664, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:23'),
(665, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:23'),
(666, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:23'),
(667, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:23'),
(668, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:25'),
(669, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:25'),
(670, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:52:25'),
(671, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:52:25'),
(672, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:32'),
(673, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:32'),
(674, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:52:32'),
(675, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:32'),
(676, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:32'),
(677, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:34'),
(678, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:52:35'),
(679, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:57:31'),
(680, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:31'),
(681, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:57:31'),
(682, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:31'),
(683, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:31'),
(684, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:34'),
(685, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:35'),
(686, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:57:36'),
(687, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:57:36'),
(688, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:57:36'),
(689, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 06:57:36'),
(690, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:57:38'),
(691, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:38'),
(692, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 06:57:38'),
(693, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:38'),
(694, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 06:57:38'),
(695, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 08:51:03'),
(696, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 08:51:03'),
(697, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 08:51:03'),
(698, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 08:51:03'),
(699, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:30'),
(700, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 09:05:30'),
(701, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 09:05:30'),
(702, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:30'),
(703, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 09:05:30'),
(704, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 09:05:30'),
(705, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:33'),
(706, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 09:05:33'),
(707, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:33'),
(708, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 09:05:33'),
(709, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 09:05:33'),
(710, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:35'),
(711, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 09:05:35'),
(712, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:35'),
(713, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 09:05:35'),
(714, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:37'),
(715, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 09:05:37'),
(716, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 09:05:37'),
(717, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:37'),
(718, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 09:05:37'),
(719, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 09:05:37'),
(720, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:40'),
(721, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 09:05:40'),
(722, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:40'),
(723, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 09:05:40'),
(724, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 09:05:44'),
(725, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 09:05:46'),
(726, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:48'),
(727, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:48'),
(728, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:49'),
(729, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 09:05:49'),
(730, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:49'),
(731, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 09:05:49'),
(732, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:53'),
(733, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 09:05:53'),
(734, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:53'),
(735, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 09:05:53'),
(736, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:55'),
(737, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 09:05:55'),
(738, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:55'),
(739, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 09:05:55'),
(740, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:59'),
(741, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:05:59'),
(742, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:06:04'),
(743, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 09:06:04'),
(744, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:06:04'),
(745, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 09:06:04'),
(746, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:06:07'),
(747, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 09:06:07'),
(748, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 09:06:07'),
(749, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 09:06:07'),
(750, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:01:36'),
(751, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:01:36'),
(752, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:01:36'),
(753, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:01:36'),
(754, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:01:39'),
(755, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 10:01:39'),
(756, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:01:39'),
(757, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 10:01:39'),
(758, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:01:43'),
(759, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 10:01:43'),
(760, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:01:43'),
(761, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 10:01:43'),
(762, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:06'),
(763, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:06'),
(764, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:06'),
(765, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:06'),
(766, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:20'),
(767, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:20'),
(768, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:20'),
(769, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:20'),
(770, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:21'),
(771, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:21'),
(772, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:21'),
(773, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:21'),
(774, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:21'),
(775, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:21'),
(776, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:21'),
(777, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:21'),
(778, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:22'),
(779, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:22'),
(780, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:02:22'),
(781, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:02:22'),
(782, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:05:05'),
(783, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:05:05'),
(784, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:05:05'),
(785, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:05:05'),
(786, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:09:32'),
(787, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:09:32'),
(788, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:09:32'),
(789, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:09:32'),
(790, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:09:35'),
(791, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:09:35'),
(792, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:09:35'),
(793, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:09:35'),
(794, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:09:38'),
(795, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:09:38'),
(796, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:09:38'),
(797, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:09:38'),
(798, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:16'),
(799, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:18:16'),
(800, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:16'),
(801, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:18:16'),
(802, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:19'),
(803, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 10:18:19'),
(804, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 10:18:19'),
(805, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:19'),
(806, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 10:18:19'),
(807, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 10:18:19'),
(808, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:20'),
(809, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 10:18:20'),
(810, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:20'),
(811, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 10:18:20'),
(812, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 10:18:21'),
(813, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:23'),
(814, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:18:23'),
(815, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:23'),
(816, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:18:23'),
(817, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:25'),
(818, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 10:18:25'),
(819, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:25'),
(820, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 10:18:25'),
(821, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:27'),
(822, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 10:18:27'),
(823, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:27'),
(824, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 10:18:27'),
(825, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:31'),
(826, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:18:31'),
(827, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:31'),
(828, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 10:18:31'),
(829, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:18:33'),
(830, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:33'),
(831, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:33'),
(832, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:18:33'),
(833, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:37'),
(834, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:18:37'),
(835, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:37'),
(836, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:18:37'),
(837, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:38'),
(838, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:18:38'),
(839, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:18:38'),
(840, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:18:38'),
(841, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:20:58'),
(842, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:20:58'),
(843, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:20:58'),
(844, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:20:58'),
(845, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:01'),
(846, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 10:21:01'),
(847, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:01'),
(848, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 10:21:01'),
(849, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:03'),
(850, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:21:03'),
(851, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:03'),
(852, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:21:03'),
(853, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:04'),
(854, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 10:21:04'),
(855, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:04'),
(856, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 10:21:04'),
(857, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-17 10:21:06'),
(858, NULL, NULL, 'GET /api/payments/finance/invoices/30', '::1', '2026-05-17 10:21:08'),
(859, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-17 10:21:11'),
(860, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-17 10:21:12'),
(861, NULL, NULL, 'GET /api/payments/finance/invoices/30/download', '::1', '2026-05-17 10:21:12'),
(862, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:19'),
(863, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:21:19'),
(864, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:19'),
(865, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:21:19'),
(866, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:22'),
(867, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 10:21:22'),
(868, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:22'),
(869, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 10:21:22'),
(870, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 10:21:23'),
(871, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:27'),
(872, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:21:27'),
(873, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:21:27'),
(874, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:21:27'),
(875, NULL, NULL, 'GET /api/admin/search?query=d,s', '::1', '2026-05-17 10:23:58'),
(876, NULL, NULL, 'GET /api/admin/search?query=d,st', '::1', '2026-05-17 10:23:58'),
(877, NULL, NULL, 'GET /api/admin/search?query=d,s', '::1', '2026-05-17 10:24:00'),
(878, NULL, NULL, 'GET /api/admin/search?query=%D9%8A%D9%88%D8%B3', '::1', '2026-05-17 10:24:14'),
(879, NULL, NULL, 'GET /api/admin/search?query=%D9%8A%D9%88%D8%B3%D9%81', '::1', '2026-05-17 10:24:15'),
(880, NULL, NULL, 'GET /api/admin/search?query=%D9%8A%D9%88%D8%B3', '::1', '2026-05-17 10:24:17'),
(881, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:38:23'),
(882, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:38:38'),
(883, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:40:00'),
(884, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:40:00'),
(885, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:40:00'),
(886, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:40:00'),
(887, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:46:21'),
(888, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:46:21'),
(889, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:46:21'),
(890, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 10:46:21'),
(891, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:46:29'),
(892, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:46:29'),
(893, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 10:46:29'),
(894, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 10:46:29'),
(895, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 13:29:38'),
(896, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-17 13:29:38'),
(897, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:39'),
(898, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:29:39'),
(899, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:39'),
(900, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:29:39'),
(901, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:50'),
(902, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:29:50'),
(903, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:50'),
(904, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:29:51'),
(905, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:53'),
(906, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:53'),
(907, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:29:53'),
(908, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:29:53'),
(909, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:55'),
(910, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 13:29:55'),
(911, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:29:55'),
(912, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 13:29:55'),
(913, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:37'),
(914, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:37'),
(915, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:40'),
(916, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 13:30:40'),
(917, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:40'),
(918, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 13:30:40'),
(919, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:42'),
(920, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 13:30:42'),
(921, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:42'),
(922, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 13:30:42'),
(923, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:46'),
(924, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:30:46'),
(925, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:30:46'),
(926, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:30:46'),
(927, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-17 13:30:49'),
(928, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 13:31:05'),
(929, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-17 13:31:05'),
(930, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:31:05'),
(931, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:31:06'),
(932, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:31:06'),
(933, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 13:31:06'),
(934, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 13:31:06'),
(935, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 13:31:06'),
(936, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 13:31:06'),
(937, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 13:31:06'),
(938, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 13:31:06'),
(939, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:17'),
(940, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:23'),
(941, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:23'),
(942, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:23'),
(943, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 13:32:23'),
(944, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 13:32:24'),
(945, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 13:32:24'),
(946, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 13:32:24'),
(947, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 13:32:24'),
(948, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 13:32:24'),
(949, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:25'),
(950, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:39'),
(951, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:39'),
(952, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:39'),
(953, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 13:32:39'),
(954, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 13:32:39'),
(955, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 13:32:39'),
(956, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 13:32:39'),
(957, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 13:32:39'),
(958, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 13:32:39'),
(959, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:32:58'),
(960, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:33:19'),
(961, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:33:19'),
(962, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 13:33:19'),
(963, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 13:33:25'),
(964, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 13:39:10'),
(965, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 13:39:49'),
(966, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 13:39:49'),
(967, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 13:39:50'),
(968, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 13:39:50'),
(969, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 13:39:51'),
(970, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 13:43:11'),
(971, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-17 13:43:11'),
(972, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:43:12'),
(973, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:43:12'),
(974, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:43:12'),
(975, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:43:12'),
(976, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:43:23'),
(977, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:43:23'),
(978, NULL, NULL, 'PUT /api/notifications/mark-read/6a071a5e97dae290cd73049f', '::1', '2026-05-17 13:43:37'),
(979, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-17 13:43:52'),
(980, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:43:52'),
(981, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:43:52'),
(982, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:44:28'),
(983, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 13:44:28'),
(984, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:44:28'),
(985, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 13:44:29'),
(986, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 13:44:32'),
(987, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:44:32'),
(988, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:44:32'),
(989, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 13:44:32'),
(990, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:46:41'),
(991, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:46:41'),
(992, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:46:41'),
(993, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:46:41'),
(994, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:48:17'),
(995, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:48:17'),
(996, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 13:48:17'),
(997, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:48:17'),
(998, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 13:48:17'),
(999, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:48:17'),
(1000, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:48:24'),
(1001, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:48:24'),
(1002, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:48:24'),
(1003, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 13:48:24'),
(1004, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 13:53:35'),
(1005, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:35'),
(1006, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:35'),
(1007, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 13:53:36'),
(1008, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 13:53:46'),
(1009, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:46'),
(1010, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:46'),
(1011, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 13:53:46'),
(1012, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:50'),
(1013, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:53:50'),
(1014, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:50'),
(1015, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:53:50'),
(1016, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:53:54'),
(1017, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:54'),
(1018, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:54'),
(1019, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:53:54'),
(1020, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:56'),
(1021, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:53:56'),
(1022, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:53:56'),
(1023, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:53:56'),
(1024, NULL, NULL, 'GET /api/users/4', '::1', '2026-05-17 13:54:00'),
(1025, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:54:00'),
(1026, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:54:00'),
(1027, NULL, NULL, 'GET /api/users/4', '::1', '2026-05-17 13:54:00'),
(1028, NULL, NULL, 'PUT /api/users/4', '::1', '2026-05-17 13:54:27'),
(1029, NULL, 'users', '[UPDATE] User Profile', 'DB_TRIGGER', '2026-05-17 13:54:27'),
(1030, NULL, 'client', '[UPDATE] Client Profile', 'DB_TRIGGER', '2026-05-17 13:54:27'),
(1031, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:54:30'),
(1032, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:54:31'),
(1033, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 13:54:31'),
(1034, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 13:54:31'),
(1035, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:54:36'),
(1036, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:54:36'),
(1037, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:54:36'),
(1038, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 13:54:36'),
(1039, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:55:04'),
(1040, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 13:55:04'),
(1041, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:55:04'),
(1042, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 13:55:04'),
(1043, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 13:55:05'),
(1044, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:55:06'),
(1045, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:55:06'),
(1046, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 13:55:06'),
(1047, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 13:55:06'),
(1048, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:04:53'),
(1049, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 14:04:53'),
(1050, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:04:53'),
(1051, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 14:04:53'),
(1052, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 14:04:54'),
(1053, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:04:55'),
(1054, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 14:04:55'),
(1055, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:04:55'),
(1056, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 14:04:55'),
(1057, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:05:00'),
(1058, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 14:05:00'),
(1059, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 14:05:00'),
(1060, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:05:00'),
(1061, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:05:02'),
(1062, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 14:05:02'),
(1063, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:05:02'),
(1064, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 14:05:02'),
(1065, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:05:38'),
(1066, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 14:05:38'),
(1067, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:05:38'),
(1068, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 14:05:38'),
(1069, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:06:41'),
(1070, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 14:06:41'),
(1071, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:06:41'),
(1072, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 14:06:41'),
(1073, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:07:26'),
(1074, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 14:07:26'),
(1075, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:07:26'),
(1076, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 14:07:26'),
(1077, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:07:34'),
(1078, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 14:07:34'),
(1079, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:07:34'),
(1080, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 14:07:34'),
(1081, NULL, NULL, 'GET /api/installments/case/19', '::1', '2026-05-17 14:07:40'),
(1082, NULL, NULL, 'POST /api/installments/13/pay', '::1', '2026-05-17 14:12:35'),
(1083, NULL, 'payment', '[CREATE] Payment Transaction', 'DB_TRIGGER', '2026-05-17 14:12:35'),
(1084, NULL, 'invoices', '[CREATE] Invoice Generated', 'DB_TRIGGER', '2026-05-17 14:12:35'),
(1085, NULL, 'installments', '[UPDATE] Installment', 'DB_TRIGGER', '2026-05-17 14:12:35'),
(1086, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-17 14:12:35'),
(1087, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:13:47'),
(1088, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 14:13:47'),
(1089, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:13:47'),
(1090, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 14:13:47'),
(1091, NULL, NULL, 'GET /api/payments/finance/invoices/33', '::1', '2026-05-17 14:13:52'),
(1092, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:14:10'),
(1093, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:14:10'),
(1094, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:40:41'),
(1095, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 14:40:41'),
(1096, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 14:40:42'),
(1097, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 14:40:42'),
(1098, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-17 15:14:28'),
(1099, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-17 15:14:29'),
(1100, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 15:14:29'),
(1101, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:14:29'),
(1102, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:14:29'),
(1103, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 15:14:29'),
(1104, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:08'),
(1105, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:08'),
(1106, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:10'),
(1107, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 15:28:10'),
(1108, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:10'),
(1109, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 15:28:10'),
(1110, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:11'),
(1111, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 15:28:11'),
(1112, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:11'),
(1113, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 15:28:11'),
(1114, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:12'),
(1115, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 15:28:12'),
(1116, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:12'),
(1117, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 15:28:12'),
(1118, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:12'),
(1119, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 15:28:12'),
(1120, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:12'),
(1121, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 15:28:12'),
(1122, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:13'),
(1123, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 15:28:13'),
(1124, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 15:28:13'),
(1125, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 15:28:14'),
(1126, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1127, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-17 15:28:14'),
(1128, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1129, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1130, NULL, NULL, 'GET /api/users/4', '::1', '2026-05-17 15:28:14'),
(1131, NULL, NULL, 'GET /api/users/4', '::1', '2026-05-17 15:28:14'),
(1132, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1133, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 15:28:14'),
(1134, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1135, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-17 15:28:14'),
(1136, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1137, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:14'),
(1138, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:16'),
(1139, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 15:28:16'),
(1140, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:16'),
(1141, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 15:28:16'),
(1142, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:16'),
(1143, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 15:28:16'),
(1144, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:16'),
(1145, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:16'),
(1146, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:16'),
(1147, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:17'),
(1148, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:17'),
(1149, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:17'),
(1150, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-17 15:28:17'),
(1151, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:18'),
(1152, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:18'),
(1153, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:28:18'),
(1154, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:28:18'),
(1155, NULL, NULL, 'GET /api/appointments/list?userId=12&role=client', '::1', '2026-05-17 15:28:18'),
(1156, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:28:18'),
(1157, NULL, NULL, 'GET /api/appointments/list?userId=12&role=client', '::1', '2026-05-17 15:28:18'),
(1158, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:28:18'),
(1159, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-17 15:28:23'),
(1160, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 15:29:33'),
(1161, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-17 15:29:33'),
(1162, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-17 15:29:33'),
(1163, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-17 15:29:34'),
(1164, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-17 15:29:34'),
(1165, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:29:34'),
(1166, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:29:34'),
(1167, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-17 15:29:34'),
(1168, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-17 15:29:34'),
(1169, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-17 15:29:37'),
(1170, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:29:38'),
(1171, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:29:38'),
(1172, NULL, NULL, 'GET /api/chat/room_11_14/messages', '::1', '2026-05-17 15:29:39'),
(1173, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 15:30:37'),
(1174, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-17 15:30:37'),
(1175, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:30:37'),
(1176, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:30:37'),
(1177, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:30:37'),
(1178, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:30:37'),
(1179, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:30:37'),
(1180, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:30:37'),
(1181, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:30:37'),
(1182, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:30:37'),
(1183, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:30:37'),
(1184, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:30:40'),
(1185, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:30:40'),
(1186, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:30:40'),
(1187, NULL, NULL, 'GET /api/chat/room_11_14/messages', '::1', '2026-05-17 15:30:42'),
(1188, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 15:33:05'),
(1189, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-17 15:33:05'),
(1190, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:05'),
(1191, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:06'),
(1192, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:06'),
(1193, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:33:06'),
(1194, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:33:06'),
(1195, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:33:06'),
(1196, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:33:06'),
(1197, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:33:06'),
(1198, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:33:06'),
(1199, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:08'),
(1200, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:33:08'),
(1201, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:33:08'),
(1202, NULL, NULL, 'GET /api/chat/room_11_14/messages', '::1', '2026-05-17 15:33:10'),
(1203, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:17'),
(1204, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:17'),
(1205, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:33:17'),
(1206, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:33:17'),
(1207, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:33:17'),
(1208, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:33:17'),
(1209, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:33:17'),
(1210, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:33:17'),
(1211, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:33:17'),
(1212, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 15:49:26'),
(1213, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:49:27'),
(1214, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:49:27'),
(1215, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 15:49:27'),
(1216, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:49:28'),
(1217, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 15:49:28'),
(1218, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:49:28'),
(1219, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 15:49:28'),
(1220, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:49:28'),
(1221, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:49:28'),
(1222, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 15:49:28'),
(1223, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 15:49:28'),
(1224, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 19:56:35'),
(1225, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 19:56:35'),
(1226, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 19:56:35'),
(1227, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 19:56:35'),
(1228, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 19:56:35'),
(1229, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 19:56:54'),
(1230, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 19:56:54'),
(1231, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 19:56:54'),
(1232, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 19:56:54'),
(1233, NULL, NULL, 'PUT /api/notifications/mark-read/6a071aa397dae290cd7304a5', '::1', '2026-05-17 19:57:20'),
(1234, NULL, NULL, 'PUT /api/notifications/mark-read/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:31'),
(1235, NULL, NULL, 'PUT /api/notifications/mark-read/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:41'),
(1236, NULL, NULL, 'PUT /api/notifications/mark-read/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:52'),
(1237, NULL, NULL, 'DELETE /api/notifications/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:53'),
(1238, NULL, NULL, 'DELETE /api/notifications/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:53'),
(1239, NULL, NULL, 'DELETE /api/notifications/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:53'),
(1240, NULL, NULL, 'PUT /api/notifications/mark-read/6a071a5e97dae290cd73049f', '::1', '2026-05-17 19:57:54'),
(1241, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:02:40'),
(1242, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:02:40'),
(1243, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:02:40'),
(1244, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:02:40'),
(1245, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:02:58'),
(1246, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 20:02:58'),
(1247, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:02:58'),
(1248, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-17 20:02:58'),
(1249, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:02:59'),
(1250, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:02:59'),
(1251, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:02:59'),
(1252, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:02:59'),
(1253, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 20:03:11'),
(1254, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:11'),
(1255, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:11'),
(1256, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 20:03:11'),
(1257, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:13'),
(1258, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 20:03:13'),
(1259, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:13'),
(1260, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-17 20:03:13'),
(1261, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:15'),
(1262, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 20:03:15'),
(1263, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:15'),
(1264, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 20:03:15'),
(1265, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:18'),
(1266, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 20:03:18'),
(1267, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:18'),
(1268, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 20:03:18'),
(1269, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:20'),
(1270, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:03:20'),
(1271, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 20:03:20'),
(1272, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:20'),
(1273, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 20:03:20'),
(1274, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:03:20'),
(1275, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 20:03:24'),
(1276, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:24'),
(1277, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-17 20:03:24'),
(1278, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:24'),
(1279, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:26'),
(1280, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 20:03:26'),
(1281, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:26'),
(1282, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-17 20:03:26'),
(1283, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 20:03:29'),
(1284, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:29'),
(1285, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:29'),
(1286, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-17 20:03:29'),
(1287, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:32'),
(1288, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 20:03:32'),
(1289, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:32'),
(1290, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-17 20:03:32'),
(1291, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:35'),
(1292, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:03:35'),
(1293, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:35'),
(1294, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:03:35'),
(1295, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:39'),
(1296, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 20:03:39'),
(1297, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:39'),
(1298, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-17 20:03:39'),
(1299, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:53'),
(1300, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:03:53'),
(1301, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-17 20:03:53'),
(1302, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-17 20:03:53');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(1303, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-17 20:04:01'),
(1304, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-17 20:04:01'),
(1305, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:01'),
(1306, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:01'),
(1307, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:01'),
(1308, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:01'),
(1309, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:01'),
(1310, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:01'),
(1311, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:01'),
(1312, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:01'),
(1313, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:01'),
(1314, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:06'),
(1315, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:07'),
(1316, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:07'),
(1317, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:10'),
(1318, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:11'),
(1319, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:11'),
(1320, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:11'),
(1321, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:11'),
(1322, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:11'),
(1323, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:11'),
(1324, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:11'),
(1325, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:11'),
(1326, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:14'),
(1327, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:15'),
(1328, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:15'),
(1329, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:15'),
(1330, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:15'),
(1331, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:16'),
(1332, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:17'),
(1333, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:17'),
(1334, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:17'),
(1335, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:17'),
(1336, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:17'),
(1337, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:17'),
(1338, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:17'),
(1339, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:17'),
(1340, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:24'),
(1341, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:25'),
(1342, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:25'),
(1343, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:25'),
(1344, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:25'),
(1345, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:27'),
(1346, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:27'),
(1347, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:27'),
(1348, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:27'),
(1349, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:27'),
(1350, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:27'),
(1351, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:27'),
(1352, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:27'),
(1353, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:04:27'),
(1354, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:04:42'),
(1355, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:42'),
(1356, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:42'),
(1357, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:42'),
(1358, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:42'),
(1359, NULL, NULL, 'PUT /api/appointments/update/8', '::1', '2026-05-17 20:04:50'),
(1360, NULL, 'appointment', '[UPDATE] Appointment', 'DB_TRIGGER', '2026-05-17 20:04:50'),
(1361, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:04:50'),
(1362, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:04:50'),
(1363, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:06:58'),
(1364, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:06:58'),
(1365, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:06:58'),
(1366, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:06:58'),
(1367, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:06:58'),
(1368, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:06:58'),
(1369, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:06:58'),
(1370, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:06:58'),
(1371, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:06:58'),
(1372, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:02'),
(1373, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:02'),
(1374, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:02'),
(1375, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:08'),
(1376, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:08'),
(1377, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:08'),
(1378, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:12'),
(1379, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:12'),
(1380, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:12'),
(1381, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:24'),
(1382, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:24'),
(1383, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:24'),
(1384, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:24'),
(1385, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:24'),
(1386, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:24'),
(1387, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:24'),
(1388, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:24'),
(1389, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:24'),
(1390, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:26'),
(1391, NULL, NULL, 'GET /api/cases?t=1779048447459', '::1', '2026-05-17 20:07:27'),
(1392, NULL, NULL, 'GET /api/cases?t=1779048447460', '::1', '2026-05-17 20:07:27'),
(1393, NULL, NULL, 'GET /api/documents/case/6?t=1779048447459', '::1', '2026-05-17 20:07:27'),
(1394, NULL, NULL, 'GET /api/court-sessions/case/6?t=1779048447459', '::1', '2026-05-17 20:07:27'),
(1395, NULL, NULL, 'GET /api/documents/case/6?t=1779048447460', '::1', '2026-05-17 20:07:27'),
(1396, NULL, NULL, 'GET /api/court-sessions/decision/6?t=1779048447459', '::1', '2026-05-17 20:07:27'),
(1397, NULL, NULL, 'GET /api/court-sessions/case/6?t=1779048447460', '::1', '2026-05-17 20:07:27'),
(1398, NULL, NULL, 'GET /api/court-sessions/decision/6?t=1779048447460', '::1', '2026-05-17 20:07:27'),
(1399, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:30'),
(1400, NULL, NULL, 'GET /api/cases?t=1779048450464', '::1', '2026-05-17 20:07:30'),
(1401, NULL, NULL, 'GET /api/documents/case/6?t=1779048450464', '::1', '2026-05-17 20:07:30'),
(1402, NULL, NULL, 'GET /api/court-sessions/case/6?t=1779048450464', '::1', '2026-05-17 20:07:30'),
(1403, NULL, NULL, 'GET /api/court-sessions/decision/6?t=1779048450464', '::1', '2026-05-17 20:07:30'),
(1404, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:30'),
(1405, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:30'),
(1406, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:30'),
(1407, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:30'),
(1408, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:30'),
(1409, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:30'),
(1410, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:30'),
(1411, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:30'),
(1412, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:31'),
(1413, NULL, NULL, 'GET /api/cases?t=1779048452157', '::1', '2026-05-17 20:07:32'),
(1414, NULL, NULL, 'GET /api/cases?t=1779048452158', '::1', '2026-05-17 20:07:32'),
(1415, NULL, NULL, 'GET /api/documents/case/4?t=1779048452157', '::1', '2026-05-17 20:07:32'),
(1416, NULL, NULL, 'GET /api/court-sessions/case/4?t=1779048452157', '::1', '2026-05-17 20:07:32'),
(1417, NULL, NULL, 'GET /api/documents/case/4?t=1779048452158', '::1', '2026-05-17 20:07:32'),
(1418, NULL, NULL, 'GET /api/court-sessions/decision/4?t=1779048452157', '::1', '2026-05-17 20:07:32'),
(1419, NULL, NULL, 'GET /api/court-sessions/case/4?t=1779048452158', '::1', '2026-05-17 20:07:32'),
(1420, NULL, NULL, 'GET /api/court-sessions/decision/4?t=1779048452158', '::1', '2026-05-17 20:07:32'),
(1421, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:35'),
(1422, NULL, NULL, 'GET /api/cases?t=1779048455161', '::1', '2026-05-17 20:07:35'),
(1423, NULL, NULL, 'GET /api/documents/case/4?t=1779048455161', '::1', '2026-05-17 20:07:35'),
(1424, NULL, NULL, 'GET /api/court-sessions/case/4?t=1779048455161', '::1', '2026-05-17 20:07:35'),
(1425, NULL, NULL, 'GET /api/court-sessions/decision/4?t=1779048455161', '::1', '2026-05-17 20:07:35'),
(1426, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:35'),
(1427, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:35'),
(1428, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:35'),
(1429, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:35'),
(1430, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:35'),
(1431, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:35'),
(1432, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:35'),
(1433, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:35'),
(1434, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:41'),
(1435, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:42'),
(1436, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:42'),
(1437, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:46'),
(1438, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 20:07:47'),
(1439, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 20:07:47'),
(1440, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:50'),
(1441, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:50'),
(1442, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:50'),
(1443, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:53'),
(1444, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:54'),
(1445, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:54'),
(1446, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:54'),
(1447, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:07:54'),
(1448, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:54'),
(1449, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:07:54'),
(1450, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:54'),
(1451, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:07:54'),
(1452, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:07:59'),
(1453, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 20:07:59'),
(1454, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 20:07:59'),
(1455, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:08:06'),
(1456, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:08:07'),
(1457, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:08:07'),
(1458, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:08:07'),
(1459, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:08:07'),
(1460, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:08:07'),
(1461, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:08:07'),
(1462, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:08:07'),
(1463, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:08:07'),
(1464, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:09:52'),
(1465, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:09:52'),
(1466, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 20:09:53'),
(1467, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:00'),
(1468, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:05'),
(1469, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:08'),
(1470, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:08'),
(1471, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 20:10:08'),
(1472, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:08'),
(1473, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:08'),
(1474, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:10:08'),
(1475, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 20:10:08'),
(1476, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:10:08'),
(1477, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:10:08'),
(1478, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 20:10:08'),
(1479, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 20:10:08'),
(1480, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:09'),
(1481, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 20:10:10'),
(1482, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 20:10:10'),
(1483, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:47'),
(1484, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:10:47'),
(1485, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 20:10:47'),
(1486, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:15:31'),
(1487, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:15:31'),
(1488, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 20:15:31'),
(1489, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 20:16:15'),
(1490, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:17:47'),
(1491, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:17:49'),
(1492, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:18:00'),
(1493, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 20:18:00'),
(1494, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 20:18:00'),
(1495, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:00:48'),
(1496, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:01:09'),
(1497, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:01:11'),
(1498, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:02:04'),
(1499, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 21:02:05'),
(1500, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 21:02:05'),
(1501, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-17 21:02:05'),
(1502, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-17 21:02:05'),
(1503, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:02:09'),
(1504, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:02:14'),
(1505, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:02:14'),
(1506, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:02:14'),
(1507, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:02:14'),
(1508, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:02:14'),
(1509, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:02:14'),
(1510, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:02:14'),
(1511, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:02:14'),
(1512, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:02:14'),
(1513, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:05:46'),
(1514, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 21:05:47'),
(1515, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 21:05:47'),
(1516, NULL, NULL, 'POST /api/cases', '::1', '2026-05-17 21:06:54'),
(1517, NULL, 'cases', '[CREATE] Legal Case', 'DB_TRIGGER', '2026-05-17 21:06:54'),
(1518, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:06:56'),
(1519, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:06:56'),
(1520, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:06:56'),
(1521, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:08:04'),
(1522, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 21:08:04'),
(1523, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-17 21:08:04'),
(1524, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-17 21:08:04'),
(1525, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-17 21:08:04'),
(1526, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:08:05'),
(1527, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:08:26'),
(1528, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:08:27'),
(1529, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:08:27'),
(1530, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:08:57'),
(1531, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:10:59'),
(1532, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:10:59'),
(1533, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:10:59'),
(1534, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:11:07'),
(1535, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:16:58'),
(1536, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:16:58'),
(1537, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:16:58'),
(1538, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:08'),
(1539, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:09'),
(1540, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:09'),
(1541, NULL, NULL, 'POST /api/cases/send-offer', '::1', '2026-05-17 21:17:11'),
(1542, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:13'),
(1543, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:14'),
(1544, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:14'),
(1545, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:17:14'),
(1546, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:17:14'),
(1547, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:17:14'),
(1548, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:17:14'),
(1549, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:14'),
(1550, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:14'),
(1551, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:17'),
(1552, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:17'),
(1553, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:17:17'),
(1554, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:17'),
(1555, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:17'),
(1556, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:17:17'),
(1557, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:17:17'),
(1558, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:17:17'),
(1559, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:17'),
(1560, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:17:17'),
(1561, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:17'),
(1562, NULL, NULL, 'PUT /api/notifications/mark-read/6a0a2dee8bd9f879dfd3418a', '::1', '2026-05-17 21:17:22'),
(1563, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:25'),
(1564, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:25'),
(1565, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:17:25'),
(1566, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:26'),
(1567, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:17:26'),
(1568, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:17:26'),
(1569, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:17:26'),
(1570, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:17:26'),
(1571, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:26'),
(1572, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:17:26'),
(1573, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:17:26'),
(1574, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:19:18'),
(1575, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:08'),
(1576, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:09'),
(1577, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:09'),
(1578, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:09'),
(1579, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:09'),
(1580, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:09'),
(1581, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:09'),
(1582, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:09'),
(1583, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:09'),
(1584, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:10'),
(1585, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:11'),
(1586, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:12'),
(1587, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:12'),
(1588, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:12'),
(1589, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:12'),
(1590, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:12'),
(1591, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:12'),
(1592, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:12'),
(1593, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:12'),
(1594, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:13'),
(1595, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:13'),
(1596, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:20:13'),
(1597, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:13'),
(1598, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:13'),
(1599, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:13'),
(1600, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:13'),
(1601, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:13'),
(1602, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:14'),
(1603, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:14'),
(1604, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:14'),
(1605, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:15'),
(1606, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:39'),
(1607, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:39'),
(1608, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:39'),
(1609, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:39'),
(1610, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:20:39'),
(1611, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:39'),
(1612, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:39'),
(1613, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:20:39'),
(1614, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-17 21:20:39'),
(1615, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:20:40'),
(1616, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:25'),
(1617, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:26'),
(1618, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:26'),
(1619, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:41:26'),
(1620, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:41:26'),
(1621, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 21:41:26'),
(1622, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 21:41:26'),
(1623, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:34'),
(1624, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:34'),
(1625, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:41:34'),
(1626, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:35'),
(1627, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:35'),
(1628, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:41:35'),
(1629, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:41:35'),
(1630, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 21:41:35'),
(1631, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 21:41:35'),
(1632, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:41:36'),
(1633, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:42:45'),
(1634, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:42:45'),
(1635, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:42:45'),
(1636, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:42:45'),
(1637, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:42:45'),
(1638, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 21:42:45'),
(1639, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 21:42:45'),
(1640, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:42:46'),
(1641, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:42'),
(1642, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:42'),
(1643, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:43:42'),
(1644, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:43'),
(1645, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:43'),
(1646, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:43:43'),
(1647, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:43:43'),
(1648, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:43:43'),
(1649, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:43:43'),
(1650, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:52'),
(1651, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:53'),
(1652, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:53'),
(1653, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:43:53'),
(1654, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:43:53'),
(1655, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 21:43:54'),
(1656, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:43:54'),
(1657, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-17 21:43:54'),
(1658, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:45:56'),
(1659, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:45:56'),
(1660, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:45:56'),
(1661, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:45:58'),
(1662, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:00'),
(1663, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:01'),
(1664, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:03'),
(1665, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:05'),
(1666, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:07'),
(1667, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:11'),
(1668, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:46:13'),
(1669, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:24'),
(1670, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:24'),
(1671, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:49:24'),
(1672, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:25'),
(1673, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:27'),
(1674, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:28'),
(1675, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:31'),
(1676, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:34'),
(1677, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:36'),
(1678, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:37'),
(1679, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:49:40'),
(1680, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:52:21'),
(1681, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:52:23'),
(1682, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:52:24'),
(1683, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:54:45'),
(1684, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:54:47'),
(1685, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:59:08'),
(1686, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:59:08'),
(1687, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:59:08'),
(1688, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:59:15'),
(1689, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:59:15'),
(1690, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 21:59:16'),
(1691, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:59:39'),
(1692, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 21:59:59'),
(1693, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:38'),
(1694, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:42'),
(1695, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:45'),
(1696, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:46'),
(1697, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:48'),
(1698, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:49'),
(1699, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:55'),
(1700, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:01:56'),
(1701, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:02:28'),
(1702, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:02:28'),
(1703, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:02:28'),
(1704, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:02:33'),
(1705, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:02:38'),
(1706, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:04:43'),
(1707, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:04:44'),
(1708, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:04:46'),
(1709, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:04:47'),
(1710, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:04:49'),
(1711, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:04:50'),
(1712, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:06:38'),
(1713, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:06:38'),
(1714, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:06:38'),
(1715, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:16'),
(1716, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:23'),
(1717, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:25'),
(1718, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:28'),
(1719, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:30'),
(1720, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:36'),
(1721, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:36'),
(1722, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:09:36'),
(1723, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 22:09:36'),
(1724, NULL, NULL, 'GET /api/cases', '::1', '2026-05-17 22:09:36'),
(1725, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 22:09:36'),
(1726, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-17 22:09:36'),
(1727, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:11:16'),
(1728, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:11:17'),
(1729, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 22:12:29'),
(1730, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:13:25'),
(1731, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:13:27'),
(1732, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:13:29'),
(1733, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:13:30'),
(1734, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:14:12'),
(1735, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:14:12'),
(1736, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:14:12'),
(1737, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:14:48'),
(1738, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:14:51'),
(1739, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:14:53'),
(1740, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:14:54'),
(1741, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-17 22:15:43'),
(1742, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:15:56'),
(1743, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:15:59'),
(1744, NULL, NULL, 'POST /api/ai/contract-review', '::1', '2026-05-17 22:16:05'),
(1745, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:16:30'),
(1746, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:16:31'),
(1747, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:16:39'),
(1748, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:19:46'),
(1749, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:20:09'),
(1750, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:20:19'),
(1751, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:20:57'),
(1752, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:20:57'),
(1753, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:20:58'),
(1754, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:20:58'),
(1755, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:22:18'),
(1756, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:23:00'),
(1757, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-17 22:23:16'),
(1758, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:23:46'),
(1759, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:24:00'),
(1760, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:24:09'),
(1761, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:24:49'),
(1762, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:24:58'),
(1763, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:25:12'),
(1764, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:26:04'),
(1765, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:27:20'),
(1766, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-17 22:28:45'),
(1767, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:28:50'),
(1768, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-17 22:29:02'),
(1769, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-17 22:29:02'),
(1770, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-17 22:29:02'),
(1771, NULL, NULL, 'POST /api/ai/contract-review', '::1', '2026-05-17 22:29:02'),
(1772, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:50:26'),
(1773, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-17 22:51:01'),
(1774, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:52:13'),
(1775, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:52:18'),
(1776, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:52:19'),
(1777, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:52:23'),
(1778, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:52:23'),
(1779, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:52:23'),
(1780, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:52:25'),
(1781, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:53:37'),
(1782, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-17 22:53:37'),
(1783, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-17 22:53:37'),
(1784, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 09:19:51'),
(1785, NULL, NULL, 'GET /api/ai/research', '::1', '2026-05-18 09:20:23'),
(1786, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-18 09:21:00'),
(1787, NULL, NULL, 'POST /api/v1/ai-tools/research', '::1', '2026-05-18 09:21:19'),
(1788, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 09:22:11'),
(1789, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 09:33:45'),
(1790, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-18 09:33:46'),
(1791, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 09:35:07'),
(1792, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-18 09:36:37'),
(1793, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-18 09:36:37'),
(1794, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-18 09:37:29'),
(1795, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-18 09:39:36'),
(1796, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-18 09:39:36'),
(1797, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 11:16:05'),
(1798, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-18 11:16:19'),
(1799, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 11:16:35'),
(1800, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-18 11:16:58'),
(1801, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-18 11:16:58'),
(1802, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-18 11:16:58'),
(1803, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-18 11:17:26'),
(1804, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-18 12:46:48'),
(1805, NULL, NULL, 'GET /', '::1', '2026-05-19 09:01:41'),
(1806, NULL, NULL, 'GET /favicon.ico', '::1', '2026-05-19 09:01:41'),
(1807, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-19 09:01:59'),
(1808, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-19 09:02:00'),
(1809, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-19 09:02:00'),
(1810, NULL, NULL, 'POST /api/auth/register', '::1', '2026-05-19 21:18:50'),
(1811, NULL, 'lawyer', '[CREATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-19 21:18:50'),
(1812, NULL, 'users', '[CREATE] User Account', 'DB_TRIGGER', '2026-05-19 21:18:50'),
(1813, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-19 21:19:21'),
(1814, 16, NULL, 'LOGIN_SUCCESS user_id=16 user_name=Hassan Mohamed Khaled', NULL, '2026-05-19 21:19:21'),
(1815, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:21'),
(1816, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:22'),
(1817, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:22'),
(1818, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:19:22'),
(1819, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:19:22'),
(1820, NULL, NULL, 'GET /api/appointments/list?userId=16&role=lawyer', '::1', '2026-05-19 21:19:22'),
(1821, NULL, NULL, 'GET /api/appointments/list?userId=16&role=lawyer', '::1', '2026-05-19 21:19:22'),
(1822, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:29'),
(1823, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:42'),
(1824, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:42'),
(1825, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:42'),
(1826, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:19:42'),
(1827, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:19:42'),
(1828, NULL, NULL, 'GET /api/appointments/list?userId=16&role=lawyer', '::1', '2026-05-19 21:19:42'),
(1829, NULL, NULL, 'GET /api/appointments/list?userId=16&role=lawyer', '::1', '2026-05-19 21:19:42'),
(1830, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:43'),
(1831, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:45'),
(1832, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:45'),
(1833, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:57'),
(1834, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:57'),
(1835, NULL, NULL, 'GET /api/notifications/16?limit=50&offset=0', '::1', '2026-05-19 21:19:57'),
(1836, NULL, NULL, 'GET /api/users/profile/16', '::1', '2026-05-19 21:19:58'),
(1837, NULL, NULL, 'POST /api/auth/register', '::1', '2026-05-19 21:39:07'),
(1838, NULL, 'client', '[CREATE] Client Profile', 'DB_TRIGGER', '2026-05-19 21:39:07'),
(1839, NULL, 'users', '[CREATE] User Account', 'DB_TRIGGER', '2026-05-19 21:39:07'),
(1840, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-19 21:44:22'),
(1841, 17, NULL, 'LOGIN_SUCCESS user_id=17 user_name=Mahmoud Hassan Khaled', NULL, '2026-05-19 21:44:22'),
(1842, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:44:22'),
(1843, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:44:23'),
(1844, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:44:23'),
(1845, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:44:23'),
(1846, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:44:23'),
(1847, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:44:23'),
(1848, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:44:23'),
(1849, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-19 21:44:23'),
(1850, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-19 21:44:23'),
(1851, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:44:24'),
(1852, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-19 21:44:25'),
(1853, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-19 21:44:25'),
(1854, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:45:59'),
(1855, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:45:59'),
(1856, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:45:59'),
(1857, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:45:59'),
(1858, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:00'),
(1859, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:46:00'),
(1860, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-19 21:46:00'),
(1861, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:46:00'),
(1862, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-19 21:46:00'),
(1863, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:46:01'),
(1864, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:02'),
(1865, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:02'),
(1866, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:46:05'),
(1867, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:46:06'),
(1868, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:46:06'),
(1869, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:06'),
(1870, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:06'),
(1871, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:46:06'),
(1872, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-19 21:46:06'),
(1873, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:46:06'),
(1874, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-19 21:46:06'),
(1875, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-19 21:46:07'),
(1876, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:46:08'),
(1877, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-19 21:46:08'),
(1878, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:08'),
(1879, NULL, NULL, 'GET /api/cases', '::1', '2026-05-19 21:46:08'),
(1880, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 00:02:16'),
(1881, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-20 00:02:17'),
(1882, NULL, NULL, 'GET /api/appointments/list?userId=17&role=client', '::1', '2026-05-20 00:02:17'),
(1883, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 00:02:18'),
(1884, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 00:02:18'),
(1885, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 00:23:18'),
(1886, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 00:23:29'),
(1887, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 06:14:14'),
(1888, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 06:15:41'),
(1889, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 06:15:41'),
(1890, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 06:15:42'),
(1891, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:17'),
(1892, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:17'),
(1893, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 13:56:17'),
(1894, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:23'),
(1895, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:24'),
(1896, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:24'),
(1897, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:32'),
(1898, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:39'),
(1899, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:56:40'),
(1900, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:56:40'),
(1901, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:43'),
(1902, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:43'),
(1903, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 13:56:43'),
(1904, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:56:44'),
(1905, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:56:44'),
(1906, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:45'),
(1907, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:47'),
(1908, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:56:47'),
(1909, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:56:47'),
(1910, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:56:49'),
(1911, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:58:43'),
(1912, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:58:44'),
(1913, NULL, NULL, 'GET /api/cases/undefined', '::1', '2026-05-20 13:58:44'),
(1914, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:00'),
(1915, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:02'),
(1916, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:03'),
(1917, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:03'),
(1918, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:06'),
(1919, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:08'),
(1920, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:08'),
(1921, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:08'),
(1922, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:09'),
(1923, NULL, NULL, 'GET /api/cases?t=1779285550584', '::1', '2026-05-20 13:59:10');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(1924, NULL, NULL, 'GET /api/cases?t=1779285550584', '::1', '2026-05-20 13:59:10'),
(1925, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:20'),
(1926, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:20'),
(1927, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:20'),
(1928, NULL, NULL, 'OPTIONS /api/users/profile/11', '::1', '2026-05-20 13:59:22'),
(1929, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 13:59:22'),
(1930, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 13:59:22'),
(1931, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 13:59:36'),
(1932, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 13:59:37'),
(1933, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:00:01'),
(1934, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:00:02'),
(1935, NULL, NULL, 'OPTIONS /api/auth/login', '::ffff:127.0.0.1', '2026-05-20 14:01:55'),
(1936, NULL, NULL, 'OPTIONS /api/auth/login', '::ffff:127.0.0.1', '2026-05-20 14:01:55'),
(1937, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:04'),
(1938, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:06'),
(1939, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:06'),
(1940, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:07'),
(1941, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:07'),
(1942, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:07'),
(1943, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:07'),
(1944, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:08'),
(1945, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 14:02:11'),
(1946, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:42'),
(1947, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:43'),
(1948, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 14:02:43'),
(1949, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:46'),
(1950, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:46'),
(1951, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 14:02:46'),
(1952, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:50'),
(1953, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:50'),
(1954, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 14:02:50'),
(1955, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:52'),
(1956, NULL, NULL, 'GET /api/users/profile/17', '::1', '2026-05-20 14:02:52'),
(1957, NULL, NULL, 'GET /api/notifications/17?limit=50&offset=0', '::1', '2026-05-20 14:02:53'),
(1958, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:03:04'),
(1959, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 14:03:04'),
(1960, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:04'),
(1961, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:10'),
(1962, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:10'),
(1963, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 14:03:10'),
(1964, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:10'),
(1965, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:10'),
(1966, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:10'),
(1967, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:10'),
(1968, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:16'),
(1969, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:17'),
(1970, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:17'),
(1971, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:19'),
(1972, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:19'),
(1973, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:19'),
(1974, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:19'),
(1975, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:20'),
(1976, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:03:20'),
(1977, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:03:20'),
(1978, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:03:21'),
(1979, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:03:22'),
(1980, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:03:22'),
(1981, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:22'),
(1982, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:03:22'),
(1983, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:04:33'),
(1984, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:18'),
(1985, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:19'),
(1986, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:19'),
(1987, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:05:19'),
(1988, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:05:19'),
(1989, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:05:19'),
(1990, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:05:19'),
(1991, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:23'),
(1992, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:05:23'),
(1993, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:05:23'),
(1994, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:26'),
(1995, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:26'),
(1996, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:26'),
(1997, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:05:26'),
(1998, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:05:26'),
(1999, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:05:26'),
(2000, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:05:26'),
(2001, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:05:33'),
(2002, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:05:34'),
(2003, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:05:34'),
(2004, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:18'),
(2005, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:19'),
(2006, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:19'),
(2007, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:19'),
(2008, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:19'),
(2009, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:06:19'),
(2010, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:06:19'),
(2011, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:22'),
(2012, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:27'),
(2013, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:27'),
(2014, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:27'),
(2015, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:27'),
(2016, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:27'),
(2017, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:06:27'),
(2018, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:06:27'),
(2019, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:30'),
(2020, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:30'),
(2021, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:30'),
(2022, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:32'),
(2023, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:32'),
(2024, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:32'),
(2025, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:32'),
(2026, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:06:32'),
(2027, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:06:32'),
(2028, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:06:32'),
(2029, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:06:38'),
(2030, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:10'),
(2031, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:10'),
(2032, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:10'),
(2033, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:08:10'),
(2034, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:08:10'),
(2035, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:08:10'),
(2036, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:08:10'),
(2037, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:26'),
(2038, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:28'),
(2039, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:29'),
(2040, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:29'),
(2041, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:08:29'),
(2042, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:08:29'),
(2043, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:08:29'),
(2044, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:08:29'),
(2045, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:08:34'),
(2046, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:08:34'),
(2047, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:08:34'),
(2048, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:09:37'),
(2049, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:09:38'),
(2050, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:09:38'),
(2051, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:09:38'),
(2052, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:09:38'),
(2053, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:09:38'),
(2054, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:09:38'),
(2055, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:09:40'),
(2056, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:09:42'),
(2057, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:10:11'),
(2058, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:10:12'),
(2059, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:10:18'),
(2060, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:10:18'),
(2061, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 14:10:18'),
(2062, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:10:46'),
(2063, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:10:48'),
(2064, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:11:25'),
(2065, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:11:27'),
(2066, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:11:48'),
(2067, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:11:49'),
(2068, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:30'),
(2069, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:31'),
(2070, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:31'),
(2071, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:12:31'),
(2072, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:12:31'),
(2073, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:12:31'),
(2074, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:12:31'),
(2075, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:38'),
(2076, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:43'),
(2077, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:44'),
(2078, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:44'),
(2079, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:12:44'),
(2080, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:12:44'),
(2081, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:12:44'),
(2082, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:12:44'),
(2083, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:12:50'),
(2084, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:12:51'),
(2085, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:12:51'),
(2086, NULL, NULL, 'GET /api/chat/room_11_15/messages', '::1', '2026-05-20 14:12:53'),
(2087, NULL, NULL, 'GET /api/chat/room_11_14/messages', '::1', '2026-05-20 14:12:56'),
(2088, NULL, NULL, 'GET /api/chat/room_11_15/messages', '::1', '2026-05-20 14:12:58'),
(2089, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:13:46'),
(2090, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:13:47'),
(2091, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:13:47'),
(2092, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:13:47'),
(2093, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:13:47'),
(2094, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:13:47'),
(2095, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:13:47'),
(2096, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:14:06'),
(2097, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:14:10'),
(2098, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:14:10'),
(2099, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:14:10'),
(2100, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:14:10'),
(2101, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:14:10'),
(2102, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:14:10'),
(2103, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:14:10'),
(2104, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:17:31'),
(2105, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:17:32'),
(2106, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:17:32'),
(2107, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:18:18'),
(2108, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:18:19'),
(2109, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:18:19'),
(2110, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:18:19'),
(2111, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:18:19'),
(2112, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:18:19'),
(2113, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:18:19'),
(2114, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:18:26'),
(2115, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:19:11'),
(2116, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:19:11'),
(2117, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:19:11'),
(2118, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:19:11'),
(2119, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:19:11'),
(2120, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:19:11'),
(2121, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:19:11'),
(2122, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:20:14'),
(2123, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 14:20:14'),
(2124, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:20:14'),
(2125, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:20:17'),
(2126, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:20:17'),
(2127, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:20:17'),
(2128, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:20:17'),
(2129, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:20:17'),
(2130, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:20:17'),
(2131, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:20:17'),
(2132, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:20:17'),
(2133, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:20:17'),
(2134, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:20:17'),
(2135, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:20:58'),
(2136, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:21:00'),
(2137, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:21:01'),
(2138, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:21:01'),
(2139, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 14:21:01'),
(2140, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 14:21:01'),
(2141, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:22:25'),
(2142, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:22:25'),
(2143, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:22:25'),
(2144, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:22:25'),
(2145, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:22:25'),
(2146, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:22:25'),
(2147, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:22:25'),
(2148, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:22:26'),
(2149, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:22:26'),
(2150, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:22:28'),
(2151, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:22:31'),
(2152, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:22:31'),
(2153, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:22:31'),
(2154, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:22:31'),
(2155, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:22:31'),
(2156, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:22:31'),
(2157, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:22:31'),
(2158, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:19'),
(2159, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:20'),
(2160, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:20'),
(2161, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:20'),
(2162, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:20'),
(2163, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:20'),
(2164, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:20'),
(2165, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:20'),
(2166, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:20'),
(2167, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:22'),
(2168, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:23'),
(2169, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:23'),
(2170, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:28'),
(2171, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 14:23:28'),
(2172, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 14:23:28'),
(2173, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:31'),
(2174, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:31'),
(2175, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:31'),
(2176, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:32'),
(2177, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:32'),
(2178, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:32'),
(2179, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:32'),
(2180, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:32'),
(2181, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:33'),
(2182, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:33'),
(2183, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:33'),
(2184, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:33'),
(2185, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:34'),
(2186, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:35'),
(2187, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:35'),
(2188, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:35'),
(2189, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:35'),
(2190, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:38'),
(2191, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:38'),
(2192, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:38'),
(2193, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:38'),
(2194, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:38'),
(2195, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:38'),
(2196, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:38'),
(2197, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:38'),
(2198, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:38'),
(2199, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:40'),
(2200, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:43'),
(2201, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:43'),
(2202, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:23:43'),
(2203, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:45'),
(2204, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:45'),
(2205, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:23:45'),
(2206, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:46'),
(2207, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:47'),
(2208, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:47'),
(2209, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:47'),
(2210, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:23:47'),
(2211, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:47'),
(2212, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:47'),
(2213, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:23:47'),
(2214, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:23:47'),
(2215, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:54'),
(2216, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:55'),
(2217, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:23:55'),
(2218, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:17'),
(2219, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:17'),
(2220, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:17'),
(2221, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:41'),
(2222, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:41'),
(2223, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:41'),
(2224, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:44'),
(2225, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:46'),
(2226, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:46'),
(2227, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:46'),
(2228, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:24:46'),
(2229, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:24:46'),
(2230, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:24:46'),
(2231, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:24:46'),
(2232, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:24:46'),
(2233, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:24:46'),
(2234, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:51'),
(2235, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:54'),
(2236, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:55'),
(2237, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:24:55'),
(2238, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:24:55'),
(2239, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:24:55'),
(2240, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-20 14:24:55'),
(2241, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-20 14:24:55'),
(2242, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:02'),
(2243, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:02'),
(2244, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:02'),
(2245, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:05'),
(2246, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:05'),
(2247, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:05'),
(2248, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:05'),
(2249, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:05'),
(2250, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-20 14:25:05'),
(2251, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-20 14:25:05'),
(2252, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:06'),
(2253, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:07'),
(2254, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:07'),
(2255, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:07'),
(2256, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:07'),
(2257, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:08'),
(2258, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:25:08'),
(2259, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:25:08'),
(2260, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:25:08'),
(2261, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:25:08'),
(2262, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:09'),
(2263, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:12'),
(2264, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:12'),
(2265, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:12'),
(2266, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:12'),
(2267, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:25:12'),
(2268, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-20 14:25:12'),
(2269, NULL, NULL, 'GET /api/appointments/list?userId=14&role=lawyer', '::1', '2026-05-20 14:25:12'),
(2270, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:25:14'),
(2271, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:03'),
(2272, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:03'),
(2273, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:03'),
(2274, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:27:03'),
(2275, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:27:03'),
(2276, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:27:03'),
(2277, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:27:03'),
(2278, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:27:03'),
(2279, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:27:03'),
(2280, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:07'),
(2281, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:09'),
(2282, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:09'),
(2283, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:27:09'),
(2284, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:27:09'),
(2285, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:27:09'),
(2286, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:27:09'),
(2287, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:27:09'),
(2288, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:27:09'),
(2289, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:27:09'),
(2290, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:33:33'),
(2291, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:33:33'),
(2292, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:33:33'),
(2293, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:33:45'),
(2294, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:33:45'),
(2295, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:33:45'),
(2296, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-20 14:33:45'),
(2297, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-20 14:33:45'),
(2298, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-20 14:33:45'),
(2299, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-20 14:33:45'),
(2300, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:34:17'),
(2301, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:34:17'),
(2302, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:34:17'),
(2303, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-20 14:34:17'),
(2304, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-20 14:34:17'),
(2305, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-20 14:34:17'),
(2306, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-20 14:34:17'),
(2307, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:34:59'),
(2308, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:34:59'),
(2309, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:34:59'),
(2310, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:06'),
(2311, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:06'),
(2312, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:35:06'),
(2313, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-20 14:35:06'),
(2314, NULL, NULL, 'GET /api/payments/wallet/payments', '::1', '2026-05-20 14:35:06'),
(2315, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-20 14:35:06'),
(2316, NULL, NULL, 'GET /payments/wallet/payments', '::1', '2026-05-20 14:35:06'),
(2317, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:09'),
(2318, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:09'),
(2319, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:35:09'),
(2320, NULL, NULL, 'GET /api/payments/finance/invoices/:paymentId', '::1', '2026-05-20 14:35:09'),
(2321, NULL, NULL, 'GET /api/payments/finance/invoices/:paymentId', '::1', '2026-05-20 14:35:09'),
(2322, NULL, NULL, 'GET /payments/finance/invoices/:paymentId', '::1', '2026-05-20 14:35:09'),
(2323, NULL, NULL, 'GET /payments/finance/invoices/:paymentId', '::1', '2026-05-20 14:35:09'),
(2324, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:12'),
(2325, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:12'),
(2326, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:12'),
(2327, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:35:12'),
(2328, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:35:12'),
(2329, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:35:12'),
(2330, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:35:12'),
(2331, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:35:12'),
(2332, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:35:12'),
(2333, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:33'),
(2334, NULL, NULL, 'GET /api/cases?t=1779287734016', '::1', '2026-05-20 14:35:34'),
(2335, NULL, NULL, 'GET /api/cases?t=1779287734017', '::1', '2026-05-20 14:35:34'),
(2336, NULL, NULL, 'GET /api/documents/case/24?t=1779287734016', '::1', '2026-05-20 14:35:34'),
(2337, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287734016', '::1', '2026-05-20 14:35:34'),
(2338, NULL, NULL, 'GET /api/documents/case/24?t=1779287734017', '::1', '2026-05-20 14:35:34'),
(2339, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287734016', '::1', '2026-05-20 14:35:34'),
(2340, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287734017', '::1', '2026-05-20 14:35:34'),
(2341, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287734017', '::1', '2026-05-20 14:35:34'),
(2342, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:36'),
(2343, NULL, NULL, 'GET /api/cases?t=1779287737025', '::1', '2026-05-20 14:35:37'),
(2344, NULL, NULL, 'GET /api/documents/case/24?t=1779287737025', '::1', '2026-05-20 14:35:37'),
(2345, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287737025', '::1', '2026-05-20 14:35:37'),
(2346, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287737025', '::1', '2026-05-20 14:35:37'),
(2347, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:39'),
(2348, NULL, NULL, 'GET /api/cases?t=1779287740120', '::1', '2026-05-20 14:35:40'),
(2349, NULL, NULL, 'GET /api/cases?t=1779287740121', '::1', '2026-05-20 14:35:40'),
(2350, NULL, NULL, 'GET /api/documents/case/24?t=1779287740120', '::1', '2026-05-20 14:35:40'),
(2351, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287740120', '::1', '2026-05-20 14:35:40'),
(2352, NULL, NULL, 'GET /api/documents/case/24?t=1779287740121', '::1', '2026-05-20 14:35:40'),
(2353, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287740120', '::1', '2026-05-20 14:35:40'),
(2354, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287740121', '::1', '2026-05-20 14:35:40'),
(2355, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287740121', '::1', '2026-05-20 14:35:40'),
(2356, NULL, NULL, 'GET /api/cases?t=1779287743122', '::1', '2026-05-20 14:35:43'),
(2357, NULL, NULL, 'GET /api/documents/case/24?t=1779287743122', '::1', '2026-05-20 14:35:43'),
(2358, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287743122', '::1', '2026-05-20 14:35:43'),
(2359, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287743122', '::1', '2026-05-20 14:35:43'),
(2360, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:45'),
(2361, NULL, NULL, 'GET /api/cases?t=1779287746130', '::1', '2026-05-20 14:35:46'),
(2362, NULL, NULL, 'GET /api/documents/case/24?t=1779287746130', '::1', '2026-05-20 14:35:46'),
(2363, NULL, NULL, 'GET /cases', '::1', '2026-05-20 14:35:46'),
(2364, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287746130', '::1', '2026-05-20 14:35:46'),
(2365, NULL, NULL, 'GET /cases', '::1', '2026-05-20 14:35:46'),
(2366, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287746130', '::1', '2026-05-20 14:35:46'),
(2367, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:47'),
(2368, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:47'),
(2369, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:47'),
(2370, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:35:47'),
(2371, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:35:47'),
(2372, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:35:48'),
(2373, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:35:48'),
(2374, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:35:48'),
(2375, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:35:48'),
(2376, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:35:50'),
(2377, NULL, NULL, 'GET /cases', '::1', '2026-05-20 14:35:50'),
(2378, NULL, NULL, 'GET /cases', '::1', '2026-05-20 14:35:50'),
(2379, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:36:01'),
(2380, NULL, NULL, 'GET /api/cases?t=1779287762196', '::1', '2026-05-20 14:36:02'),
(2381, NULL, NULL, 'GET /api/cases?t=1779287762197', '::1', '2026-05-20 14:36:02'),
(2382, NULL, NULL, 'GET /api/documents/case/24?t=1779287762196', '::1', '2026-05-20 14:36:02'),
(2383, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287762196', '::1', '2026-05-20 14:36:02'),
(2384, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287762196', '::1', '2026-05-20 14:36:02'),
(2385, NULL, NULL, 'GET /api/documents/case/24?t=1779287762197', '::1', '2026-05-20 14:36:02'),
(2386, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287762197', '::1', '2026-05-20 14:36:02'),
(2387, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287762197', '::1', '2026-05-20 14:36:02'),
(2388, NULL, NULL, 'GET /api/cases?t=1779287765201', '::1', '2026-05-20 14:36:05'),
(2389, NULL, NULL, 'GET /api/documents/case/24?t=1779287765201', '::1', '2026-05-20 14:36:05'),
(2390, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287765201', '::1', '2026-05-20 14:36:05'),
(2391, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287765201', '::1', '2026-05-20 14:36:05'),
(2392, NULL, NULL, 'GET /api/cases?t=1779287768198', '::1', '2026-05-20 14:36:08'),
(2393, NULL, NULL, 'GET /api/documents/case/24?t=1779287768198', '::1', '2026-05-20 14:36:08'),
(2394, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287768198', '::1', '2026-05-20 14:36:08'),
(2395, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287768198', '::1', '2026-05-20 14:36:08'),
(2396, NULL, NULL, 'GET /api/cases?t=1779287771199', '::1', '2026-05-20 14:36:11'),
(2397, NULL, NULL, 'GET /api/documents/case/24?t=1779287771199', '::1', '2026-05-20 14:36:11'),
(2398, NULL, NULL, 'GET /api/court-sessions/case/24?t=1779287771199', '::1', '2026-05-20 14:36:11'),
(2399, NULL, NULL, 'GET /api/court-sessions/decision/24?t=1779287771199', '::1', '2026-05-20 14:36:11'),
(2400, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:36:16'),
(2401, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 14:36:16'),
(2402, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:36:16'),
(2403, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:36:17'),
(2404, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:36:17'),
(2405, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:36:17'),
(2406, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:36:17'),
(2407, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:36:17'),
(2408, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:36:17'),
(2409, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:36:26'),
(2410, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:36:27'),
(2411, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:36:27'),
(2412, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:01'),
(2413, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:02'),
(2414, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:02'),
(2415, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:37:02'),
(2416, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:37:02'),
(2417, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:37:02'),
(2418, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:37:02'),
(2419, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:07'),
(2420, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:37:07'),
(2421, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:37:07'),
(2422, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:37:07'),
(2423, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:37:07'),
(2424, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:16'),
(2425, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:16'),
(2426, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:16'),
(2427, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:37:16'),
(2428, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:37:16'),
(2429, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:37:16'),
(2430, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:37:16'),
(2431, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:37:20'),
(2432, NULL, NULL, 'GET /api/cases?t=1779287841246', '::1', '2026-05-20 14:37:21'),
(2433, NULL, NULL, 'GET /api/cases?t=1779287841247', '::1', '2026-05-20 14:37:21'),
(2434, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:38:38'),
(2435, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-20 14:38:38'),
(2436, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:39'),
(2437, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 14:38:39'),
(2438, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 14:38:39'),
(2439, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:39'),
(2440, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:41'),
(2441, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-20 14:38:41'),
(2442, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:41'),
(2443, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-20 14:38:41'),
(2444, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:48'),
(2445, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-20 14:38:48'),
(2446, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:48'),
(2447, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-20 14:38:48'),
(2448, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:51'),
(2449, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-20 14:38:51'),
(2450, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 14:38:51'),
(2451, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-20 14:38:51'),
(2452, NULL, NULL, 'GET /api/installments/case/27', '::1', '2026-05-20 14:38:55'),
(2453, NULL, NULL, 'POST /api/installments/case/27/create-plan', '::1', '2026-05-20 14:39:05'),
(2454, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2455, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2456, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2457, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2458, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2459, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2460, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2461, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2462, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2463, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2464, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2465, NULL, 'installments', '[CREATE] Installment', 'DB_TRIGGER', '2026-05-20 14:39:05'),
(2466, NULL, NULL, 'GET /api/installments/case/27', '::1', '2026-05-20 14:39:05'),
(2467, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:39:37'),
(2468, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 14:39:37'),
(2469, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:39:37'),
(2470, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:39:38'),
(2471, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:39:38'),
(2472, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:39:38'),
(2473, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:39:38'),
(2474, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:39:38'),
(2475, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:39:38'),
(2476, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:39:38'),
(2477, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:39:38'),
(2478, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:39:45'),
(2479, NULL, NULL, 'GET /api/cases?t=1779287985738', '::1', '2026-05-20 14:39:45'),
(2480, NULL, NULL, 'GET /api/cases?t=1779287985739', '::1', '2026-05-20 14:39:45'),
(2481, NULL, NULL, 'GET /api/documents/case/27?t=1779287985738', '::1', '2026-05-20 14:39:45'),
(2482, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779287985738', '::1', '2026-05-20 14:39:45'),
(2483, NULL, NULL, 'GET /api/documents/case/27?t=1779287985739', '::1', '2026-05-20 14:39:45'),
(2484, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779287985738', '::1', '2026-05-20 14:39:45'),
(2485, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779287985739', '::1', '2026-05-20 14:39:45'),
(2486, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779287985739', '::1', '2026-05-20 14:39:45'),
(2487, NULL, NULL, 'GET /api/cases?t=1779287988753', '::1', '2026-05-20 14:39:48'),
(2488, NULL, NULL, 'GET /api/documents/case/27?t=1779287988753', '::1', '2026-05-20 14:39:48'),
(2489, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779287988753', '::1', '2026-05-20 14:39:48'),
(2490, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779287988753', '::1', '2026-05-20 14:39:48'),
(2491, NULL, NULL, 'GET /api/cases?t=1779287991743', '::1', '2026-05-20 14:39:51'),
(2492, NULL, NULL, 'GET /api/documents/case/27?t=1779287991743', '::1', '2026-05-20 14:39:51'),
(2493, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779287991743', '::1', '2026-05-20 14:39:51'),
(2494, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779287991743', '::1', '2026-05-20 14:39:51'),
(2495, NULL, NULL, 'GET /api/cases?t=1779287994752', '::1', '2026-05-20 14:39:54'),
(2496, NULL, NULL, 'GET /api/documents/case/27?t=1779287994752', '::1', '2026-05-20 14:39:54'),
(2497, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779287994752', '::1', '2026-05-20 14:39:55'),
(2498, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779287994752', '::1', '2026-05-20 14:39:55'),
(2499, NULL, NULL, 'GET /api/cases?t=1779287997751', '::1', '2026-05-20 14:39:57'),
(2500, NULL, NULL, 'GET /api/documents/case/27?t=1779287997751', '::1', '2026-05-20 14:39:57'),
(2501, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779287997751', '::1', '2026-05-20 14:39:57'),
(2502, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779287997751', '::1', '2026-05-20 14:39:57'),
(2503, NULL, NULL, 'GET /api/cases?t=1779288000754', '::1', '2026-05-20 14:40:00'),
(2504, NULL, NULL, 'GET /api/documents/case/27?t=1779288000754', '::1', '2026-05-20 14:40:00'),
(2505, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288000754', '::1', '2026-05-20 14:40:00'),
(2506, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288000754', '::1', '2026-05-20 14:40:00'),
(2507, NULL, NULL, 'GET /api/cases?t=1779288003744', '::1', '2026-05-20 14:40:03'),
(2508, NULL, NULL, 'GET /api/documents/case/27?t=1779288003744', '::1', '2026-05-20 14:40:03'),
(2509, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288003744', '::1', '2026-05-20 14:40:03'),
(2510, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288003744', '::1', '2026-05-20 14:40:03'),
(2511, NULL, NULL, 'GET /api/cases?t=1779288006755', '::1', '2026-05-20 14:40:06'),
(2512, NULL, NULL, 'GET /api/documents/case/27?t=1779288006755', '::1', '2026-05-20 14:40:06'),
(2513, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288006755', '::1', '2026-05-20 14:40:06'),
(2514, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288006755', '::1', '2026-05-20 14:40:06'),
(2515, NULL, NULL, 'GET /api/cases?t=1779288009748', '::1', '2026-05-20 14:40:09'),
(2516, NULL, NULL, 'GET /api/documents/case/27?t=1779288009748', '::1', '2026-05-20 14:40:09'),
(2517, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288009748', '::1', '2026-05-20 14:40:09'),
(2518, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288009748', '::1', '2026-05-20 14:40:09'),
(2519, NULL, NULL, 'GET /api/cases?t=1779288012751', '::1', '2026-05-20 14:40:12'),
(2520, NULL, NULL, 'GET /api/documents/case/27?t=1779288012751', '::1', '2026-05-20 14:40:12'),
(2521, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288012751', '::1', '2026-05-20 14:40:12'),
(2522, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288012751', '::1', '2026-05-20 14:40:12'),
(2523, NULL, NULL, 'GET /api/cases?t=1779288015756', '::1', '2026-05-20 14:40:15'),
(2524, NULL, NULL, 'GET /api/documents/case/27?t=1779288015756', '::1', '2026-05-20 14:40:15'),
(2525, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288015756', '::1', '2026-05-20 14:40:15'),
(2526, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288015756', '::1', '2026-05-20 14:40:15'),
(2527, NULL, NULL, 'GET /api/cases?t=1779288018745', '::1', '2026-05-20 14:40:18'),
(2528, NULL, NULL, 'GET /api/documents/case/27?t=1779288018745', '::1', '2026-05-20 14:40:18'),
(2529, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288018745', '::1', '2026-05-20 14:40:18'),
(2530, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288018745', '::1', '2026-05-20 14:40:18'),
(2531, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:20');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(2532, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:20'),
(2533, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:20'),
(2534, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:40:20'),
(2535, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:40:20'),
(2536, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:40:20'),
(2537, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:40:20'),
(2538, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:40:20'),
(2539, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:40:20'),
(2540, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:36'),
(2541, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:36'),
(2542, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:36'),
(2543, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:37'),
(2544, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:38'),
(2545, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:38'),
(2546, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:40:38'),
(2547, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:40:38'),
(2548, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:40:38'),
(2549, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:40:38'),
(2550, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:40:38'),
(2551, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:40:38'),
(2552, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:40:58'),
(2553, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:40:59'),
(2554, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:40:59'),
(2555, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:40:59'),
(2556, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:40:59'),
(2557, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:01'),
(2558, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:02'),
(2559, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:02'),
(2560, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:02'),
(2561, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:02'),
(2562, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:02'),
(2563, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:02'),
(2564, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:02'),
(2565, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:02'),
(2566, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:04'),
(2567, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:04'),
(2568, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:04'),
(2569, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:07'),
(2570, NULL, NULL, 'GET /api/cases?t=1779288067388', '::1', '2026-05-20 14:41:07'),
(2571, NULL, NULL, 'GET /api/cases?t=1779288067389', '::1', '2026-05-20 14:41:07'),
(2572, NULL, NULL, 'GET /api/documents/case/27?t=1779288067388', '::1', '2026-05-20 14:41:07'),
(2573, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288067388', '::1', '2026-05-20 14:41:07'),
(2574, NULL, NULL, 'GET /api/documents/case/27?t=1779288067389', '::1', '2026-05-20 14:41:07'),
(2575, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288067388', '::1', '2026-05-20 14:41:07'),
(2576, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288067389', '::1', '2026-05-20 14:41:07'),
(2577, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288067389', '::1', '2026-05-20 14:41:07'),
(2578, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:09'),
(2579, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:10'),
(2580, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:10'),
(2581, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:10'),
(2582, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:11'),
(2583, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:11'),
(2584, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:11'),
(2585, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:11'),
(2586, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:11'),
(2587, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:11'),
(2588, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:11'),
(2589, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:11'),
(2590, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:28'),
(2591, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:28'),
(2592, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:28'),
(2593, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:31'),
(2594, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:32'),
(2595, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:32'),
(2596, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:32'),
(2597, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:32'),
(2598, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:32'),
(2599, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:32'),
(2600, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:32'),
(2601, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:32'),
(2602, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:33'),
(2603, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:34'),
(2604, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:34'),
(2605, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:34'),
(2606, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:34'),
(2607, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:38'),
(2608, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:39'),
(2609, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:39'),
(2610, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:39'),
(2611, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:39'),
(2612, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:39'),
(2613, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:39'),
(2614, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:41:39'),
(2615, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:41:39'),
(2616, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:40'),
(2617, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:40'),
(2618, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:40'),
(2619, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:44'),
(2620, NULL, NULL, 'GET /api/cases?t=1779288104574', '::1', '2026-05-20 14:41:44'),
(2621, NULL, NULL, 'GET /api/cases?t=1779288104575', '::1', '2026-05-20 14:41:44'),
(2622, NULL, NULL, 'GET /api/documents/case/27?t=1779288104574', '::1', '2026-05-20 14:41:44'),
(2623, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288104574', '::1', '2026-05-20 14:41:44'),
(2624, NULL, NULL, 'GET /api/documents/case/27?t=1779288104575', '::1', '2026-05-20 14:41:44'),
(2625, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288104574', '::1', '2026-05-20 14:41:44'),
(2626, NULL, NULL, 'GET /api/court-sessions/case/27?t=1779288104575', '::1', '2026-05-20 14:41:44'),
(2627, NULL, NULL, 'GET /api/court-sessions/decision/27?t=1779288104575', '::1', '2026-05-20 14:41:44'),
(2628, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:41:46'),
(2629, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:47'),
(2630, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:47'),
(2631, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:41:58'),
(2632, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 14:41:58'),
(2633, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:41:58'),
(2634, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:41:58'),
(2635, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:41:58'),
(2636, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:58'),
(2637, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:41:58'),
(2638, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:41:58'),
(2639, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:41:59'),
(2640, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:00'),
(2641, NULL, NULL, 'GET /api/cases?t=1779288121303', '::1', '2026-05-20 14:42:01'),
(2642, NULL, NULL, 'GET /api/cases?t=1779288121303', '::1', '2026-05-20 14:42:01'),
(2643, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:03'),
(2644, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:04'),
(2645, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:04'),
(2646, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:42:04'),
(2647, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:42:04'),
(2648, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:42:04'),
(2649, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:42:04'),
(2650, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:10'),
(2651, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:18'),
(2652, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:18'),
(2653, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:18'),
(2654, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:42:18'),
(2655, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:42:18'),
(2656, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:42:18'),
(2657, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:42:18'),
(2658, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:42:19'),
(2659, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:03'),
(2660, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:03'),
(2661, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:03'),
(2662, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:03'),
(2663, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:04'),
(2664, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:04'),
(2665, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:04'),
(2666, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:06'),
(2667, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:29'),
(2668, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:29'),
(2669, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:29'),
(2670, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:29'),
(2671, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:29'),
(2672, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:29'),
(2673, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:29'),
(2674, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:33'),
(2675, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:34'),
(2676, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:34'),
(2677, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:34'),
(2678, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:34'),
(2679, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:37'),
(2680, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:38'),
(2681, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:38'),
(2682, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:38'),
(2683, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:43:38'),
(2684, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:38'),
(2685, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:43:38'),
(2686, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:43:52'),
(2687, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:43:53'),
(2688, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:43:53'),
(2689, NULL, NULL, 'PUT /api/court-sessions/update-result', '::1', '2026-05-20 14:44:06'),
(2690, NULL, 'court_sessions', '[UPDATE] Court Session', 'DB_TRIGGER', '2026-05-20 14:44:06'),
(2691, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-20 14:44:06'),
(2692, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:44:23'),
(2693, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:44:23'),
(2694, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 14:44:23'),
(2695, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:44:23'),
(2696, NULL, NULL, 'POST /api/court-sessions/ongoing-cases', '::1', '2026-05-20 14:44:23'),
(2697, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:58:11'),
(2698, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:58:12'),
(2699, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 14:58:12'),
(2700, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:12'),
(2701, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:12'),
(2702, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:58:12'),
(2703, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 14:58:12'),
(2704, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 14:58:20'),
(2705, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 14:58:20'),
(2706, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:20'),
(2707, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:21'),
(2708, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:21'),
(2709, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:21'),
(2710, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:21'),
(2711, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:25'),
(2712, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:25'),
(2713, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:58:25'),
(2714, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:25'),
(2715, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:25'),
(2716, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:25'),
(2717, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:25'),
(2718, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:28'),
(2719, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:28'),
(2720, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 14:58:29'),
(2721, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:29'),
(2722, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:29'),
(2723, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:29'),
(2724, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:29'),
(2725, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:58:29'),
(2726, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 14:58:29'),
(2727, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:58:29'),
(2728, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 14:58:29'),
(2729, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 14:58:33'),
(2730, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:34'),
(2731, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 14:58:34'),
(2732, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 15:00:49'),
(2733, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-20 15:00:49'),
(2734, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:00:50'),
(2735, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 15:00:50'),
(2736, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:00:50'),
(2737, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 15:00:50'),
(2738, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:02:07'),
(2739, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:02:07'),
(2740, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-20 15:02:07'),
(2741, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-20 15:02:07'),
(2742, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:02:10'),
(2743, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 15:02:10'),
(2744, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:02:10'),
(2745, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 15:02:10'),
(2746, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-20 15:02:34'),
(2747, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:02:34'),
(2748, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:02:34'),
(2749, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-20 15:02:34'),
(2750, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-20 15:03:23'),
(2751, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:03:23'),
(2752, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:03:23'),
(2753, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-20 15:03:24'),
(2754, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:07:27'),
(2755, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-20 15:07:27'),
(2756, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:07:27'),
(2757, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-20 15:07:27'),
(2758, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:07:57'),
(2759, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-20 15:07:57'),
(2760, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:07:57'),
(2761, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-20 15:07:57'),
(2762, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-20 15:07:57'),
(2763, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:10:11'),
(2764, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-20 15:10:11'),
(2765, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:10:11'),
(2766, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-20 15:10:11'),
(2767, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:10:14'),
(2768, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-20 15:10:14'),
(2769, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:10:14'),
(2770, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-20 15:10:14'),
(2771, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:11:03'),
(2772, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-20 15:11:03'),
(2773, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:11:03'),
(2774, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-20 15:11:03'),
(2775, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-20 15:11:59'),
(2776, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:12:00'),
(2777, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 15:12:00'),
(2778, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:12:00'),
(2779, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 15:12:00'),
(2780, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:12:04'),
(2781, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:12:04'),
(2782, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-20 15:13:13'),
(2783, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:13:15'),
(2784, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-20 15:13:15'),
(2785, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:13:15'),
(2786, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-20 15:13:15'),
(2787, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:13:17'),
(2788, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-20 15:13:17'),
(2789, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:13:17'),
(2790, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-20 15:13:17'),
(2791, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:15:22'),
(2792, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-20 15:15:22'),
(2793, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:15:22'),
(2794, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-20 15:15:22'),
(2795, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:16:09'),
(2796, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-20 15:16:09'),
(2797, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 15:16:09'),
(2798, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-20 15:16:09'),
(2799, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-20 15:56:28'),
(2800, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-20 18:28:45'),
(2801, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 18:28:45'),
(2802, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-20 18:28:45'),
(2803, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 18:28:45'),
(2804, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-20 18:28:45'),
(2805, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:47:22'),
(2806, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:47:25'),
(2807, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:13'),
(2808, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:15'),
(2809, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:16'),
(2810, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:16'),
(2811, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:23'),
(2812, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:24'),
(2813, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:25'),
(2814, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:25'),
(2815, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:48:25'),
(2816, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:49:11'),
(2817, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:49:12'),
(2818, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:49:16'),
(2819, NULL, NULL, 'OPTIONS /api/auth/login', '::1', '2026-05-20 21:49:17'),
(2820, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 21:49:37'),
(2821, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-20 21:49:37'),
(2822, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 21:49:37'),
(2823, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 21:49:37'),
(2824, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 21:49:37'),
(2825, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 21:49:37'),
(2826, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-20 21:49:39'),
(2827, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-20 21:49:39'),
(2828, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 21:49:43'),
(2829, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-20 21:49:43'),
(2830, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 21:49:44'),
(2831, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 21:49:44'),
(2832, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-20 21:49:44'),
(2833, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-20 21:49:44'),
(2834, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-20 21:49:45'),
(2835, NULL, NULL, 'GET /api/users/profile/12', '::1', '2026-05-20 21:49:45'),
(2836, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 21:49:51'),
(2837, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 21:49:51'),
(2838, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:49:51'),
(2839, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:49:52'),
(2840, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:49:52'),
(2841, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 21:49:52'),
(2842, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 21:49:52'),
(2843, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 21:49:52'),
(2844, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 21:49:52'),
(2845, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 21:49:52'),
(2846, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 21:49:52'),
(2847, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:51:21'),
(2848, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:51:21'),
(2849, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 21:51:21'),
(2850, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:51:21'),
(2851, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 21:51:21'),
(2852, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 21:51:21'),
(2853, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 21:51:21'),
(2854, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 21:51:22'),
(2855, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 21:51:22'),
(2856, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 21:51:22'),
(2857, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 21:51:22'),
(2858, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 21:51:32'),
(2859, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 21:51:32'),
(2860, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 21:51:33'),
(2861, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 21:51:33'),
(2862, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 21:51:33'),
(2863, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 21:51:33'),
(2864, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 21:51:33'),
(2865, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 21:51:33'),
(2866, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 21:51:33'),
(2867, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:48'),
(2868, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:49'),
(2869, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:50'),
(2870, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:50'),
(2871, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:15:50'),
(2872, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:15:50'),
(2873, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:15:50'),
(2874, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:15:50'),
(2875, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:51'),
(2876, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:52'),
(2877, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:52'),
(2878, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:15:52'),
(2879, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:15:52'),
(2880, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:15:52'),
(2881, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:15:52'),
(2882, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:15:52'),
(2883, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:33'),
(2884, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:35'),
(2885, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:35'),
(2886, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:35'),
(2887, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:35'),
(2888, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:35'),
(2889, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:35'),
(2890, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:35'),
(2891, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:37'),
(2892, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:38'),
(2893, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:38'),
(2894, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:38'),
(2895, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:38'),
(2896, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:38'),
(2897, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:38'),
(2898, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:39'),
(2899, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:40'),
(2900, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:40'),
(2901, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:40'),
(2902, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:40'),
(2903, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:40'),
(2904, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:40'),
(2905, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:40'),
(2906, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:41'),
(2907, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:50'),
(2908, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:50'),
(2909, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:17:50'),
(2910, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:50'),
(2911, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:50'),
(2912, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:50'),
(2913, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:17:50'),
(2914, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:17:59'),
(2915, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 22:17:59'),
(2916, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:17:59'),
(2917, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:17:59'),
(2918, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:17:59'),
(2919, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:59'),
(2920, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:17:59'),
(2921, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:17:59'),
(2922, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:17:59'),
(2923, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:17:59'),
(2924, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:17:59'),
(2925, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:01'),
(2926, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 22:18:02'),
(2927, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 22:18:02'),
(2928, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-20 22:18:02'),
(2929, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-20 22:18:02'),
(2930, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:02'),
(2931, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:04'),
(2932, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:04'),
(2933, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:04'),
(2934, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:18:04'),
(2935, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:18:04'),
(2936, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:18:04'),
(2937, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:18:04'),
(2938, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:18:04'),
(2939, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:18:04'),
(2940, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:12'),
(2941, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 22:18:13'),
(2942, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 22:18:13'),
(2943, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-20 22:18:13'),
(2944, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-20 22:18:13'),
(2945, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:18:13'),
(2946, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:21:34'),
(2947, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 22:21:34'),
(2948, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:21:34'),
(2949, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:21:34'),
(2950, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:21:34'),
(2951, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:21:34'),
(2952, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:21:34'),
(2953, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:21:34'),
(2954, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:21:34'),
(2955, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:21:34'),
(2956, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:21:34'),
(2957, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:21:41'),
(2958, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 22:24:23'),
(2959, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-20 22:24:23'),
(2960, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-20 22:24:23'),
(2961, NULL, NULL, 'GET /api/users/search?term=', '::1', '2026-05-20 22:24:23'),
(2962, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:24:33'),
(2963, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 22:24:33'),
(2964, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:24:33'),
(2965, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:24:34'),
(2966, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:24:34'),
(2967, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:24:34'),
(2968, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:24:34'),
(2969, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:24:34'),
(2970, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:24:34'),
(2971, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:24:34'),
(2972, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:24:34'),
(2973, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:24:35'),
(2974, NULL, NULL, 'PUT /api/notifications/mark-read/6a0a2dee8bd9f879dfd3418a', '::1', '2026-05-20 22:25:00'),
(2975, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:25:08'),
(2976, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 22:25:08'),
(2977, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:09'),
(2978, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:09'),
(2979, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:09'),
(2980, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:25:09'),
(2981, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:25:09'),
(2982, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:25:09'),
(2983, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:25:09'),
(2984, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:10'),
(2985, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:12'),
(2986, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:12'),
(2987, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:12'),
(2988, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:25:12'),
(2989, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:25:12'),
(2990, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:25:12'),
(2991, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:25:12'),
(2992, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:29'),
(2993, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:31'),
(2994, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:31'),
(2995, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:25:31'),
(2996, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:25:31'),
(2997, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:25:31'),
(2998, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:25:31'),
(2999, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:25:31'),
(3000, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:27:49'),
(3001, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 22:27:49'),
(3002, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:27:49'),
(3003, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:27:50'),
(3004, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:27:50'),
(3005, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:27:50'),
(3006, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:27:50'),
(3007, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:27:50'),
(3008, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:27:50'),
(3009, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:27:50'),
(3010, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:27:50'),
(3011, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:28:52'),
(3012, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:28:52'),
(3013, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:28:52'),
(3014, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:28:52'),
(3015, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:28:58'),
(3016, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:28:58'),
(3017, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:28:58'),
(3018, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:28:58'),
(3019, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:29:17'),
(3020, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:29:17'),
(3021, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:29:17'),
(3022, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:29:17'),
(3023, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:29:22'),
(3024, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:29:22'),
(3025, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 22:29:22'),
(3026, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:29:22'),
(3027, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:29:22'),
(3028, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:29:22'),
(3029, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:29:22'),
(3030, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:29:22'),
(3031, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:29:22'),
(3032, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:29:22'),
(3033, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:29:22'),
(3034, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:29:29'),
(3035, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:29:29'),
(3036, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:29:29'),
(3037, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:29:29'),
(3038, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:30:34'),
(3039, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:30:34'),
(3040, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:30:34'),
(3041, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:30:37'),
(3042, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:30:37'),
(3043, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:30:37'),
(3044, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:30:37'),
(3045, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:30:37'),
(3046, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:30:37'),
(3047, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:30:37'),
(3048, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:30:37'),
(3049, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:30:37'),
(3050, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:33:47'),
(3051, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:33:47'),
(3052, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:33:47'),
(3053, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:33:47'),
(3054, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:35:21'),
(3055, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:35:21'),
(3056, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:35:21'),
(3057, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:35:29'),
(3058, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:35:29'),
(3059, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:35:29'),
(3060, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:35:29'),
(3061, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:37:29'),
(3062, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:37:29'),
(3063, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:37:29'),
(3064, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:37:29'),
(3065, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:37:44'),
(3066, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:37:44'),
(3067, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:37:44'),
(3068, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:37:44'),
(3069, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:37:46'),
(3070, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:37:46'),
(3071, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 22:37:46'),
(3072, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:37:46'),
(3073, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:37:46'),
(3074, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:37:46'),
(3075, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:37:46'),
(3076, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:37:46'),
(3077, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:37:46'),
(3078, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:37:46'),
(3079, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:37:46'),
(3080, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:38:54'),
(3081, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:38:54'),
(3082, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:38:54'),
(3083, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:38:57'),
(3084, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:38:58'),
(3085, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:38:58'),
(3086, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:38:58'),
(3087, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:38:58'),
(3088, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:38:58'),
(3089, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:38:58'),
(3090, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:38:58'),
(3091, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:38:58'),
(3092, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:39:00'),
(3093, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:39:01'),
(3094, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:39:01'),
(3095, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:39:01'),
(3096, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:39:01'),
(3097, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:39:03'),
(3098, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:39:04'),
(3099, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:39:04'),
(3100, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:39:04'),
(3101, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:39:04'),
(3102, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:39:04'),
(3103, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:39:04'),
(3104, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:39:04'),
(3105, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:39:04'),
(3106, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:41:44'),
(3107, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:41:45'),
(3108, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:41:45'),
(3109, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:41:47'),
(3110, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:41:47'),
(3111, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:41:47'),
(3112, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:41:47'),
(3113, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:41:47'),
(3114, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:41:47'),
(3115, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:41:47'),
(3116, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:41:47'),
(3117, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:41:48'),
(3118, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:41:49'),
(3119, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:41:50'),
(3120, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:41:50'),
(3121, NULL, NULL, 'GET /api/chat/room_2_14/messages', '::1', '2026-05-20 22:41:52'),
(3122, NULL, NULL, 'GET /api/chat/room_8_14/messages', '::1', '2026-05-20 22:41:53'),
(3123, NULL, NULL, 'GET /api/chat/room_9_14/messages', '::1', '2026-05-20 22:41:54'),
(3124, NULL, NULL, 'GET /api/chat/room_2_14/messages', '::1', '2026-05-20 22:41:55'),
(3125, NULL, NULL, 'GET /api/chat/room_11_14/messages', '::1', '2026-05-20 22:41:56'),
(3126, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:01'),
(3127, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:01'),
(3128, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:01'),
(3129, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:42:01'),
(3130, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:42:01'),
(3131, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:42:01'),
(3132, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:42:01'),
(3133, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:42:01'),
(3134, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:42:02'),
(3135, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:08'),
(3136, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:09'),
(3137, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:09'),
(3138, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:12'),
(3139, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:13'),
(3140, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:13'),
(3141, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:15'),
(3142, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:15'),
(3143, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:15'),
(3144, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:16'),
(3145, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:16'),
(3146, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:42:16'),
(3147, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:42:16'),
(3148, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:42:16'),
(3149, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:42:17'),
(3150, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:42:17'),
(3151, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:42:17'),
(3152, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:42:17'),
(3153, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:43:44'),
(3154, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:43:45'),
(3155, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:43:45'),
(3156, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:43:54'),
(3157, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 22:43:54'),
(3158, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:43:54'),
(3159, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:43:54'),
(3160, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:43:54'),
(3161, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:43:54');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(3162, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:43:54'),
(3163, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:43:55'),
(3164, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:43:55'),
(3165, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:15'),
(3166, NULL, NULL, 'GET /api/cases?t=1779317056637', '::1', '2026-05-20 22:44:16'),
(3167, NULL, NULL, 'GET /api/cases?t=1779317056638', '::1', '2026-05-20 22:44:16'),
(3168, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:19'),
(3169, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:20'),
(3170, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:20'),
(3171, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:44:20'),
(3172, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:44:20'),
(3173, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:44:20'),
(3174, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:44:20'),
(3175, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:21'),
(3176, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:24'),
(3177, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:24'),
(3178, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:44:24'),
(3179, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:44:24'),
(3180, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:44:24'),
(3181, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:44:24'),
(3182, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:44:24'),
(3183, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:45:43'),
(3184, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:45:43'),
(3185, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:45:43'),
(3186, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:45:45'),
(3187, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:45:45'),
(3188, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:45:45'),
(3189, NULL, NULL, 'PUT /api/notifications/mark-read/6a071a7797dae290cd7304a3', '::1', '2026-05-20 22:46:35'),
(3190, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:38'),
(3191, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:38'),
(3192, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:38'),
(3193, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:46:38'),
(3194, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:46:38'),
(3195, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:46:38'),
(3196, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:46:38'),
(3197, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:41'),
(3198, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 22:46:44'),
(3199, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:53'),
(3200, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:53'),
(3201, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:53'),
(3202, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:46:53'),
(3203, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:46:53'),
(3204, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:46:53'),
(3205, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:46:53'),
(3206, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:46:57'),
(3207, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:47:01'),
(3208, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:47:01'),
(3209, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:47:01'),
(3210, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:47:01'),
(3211, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:47:01'),
(3212, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:47:01'),
(3213, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:47:01'),
(3214, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:48:11'),
(3215, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-20 22:48:11'),
(3216, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:48:12'),
(3217, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:48:12'),
(3218, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:48:12'),
(3219, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:48:12'),
(3220, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:48:12'),
(3221, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:48:12'),
(3222, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:48:12'),
(3223, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:48:12'),
(3224, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:48:12'),
(3225, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:32'),
(3226, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:34'),
(3227, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:34'),
(3228, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:34'),
(3229, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:53:34'),
(3230, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:53:34'),
(3231, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:53:34'),
(3232, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:53:34'),
(3233, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:53:34'),
(3234, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:53:34'),
(3235, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:36'),
(3236, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:37'),
(3237, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:38'),
(3238, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:53:38'),
(3239, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:53:38'),
(3240, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:53:38'),
(3241, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:53:38'),
(3242, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:53:38'),
(3243, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:53:38'),
(3244, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:53:38'),
(3245, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:54:07'),
(3246, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:54:07'),
(3247, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-20 22:54:07'),
(3248, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:54:07'),
(3249, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-20 22:54:07'),
(3250, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:54:07'),
(3251, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:54:07'),
(3252, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:54:07'),
(3253, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:54:07'),
(3254, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-20 22:54:07'),
(3255, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-20 22:54:07'),
(3256, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:54:25'),
(3257, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 22:54:25'),
(3258, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:54:25'),
(3259, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:54:26'),
(3260, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:54:26'),
(3261, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:54:26'),
(3262, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:54:26'),
(3263, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:54:26'),
(3264, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:54:26'),
(3265, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:25'),
(3266, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:25'),
(3267, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 22:59:25'),
(3268, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:25'),
(3269, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:25'),
(3270, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:59:25'),
(3271, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:59:25'),
(3272, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:59:26'),
(3273, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:59:26'),
(3274, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-20 22:59:34'),
(3275, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-20 22:59:34'),
(3276, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:34'),
(3277, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:34'),
(3278, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 22:59:34'),
(3279, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:59:34'),
(3280, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 22:59:34'),
(3281, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:59:34'),
(3282, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 22:59:34'),
(3283, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:10'),
(3284, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:10'),
(3285, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:04:10'),
(3286, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:11'),
(3287, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:11'),
(3288, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:04:11'),
(3289, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:04:11'),
(3290, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:04:11'),
(3291, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:04:11'),
(3292, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:58'),
(3293, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:58'),
(3294, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:04:58'),
(3295, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:59'),
(3296, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:04:59'),
(3297, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:04:59'),
(3298, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:04:59'),
(3299, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:04:59'),
(3300, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:04:59'),
(3301, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:09'),
(3302, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:09'),
(3303, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:05:10'),
(3304, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:10'),
(3305, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:10'),
(3306, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:05:10'),
(3307, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:05:10'),
(3308, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:05:10'),
(3309, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:05:10'),
(3310, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:27'),
(3311, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:27'),
(3312, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:05:27'),
(3313, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:27'),
(3314, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:27'),
(3315, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:05:27'),
(3316, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:05:27'),
(3317, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:05:27'),
(3318, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:05:27'),
(3319, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:52'),
(3320, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:52'),
(3321, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:05:52'),
(3322, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:53'),
(3323, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:05:53'),
(3324, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:05:53'),
(3325, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:05:53'),
(3326, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:05:53'),
(3327, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:05:53'),
(3328, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:06'),
(3329, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:06'),
(3330, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:06:06'),
(3331, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:07'),
(3332, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:07'),
(3333, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:06:07'),
(3334, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:06:07'),
(3335, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:06:07'),
(3336, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:06:07'),
(3337, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:14'),
(3338, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:14'),
(3339, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:06:14'),
(3340, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:14'),
(3341, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:14'),
(3342, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:06:14'),
(3343, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:06:14'),
(3344, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:06:14'),
(3345, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:06:14'),
(3346, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:45'),
(3347, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:45'),
(3348, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:06:45'),
(3349, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:46'),
(3350, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:06:46'),
(3351, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:06:46'),
(3352, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:06:46'),
(3353, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:06:46'),
(3354, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:06:46'),
(3355, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:07:50'),
(3356, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:07:50'),
(3357, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:07:50'),
(3358, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:07:51'),
(3359, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:07:51'),
(3360, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:07:51'),
(3361, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:07:51'),
(3362, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:07:51'),
(3363, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:07:51'),
(3364, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:12'),
(3365, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:12'),
(3366, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:08:12'),
(3367, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:13'),
(3368, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:13'),
(3369, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:14'),
(3370, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:14'),
(3371, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:08:14'),
(3372, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:14'),
(3373, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:14'),
(3374, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:14'),
(3375, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:14'),
(3376, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:14'),
(3377, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:14'),
(3378, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:17'),
(3379, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:17'),
(3380, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:08:18'),
(3381, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:18'),
(3382, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:18'),
(3383, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:18'),
(3384, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:18'),
(3385, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:18'),
(3386, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:18'),
(3387, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:41'),
(3388, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:41'),
(3389, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:08:41'),
(3390, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:41'),
(3391, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:41'),
(3392, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:41'),
(3393, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:41'),
(3394, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:41'),
(3395, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:41'),
(3396, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:46'),
(3397, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:46'),
(3398, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:08:46'),
(3399, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:46'),
(3400, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:08:46'),
(3401, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:46'),
(3402, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:08:47'),
(3403, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:47'),
(3404, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:08:47'),
(3405, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:25'),
(3406, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:25'),
(3407, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:10:25'),
(3408, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:26'),
(3409, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:26'),
(3410, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:10:26'),
(3411, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:10:26'),
(3412, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:10:26'),
(3413, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:10:26'),
(3414, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:37'),
(3415, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:37'),
(3416, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:10:37'),
(3417, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:38'),
(3418, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:10:38'),
(3419, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:10:38'),
(3420, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:10:38'),
(3421, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:10:38'),
(3422, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:10:38'),
(3423, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:23'),
(3424, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:23'),
(3425, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:11:23'),
(3426, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:24'),
(3427, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:24'),
(3428, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:11:24'),
(3429, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:11:24'),
(3430, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:11:24'),
(3431, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:11:24'),
(3432, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:28'),
(3433, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:28'),
(3434, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:11:28'),
(3435, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:28'),
(3436, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:11:28'),
(3437, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:11:28'),
(3438, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:11:28'),
(3439, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:11:28'),
(3440, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:11:28'),
(3441, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:13:47'),
(3442, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:13:48'),
(3443, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:13:48'),
(3444, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:13:48'),
(3445, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:13:48'),
(3446, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:13:48'),
(3447, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:13:48'),
(3448, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:13:48'),
(3449, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:13:48'),
(3450, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:00'),
(3451, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:00'),
(3452, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:14:01'),
(3453, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:01'),
(3454, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:01'),
(3455, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:01'),
(3456, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:01'),
(3457, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:01'),
(3458, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:01'),
(3459, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:05'),
(3460, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:05'),
(3461, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:14:05'),
(3462, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:05'),
(3463, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:05'),
(3464, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:05'),
(3465, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:05'),
(3466, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:05'),
(3467, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:05'),
(3468, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:06'),
(3469, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:06'),
(3470, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:14:07'),
(3471, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:07'),
(3472, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:07'),
(3473, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:07'),
(3474, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:07'),
(3475, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:07'),
(3476, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:07'),
(3477, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:28'),
(3478, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:28'),
(3479, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:14:28'),
(3480, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:28'),
(3481, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:28'),
(3482, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:28'),
(3483, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:28'),
(3484, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:28'),
(3485, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:28'),
(3486, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:53'),
(3487, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:53'),
(3488, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:14:54'),
(3489, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:54'),
(3490, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:14:54'),
(3491, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:54'),
(3492, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:14:54'),
(3493, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:54'),
(3494, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:14:54'),
(3495, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:18'),
(3496, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:18'),
(3497, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:15:18'),
(3498, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:19'),
(3499, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:19'),
(3500, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:19'),
(3501, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:19'),
(3502, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:19'),
(3503, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:19'),
(3504, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:23'),
(3505, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:23'),
(3506, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:15:24'),
(3507, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:24'),
(3508, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:24'),
(3509, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:24'),
(3510, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:24'),
(3511, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:24'),
(3512, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:24'),
(3513, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:27'),
(3514, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:27'),
(3515, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:15:27'),
(3516, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:28'),
(3517, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:28'),
(3518, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:28'),
(3519, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:28'),
(3520, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:28'),
(3521, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:28'),
(3522, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:32'),
(3523, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:32'),
(3524, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:15:32'),
(3525, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:32'),
(3526, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:32'),
(3527, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:32'),
(3528, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:32'),
(3529, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:32'),
(3530, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:32'),
(3531, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:33'),
(3532, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:33'),
(3533, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:15:33'),
(3534, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:33'),
(3535, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:33'),
(3536, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:33'),
(3537, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:33'),
(3538, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:33'),
(3539, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:33'),
(3540, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:50'),
(3541, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:50'),
(3542, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-20 23:15:50'),
(3543, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:51'),
(3544, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-20 23:15:51'),
(3545, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:51'),
(3546, NULL, NULL, 'GET /api/cases', '::1', '2026-05-20 23:15:51'),
(3547, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:51'),
(3548, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-20 23:15:51'),
(3549, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:41'),
(3550, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:41'),
(3551, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:10:41'),
(3552, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:41'),
(3553, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:41'),
(3554, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:10:41'),
(3555, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:10:41'),
(3556, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:10:41'),
(3557, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:10:41'),
(3558, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:49'),
(3559, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:50'),
(3560, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:51'),
(3561, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:10:51'),
(3562, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:10:51'),
(3563, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:10:51'),
(3564, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:10:51'),
(3565, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:10:51'),
(3566, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:11:03'),
(3567, NULL, NULL, 'GET /api/cases?t=1779351064555', '::1', '2026-05-21 08:11:04'),
(3568, NULL, NULL, 'GET /api/cases?t=1779351064556', '::1', '2026-05-21 08:11:04'),
(3569, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:11:09'),
(3570, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:11:09'),
(3571, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:11:09'),
(3572, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:11:09'),
(3573, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:11:09'),
(3574, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:11:09'),
(3575, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:11:09'),
(3576, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:09'),
(3577, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:09'),
(3578, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:12:09'),
(3579, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:10'),
(3580, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:10'),
(3581, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:10'),
(3582, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:10'),
(3583, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:10'),
(3584, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:10'),
(3585, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:16'),
(3586, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:16'),
(3587, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:12:17'),
(3588, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:17'),
(3589, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:17'),
(3590, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:17'),
(3591, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:17'),
(3592, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:17'),
(3593, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:17'),
(3594, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:21'),
(3595, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:21'),
(3596, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:12:21'),
(3597, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:22'),
(3598, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:22'),
(3599, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:22'),
(3600, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:22'),
(3601, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:22'),
(3602, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:22'),
(3603, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:31'),
(3604, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:31'),
(3605, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:12:31'),
(3606, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:32'),
(3607, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:12:32'),
(3608, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:32'),
(3609, NULL, NULL, 'GET /api/cases', '::1', '2026-05-21 08:12:32'),
(3610, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:32'),
(3611, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-21 08:12:32'),
(3612, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:17'),
(3613, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:17'),
(3614, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:28:17'),
(3615, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:40'),
(3616, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:40'),
(3617, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:28:40'),
(3618, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:42'),
(3619, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:51'),
(3620, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:28:51'),
(3621, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:28:51'),
(3622, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:31:42'),
(3623, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 08:31:42'),
(3624, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 08:31:43'),
(3625, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 11:18:00'),
(3626, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-21 11:18:01'),
(3627, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-21 11:18:01'),
(3628, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 10:28:40'),
(3629, 12, NULL, 'LOGIN_SUCCESS user_id=12 user_name=محمود المدير العام', NULL, '2026-05-25 10:28:40'),
(3630, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:28:41'),
(3631, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 10:28:41'),
(3632, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:28:41'),
(3633, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 10:28:41'),
(3634, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:28:45'),
(3635, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:28:45'),
(3636, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 10:28:45'),
(3637, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 10:28:45'),
(3638, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 10:29:18'),
(3639, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:29:18'),
(3640, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 10:29:18'),
(3641, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:29:18'),
(3642, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 10:29:18'),
(3643, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 10:29:20'),
(3644, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 10:29:40'),
(3645, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:32:25'),
(3646, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 10:32:25'),
(3647, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:32:25'),
(3648, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 10:32:25'),
(3649, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:32:29'),
(3650, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-25 10:32:29'),
(3651, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:32:29'),
(3652, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-25 10:32:29'),
(3653, NULL, NULL, 'POST /api/admin/lawyers/approve', '::1', '2026-05-25 10:32:32'),
(3654, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 10:32:32'),
(3655, NULL, NULL, 'POST /api/admin/lawyers/approve', '::1', '2026-05-25 10:32:33'),
(3656, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 10:32:33'),
(3657, NULL, NULL, 'POST /api/admin/lawyers/approve', '::1', '2026-05-25 10:32:34'),
(3658, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 10:32:34'),
(3659, NULL, NULL, 'POST /api/admin/lawyers/approve', '::1', '2026-05-25 10:32:35'),
(3660, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 10:32:35'),
(3661, NULL, NULL, 'POST /api/admin/lawyers/approve', '::1', '2026-05-25 10:32:36'),
(3662, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 10:32:36'),
(3663, NULL, NULL, 'POST /api/admin/lawyers/approve', '::1', '2026-05-25 10:32:36'),
(3664, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 10:32:36'),
(3665, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 10:32:40'),
(3666, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:32:40'),
(3667, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 10:32:40'),
(3668, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 10:32:40'),
(3669, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 10:39:10'),
(3670, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-25 10:39:10'),
(3671, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:39:10'),
(3672, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:39:10'),
(3673, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:39:10'),
(3674, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:39:10'),
(3675, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:39:10'),
(3676, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:39:10'),
(3677, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:39:10'),
(3678, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:39:10'),
(3679, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:39:10'),
(3680, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:39:13'),
(3681, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-25 10:39:13'),
(3682, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-25 10:39:13'),
(3683, NULL, NULL, 'POST /api/cases', '::1', '2026-05-25 10:40:46'),
(3684, NULL, 'cases', '[CREATE] Legal Case', 'DB_TRIGGER', '2026-05-25 10:40:46'),
(3685, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:40:48'),
(3686, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:40:48'),
(3687, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:40:48'),
(3688, NULL, NULL, 'POST /api/cases/send-offer', '::1', '2026-05-25 10:40:53'),
(3689, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-25 10:40:53'),
(3690, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:40:54'),
(3691, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:40:54'),
(3692, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:40:54'),
(3693, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:40:54'),
(3694, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:40:54'),
(3695, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:40:54'),
(3696, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:40:54'),
(3697, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:40:54'),
(3698, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:40:54'),
(3699, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 10:41:14'),
(3700, 11, NULL, 'LOGIN_SUCCESS user_id=11 user_name=يوسف علي', NULL, '2026-05-25 10:41:14'),
(3701, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 10:41:14'),
(3702, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 10:41:15'),
(3703, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 10:41:15'),
(3704, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:41:15'),
(3705, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:41:15'),
(3706, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 10:41:15'),
(3707, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 10:41:15'),
(3708, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 10:41:21'),
(3709, NULL, NULL, 'GET /api/cases?t=1779705681912', '::1', '2026-05-25 10:41:21'),
(3710, NULL, NULL, 'GET /api/cases?t=1779705681911', '::1', '2026-05-25 10:41:21'),
(3711, NULL, NULL, 'PUT /api/cases/lawyer-respond', '::1', '2026-05-25 10:41:35'),
(3712, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-25 10:41:35'),
(3713, NULL, NULL, 'GET /api/cases?t=1779705695575', '::1', '2026-05-25 10:41:35'),
(3714, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 10:41:47'),
(3715, 14, NULL, 'LOGIN_SUCCESS user_id=14 user_name=محمد خالد مصطفي', NULL, '2026-05-25 10:41:47'),
(3716, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:41:47'),
(3717, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:41:47'),
(3718, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:41:47'),
(3719, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:41:47'),
(3720, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:41:47'),
(3721, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:41:47'),
(3722, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:41:47'),
(3723, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:41:47'),
(3724, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:41:47'),
(3725, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:41:58'),
(3726, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:41:58'),
(3727, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:41:58'),
(3728, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:42:01'),
(3729, NULL, NULL, 'GET /api/cases?t=1779705721964', '::1', '2026-05-25 10:42:01'),
(3730, NULL, NULL, 'GET /api/cases?t=1779705721965', '::1', '2026-05-25 10:42:01'),
(3731, NULL, NULL, 'GET /api/documents/case/28?t=1779705721964', '::1', '2026-05-25 10:42:02'),
(3732, NULL, NULL, 'GET /api/court-sessions/case/28?t=1779705721964', '::1', '2026-05-25 10:42:02'),
(3733, NULL, NULL, 'GET /api/documents/case/28?t=1779705721965', '::1', '2026-05-25 10:42:02'),
(3734, NULL, NULL, 'GET /api/court-sessions/decision/28?t=1779705721964', '::1', '2026-05-25 10:42:02'),
(3735, NULL, NULL, 'GET /api/court-sessions/case/28?t=1779705721965', '::1', '2026-05-25 10:42:02'),
(3736, NULL, NULL, 'GET /api/court-sessions/decision/28?t=1779705721965', '::1', '2026-05-25 10:42:02'),
(3737, NULL, NULL, 'GET /api/cases?t=1779705724973', '::1', '2026-05-25 10:42:04'),
(3738, NULL, NULL, 'GET /api/documents/case/28?t=1779705724973', '::1', '2026-05-25 10:42:05'),
(3739, NULL, NULL, 'GET /api/court-sessions/case/28?t=1779705724973', '::1', '2026-05-25 10:42:05'),
(3740, NULL, NULL, 'GET /api/court-sessions/decision/28?t=1779705724973', '::1', '2026-05-25 10:42:05'),
(3741, NULL, NULL, 'PUT /api/cases/client-respond', '::1', '2026-05-25 10:42:05'),
(3742, NULL, 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER', '2026-05-25 10:42:05'),
(3743, NULL, NULL, 'GET /api/cases?t=1779705727975', '::1', '2026-05-25 10:42:07'),
(3744, NULL, NULL, 'GET /api/documents/case/28?t=1779705727975', '::1', '2026-05-25 10:42:08'),
(3745, NULL, NULL, 'GET /api/court-sessions/case/28?t=1779705727975', '::1', '2026-05-25 10:42:08'),
(3746, NULL, NULL, 'GET /api/court-sessions/decision/28?t=1779705727975', '::1', '2026-05-25 10:42:08'),
(3747, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:42:08'),
(3748, NULL, NULL, 'GET /api/cases?t=1779705728998', '::1', '2026-05-25 10:42:09'),
(3749, NULL, NULL, 'GET /api/cases?t=1779705728998', '::1', '2026-05-25 10:42:09'),
(3750, NULL, NULL, 'GET /api/installments/case/28', '::1', '2026-05-25 10:42:09'),
(3751, NULL, NULL, 'GET /api/installments/case/28', '::1', '2026-05-25 10:42:09'),
(3752, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:55:58'),
(3753, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:55:58'),
(3754, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:55:58'),
(3755, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:55:58'),
(3756, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:55:58'),
(3757, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:55:58'),
(3758, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:55:59'),
(3759, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:55:59'),
(3760, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:55:59'),
(3761, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:56:02'),
(3762, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:56:03'),
(3763, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:56:03'),
(3764, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:56:08'),
(3765, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:56:09'),
(3766, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 10:56:09'),
(3767, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:56:09'),
(3768, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 10:56:09'),
(3769, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:56:09'),
(3770, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:56:09'),
(3771, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 10:56:09'),
(3772, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 10:56:09'),
(3773, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 12:07:53'),
(3774, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 12:07:53'),
(3775, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:07:53');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(3776, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 12:07:53'),
(3777, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 12:07:53'),
(3778, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 12:07:53'),
(3779, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 12:07:53'),
(3780, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 12:07:53'),
(3781, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 12:07:53'),
(3782, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 12:07:53'),
(3783, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 12:07:53'),
(3784, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:13:44'),
(3785, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:14:53'),
(3786, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:20:20'),
(3787, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:20:52'),
(3788, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:21:54'),
(3789, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:23:30'),
(3790, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:25:02'),
(3791, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:33:59'),
(3792, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 12:38:08'),
(3793, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-25 13:09:00'),
(3794, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 13:09:11'),
(3795, NULL, NULL, 'GET /api/users/profile/14', '::ffff:127.0.0.1', '2026-05-25 13:09:13'),
(3796, NULL, NULL, 'GET /api/cases', '::ffff:127.0.0.1', '2026-05-25 13:09:13'),
(3797, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 13:09:14'),
(3798, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 13:09:14'),
(3799, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 13:09:14'),
(3800, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 13:09:14'),
(3801, NULL, NULL, 'GET /api/users/profile/14', '::1', '2026-05-25 13:09:14'),
(3802, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:09:14'),
(3803, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:09:15'),
(3804, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 13:09:15'),
(3805, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-25 13:09:15'),
(3806, NULL, NULL, 'GET /api/appointments/list?userId=14&role=client', '::1', '2026-05-25 13:09:15'),
(3807, NULL, NULL, 'GET /api/notifications/14?limit=50&offset=0', '::1', '2026-05-25 13:09:19'),
(3808, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:01'),
(3809, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:03'),
(3810, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:04'),
(3811, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:04'),
(3812, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:08'),
(3813, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:09'),
(3814, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:09'),
(3815, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:09'),
(3816, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:10'),
(3817, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:12'),
(3818, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:12'),
(3819, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:13'),
(3820, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:16'),
(3821, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:21'),
(3822, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:22'),
(3823, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:22'),
(3824, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:42'),
(3825, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:44'),
(3826, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:51'),
(3827, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:15:51'),
(3828, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:16:17'),
(3829, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:16:18'),
(3830, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:07'),
(3831, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:11'),
(3832, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:12'),
(3833, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:12'),
(3834, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:12'),
(3835, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:13'),
(3836, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:33'),
(3837, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:34'),
(3838, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:34'),
(3839, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:35'),
(3840, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:19:35'),
(3841, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:23:34'),
(3842, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:23:34'),
(3843, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:23:39'),
(3844, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:23:40'),
(3845, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:23:41'),
(3846, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:23:42'),
(3847, NULL, NULL, 'PUT /api/auth/11', '::1', '2026-05-25 13:25:13'),
(3848, NULL, NULL, 'PUT /api/users/11', '::1', '2026-05-25 13:25:28'),
(3849, NULL, 'users', '[UPDATE] User Profile', 'DB_TRIGGER', '2026-05-25 13:25:28'),
(3850, NULL, 'users', '[UPDATE] User Profile', 'DB_TRIGGER', '2026-05-25 13:25:28'),
(3851, NULL, 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER', '2026-05-25 13:25:28'),
(3852, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:25:36'),
(3853, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:25:37'),
(3854, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:25:54'),
(3855, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:01'),
(3856, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:02'),
(3857, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:02'),
(3858, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:03'),
(3859, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:07'),
(3860, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:12'),
(3861, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:13'),
(3862, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:13'),
(3863, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:26:15'),
(3864, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:33:04'),
(3865, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:33:07'),
(3866, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:33:10'),
(3867, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:33:10'),
(3868, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:33:10'),
(3869, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:33:10'),
(3870, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:33:10'),
(3871, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:33:10'),
(3872, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:33:10'),
(3873, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:33:10'),
(3874, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:33:16'),
(3875, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:34:02'),
(3876, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:34:02'),
(3877, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:34:02'),
(3878, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:34:02'),
(3879, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:34:02'),
(3880, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:34:02'),
(3881, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:34:03'),
(3882, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:34:03'),
(3883, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:42:50'),
(3884, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:42:50'),
(3885, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:42:51'),
(3886, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:42:51'),
(3887, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:42:51'),
(3888, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:42:51'),
(3889, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:42:51'),
(3890, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:42:51'),
(3891, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:45:45'),
(3892, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:46'),
(3893, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:45:46'),
(3894, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:46'),
(3895, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:45:46'),
(3896, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:45:52'),
(3897, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:52'),
(3898, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:52'),
(3899, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:45:53'),
(3900, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:54'),
(3901, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 13:45:54'),
(3902, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:54'),
(3903, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 13:45:55'),
(3904, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:56'),
(3905, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:45:56'),
(3906, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:56'),
(3907, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:45:56'),
(3908, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-25 13:45:58'),
(3909, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:58'),
(3910, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:45:58'),
(3911, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-25 13:45:58'),
(3912, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:00'),
(3913, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-25 13:46:00'),
(3914, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:00'),
(3915, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-25 13:46:00'),
(3916, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:02'),
(3917, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:46:02'),
(3918, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-25 13:46:02'),
(3919, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:02'),
(3920, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-25 13:46:02'),
(3921, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:46:02'),
(3922, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:04'),
(3923, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:46:04'),
(3924, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:04'),
(3925, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:46:04'),
(3926, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:05'),
(3927, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-25 13:46:05'),
(3928, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:05'),
(3929, NULL, NULL, 'GET /api/admin/lawyers/pending', '::1', '2026-05-25 13:46:05'),
(3930, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:07'),
(3931, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:46:07'),
(3932, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:07'),
(3933, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:46:07'),
(3934, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:08'),
(3935, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 13:46:08'),
(3936, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:08'),
(3937, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 13:46:08'),
(3938, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-25 13:46:09'),
(3939, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:46:10'),
(3940, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:10'),
(3941, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:46:10'),
(3942, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:46:10'),
(3943, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:48:16'),
(3944, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:48:16'),
(3945, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-25 13:48:16'),
(3946, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:48:16'),
(3947, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-25 13:48:16'),
(3948, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:48:16'),
(3949, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:48:39'),
(3950, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:48:39'),
(3951, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:48:40'),
(3952, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:48:40'),
(3953, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:49:33'),
(3954, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 13:49:33'),
(3955, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:49:33'),
(3956, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 13:49:33'),
(3957, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:49:35'),
(3958, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:49:35'),
(3959, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:49:35'),
(3960, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:49:36'),
(3961, NULL, NULL, 'GET /api/users/17', '::1', '2026-05-25 13:50:03'),
(3962, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:03'),
(3963, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:03'),
(3964, NULL, NULL, 'GET /api/users/17', '::1', '2026-05-25 13:50:03'),
(3965, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:08'),
(3966, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:50:08'),
(3967, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:08'),
(3968, NULL, NULL, 'GET /api/admin/users', '::1', '2026-05-25 13:50:08'),
(3969, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:38'),
(3970, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:50:38'),
(3971, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:38'),
(3972, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-25 13:50:38'),
(3973, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:43'),
(3974, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 13:50:43'),
(3975, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:50:43'),
(3976, NULL, NULL, 'GET /api/admin/clients', '::1', '2026-05-25 13:50:43'),
(3977, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:52:42'),
(3978, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-25 13:52:42'),
(3979, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:52:42'),
(3980, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-25 13:52:42'),
(3981, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:52:45'),
(3982, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:52:45'),
(3983, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-25 13:52:45'),
(3984, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:52:45'),
(3985, NULL, NULL, 'GET /api/admin/financial-logs', '::1', '2026-05-25 13:52:45'),
(3986, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-25 13:52:45'),
(3987, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-25 13:53:09'),
(3988, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-25 13:55:58'),
(3989, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:55:58'),
(3990, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:55:59'),
(3991, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:55:59'),
(3992, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:55:59'),
(3993, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 13:55:59'),
(3994, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:55:59'),
(3995, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 13:55:59'),
(3996, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 13:56:01'),
(3997, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:10:14'),
(3998, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:10:14'),
(3999, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:10:14'),
(4000, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 14:10:14'),
(4001, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 14:10:14'),
(4002, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 14:10:14'),
(4003, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 14:10:14'),
(4004, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:12:17'),
(4005, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 14:12:18'),
(4006, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 14:12:18'),
(4007, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:17:15'),
(4008, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:17:16'),
(4009, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:17:16'),
(4010, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 14:17:16'),
(4011, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 14:17:16'),
(4012, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 14:17:16'),
(4013, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 14:17:16'),
(4014, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:17:18'),
(4015, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:17:21'),
(4016, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 14:19:25'),
(4017, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:19:56'),
(4018, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:19:56'),
(4019, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 14:19:56'),
(4020, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 14:20:12'),
(4021, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:27:04'),
(4022, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 14:27:08'),
(4023, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 16:54:07'),
(4024, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 16:55:49'),
(4025, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 16:57:48'),
(4026, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-25 16:58:04'),
(4027, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 16:58:25'),
(4028, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 16:58:34'),
(4029, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 16:58:36'),
(4030, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 16:59:54'),
(4031, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 17:00:03'),
(4032, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 17:00:03'),
(4033, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 17:00:03'),
(4034, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:00:27'),
(4035, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:51:47'),
(4036, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:51:48'),
(4037, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:51:48'),
(4038, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:51:48'),
(4039, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:23'),
(4040, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:23'),
(4041, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:24'),
(4042, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 17:52:30'),
(4043, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 17:52:30'),
(4044, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 17:52:30'),
(4045, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:51'),
(4046, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:52'),
(4047, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:52'),
(4048, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:53'),
(4049, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:53'),
(4050, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:52:53'),
(4051, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:03'),
(4052, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:04'),
(4053, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:04'),
(4054, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:04'),
(4055, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:04'),
(4056, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:04'),
(4057, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:53:05'),
(4058, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:55:43'),
(4059, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:55:44'),
(4060, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:55:44'),
(4061, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:55:45'),
(4062, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:55:45'),
(4063, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 17:55:49'),
(4064, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 17:55:49'),
(4065, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 17:55:49'),
(4066, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:56:06'),
(4067, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 17:56:27'),
(4068, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 19:42:54'),
(4069, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 19:51:13'),
(4070, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 19:51:15'),
(4071, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 19:51:16'),
(4072, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 19:51:17'),
(4073, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 19:51:17'),
(4074, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 19:51:23'),
(4075, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 19:51:23'),
(4076, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 19:51:23'),
(4077, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 19:51:40'),
(4078, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 20:26:32'),
(4079, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 20:27:55'),
(4080, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 20:42:20'),
(4081, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 20:43:20'),
(4082, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 21:22:45'),
(4083, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 21:22:45'),
(4084, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 21:22:45'),
(4085, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 21:23:12'),
(4086, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 21:57:02'),
(4087, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 21:57:18'),
(4088, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:00:38'),
(4089, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-25 22:01:58'),
(4090, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:02:01'),
(4091, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 22:03:57'),
(4092, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:04:32'),
(4093, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:13:24'),
(4094, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 22:14:57'),
(4095, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:16:13'),
(4096, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:16:13'),
(4097, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 22:16:13'),
(4098, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 22:18:52'),
(4099, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:19:30'),
(4100, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:22:26'),
(4101, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:23:58'),
(4102, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:23:59'),
(4103, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:23:59'),
(4104, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 22:23:59'),
(4105, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 22:23:59'),
(4106, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 22:23:59'),
(4107, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 22:23:59'),
(4108, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:25:39'),
(4109, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:25:42'),
(4110, NULL, NULL, 'POST /api/ai/draft', '::1', '2026-05-25 22:26:10'),
(4111, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:30:17'),
(4112, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:30:19'),
(4113, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-25 22:30:39'),
(4114, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-25 22:35:28'),
(4115, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:36:01'),
(4116, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:36:05'),
(4117, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:36:05'),
(4118, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:36:05'),
(4119, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 22:36:05'),
(4120, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 22:36:05'),
(4121, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 22:36:05'),
(4122, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 22:36:05'),
(4123, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:36:21'),
(4124, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:36:26'),
(4125, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-25 22:36:45'),
(4126, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:38:57'),
(4127, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:39:08'),
(4128, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:39:09'),
(4129, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:39:09'),
(4130, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 22:39:09'),
(4131, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 22:39:09'),
(4132, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 22:39:09'),
(4133, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 22:39:09'),
(4134, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:39:17'),
(4135, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:39:20'),
(4136, NULL, NULL, 'POST /api/ai/research', '::1', '2026-05-25 22:39:46'),
(4137, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:40:16'),
(4138, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 22:40:20'),
(4139, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 23:47:14'),
(4140, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:47:18'),
(4141, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:47:23'),
(4142, NULL, NULL, 'POST /api/ai/contract-review', '::1', '2026-05-25 23:48:54'),
(4143, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:49:44'),
(4144, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:49:44'),
(4145, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 23:49:45'),
(4146, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:49:47'),
(4147, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:49:50'),
(4148, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:49:50'),
(4149, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:49:50'),
(4150, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 23:49:50'),
(4151, NULL, NULL, 'GET /api/cases', '::1', '2026-05-25 23:49:51'),
(4152, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 23:49:51'),
(4153, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-25 23:49:51'),
(4154, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:50:07'),
(4155, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:50:10'),
(4156, NULL, NULL, 'POST /api/ai/contract-review', '::1', '2026-05-25 23:50:21'),
(4157, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:51:12'),
(4158, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:53:11'),
(4159, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-25 23:55:52'),
(4160, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-25 23:56:44'),
(4161, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-25 23:56:45'),
(4162, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:56:52'),
(4163, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:56:52'),
(4164, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-25 23:56:52'),
(4165, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-25 23:56:55'),
(4166, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-25 23:58:51'),
(4167, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-25 23:58:53'),
(4168, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:58:59'),
(4169, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-25 23:59:31'),
(4170, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-26 00:00:01'),
(4171, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:00:38'),
(4172, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:00:51'),
(4173, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-26 00:01:29'),
(4174, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-26 00:03:26'),
(4175, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:03:59'),
(4176, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:05:08'),
(4177, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-26 00:08:11'),
(4178, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-26 00:19:29'),
(4179, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:20:09'),
(4180, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:20:09'),
(4181, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 00:20:09'),
(4182, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:20:11'),
(4183, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:20:24'),
(4184, NULL, NULL, 'POST /api/ai/predict', '::1', '2026-05-26 00:20:40'),
(4185, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 00:21:24'),
(4186, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 04:30:36'),
(4187, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-26 05:37:10'),
(4188, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 05:37:10'),
(4189, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 05:37:11'),
(4190, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 05:37:11'),
(4191, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 05:37:11'),
(4192, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 05:37:11'),
(4193, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 05:37:11'),
(4194, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 05:37:11'),
(4195, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 05:37:13'),
(4196, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-26 05:37:18'),
(4197, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:19'),
(4198, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:37:19'),
(4199, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:19'),
(4200, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:37:19'),
(4201, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:24'),
(4202, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 05:37:24'),
(4203, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:24'),
(4204, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 05:37:24'),
(4205, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:25'),
(4206, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:37:25'),
(4207, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:25'),
(4208, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:37:25'),
(4209, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:27'),
(4210, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:37:27'),
(4211, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:27'),
(4212, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:37:27'),
(4213, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:37:27'),
(4214, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:36'),
(4215, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:37:36'),
(4216, NULL, NULL, 'GET /api/auth/me', '::1', '2026-05-26 05:37:36'),
(4217, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:37:36'),
(4218, NULL, 'users', '[DELETE] User Account', 'DB_TRIGGER', '2026-05-26 05:40:35'),
(4219, NULL, 'users', '[DELETE] User Account', 'DB_TRIGGER', '2026-05-26 05:40:35'),
(4220, NULL, 'users', '[DELETE] User Account', 'DB_TRIGGER', '2026-05-26 05:40:55'),
(4221, NULL, NULL, 'GET /api/users/12', '::1', '2026-05-26 05:43:33'),
(4222, NULL, NULL, 'PUT /api/users/12', '::1', '2026-05-26 05:44:41'),
(4223, NULL, 'users', '[UPDATE] User Profile', 'DB_TRIGGER', '2026-05-26 05:44:41'),
(4224, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-26 05:46:29'),
(4225, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:46:29'),
(4226, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:46:29'),
(4227, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-26 05:46:35'),
(4228, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:46:35'),
(4229, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:46:36'),
(4230, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:46:39'),
(4231, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:46:39'),
(4232, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:46:40'),
(4233, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:46:42'),
(4234, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:46:42'),
(4235, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 05:46:48'),
(4236, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 05:46:48'),
(4237, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:46:54'),
(4238, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-26 05:46:54'),
(4239, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:47:06'),
(4240, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:47:06'),
(4241, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-26 05:52:52'),
(4242, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:52:53'),
(4243, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 05:52:53'),
(4244, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:52:57'),
(4245, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:52:57'),
(4246, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 05:52:57'),
(4247, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 05:52:59'),
(4248, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 05:52:59'),
(4253, NULL, NULL, 'PUT /api/users/register', '::1', '2026-05-26 07:33:03'),
(4254, NULL, NULL, 'POST /api/users/register', '::1', '2026-05-26 07:33:08'),
(4255, NULL, NULL, 'POST /api/users/register', '::1', '2026-05-26 07:33:27'),
(4256, NULL, 'admin', '[CREATE] System Admin', 'DB_TRIGGER', '2026-05-26 07:33:27'),
(4257, NULL, 'users', '[CREATE] User Account', 'DB_TRIGGER', '2026-05-26 07:33:27'),
(4258, NULL, 'admin', '[UPDATE] System Admin', 'DB_TRIGGER', '2026-05-26 07:33:27'),
(4259, NULL, NULL, 'GET /api/notifications/12?limit=50&offset=0', '::1', '2026-05-26 07:33:40'),
(4260, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-26 07:34:03'),
(4261, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 07:34:04'),
(4262, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 07:34:04'),
(4263, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 07:34:18'),
(4264, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-26 07:34:18'),
(4265, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 07:34:27'),
(4266, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 07:34:27'),
(4267, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 07:34:27'),
(4268, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 07:34:29'),
(4269, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-26 07:34:29'),
(4270, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 07:34:31'),
(4271, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 07:34:31'),
(4272, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-26 07:34:31'),
(4273, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-26 08:44:23'),
(4274, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:44:23'),
(4275, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:44:23'),
(4276, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:44:23'),
(4277, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 08:44:23'),
(4278, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 08:44:23'),
(4279, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 08:44:24'),
(4280, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 08:44:24'),
(4281, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:44:27'),
(4282, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:47:42'),
(4283, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:47:52'),
(4284, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:47:58'),
(4285, NULL, NULL, 'GET /api/installments/subscription/1', '::1', '2026-05-26 08:47:59'),
(4286, NULL, NULL, 'GET /api/installments/subscription/1', '::1', '2026-05-26 08:47:59'),
(4287, NULL, NULL, 'POST /api/payments/subscription-checkout', '::1', '2026-05-26 08:50:19'),
(4288, NULL, NULL, 'POST /api/payments/subscription-checkout', '::1', '2026-05-26 08:50:49'),
(4289, NULL, NULL, 'POST /api/payments/subscription-checkout', '::1', '2026-05-26 08:50:53'),
(4290, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:12'),
(4291, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:12'),
(4292, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:55:12'),
(4293, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:32'),
(4294, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:35'),
(4295, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:41'),
(4296, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:41'),
(4297, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:55:41'),
(4298, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:46'),
(4299, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:46'),
(4300, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:55:46'),
(4301, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 08:55:46'),
(4302, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 08:55:46'),
(4303, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 08:55:46'),
(4304, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 08:55:46'),
(4305, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:56:25'),
(4306, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:56:25'),
(4307, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:56:25'),
(4308, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-26 08:56:25'),
(4309, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-26 08:56:25'),
(4310, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:00'),
(4311, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:00'),
(4312, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:58:01'),
(4313, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:14'),
(4314, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:14'),
(4315, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:58:14'),
(4316, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:21'),
(4317, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:21'),
(4318, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:58:21'),
(4319, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:33'),
(4320, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:33'),
(4321, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:58:33'),
(4322, NULL, NULL, 'GET /api/lawyer/case-requests', '::1', '2026-05-26 08:58:33'),
(4323, NULL, NULL, 'GET /api/lawyer/case-requests', '::1', '2026-05-26 08:58:33'),
(4324, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:37'),
(4325, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:37'),
(4326, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:58:38'),
(4327, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:57'),
(4328, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 08:58:57'),
(4329, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 08:58:57'),
(4330, NULL, NULL, 'GET /api/payments/wallet/11', '::1', '2026-05-26 08:58:57'),
(4331, NULL, NULL, 'GET /api/payments/wallet/11', '::1', '2026-05-26 08:58:57'),
(4332, NULL, NULL, 'GET /api/payments/history/lawyer/11', '::1', '2026-05-26 08:58:57'),
(4333, NULL, NULL, 'GET /api/payments/history/lawyer/11', '::1', '2026-05-26 08:58:57'),
(4334, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 09:07:35'),
(4335, NULL, NULL, 'GET /api/cases/:caseId', '::1', '2026-05-26 09:07:36'),
(4336, NULL, NULL, 'GET /api/cases/:caseId', '::1', '2026-05-26 09:07:36'),
(4337, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 09:07:40'),
(4338, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 09:07:40'),
(4339, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-26 09:07:41'),
(4340, NULL, NULL, 'GET /api/payments/wallet/11', '::1', '2026-05-26 09:07:41'),
(4341, NULL, NULL, 'GET /api/payments/wallet/11', '::1', '2026-05-26 09:07:41'),
(4342, NULL, NULL, 'GET /api/payments/history/lawyer/11', '::1', '2026-05-26 09:07:41'),
(4343, NULL, NULL, 'GET /api/payments/history/lawyer/11', '::1', '2026-05-26 09:07:41'),
(4344, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-26 12:24:13'),
(4345, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 12:24:13'),
(4346, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 12:24:14'),
(4347, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 12:24:14'),
(4348, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 12:24:14'),
(4349, NULL, NULL, 'GET /api/cases', '::1', '2026-05-26 12:24:14'),
(4350, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 12:24:14'),
(4351, NULL, NULL, 'GET /api/appointments/list?userId=11&role=lawyer', '::1', '2026-05-26 12:24:14'),
(4352, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 12:24:16'),
(4353, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-26 12:24:21'),
(4354, NULL, NULL, 'POST /api/ai/chat', '::1', '2026-05-26 12:24:53'),
(4355, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-30 17:29:41'),
(4356, NULL, NULL, 'GET /api/users/profile/11', '::1', '2026-05-30 17:29:41'),
(4357, NULL, NULL, 'GET /api/notifications/11?limit=50&offset=0', '::1', '2026-05-30 17:29:41'),
(4358, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 17:29:50'),
(4359, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:29:51'),
(4360, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:29:51'),
(4361, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:29:59'),
(4362, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:29:59'),
(4363, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:30:01'),
(4364, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:30:01'),
(4365, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:30:47'),
(4366, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:30:47'),
(4367, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:30:47'),
(4368, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 17:34:36'),
(4369, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:34:36'),
(4370, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:34:36'),
(4371, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:34:36'),
(4372, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 17:35:56'),
(4373, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:35:57'),
(4374, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:35:57'),
(4375, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:35:57'),
(4376, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:36:01'),
(4377, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:36:01'),
(4378, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 17:36:04'),
(4379, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 17:36:04'),
(4380, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:36:11'),
(4381, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:36:11'),
(4382, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 17:36:13'),
(4383, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 17:36:13'),
(4384, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:36:16'),
(4385, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:36:16'),
(4386, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:36:16'),
(4387, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 17:39:36'),
(4388, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:39:36'),
(4389, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:39:36'),
(4390, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:39:36'),
(4391, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:39:51'),
(4392, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:39:51'),
(4393, NULL, NULL, 'POST /api/users/register', '::1', '2026-05-30 17:40:23'),
(4394, NULL, 'admin', '[CREATE] System Admin', 'DB_TRIGGER', '2026-05-30 17:40:23'),
(4395, NULL, 'users', '[CREATE] User Account', 'DB_TRIGGER', '2026-05-30 17:40:23'),
(4396, NULL, 'admin', '[UPDATE] System Admin', 'DB_TRIGGER', '2026-05-30 17:40:23'),
(4397, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 17:40:42'),
(4398, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 17:41:00'),
(4399, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:41:00'),
(4400, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:41:00'),
(4401, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:41:04'),
(4402, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:41:04'),
(4403, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:41:04'),
(4404, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:41:08'),
(4405, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:41:08'),
(4406, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:41:13'),
(4407, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 17:41:13'),
(4408, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:41:16'),
(4409, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:41:16'),
(4410, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 17:41:16'),
(4411, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:41:17');
INSERT INTO `activity_log` (`log_id`, `user_id`, `table_name`, `action`, `ip_address`, `created_at`) VALUES
(4412, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 17:41:17'),
(4413, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 18:05:47'),
(4414, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:05:47'),
(4415, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:05:47'),
(4416, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:05:50'),
(4417, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:05:50'),
(4418, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:05:50'),
(4419, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:05:53'),
(4420, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:05:53'),
(4421, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 18:42:03'),
(4422, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:42:03'),
(4423, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:42:03'),
(4424, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:42:09'),
(4425, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:42:09'),
(4426, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:42:10'),
(4427, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:42:11'),
(4428, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 18:42:11'),
(4429, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:01'),
(4430, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:01'),
(4431, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:01'),
(4432, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 18:43:04'),
(4433, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 18:43:04'),
(4434, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 18:43:06'),
(4435, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 18:43:06'),
(4436, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:08'),
(4437, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:08'),
(4438, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:08'),
(4439, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 18:43:09'),
(4440, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 18:46:48'),
(4441, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 19:45:12'),
(4442, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 19:47:44'),
(4443, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 19:58:55'),
(4444, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 19:59:07'),
(4445, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 20:01:01'),
(4446, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:01:01'),
(4447, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:01:01'),
(4448, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:01:01'),
(4449, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 20:05:05'),
(4450, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:05:05'),
(4451, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:05:05'),
(4452, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:05:05'),
(4453, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 20:05:17'),
(4454, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 20:05:22'),
(4455, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:05:23'),
(4456, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:05:23'),
(4457, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:05:23'),
(4458, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:05:25'),
(4459, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:05:25'),
(4460, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 20:05:29'),
(4461, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:05:30'),
(4462, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:05:30'),
(4463, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 20:06:26'),
(4464, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-30 20:21:37'),
(4465, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 20:23:46'),
(4466, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 20:23:51'),
(4467, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:23:52'),
(4468, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:23:52'),
(4469, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:23:55'),
(4470, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:23:55'),
(4471, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:23:55'),
(4472, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 20:23:57'),
(4473, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-30 20:23:57'),
(4474, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 20:23:59'),
(4475, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-30 20:23:59'),
(4476, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:24:03'),
(4477, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:24:03'),
(4478, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-30 20:24:04'),
(4479, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 20:24:41'),
(4480, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:24:42'),
(4481, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 20:24:42'),
(4482, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 22:00:27'),
(4483, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 22:00:28'),
(4484, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 22:00:58'),
(4485, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 22:01:18'),
(4486, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-30 22:01:26'),
(4487, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-30 22:01:26'),
(4488, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 22:01:26'),
(4489, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 22:01:33'),
(4490, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 22:37:14'),
(4491, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 22:37:14'),
(4492, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-30 22:37:14'),
(4493, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-30 22:37:20'),
(4494, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 22:37:21'),
(4495, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-30 22:37:21'),
(4496, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 01:52:15'),
(4497, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 01:52:19'),
(4498, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 01:52:20'),
(4499, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 01:52:20'),
(4500, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 01:52:33'),
(4501, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 01:52:33'),
(4502, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 01:52:34'),
(4503, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-31 01:53:02'),
(4504, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-31 01:53:02'),
(4505, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 01:53:05'),
(4506, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-31 01:53:05'),
(4507, NULL, NULL, 'GET /api/admin/cases', '::1', '2026-05-31 01:53:05'),
(4508, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 02:11:24'),
(4509, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 02:11:25'),
(4510, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 02:11:25'),
(4511, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 05:13:31'),
(4512, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 05:13:32'),
(4513, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 05:13:32'),
(4514, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 05:17:15'),
(4515, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 05:17:15'),
(4516, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 05:17:15'),
(4517, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 05:17:17'),
(4518, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 05:17:17'),
(4519, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 05:17:19'),
(4520, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 05:17:19'),
(4521, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 05:17:21'),
(4522, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 05:17:21'),
(4523, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 05:17:22'),
(4524, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 05:17:40'),
(4525, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 05:17:41'),
(4526, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 05:17:41'),
(4527, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 05:17:46'),
(4528, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 05:17:46'),
(4529, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 05:17:46'),
(4530, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:27:41'),
(4531, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:27:51'),
(4532, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:27:51'),
(4533, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:29:48'),
(4534, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:29:48'),
(4535, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:29:48'),
(4536, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:30:44'),
(4537, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:30:44'),
(4538, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:30:45'),
(4539, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:31:07'),
(4540, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:31:07'),
(4541, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:31:07'),
(4542, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:09'),
(4543, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:09'),
(4544, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:32:09'),
(4545, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:27'),
(4546, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:27'),
(4547, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:32:27'),
(4548, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:37'),
(4549, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:37'),
(4550, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:32:38'),
(4551, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:40'),
(4552, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:32:40'),
(4553, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:32:40'),
(4554, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:33:13'),
(4555, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:33:13'),
(4556, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:33:13'),
(4557, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:34:10'),
(4558, NULL, NULL, 'GET /api/users/profile/20', '::1', '2026-05-31 05:34:10'),
(4559, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:34:10'),
(4560, NULL, NULL, 'GET /api/users/profile/20', '::ffff:127.0.0.1', '2026-05-31 05:38:49'),
(4561, NULL, NULL, 'GET /api/users/profile/20', '::ffff:127.0.0.1', '2026-05-31 05:38:49'),
(4562, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::ffff:127.0.0.1', '2026-05-31 05:38:49'),
(4563, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-31 05:48:41'),
(4564, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-31 05:48:41'),
(4565, NULL, NULL, 'GET /api/users/specializations', '::1', '2026-05-31 05:48:41'),
(4566, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:48:54'),
(4567, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 05:48:59'),
(4568, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:50:45'),
(4569, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:51:08'),
(4570, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:51:39'),
(4571, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 05:51:53'),
(4572, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:21:39'),
(4573, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:23:29'),
(4574, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:23:41'),
(4575, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:23:47'),
(4576, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:24:22'),
(4577, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:24:35'),
(4578, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:24:46'),
(4579, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:25:02'),
(4580, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:25:24'),
(4581, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:25:31'),
(4582, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:43:34'),
(4583, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:43:34'),
(4584, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:43:34'),
(4585, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:46:15'),
(4586, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:46:15'),
(4587, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:46:20'),
(4588, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:46:20'),
(4589, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 06:46:30'),
(4590, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 06:46:30'),
(4591, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 06:46:31'),
(4592, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 06:46:33'),
(4593, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 06:46:33'),
(4594, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 06:46:34'),
(4595, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 06:46:34'),
(4596, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 06:46:36'),
(4597, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 06:46:36'),
(4598, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 06:46:38'),
(4599, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 06:46:38'),
(4600, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:46:58'),
(4601, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:46:58'),
(4602, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 06:54:08'),
(4603, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 06:56:54'),
(4604, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:56:55'),
(4605, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:56:55'),
(4606, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 06:58:45'),
(4607, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:58:46'),
(4608, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 06:58:46'),
(4609, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 06:58:49'),
(4610, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 06:58:49'),
(4611, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 07:21:43'),
(4612, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 07:23:27'),
(4613, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 07:23:31'),
(4614, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 07:23:31'),
(4615, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 07:23:31'),
(4616, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 07:23:45'),
(4617, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 07:23:46'),
(4618, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 07:23:46'),
(4619, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 11:38:48'),
(4620, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 11:38:49'),
(4621, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 11:38:49'),
(4622, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 11:41:25'),
(4623, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 11:41:26'),
(4624, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 11:41:26'),
(4625, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 12:57:05'),
(4626, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 12:57:06'),
(4627, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 12:57:06'),
(4628, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 12:57:09'),
(4629, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 12:57:09'),
(4630, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 12:57:15'),
(4631, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 12:57:16'),
(4632, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 12:57:16'),
(4633, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 12:57:21'),
(4634, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 12:57:21'),
(4635, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 12:57:21'),
(4636, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:20'),
(4637, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:20'),
(4638, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:24'),
(4639, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:24'),
(4640, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:24'),
(4641, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:28'),
(4642, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:29'),
(4643, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:29'),
(4644, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:00:29'),
(4645, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:00:29'),
(4646, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:00:29'),
(4647, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:00:29'),
(4648, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:00:29'),
(4649, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:00:29'),
(4650, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:36'),
(4651, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:37'),
(4652, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:37'),
(4653, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:42'),
(4654, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:43'),
(4655, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:43'),
(4656, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:00:43'),
(4657, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:00:43'),
(4658, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:00:43'),
(4659, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:00:43'),
(4660, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:00:43'),
(4661, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:00:43'),
(4662, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:51'),
(4663, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:51'),
(4664, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:51'),
(4665, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:52'),
(4666, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:52'),
(4667, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:52'),
(4668, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:00:52'),
(4669, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:00:52'),
(4670, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:00:52'),
(4671, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:00:52'),
(4672, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:00:52'),
(4673, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:52'),
(4674, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:00:52'),
(4675, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:53'),
(4676, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:53'),
(4677, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:53'),
(4678, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:57'),
(4679, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:00:57'),
(4680, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-31 13:02:08'),
(4681, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-31 13:26:37'),
(4682, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-31 13:26:42'),
(4683, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:44'),
(4684, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:44'),
(4685, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-31 13:26:44'),
(4686, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:48'),
(4687, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:48'),
(4688, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-31 13:26:48'),
(4689, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:51'),
(4690, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:52'),
(4691, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:52'),
(4692, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:54'),
(4693, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:26:59'),
(4694, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:27:00'),
(4695, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:27:00'),
(4696, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:27:00'),
(4697, NULL, NULL, 'GET /api/cases', '::1', '2026-05-31 13:27:00'),
(4698, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:27:00'),
(4699, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:27:00'),
(4700, NULL, NULL, 'GET /api/appointments/list?userId=21&role=client', '::1', '2026-05-31 13:27:00'),
(4701, NULL, NULL, 'GET /api/users/lawyers', '::1', '2026-05-31 13:27:00'),
(4702, NULL, NULL, 'GET /api/users/profile/21', '::1', '2026-05-31 13:27:04'),
(4703, NULL, NULL, 'GET /api/notifications/21?limit=50&offset=0', '::1', '2026-05-31 13:28:49'),
(4704, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 13:28:50'),
(4705, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 13:28:50'),
(4706, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 13:28:52'),
(4707, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 13:28:52'),
(4708, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 13:28:54'),
(4709, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 13:28:54'),
(4710, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 13:28:56'),
(4711, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 13:28:56'),
(4712, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 13:28:57'),
(4713, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 13:28:57'),
(4714, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 13:30:21'),
(4715, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 13:30:22'),
(4716, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 13:30:22'),
(4717, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 13:30:24'),
(4718, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 13:30:29'),
(4719, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 13:30:29'),
(4720, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 13:30:29'),
(4721, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 13:30:31'),
(4722, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 13:30:31'),
(4723, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 13:30:33'),
(4724, NULL, NULL, 'GET /api/admin/ai-usage', '::1', '2026-05-31 13:30:33'),
(4725, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 13:30:34'),
(4726, NULL, NULL, 'GET /api/admin/system-logs', '::1', '2026-05-31 13:30:34'),
(4727, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 13:30:35'),
(4728, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 13:30:35'),
(4729, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 14:17:14'),
(4730, NULL, NULL, 'GET /api/notifications/20?limit=50&offset=0', '::1', '2026-05-31 14:17:22'),
(4731, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:22'),
(4732, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:22'),
(4733, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 14:17:28'),
(4734, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:29'),
(4735, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:29'),
(4736, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 14:17:32'),
(4737, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 14:17:32'),
(4738, NULL, NULL, 'GET /api/cases/monitor?sort=created_at_desc', '::1', '2026-05-31 14:17:32'),
(4739, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 14:17:34'),
(4740, NULL, NULL, 'GET /api/admin/reports-analytics', '::1', '2026-05-31 14:17:34'),
(4741, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:36'),
(4742, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:36'),
(4743, NULL, NULL, 'POST /api/auth/login', '::1', '2026-05-31 14:17:44'),
(4744, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:44'),
(4745, NULL, NULL, 'GET /api/admin/full-dashboard', '::1', '2026-05-31 14:17:44'),
(4746, NULL, NULL, 'POST /api/users/register', '::1', '2026-05-31 14:19:36'),
(4747, NULL, 'admin', '[CREATE] System Admin', 'DB_TRIGGER', '2026-05-31 14:19:36'),
(4748, NULL, 'users', '[CREATE] User Account', 'DB_TRIGGER', '2026-05-31 14:19:36'),
(4749, NULL, 'admin', '[UPDATE] System Admin', 'DB_TRIGGER', '2026-05-31 14:19:36');

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
(12, 'SuperAdmin'),
(20, 'Level 4'),
(21, 'Level 3'),
(22, 'Level 2');

--
-- Triggers `admin`
--
DELIMITER $$
CREATE TRIGGER `after_admin_delete` AFTER DELETE ON `admin` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'admin', '[DELETE] System Admin', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_admin_insert` AFTER INSERT ON `admin` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'admin', '[CREATE] System Admin', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_admin_update` AFTER UPDATE ON `admin` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'admin', '[UPDATE] System Admin', 'DB_TRIGGER');
END
$$
DELIMITER ;

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

--
-- Triggers `ai_tools`
--
DELIMITER $$
CREATE TRIGGER `after_ai_tools_delete` AFTER DELETE ON `ai_tools` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'ai_tools', '[DELETE] AI Tool', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_ai_tools_insert` AFTER INSERT ON `ai_tools` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'ai_tools', '[CREATE] AI Tool', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_ai_tools_update` AFTER UPDATE ON `ai_tools` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'ai_tools', '[UPDATE] AI Tool', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `appointment`
--

CREATE TABLE `appointment` (
  `appointment_id` bigint(20) NOT NULL,
  `appointment_date` datetime DEFAULT NULL,
  `status` enum('Scheduled','Rescheduled','Completed','Cancelled') DEFAULT 'Scheduled',
  `client_id` bigint(20) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointment`
--

INSERT INTO `appointment` (`appointment_id`, `appointment_date`, `status`, `client_id`, `lawyer_id`, `case_id`) VALUES
(1, '2026-05-08 01:34:00', 'Rescheduled', 13, 11, 3),
(2, '2026-05-09 11:29:00', 'Rescheduled', 13, 2, 15),
(3, '2026-05-10 16:00:00', 'Rescheduled', 15, 11, 20),
(4, '2026-05-10 17:00:00', 'Rescheduled', 15, 11, 20),
(5, '2026-05-15 19:08:00', 'Rescheduled', 15, 11, 22),
(6, '2026-05-11 14:16:00', 'Rescheduled', 13, 11, 1),
(7, '2026-05-18 19:00:00', 'Rescheduled', 15, 2, 23),
(8, '2026-05-12 18:00:00', 'Rescheduled', 14, 11, 24),
(9, '2026-05-10 16:40:00', 'Rescheduled', 15, 11, 22);

--
-- Triggers `appointment`
--
DELIMITER $$
CREATE TRIGGER `after_appointment_delete` AFTER DELETE ON `appointment` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'appointment', '[DELETE] Appointment', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_appointment_insert` AFTER INSERT ON `appointment` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'appointment', '[CREATE] Appointment', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_appointment_update` AFTER UPDATE ON `appointment` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'appointment', '[UPDATE] Appointment', 'DB_TRIGGER');
END
$$
DELIMITER ;

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

--
-- Triggers `calls`
--
DELIMITER $$
CREATE TRIGGER `after_calls_delete` AFTER DELETE ON `calls` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'calls', '[DELETE] Call Record', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_calls_insert` AFTER INSERT ON `calls` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'calls', '[CREATE] Call Record', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_calls_update` AFTER UPDATE ON `calls` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'calls', '[UPDATE] Call Record', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cases`
--

CREATE TABLE `cases` (
  `case_id` bigint(20) NOT NULL,
  `title` varchar(200) NOT NULL,
  `category` varchar(100) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `client_id` bigint(20) NOT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL,
  `upfront_fee` decimal(12,2) DEFAULT NULL,
  `success_percentage` decimal(5,2) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cases`
--

INSERT INTO `cases` (`case_id`, `title`, `category`, `description`, `status`, `created_at`, `deleted_at`, `client_id`, `lawyer_id`, `upfront_fee`, `success_percentage`, `updated_at`) VALUES
(1, 'قضية نزاع عقاري', 'مدني', 'مطالبة باسترداد وحدة سكنية.', 'Ongoing', '2026-04-13 14:10:51', NULL, 13, 11, NULL, NULL, '2026-05-10 13:43:19'),
(2, 'قضية تعويض', 'مدني', 'طلب تعويض عن أضرار حادث سير.', 'Pending', '2026-04-13 14:33:25', '2026-04-13 14:40:06', 13, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(3, 'قضية فصل تعسفي', 'عمالي', 'فصل بدون وجه حق ومطالبة بالتعويض', 'Ongoing', '2026-05-01 07:16:47', NULL, 13, 11, 5000.00, 15.50, '2026-05-10 11:21:11'),
(4, 'قضية تعويض', 'مدني', 'حادث سير بسيارة', 'Pending', '2026-05-05 12:48:25', NULL, 14, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(5, 'قضية تعويض', 'مدني', 'حادث سير بسيارة', 'Pending', '2026-05-05 12:48:32', NULL, 14, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(6, 'قضية تعويض', 'مدني', 'حادث سير بسيارة', 'Pending', '2026-05-05 12:48:54', NULL, 14, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(7, 'قضية تعويض', 'مدني', 'تعويض حادث سير', 'Pending', '2026-05-05 12:52:15', NULL, 14, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(8, 'قضية تعويض ', 'مدني', 'حادث سير', 'Pending', '2026-05-05 12:58:36', NULL, 14, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(9, 'طلاق', 'أسرة', 'طلاق', 'Ongoing', '2026-05-05 17:45:24', NULL, 14, 2, 4000.00, 25.00, '2026-05-10 11:21:11'),
(10, 'قتل', 'جنائي', 'قتل غير متعمد', 'Ongoing', '2026-05-05 17:50:38', NULL, 14, 9, NULL, NULL, '2026-05-10 11:21:11'),
(11, 'قتل', 'جنائي', 'قتل غير متعمد ', 'Pending', '2026-05-05 18:07:05', NULL, 14, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(12, 'نزاع قضائي', 'تجاري', 'نزاع قضائي علي محل', 'Pending', '2026-05-05 18:27:53', NULL, 14, 8, NULL, NULL, '2026-05-10 11:21:11'),
(13, 'نزاع قضائي', 'تجاري', 'تشميع محل', 'Pending', '2026-05-05 18:54:15', NULL, 13, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(14, 'قتل', 'جنائي', 'قتل غير متعمد', 'Pending', '2026-05-05 19:00:51', NULL, 13, NULL, NULL, NULL, '2026-05-10 11:21:11'),
(15, 'قتل', 'جنائي', 'قتل غير متعمد', 'Ongoing', '2026-05-05 19:10:02', NULL, 13, 2, 5000.00, 25.00, '2026-05-10 11:21:11'),
(16, 'خلع', 'أسرة', 'طلاق', 'Ongoing', '2026-05-05 19:59:08', NULL, 13, 2, 1000.00, 15.00, '2026-05-10 11:21:11'),
(17, 'نزاع ملكية', 'مدني', 'نزاع ملكية عقار', 'Ongoing', '2026-05-06 08:49:10', NULL, 13, 2, 2000.00, 12.00, '2026-05-10 11:21:11'),
(18, 'نزاع ملكية', 'مدني', 'نزاع عقار', 'Ongoing', '2026-05-06 09:42:09', NULL, 14, 2, 1000.00, 10.00, '2026-05-10 11:21:11'),
(19, 'malak', 'مدني', 'djkdfkfjkefjf', 'Ongoing', '2026-05-06 09:49:53', NULL, 15, NULL, NULL, NULL, '2026-05-17 05:08:23'),
(20, 'راتب ماخر', 'عمالي', 'راتب', 'Ongoing', '2026-05-08 14:32:24', NULL, 15, 11, 2000.00, 18.00, '2026-05-16 20:09:51'),
(21, 'طلاق', 'أسرة', 'طلاق', 'Closed', '2026-05-08 14:54:31', NULL, 15, 2, 2000.00, 10.00, '2026-05-10 11:21:11'),
(22, 'نزاع', 'مدني', 'نزاع', 'Closed', '2026-05-08 15:35:04', NULL, 15, 11, 1000.00, 12.00, '2026-05-20 14:44:06'),
(23, 'مشاجرة', 'مدني', 'مشاجرة', 'Ongoing', '2026-05-09 21:53:25', NULL, 15, 2, 100.00, 15.00, '2026-05-10 11:21:11'),
(24, 'مشاجرة', 'مدني', 'مشاجرة', 'Ongoing', '2026-05-09 22:04:29', NULL, 14, 11, 100.00, 10.00, '2026-05-10 11:21:11'),
(25, 'نزاع', 'تجاري', 'نزاع علي محل تجاري', 'Ongoing', '2026-05-11 13:53:04', NULL, 15, 8, 12000.00, 13.00, '2026-05-11 14:52:53'),
(26, 'سب وقصف', 'مدني', 'سب و قصف', 'Ongoing', '2026-05-11 18:35:14', NULL, 14, 2, 1000.00, 15.00, '2026-05-11 18:37:42'),
(27, 'سرقة', 'مدني', 'قام المدعى عليه بالاستيلاء بطريقة غير مشروعة على ممتلكات تابعة للجهة المدعية (عبارة عن أجهزة ومعدات تشغيل خاصة بالشركة)، وحيث أن هذا الفعل الإجرامي لم يتسبب فقط في خسارة قيمة الأشياء المسروقة مباشرة، بل أدى أيضاً إلى توقف حركة العمل والإنتاج بالكامل في المنشأة لمدة تتجاوز الأسبوعين، مما تسبب في إخلال الشركة بالتزاماتها تجاه عملائها وتكبدها غرامات تأخير باهظة.', 'Pending', '2026-05-17 21:06:54', NULL, 14, NULL, NULL, NULL, '2026-05-17 21:06:54'),
(28, 'نزاع عقاري -المنصوره', 'مدني', 'خناقة', 'Awaiting_Payment', '2026-05-25 10:40:46', NULL, 14, 11, 1000.00, 20.00, '2026-05-25 10:42:05');

--
-- Triggers `cases`
--
DELIMITER $$
CREATE TRIGGER `after_cases_delete` AFTER DELETE ON `cases` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'cases', '[DELETE] Legal Case', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_cases_insert` AFTER INSERT ON `cases` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'cases', '[CREATE] Legal Case', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_cases_update` AFTER UPDATE ON `cases` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'cases', '[UPDATE] Legal Case', 'DB_TRIGGER');
END
$$
DELIMITER ;

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
(2, 12000.50),
(3, 8500.00),
(4, 12000.00),
(13, 10000.00),
(14, 100000.00),
(15, 10000.00),
(17, NULL);

--
-- Triggers `client`
--
DELIMITER $$
CREATE TRIGGER `after_client_delete` AFTER DELETE ON `client` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'client', '[DELETE] Client Profile', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_client_insert` AFTER INSERT ON `client` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'client', '[CREATE] Client Profile', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_client_update` AFTER UPDATE ON `client` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'client', '[UPDATE] Client Profile', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `court_sessions`
--

CREATE TABLE `court_sessions` (
  `session_id` bigint(20) NOT NULL,
  `case_id` bigint(20) DEFAULT NULL,
  `session_date` datetime NOT NULL,
  `court_name` varchar(255) NOT NULL,
  `hall_number` varchar(50) DEFAULT NULL,
  `status` enum('Scheduled','Completed','Postponed','Canceled') DEFAULT 'Scheduled',
  `decision_type` enum('Postponed','Final_Verdict','None') DEFAULT 'None',
  `session_decision` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `court_sessions`
--

INSERT INTO `court_sessions` (`session_id`, `case_id`, `session_date`, `court_name`, `hall_number`, `status`, `decision_type`, `session_decision`, `created_at`) VALUES
(1, 21, '2026-06-20 10:30:00', 'محكمة الاستئناف بالقاهرة', 'الدائرة 7', 'Completed', 'Final_Verdict', 'ew', '2026-05-09 14:06:21'),
(2, 24, '2026-05-10 14:34:00', 'محكمة شمال القاهرة', 'قاعة 2', 'Scheduled', 'None', NULL, '2026-05-10 11:34:32'),
(3, 1, '2026-05-10 16:42:00', 'محكمة شمال القاهرة', 'قاعة 1', 'Scheduled', 'None', NULL, '2026-05-10 13:43:19'),
(4, 22, '2026-05-10 16:45:00', 'قاعة شمال القاهرة', 'قاعة 3', 'Scheduled', 'None', NULL, '2026-05-10 13:46:04');

--
-- Triggers `court_sessions`
--
DELIMITER $$
CREATE TRIGGER `after_court_sessions_delete` AFTER DELETE ON `court_sessions` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'court_sessions', '[DELETE] Court Session', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_court_sessions_insert` AFTER INSERT ON `court_sessions` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'court_sessions', '[CREATE] Court Session', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_court_sessions_update` AFTER UPDATE ON `court_sessions` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'court_sessions', '[UPDATE] Court Session', 'DB_TRIGGER');
END
$$
DELIMITER ;

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

--
-- Dumping data for table `document`
--

INSERT INTO `document` (`document_id`, `file_path`, `created_at`, `user_id`, `case_id`) VALUES
(2, 'uploads\\1777622558822-81593389-نموذج_عقد_أتعاب_محاماة_LawLink.pdf', '2026-05-01 08:02:38', 11, 3),
(3, 'uploads\\1778008202890-293651336-Ø¥ÙØ°Ø§Ø±_Ø±Ø³ÙÙ_ÙØ³ØªÙØ¯_Ø¥Ø¶Ø§ÙÙ_LawLink.pdf', '2026-05-05 19:10:02', 13, 15),
(4, 'uploads\\1778011148467-997022969-ÙØ°ÙØ±Ø©_Ø¯ÙØ§Ø¹_ÙØ±Ù_ÙØ¶ÙØ©_LawLink.pdf', '2026-05-05 19:59:08', 13, 16),
(5, 'uploads\\1778057350914-421256165-ÙØ°ÙØ±Ø©_Ø¯ÙØ§Ø¹_ÙØ±Ù_ÙØ¶ÙØ©_LawLink.pdf', '2026-05-06 08:49:10', 13, 17),
(6, 'uploads\\1778060529810-182258410-ÙØ°ÙØ±Ø©_Ø¯ÙØ§Ø¹_ÙØ±Ù_ÙØ¶ÙØ©_LawLink.pdf', '2026-05-06 09:42:09', 14, 18),
(7, 'uploads\\1778060993441-595735892-Cybersecurity Challenges in Modern Business Information Systems.pdf', '2026-05-06 09:49:53', 15, 19),
(8, 'uploads\\1778250744922-393363313-Ø¥ÙØ°Ø§Ø±_Ø±Ø³ÙÙ_ÙØ³ØªÙØ¯_Ø¥Ø¶Ø§ÙÙ_LawLink.pdf', '2026-05-08 14:32:24', 15, 20),
(9, 'uploads\\1778363605265-154044561-criteria.pdf', '2026-05-09 21:53:25', 15, 23),
(10, 'uploads\\1778364269255-181483909-Ø¥ÙØ°Ø§Ø±_Ø±Ø³ÙÙ_ÙØ³ØªÙØ¯_Ø¥Ø¶Ø§ÙÙ_LawLink.pdf', '2026-05-09 22:04:29', 14, 24),
(11, 'uploads\\1778507584662-306867389-criteria.pdf', '2026-05-11 13:53:04', 15, 25);

--
-- Triggers `document`
--
DELIMITER $$
CREATE TRIGGER `after_document_delete` AFTER DELETE ON `document` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'document', '[DELETE] Document', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_document_insert` AFTER INSERT ON `document` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'document', '[CREATE] Document Uploaded', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_document_update` AFTER UPDATE ON `document` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'document', '[UPDATE] Document', 'DB_TRIGGER');
END
$$
DELIMITER ;

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
CREATE TRIGGER `after_feedback_delete` AFTER DELETE ON `feedback` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'feedback', '[DELETE] Feedback', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_feedback_insert` AFTER INSERT ON `feedback` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'feedback', '[CREATE] Feedback Submitted', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_feedback_update` AFTER UPDATE ON `feedback` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'feedback', '[UPDATE] Feedback', 'DB_TRIGGER');
END
$$
DELIMITER ;
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
-- Table structure for table `installments`
--

CREATE TABLE `installments` (
  `installment_id` int(11) NOT NULL,
  `case_id` bigint(20) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `amount_paid` decimal(10,2) DEFAULT 0.00,
  `status` varchar(50) DEFAULT 'Pending',
  `due_date` date NOT NULL,
  `paid_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `installments`
--

INSERT INTO `installments` (`installment_id`, `case_id`, `amount`, `amount_paid`, `status`, `due_date`, `paid_at`, `created_at`) VALUES
(1, 26, 500.00, 500.00, 'Paid', '2026-05-11', '2026-05-11 21:37:42', '2026-05-11 18:37:09'),
(2, 26, 500.00, 500.00, 'Paid', '2026-06-11', '2026-05-11 21:38:40', '2026-05-11 18:37:09'),
(3, 26, 500.00, 500.00, 'Paid', '2026-05-16', '2026-05-16 22:07:40', '2026-05-16 19:07:37'),
(4, 20, 1.00, 1.00, 'Paid', '2026-05-16', '2026-05-16 23:09:51', '2026-05-16 20:09:47'),
(5, 20, 1.00, 1.00, 'Paid', '2026-06-16', '2026-05-16 23:09:53', '2026-05-16 20:09:47'),
(6, 23, 62.50, 62.50, 'Paid', '2026-05-16', '2026-05-16 23:12:52', '2026-05-16 20:12:52'),
(7, 23, 62.50, 62.50, 'Paid', '2026-06-16', '2026-05-16 23:12:53', '2026-05-16 20:12:52'),
(8, 19, 10000.00, 10000.00, 'Paid', '2026-05-17', '2026-05-17 08:08:23', '2026-05-16 21:18:31'),
(9, 19, 10000.00, 0.00, 'Pending', '2026-06-17', NULL, '2026-05-16 21:18:31'),
(10, 19, 10000.00, 0.00, 'Pending', '2026-07-17', NULL, '2026-05-16 21:18:31'),
(11, 19, 10000.00, 0.00, 'Pending', '2026-08-17', NULL, '2026-05-16 21:18:31'),
(12, 19, 10000.00, 0.00, 'Pending', '2026-09-17', NULL, '2026-05-16 21:18:31'),
(13, 19, 10000.00, 10000.00, 'Paid', '2026-10-17', '2026-05-17 17:12:35', '2026-05-16 21:18:31'),
(14, 19, 10000.00, 0.00, 'Pending', '2026-11-17', NULL, '2026-05-16 21:18:31'),
(15, 19, 10000.00, 0.00, 'Pending', '2026-12-17', NULL, '2026-05-16 21:18:31'),
(16, 19, 10000.00, 10000.00, 'Paid', '2027-01-17', '2026-05-17 08:08:25', '2026-05-16 21:18:31'),
(17, 19, 10000.00, 0.00, 'Pending', '2027-02-17', NULL, '2026-05-16 21:18:31'),
(18, 27, 7500.00, 0.00, 'Pending', '2026-05-20', NULL, '2026-05-20 14:39:05'),
(19, 27, 7500.00, 0.00, 'Pending', '2026-06-20', NULL, '2026-05-20 14:39:05'),
(20, 27, 7500.00, 0.00, 'Pending', '2026-07-20', NULL, '2026-05-20 14:39:05'),
(21, 27, 7500.00, 0.00, 'Pending', '2026-08-20', NULL, '2026-05-20 14:39:05'),
(22, 27, 7500.00, 0.00, 'Pending', '2026-09-20', NULL, '2026-05-20 14:39:05'),
(23, 27, 7500.00, 0.00, 'Pending', '2026-10-20', NULL, '2026-05-20 14:39:05'),
(24, 27, 7500.00, 0.00, 'Pending', '2026-11-20', NULL, '2026-05-20 14:39:05'),
(25, 27, 7500.00, 0.00, 'Pending', '2026-12-20', NULL, '2026-05-20 14:39:05'),
(26, 27, 7500.00, 0.00, 'Pending', '2027-01-20', NULL, '2026-05-20 14:39:05'),
(27, 27, 7500.00, 0.00, 'Pending', '2027-02-20', NULL, '2026-05-20 14:39:05'),
(28, 27, 7500.00, 0.00, 'Pending', '2027-03-20', NULL, '2026-05-20 14:39:05'),
(29, 27, 7500.00, 0.00, 'Pending', '2027-04-20', NULL, '2026-05-20 14:39:05');

--
-- Triggers `installments`
--
DELIMITER $$
CREATE TRIGGER `after_installments_delete` AFTER DELETE ON `installments` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'installments', '[DELETE] Installment', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_installments_insert` AFTER INSERT ON `installments` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'installments', '[CREATE] Installment', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_installments_update` AFTER UPDATE ON `installments` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'installments', '[UPDATE] Installment', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `invoice_id` bigint(20) NOT NULL,
  `invoice_number` varchar(100) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `payment_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `invoices`
--

INSERT INTO `invoices` (`invoice_id`, `invoice_number`, `issue_date`, `payment_id`) VALUES
(1, 'INV-1778511173305', '2026-05-11', 20),
(2, 'INV-1778522389359', '2026-05-11', 21),
(3, 'INV-1778523464855', '2026-05-11', 22),
(4, 'INV-1778524319940', '2026-05-11', 23),
(5, 'INV-1778524662247', '2026-05-11', 24),
(6, 'INV-1778524720607', '2026-05-11', 25),
(7, 'INV-1778958460698', '2026-05-16', 26),
(8, 'INV-1778962191990', '2026-05-16', 27),
(9, 'INV-1778962193173', '2026-05-16', 28),
(10, 'INV-1778962372979', '2026-05-16', 29),
(11, 'INV-1778962373702', '2026-05-16', 30),
(12, 'INV-1778994503905', '2026-05-17', 31),
(13, 'INV-1778994505131', '2026-05-17', 32),
(14, 'INV-1779027155154', '2026-05-17', 33);

--
-- Triggers `invoices`
--
DELIMITER $$
CREATE TRIGGER `after_invoices_delete` AFTER DELETE ON `invoices` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'invoices', '[DELETE] Invoice', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_invoices_insert` AFTER INSERT ON `invoices` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'invoices', '[CREATE] Invoice Generated', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_invoices_update` AFTER UPDATE ON `invoices` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'invoices', '[UPDATE] Invoice', 'DB_TRIGGER');
END
$$
DELIMITER ;

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

--
-- Triggers `knowledge_base`
--
DELIMITER $$
CREATE TRIGGER `after_knowledge_base_delete` AFTER DELETE ON `knowledge_base` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'knowledge_base', '[DELETE] KB Article', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_knowledge_base_insert` AFTER INSERT ON `knowledge_base` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'knowledge_base', '[CREATE] KB Article', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_knowledge_base_update` AFTER UPDATE ON `knowledge_base` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'knowledge_base', '[UPDATE] KB Article', 'DB_TRIGGER');
END
$$
DELIMITER ;

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
(2, 1, 0.00, NULL, 15),
(6, 1, 0.00, 'L12345', 10),
(8, 1, 4.90, 'AAST-2026', 15),
(9, 1, 0.00, 'LC-9988', 7),
(11, 1, 0.00, 'LC-2026-XYZ', 12),
(16, 1, 0.00, NULL, 0);

--
-- Triggers `lawyer`
--
DELIMITER $$
CREATE TRIGGER `after_lawyer_delete` AFTER DELETE ON `lawyer` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer', '[DELETE] Lawyer Profile', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_lawyer_insert` AFTER INSERT ON `lawyer` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer', '[CREATE] Lawyer Profile', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_lawyer_update` AFTER UPDATE ON `lawyer` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer', '[UPDATE] Lawyer Profile', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `lawyer_office`
--

CREATE TABLE `lawyer_office` (
  `office_id` bigint(20) NOT NULL,
  `office_address` varchar(255) DEFAULT NULL,
  `lawyer_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `lawyer_office`
--

INSERT INTO `lawyer_office` (`office_id`, `office_address`, `lawyer_id`) VALUES
(1, 'القاهرة , ميدان الميريلاند, مصر الجديدة', 11),
(2, 'التجمع الخامس , شارع التسعين الجنوبي', 2);

--
-- Triggers `lawyer_office`
--
DELIMITER $$
CREATE TRIGGER `after_lawyer_office_delete` AFTER DELETE ON `lawyer_office` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer_office', '[DELETE] Office Link', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_lawyer_office_insert` AFTER INSERT ON `lawyer_office` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer_office', '[CREATE] Office Link', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_lawyer_office_update` AFTER UPDATE ON `lawyer_office` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer_office', '[UPDATE] Office Link', 'DB_TRIGGER');
END
$$
DELIMITER ;

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
(11, 'ال عامة'),
(11, 'ام'),
(11, 'عمالي'),
(11, 'مدني');

--
-- Triggers `lawyer_specializations`
--
DELIMITER $$
CREATE TRIGGER `after_lawyer_spec_delete` AFTER DELETE ON `lawyer_specializations` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer_specializations', '[DELETE] Lawyer Specialization', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_lawyer_spec_insert` AFTER INSERT ON `lawyer_specializations` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'lawyer_specializations', '[CREATE] Lawyer Specialization', 'DB_TRIGGER');
END
$$
DELIMITER ;

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

--
-- Triggers `message`
--
DELIMITER $$
CREATE TRIGGER `after_message_delete` AFTER DELETE ON `message` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'message', '[DELETE] Message', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_message_insert` AFTER INSERT ON `message` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'message', '[CREATE] Message Sent', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` bigint(20) NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `type` varchar(50) NOT NULL,
  `related_case_id` bigint(20) DEFAULT NULL,
  `sender_id` bigint(20) DEFAULT NULL,
  `receiver_id` bigint(20) NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `action_url` varchar(500) DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Triggers `notification`
--
DELIMITER $$
CREATE TRIGGER `after_notification_insert` AFTER INSERT ON `notification` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'notification', '[CREATE] Notification', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_notification_update` AFTER UPDATE ON `notification` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'notification', '[UPDATE] Notification Status', 'DB_TRIGGER');
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `payment_id` bigint(20) NOT NULL,
  `status` enum('Paid','Partial','Pending','Refunded') DEFAULT 'Pending',
  `currency` varchar(10) DEFAULT NULL,
  `amount` decimal(12,2) DEFAULT NULL CHECK (`amount` > 0),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `deleted_at` timestamp NULL DEFAULT NULL,
  `client_id` bigint(20) DEFAULT NULL,
  `case_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`payment_id`, `status`, `currency`, `amount`, `created_at`, `deleted_at`, `client_id`, `case_id`) VALUES
(1, 'Paid', 'EGP', 1000.00, '2026-05-01 09:02:04', NULL, 13, 3),
(2, 'Refunded', 'EGP', 5000.00, '2026-05-01 09:02:38', NULL, 13, 3),
(3, 'Refunded', 'EGP', 5000.00, '2026-05-01 09:03:25', NULL, 13, 3),
(4, 'Refunded', 'EGP', 5000.00, '2026-05-01 09:05:38', NULL, 13, 3),
(5, 'Refunded', 'EGP', 100.00, '2026-05-01 11:28:15', NULL, 13, 1),
(6, 'Paid', 'EGP', 2000.00, '2026-05-01 12:00:07', NULL, 13, 1),
(7, 'Partial', 'EGP', 4000.00, '2026-05-05 19:38:54', NULL, 13, 9),
(8, 'Partial', 'EGP', 4000.00, '2026-05-05 19:44:18', NULL, 13, 9),
(9, 'Partial', 'EGP', NULL, '2026-05-05 19:44:47', NULL, 13, 10),
(10, 'Partial', 'EGP', 5000.00, '2026-05-05 19:50:42', NULL, 13, 15),
(11, 'Partial', 'EGP', 1000.00, '2026-05-05 20:00:38', NULL, 13, 16),
(12, 'Partial', 'EGP', 2000.00, '2026-05-06 08:52:47', NULL, 13, 17),
(13, 'Partial', 'EGP', 1000.00, '2026-05-06 09:45:41', NULL, 14, 18),
(14, 'Partial', 'EGP', 2000.00, '2026-05-08 15:22:56', NULL, 15, 21),
(15, 'Partial', 'EGP', 1000.00, '2026-05-08 15:36:52', NULL, 15, 22),
(16, 'Partial', 'EGP', 100.00, '2026-05-09 21:55:17', NULL, 15, 23),
(17, 'Partial', 'EGP', 100.00, '2026-05-09 22:06:14', NULL, 14, 24),
(20, '', 'EGP', 6000.00, '2026-05-11 14:52:53', NULL, 15, 25),
(21, '', 'EGP', 1000.00, '2026-05-11 17:59:49', NULL, 15, 22),
(22, '', 'EGP', 100.00, '2026-05-11 18:17:44', NULL, 14, 24),
(23, '', 'EGP', 100.00, '2026-05-11 18:31:59', NULL, 14, 24),
(24, '', 'EGP', 500.00, '2026-05-11 18:37:42', NULL, 14, 26),
(25, '', 'EGP', 500.00, '2026-05-11 18:38:40', NULL, 14, 26),
(26, 'Paid', 'EGP', 500.00, '2026-05-16 19:07:40', NULL, 14, 26),
(27, 'Paid', 'EGP', 1.00, '2026-05-16 20:09:51', NULL, 15, 20),
(28, 'Paid', 'EGP', 1.00, '2026-05-16 20:09:53', NULL, 15, 20),
(29, 'Paid', 'EGP', 62.50, '2026-05-16 20:12:52', NULL, 15, 23),
(30, 'Paid', 'EGP', 62.50, '2026-05-16 20:12:53', NULL, 15, 23),
(31, 'Paid', 'EGP', 10000.00, '2026-05-17 05:08:23', NULL, 15, 19),
(32, 'Paid', 'EGP', 10000.00, '2026-05-17 05:08:25', NULL, 15, 19),
(33, 'Paid', 'EGP', 10000.00, '2026-05-17 14:12:35', NULL, 15, 19);

--
-- Triggers `payment`
--
DELIMITER $$
CREATE TRIGGER `after_payment_insert` AFTER INSERT ON `payment` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'payment', '[CREATE] Payment Transaction', 'DB_TRIGGER');
END
$$
DELIMITER ;

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

--
-- Triggers `task`
--
DELIMITER $$
CREATE TRIGGER `after_task_delete` AFTER DELETE ON `task` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'task', '[DELETE] Task', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_task_insert` AFTER INSERT ON `task` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'task', '[CREATE] Task', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_task_update` AFTER UPDATE ON `task` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'task', '[UPDATE] Task', 'DB_TRIGGER');
END
$$
DELIMITER ;

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
(2, 'سارة الحلي', 'Lawyer', '2026-03-11 23:05:05', 'sara.lawyer@gmail.com', '$2b$10$WELOwn.9EUCjDRYxJUlr9OcaFvlVJSLgX2U42Oq9FGk13lZdNNRzK', 'أنثى', '01011599422', 'https://xsgames.co/randomusers/assets/avatars/female/2.jpg', '01016629430', NULL, NULL),
(3, 'محمد خالد', 'Client', '2026-03-11 23:05:05', 'm.client@gmail.com', '', 'ذكر', '01555554444', NULL, NULL, NULL, NULL),
(4, 'محمود', 'Client', '2026-03-12 21:58:41', '', '', NULL, '01091676855', NULL, NULL, NULL, NULL),
(6, 'المحامي أحمد رأفت', 'Lawyer', '2026-04-01 21:34:08', 'ahmed.lawyer@lawlink.com', '', 'ذكر', '01099887766', 'https://xsgames.co/randomusers/assets/avatars/male/6.jpg', NULL, NULL, '1985-05-20'),
(8, 'محمود BIS', 'Lawyer', '2026-04-01 22:27:25', 'mahmoud.test@aast.edu', '$2b$10$HRDofN77Y8M2KBasUAq6SeWJSLHLwaMaxp2WRMVMXDFwlkBXXYDZe', 'ذكر', '01001122334', 'https://xsgames.co/randomusers/assets/avatars/male/8.jpg', NULL, NULL, '2002-05-15'),
(9, 'محمود خالد', 'Lawyer', '2026-04-01 22:34:07', 'mahmoud.test2026@aast.edu', '$2b$10$zkoehbxTKKutbua4Uuy5DuWru5C6ghhDvPwFscvefiut5.5tFu5le', 'ذكر', '01022334455', 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg', NULL, NULL, '2000-05-20');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(11, 'يوسف علي', 'Lawyer', '2026-04-11 15:54:55', 'youssef.law@aast.edu', '$2b$10$c4ewKWXzuN59qEwg.FKtau/Yz2DJIme/2a/yfmlwUSwkVN.aafY7S', 'ذكر', '', 'data:image/jpeg;base64,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////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAAzcAAAAGAAAAAAAAAAAAAAEAAAABAAAAAAEANwAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAABAAAAAQAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAQAAAAAAAG51bGwAAAACAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAQAAAAAAUmdodGxvbmcAAAEAAAAABnNsaWNlc1ZsTHMAAAABT2JqYwAAAAEAAAAAAAVzbGljZQAAABIAAAAHc2xpY2VJRGxvbmcAAAAAAAAAB2dyb3VwSURsb25nAAAAAAAAAAZvcmlnaW5lbnVtAAAADEVTbGljZU9yaWdpbgAAAA1hdXRvR2VuZXJhdGVkAAAAAFR5cGVlbnVtAAAACkVTbGljZVR5cGUAAAAASW1nIAAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAEAAAAAAFJnaHRsb25nAAABAAAAAAN1cmxURVhUAAAAAQAAAAAAAG51bGxURVhUAAAAAQAAAAAAAE1zZ2VURVhUAAAAAQAAAAAABmFsdFRhZ1RFWFQAAAABAAAAAAAOY2VsbFRleHRJc0hUTUxib29sAQAAAAhjZWxsVGV4dFRFWFQAAAABAAAAAAAJaG9yekFsaWduZW51bQAAAA9FU2xpY2VIb3J6QWxpZ24AAAAHZGVmYXVsdAAAAAl2ZXJ0QWxpZ25lbnVtAAAAD0VTbGljZVZlcnRBbGlnbgAAAAdkZWZhdWx0AAAAC2JnQ29sb3JUeXBlZW51bQAAABFFU2xpY2VCR0NvbG9yVHlwZQAAAABOb25lAAAACXRvcE91dHNldGxvbmcAAAAAAAAACmxlZnRP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cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJCQTM1Qjk4OTY0RkVBNzMwNUFBRUIzOTA4RUQzMkJCRCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpmYzhjMjM1Ny0zNTkzLTQzOTMtODdkOC0yMjdhNzNmZDEyNmIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iQkEzNUI5ODk2NEZFQTczMDVBQUVCMzkwOEVEMzJCQkQiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMyIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMjItMDMtMjVUMDk6MjI6MTkrMDE6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDIyLTAzLTI1VDE0OjIxOjQzKzAxOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDIyLTAzLTI1VDE0OjIxOjQzKzAxOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZmM4YzIzNTctMzU5My00MzkzLTg3ZDgtMjI3YTczZmQxMjZiIiBzdEV2dDp3aGVuPSIyMDIyLTAzLTI1VDE0OjIxOjQzKzAxOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjEuMiAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAg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', '', NULL, '1998-10-12');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(12, 'Mahmoud Khaled SA', 'Admin', '2026-04-13 13:16:34', 'mahmoud.admin.2026@lawlink.com', '$2b$10$X70EFPHHA57VUBw6VZOhpuL0biWGH3Bx4ZZyGFL/qgye4KSVMDqxa', 'ذكر', '01099887766', NULL, NULL, NULL, '1995-01-01');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(13, 'أحمد العميل التجريبي', 'Client', '2026-04-13 14:00:24', 'ahmed.client@lawlink.com', '$2b$10$oYMeEzQ5wMuqT8HYyvP0eOAMEXheUHlWBKNPl1Ih03SFEPFkVb0Ce', 'ذكر', '01511599422', 'data:image/jpeg;base64,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', '01016629430', NULL, '1998-10-04');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(14, 'محمد خالد مصطفي', 'Client', '2026-05-05 10:14:15', 'm.slama06028@student.aast.edu', '$2b$10$ctmblzf1V6FEt97HZP8LteiE8T8N68davRUPJ2nSU4lGlivm1ymxK', 'ذكر', '01011599422', 'data:image/jpeg;base64,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', '01000202124', NULL, '2005-01-08');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(15, 'malak mekkawy', 'Client', '2026-05-06 09:34:50', 'malak@gmail.com', '$2b$10$jjGMeRRP5R5oY6JFX/07x.T7OvTdTQw2HDmWr748XLbLW0MPZ3peW', 'أنثى', '0123456456', NULL, '015225154', NULL, '2001-12-08');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(16, 'Hassan Mohamed Khaled', 'Lawyer', '2026-05-19 21:18:50', 'hassan.m.k@gmail.com', '$2b$10$Jk2M6N4T2W76aVaPTc0nvuXBGEWCNFsYFkOZVlEY8knFIcQh6Ru8q', 'ذكر', '01005748374', 'data:image/jpeg;base64,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AAAAAAAAP4AAADhCSU0EDQAAAAAABAAAAB44QklNBBkAAAAAAAQAAAAeOEJJTQPzAAAAAAAJAAAAAAAAAAABADhCSU0nEAAAAAAACgABAAAAAAAAAAI4QklNA/UAAAAAAEgAL2ZmAAEAbGZmAAYAAAAAAAEAL2ZmAAEAoZmaAAYAAAAAAAEAMgAAAAEAWgAAAAYAAAAAAAEANQAAAAEALQAAAAYAAAAAAAE4QklNA/gAAAAAAHAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAOEJJTQQIAAAAAAAQAAAAAQAAAkAAAAJAAAAAADhCSU0EHgAAAAAABAAAAAA4QklNBBoAAAAAAzkAAAAGAAAAAAAAAAAAAAEAAAABAAAAAAIAMQA1AAAAAQAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAEAAAABAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAABAAAAABAAAAAAAAbnVsbAAAAAIAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAABAAAAAABSZ2h0bG9uZwAAAQAAAAAGc2xpY2VzVmxMcwAAAAFPYmpjAAAAAQAAAAAABXNsaWNlAAAAEgAAAAdzbGljZUlEbG9uZwAAAAAAAAAHZ3JvdXBJRGxvbmcAAAAAAAAABm9yaWdpbmVudW0AAAAMRVNsaWNlT3JpZ2luAAAADWF1dG9HZW5lcmF0ZWQAAAAAVHlwZWVudW0AAAAKRVNsaWNlVHlwZQAAAABJbWcgAAAABmJvdW5kc09iamMAAAABAAAAAAAAUmN0MQAAAAQAAAAAVG9wIGxvbmcAAAAAAAAAAExlZnRsb25nAAAAAAAAAABCdG9tbG9uZwAAAQAAAAAAUmdodGxvbmcAAAEAAAAAA3VybFRFWFQAAAABAAAAAAAAbnVsbFRFWFQAAAABAAAAAAAATXNnZVRFWFQAAAABAAAAAAAGYWx0VGFnVEVYVAAAAAEAAAAA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DNhodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9IjQ4MEM2QTE3NTA5QjE3QzVDREU0MDVDQUVGNDQ5QUNDIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOmMyNzBmMjA5LWI4ZGEtNGZhZS05YjM1LWZmMzE2YTYyOTJiNSIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSI0ODBDNkExNzUwOUIxN0M1Q0RFNDA1Q0FFRjQ0OUFDQyIgZGM6Zm9ybWF0PSJpbWFnZS9qcGVnIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyMi0wMy0yNVQwOToyMTo0MyswMTowMCIgeG1wOk1vZGlmeURhdGU9IjIwMjItMDMtMjVUMTQ6MjA6NTYrMDE6MDAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjItMDMtMjVUMTQ6MjA6NTYrMDE6MDAiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpjMjcwZjIwOS1iOGRhLTRmYWUtOWIzNS1mZjMxNmE2MjkyYjUiIHN0RXZ0OndoZW49IjIwMjItMDMtMjVUMTQ6MjA6NTYrMDE6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCAyMS4yIChNYWNpbnRvc2gpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGRAAAAAAf/bAIQAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQICAgICAgICAgICAwMDAwMDAwMDAwEBAQEBAQEBAQEBAgIBAgIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMD/8AAEQgBAAEAAwERAAIRAQMRAf/dAAQAIP/EAaIAAAAGAgMBAAAAAAAAAAAAAAcIBgUECQMKAgEACwEAAAYDAQEBAAAAAAAAAAAABgUEAwcCCAEJAAoLEAACAQMEAQMDAgMDAwIGCXUBAgMEEQUSBiEHEyIACDEUQTIjFQlRQhZhJDMXUnGBGGKRJUOhsfAmNHIKGcHRNSfhUzaC8ZKiRFRz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', NULL, NULL, '1968-06-12');
INSERT INTO `users` (`user_id`, `name`, `role`, `created_at`, `email`, `password`, `gender`, `Phone_no1`, `image_url`, `Phone_no2`, `deleted_at`, `Date_of_Birth`) VALUES
(17, 'Mahmoud Hassan Khaled', 'Client', '2026-05-19 21:39:07', 'mahmoud.h.k@gmail.com', '$2b$10$M/QFDvkmaPUpnL7cXBAeKumONvkb022z/M4pR5oh24/We7lMWQA8e', 'ذكر', '01004356789', NULL, NULL, NULL, '2026-04-27'),
(20, 'Mohamed khaled AAT', 'Admin', '2026-05-26 07:33:27', 'mk_aat@lawlink.com', '$2b$10$kH6K0U71jkCCcaxnMoWHAOFBx1RpbozVH6GAwchZjLmKMYAGTdJsa', 'Male', '01005430000', NULL, NULL, NULL, NULL),
(21, 'Mohamed khaled AsAT', 'Admin', '2026-05-30 17:40:23', 'mk_aast@lawlink.com', '$2b$10$5RjVjmIQ35CF5jDUWvNKoejvXuCUDG1VVEZglKghD.xXWGbLNKipy', 'Male', '01005430005', NULL, NULL, NULL, NULL),
(22, 'Mahmoud khaled ', 'Admin', '2026-05-31 14:19:36', 'mk_admin_l2@lawlink.com', '$2b$10$iJZrpxUALKtjxgagU8GUPuwws9opsSBV7lT5Sodh8dek0FH8rgVFG', 'Male', '01005438005', NULL, NULL, NULL, NULL);

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
DELIMITER $$
CREATE TRIGGER `after_users_delete` AFTER DELETE ON `users` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'users', '[DELETE] User Account', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_users_insert` AFTER INSERT ON `users` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'users', '[CREATE] User Account', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_users_update` AFTER UPDATE ON `users` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'users', '[UPDATE] User Profile', 'DB_TRIGGER');
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
-- Dumping data for table `wallet`
--

INSERT INTO `wallet` (`wallet_id`, `balance`, `currency`, `user_id`) VALUES
(1, 4302.00, 'EGP', 11),
(7, 100.00, 'EGP', 13),
(9, 20725.00, 'EGP', 2),
(11, NULL, 'EGP', 9),
(20, 6000.00, 'EGP', 8);

--
-- Triggers `wallet`
--
DELIMITER $$
CREATE TRIGGER `after_wallet_insert` AFTER INSERT ON `wallet` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'wallet', '[CREATE] Wallet', 'DB_TRIGGER');
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_wallet_update` AFTER UPDATE ON `wallet` FOR EACH ROW BEGIN
    INSERT INTO activity_log (user_id, table_name, action, ip_address)
    VALUES (IFNULL(@current_user_id, null), 'wallet', '[UPDATE] Wallet Balance', 'DB_TRIGGER');
END
$$
DELIMITER ;

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
-- Indexes for table `court_sessions`
--
ALTER TABLE `court_sessions`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `fk_court_session_case` (`case_id`);

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
-- Indexes for table `installments`
--
ALTER TABLE `installments`
  ADD PRIMARY KEY (`installment_id`),
  ADD KEY `idx_case_id` (`case_id`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
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
  ADD KEY `related_case_id` (`related_case_id`),
  ADD KEY `sender_id` (`sender_id`),
  ADD KEY `receiver_id` (`receiver_id`);

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
  MODIFY `log_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4750;

--
-- AUTO_INCREMENT for table `ai_tools`
--
ALTER TABLE `ai_tools`
  MODIFY `ai_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `appointment`
--
ALTER TABLE `appointment`
  MODIFY `appointment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `calls`
--
ALTER TABLE `calls`
  MODIFY `call_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cases`
--
ALTER TABLE `cases`
  MODIFY `case_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `court_sessions`
--
ALTER TABLE `court_sessions`
  MODIFY `session_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `document`
--
ALTER TABLE `document`
  MODIFY `document_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `installments`
--
ALTER TABLE `installments`
  MODIFY `installment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `invoices`
--
ALTER TABLE `invoices`
  MODIFY `invoice_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `knowledge_base`
--
ALTER TABLE `knowledge_base`
  MODIFY `knowledge_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lawyer_office`
--
ALTER TABLE `lawyer_office`
  MODIFY `office_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
  MODIFY `payment_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `task_id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `wallet_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
-- Constraints for table `court_sessions`
--
ALTER TABLE `court_sessions`
  ADD CONSTRAINT `court_sessions_ibfk_1` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

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
-- Constraints for table `installments`
--
ALTER TABLE `installments`
  ADD CONSTRAINT `fk_installments_cases` FOREIGN KEY (`case_id`) REFERENCES `cases` (`case_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`payment_id`);

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
  ADD CONSTRAINT `notification_ibfk_1` FOREIGN KEY (`related_case_id`) REFERENCES `cases` (`case_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notification_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL,
  ADD CONSTRAINT `notification_ibfk_3` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

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
