-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 19, 2020 at 12:40 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hospital`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(65) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`, `name`) VALUES
(1, 'ritambalco@gmail.com', '$2y$10$0XwiUHHJuS35eNA80CqGYulI4g/0q33KzFKcEprBZqPaNGc5gfigW', 'Ritam'),
(3, 'beardcoder.roy@gmail.com', '$2y$10$3uRE9dHRmEYKjTn337xO8.rzZDn3iFmYgq5lI/17vfTqyem9kwBXa', 'Ankit');

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `postId` int(11) NOT NULL,
  `doctorId` int(11) NOT NULL,
  `remarks` text NOT NULL,
  `patientId` int(11) NOT NULL,
  `confirmed` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`id`, `date`, `time`, `postId`, `doctorId`, `remarks`, `patientId`, `confirmed`) VALUES
(1, '2020-09-18', '11:00:00', 3, 3, '', 1004, -1),
(2, '2020-09-18', '14:00:00', -1, 3, 'Hello doc!', 1004, 1),
(3, '2020-09-18', '14:15:00', -1, 3, 'My treatment..', 1004, 0),
(4, '2020-09-19', '12:00:00', -1, 4, 'booked', 1004, 2);

-- --------------------------------------------------------

--
-- Table structure for table `doctor-posts`
--

CREATE TABLE `doctor-posts` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor-posts`
--

INSERT INTO `doctor-posts` (`id`, `name`, `description`) VALUES
(-1, 'All', 'Any available doctor is appointed'),
(3, 'MBBS', 'General Doctor Post'),
(6, 'MD', 'A doctor with specialisation');

-- --------------------------------------------------------

--
-- Table structure for table `doctor-remarks`
--

CREATE TABLE `doctor-remarks` (
  `id` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `doctorId` int(11) NOT NULL,
  `remarks` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctor-remarks`
--

INSERT INTO `doctor-remarks` (`id`, `patientId`, `doctorId`, `remarks`) VALUES
(4, 1004, 4, 'Just another test remark!');

-- --------------------------------------------------------

--
-- Table structure for table `doctors`
--

CREATE TABLE `doctors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(65) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `postId` int(11) NOT NULL,
  `fees` int(11) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `experience` int(11) NOT NULL,
  `open_time` time NOT NULL,
  `close_time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `doctors`
--

INSERT INTO `doctors` (`id`, `name`, `email`, `password`, `gender`, `postId`, `fees`, `mobile`, `experience`, `open_time`, `close_time`) VALUES
(3, 'Ankit Roy', 'beardcoder.roy@gmail.com', '$2y$10$BMBtyO3Xn4sOLMyFExHD3uQjnRrPQ7b2y3kGaNt4pITvFd7o45bka', 'male', 3, 2000, '8888888888', 2, '09:00:00', '15:00:00'),
(4, 'Deba', 'deba@gmail.com', '$2y$10$QUFEMdGGlCyvEUi/XVc/auCsq2faErQFvDr/xsnEuY8tBlb3ijFKy', 'female', 6, 1000, '9999999999', 2, '09:00:00', '12:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `medicine-unit`
--

CREATE TABLE `medicine-unit` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicine-unit`
--

INSERT INTO `medicine-unit` (`id`, `type`) VALUES
(2, 'INJECTION'),
(1, 'ORAL');

-- --------------------------------------------------------

--
-- Table structure for table `medicines`
--

CREATE TABLE `medicines` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `type` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `medicines`
--

INSERT INTO `medicines` (`id`, `name`, `description`, `type`, `quantity`) VALUES
(2, 'Benadryl', 'for cough', 'ORAL', 75),
(3, 'Paracetamol', 'for fever, headache', 'INJECTION', 770),
(5, 'Paracetamol', '...', 'ORAL', 100);

-- --------------------------------------------------------

--
-- Table structure for table `patient`
--

CREATE TABLE `patient` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(65) NOT NULL,
  `name` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `mobile` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `image` varchar(255) NOT NULL DEFAULT 'uploads/default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `patient`
--

INSERT INTO `patient` (`id`, `email`, `password`, `name`, `dob`, `gender`, `mobile`, `address`, `image`) VALUES
(1004, 'ritambalco@gmail.com', '$2y$10$dMgDNjcKDEdq7xNCXa6VeOqWbuPelX2Y4a89N3w2uqltuvilCFOG2', 'Ritam', '1999-10-18', 'male', '7898789574', 'Bhubaneswar', 'uploads/3370-WhatsApp Image 2020-09-08 at 19.51.48.jpeg');

-- --------------------------------------------------------

--
-- Table structure for table `prescriptions`
--

CREATE TABLE `prescriptions` (
  `id` int(11) NOT NULL,
  `doctorId` int(11) NOT NULL,
  `patientId` int(11) NOT NULL,
  `appointmentId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(63) NOT NULL,
  `quantity` int(11) NOT NULL,
  `description` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `prescriptions`
--

INSERT INTO `prescriptions` (`id`, `doctorId`, `patientId`, `appointmentId`, `name`, `type`, `quantity`, `description`) VALUES
(3, 4, 1004, 4, 'Benadryl', 'ORAL', 5, 'for cough'),
(4, 4, 1004, 4, 'Paracetamol', 'INJECTION', 10, 'for fever');

-- --------------------------------------------------------

--
-- Table structure for table `receptionist`
--

CREATE TABLE `receptionist` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(65) NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `receptionist`
--

INSERT INTO `receptionist` (`id`, `name`, `email`, `password`, `dob`, `gender`) VALUES
(1, 'Ritam', 'ritam@brocodedevs.online', '$2y$10$gzHtkUWS3htjewK6Q3tS6ewDS8dZJgMF0ZzuxXFZL2mts5tm2twO2', '1999-10-18', 'male'),
(4, 'Ankit', 'beardcoder.roy@gmail.com', '$2y$10$SwEM5Xf5djY.MCHCTCf1G.WHBDXX2gKoKYGGAFvkHU6bs662b4g1G', '2020-08-04', 'male');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`id`, `image`) VALUES
(8, 'uploads/2978-doctor.jpg'),
(9, 'uploads/5490-staff-login.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctor-posts`
--
ALTER TABLE `doctor-posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `doctor-remarks`
--
ALTER TABLE `doctor-remarks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doctors`
--
ALTER TABLE `doctors`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `medicine-unit`
--
ALTER TABLE `medicine-unit`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `type` (`type`);

--
-- Indexes for table `medicines`
--
ALTER TABLE `medicines`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`,`type`);

--
-- Indexes for table `patient`
--
ALTER TABLE `patient`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `prescriptions`
--
ALTER TABLE `prescriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `receptionist`
--
ALTER TABLE `receptionist`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctor-posts`
--
ALTER TABLE `doctor-posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `doctor-remarks`
--
ALTER TABLE `doctor-remarks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `doctors`
--
ALTER TABLE `doctors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medicine-unit`
--
ALTER TABLE `medicine-unit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `medicines`
--
ALTER TABLE `medicines`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `patient`
--
ALTER TABLE `patient`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1005;

--
-- AUTO_INCREMENT for table `prescriptions`
--
ALTER TABLE `prescriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `receptionist`
--
ALTER TABLE `receptionist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
