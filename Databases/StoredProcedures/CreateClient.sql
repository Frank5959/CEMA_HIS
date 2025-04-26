-- Active: 1745649794355@@127.0.0.1@3306@cema_his
DELIMITER $$
CREATE PROCEDURE CreateClient(
  IN p_name VARCHAR(255),
  IN p_contact_info VARCHAR(255))
BEGIN
  INSERT INTO clients (name, contact_info)
  VALUES (p_name, p_contact_info);
  
  SELECT * FROM clients 
  WHERE id = LAST_INSERT_ID();
END $$

DELIMITER;  