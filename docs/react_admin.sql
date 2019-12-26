-- --------------------------------------------------------
-- 主机:                           192.168.0.100
-- 服务器版本:                        10.3.7-MariaDB - Source distribution
-- 服务器操作系统:                      Linux
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 react_admin 的数据库结构
DROP DATABASE IF EXISTS `react_admin`;
CREATE DATABASE IF NOT EXISTS `react_admin` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `react_admin`;

-- 导出  表 react_admin.hibernate_sequences 结构
DROP TABLE IF EXISTS `hibernate_sequences`;
CREATE TABLE IF NOT EXISTS `hibernate_sequences` (
  `sequence_name` varchar(255) NOT NULL,
  `next_val` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`sequence_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  react_admin.hibernate_sequences 的数据：0 rows
DELETE FROM `hibernate_sequences`;
/*!40000 ALTER TABLE `hibernate_sequences` DISABLE KEYS */;
INSERT INTO `hibernate_sequences` (`sequence_name`, `next_val`) VALUES
	('t_auth', 201),
	('t_role', 151);
/*!40000 ALTER TABLE `hibernate_sequences` ENABLE KEYS */;

-- 导出  表 react_admin.t_auth 结构
DROP TABLE IF EXISTS `t_auth`;
CREATE TABLE IF NOT EXISTS `t_auth` (
  `id` bigint(20) NOT NULL,
  `auth` varchar(50) NOT NULL,
  `name` varchar(255) NOT NULL,
  `pid` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  react_admin.t_auth 的数据：0 rows
DELETE FROM `t_auth`;
/*!40000 ALTER TABLE `t_auth` DISABLE KEYS */;
INSERT INTO `t_auth` (`id`, `auth`, `name`, `pid`) VALUES
	(1, 'index', '全局权限', NULL),
	(52, '/auth/index', '权限管理', 1),
	(53, '/auth/add', '新增权限', 52),
	(54, '/auth/edit', '编辑权限', 52),
	(55, '/auth/delete', '删除权限', 52),
	(102, '/manager/index', '员工管理', 1),
	(103, '/manager/add', '新增员工', 102),
	(104, '/manager/edit', '编辑员工', 102),
	(105, '/manager/delete', '删除员工', 102),
	(106, '/role/index', '角色管理', 1),
	(107, '/role/add', '新增角色', 106),
	(108, '/role/edit', '编辑角色', 106),
	(109, '/role/delete', '删除角色', 106);
/*!40000 ALTER TABLE `t_auth` ENABLE KEYS */;

-- 导出  表 react_admin.t_manager 结构
DROP TABLE IF EXISTS `t_manager`;
CREATE TABLE IF NOT EXISTS `t_manager` (
  `id` bigint(20) NOT NULL,
  `password` varchar(50) NOT NULL,
  `role` bigint(20) NOT NULL,
  `status` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  react_admin.t_manager 的数据：0 rows
DELETE FROM `t_manager`;
/*!40000 ALTER TABLE `t_manager` DISABLE KEYS */;
INSERT INTO `t_manager` (`id`, `password`, `role`, `status`, `username`, `name`) VALUES
	(1, 'admin', 1, 'ENABLE', 'admin', 'ADMIN');
/*!40000 ALTER TABLE `t_manager` ENABLE KEYS */;

-- 导出  表 react_admin.t_role 结构
DROP TABLE IF EXISTS `t_role`;
CREATE TABLE IF NOT EXISTS `t_role` (
  `id` bigint(20) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  react_admin.t_role 的数据：0 rows
DELETE FROM `t_role`;
/*!40000 ALTER TABLE `t_role` DISABLE KEYS */;
INSERT INTO `t_role` (`id`, `description`, `name`) VALUES
	(1, 'SUPER管理员', 'SUPER管理员');
/*!40000 ALTER TABLE `t_role` ENABLE KEYS */;

-- 导出  表 react_admin.t_role_auth 结构
DROP TABLE IF EXISTS `t_role_auth`;
CREATE TABLE IF NOT EXISTS `t_role_auth` (
  `auth` bigint(20) NOT NULL,
  `role` bigint(20) NOT NULL,
  PRIMARY KEY (`auth`,`role`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- 正在导出表  react_admin.t_role_auth 的数据：0 rows
DELETE FROM `t_role_auth`;
/*!40000 ALTER TABLE `t_role_auth` DISABLE KEYS */;
INSERT INTO `t_role_auth` (`auth`, `role`) VALUES
	(1, 1),
	(52, 1),
	(53, 1),
	(54, 1),
	(55, 1),
	(102, 1),
	(103, 1),
	(104, 1),
	(105, 1),
	(106, 1),
	(107, 1),
	(108, 1),
	(109, 1);
/*!40000 ALTER TABLE `t_role_auth` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
