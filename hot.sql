/*
 Navicat Premium Data Transfer

 Source Server         : myCentos
 Source Server Type    : MySQL
 Source Server Version : 80019
 Source Host           : 192.168.111.111:3306
 Source Schema         : mydb

 Target Server Type    : MySQL
 Target Server Version : 80019
 File Encoding         : 65001

 Date: 12/12/2020 15:54:24
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hot
-- ----------------------------
DROP TABLE IF EXISTS `hot`;
CREATE TABLE `hot`  (
  `hot_id` bigint(0) NOT NULL AUTO_INCREMENT,
  `hot_content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `hot_count` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` timestamp(0) NULL DEFAULT NULL,
  `update_time` timestamp(0) NULL DEFAULT NULL,
  PRIMARY KEY (`hot_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
