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

-- Get Client Enrollments Procedure
CREATE PROCEDURE GetClientEnrollments(
  IN p_client_id VARCHAR(36))
BEGIN
  SELECT 
    p.id AS program_id,
    p.name AS program_name,
    e.enrolled_at
  FROM enrollments e
  INNER JOIN programs p ON e.program_id = p.id
  WHERE e.client_id = p_client_id;
END $$

DELIMITER;  