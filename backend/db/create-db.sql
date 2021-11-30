DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE IF NOT EXISTS groupomania;
USE groupomania;

DROP TABLE IF EXISTS user;

CREATE TABLE IF NOT EXISTS user
    (
        id         INT PRIMARY KEY auto_increment, 
        username   VARCHAR(25) UNIQUE NOT NULL, 
        password   CHAR(60) NOT NULL, 
        first_name VARCHAR(50) NOT NULL, 
        last_name  VARCHAR(50) NOT NULL,
        profile_picture VARCHAR(200) NOT NULL DEFAULT 'http://localhost:3200/images/generic.jpeg', 
        job        VARCHAR(50) NOT NULL,
        email      VARCHAR(100) UNIQUE NOT NULL, 
        role       ENUM('Admin', 'SuperUser') DEFAULT 'SuperUser', 
        age        INT(11) DEFAULT 0 
    );