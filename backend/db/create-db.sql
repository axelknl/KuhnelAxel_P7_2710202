DROP DATABASE IF EXISTS groupomania2;
CREATE DATABASE IF NOT EXISTS groupomania2;
USE groupomania2;

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(25) NOT NULL,
  `password` char(60) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `profile_picture` varchar(200) NOT NULL DEFAULT 'http://localhost:3200/images/generic.jpeg',
  `job` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` enum('Admin','SuperUser') DEFAULT 'SuperUser',
  `age` int DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
);

DROP TABLE IF EXISTS `post`;

CREATE TABLE `post` (
  `id` int NOT NULL AUTO_INCREMENT,
  `picture` varchar(250) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `likeNbr` int DEFAULT '0',
  `user_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_id` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
);

DROP TABLE IF EXISTS `liked`;

CREATE TABLE `liked` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `like_user` int DEFAULT NULL,
  `like_post` int DEFAULT NULL,
  PRIMARY KEY (`like_id`),
  KEY `fk_like_user` (`like_user`),
  KEY `fk_like_post` (`like_post`),
  CONSTRAINT `fk_like_post` FOREIGN KEY (`like_post`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_like_user` FOREIGN KEY (`like_user`) REFERENCES `user` (`id`)
);

DROP TABLE IF EXISTS `comment`;

CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `comment_message` varchar(255) NOT NULL,
  `comment_date` date DEFAULT NULL,
  `comment_user` int DEFAULT NULL,
  `comment_post` int DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `fk_comment_user` (`comment_user`),
  KEY `fk_comment_post` (`comment_post`),
  CONSTRAINT `fk_comment_post` FOREIGN KEY (`comment_post`) REFERENCES `post` (`id`),
  CONSTRAINT `fk_comment_user` FOREIGN KEY (`comment_user`) REFERENCES `user` (`id`)
);