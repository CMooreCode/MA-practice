CREATE DATABASE IF NOT EXISTS madb;
USE madb;
CREATE TABLE IF NOT EXISTS users (id INT NOT NULL AUTO_INCREMENT, username NVARCHAR(50), password NVARCHAR(255), PRIMARY KEY (id));
INSERT INTO users (username, password) VALUES ('test', 'test');