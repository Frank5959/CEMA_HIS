DELIMITER $$

CREATE PROCEDURE EnrollClient(
  IN p_client_id VARCHAR(36),
  IN p_program_id VARCHAR(36)
)
BEGIN
  INSERT INTO enrollments (client_id, program_id)
  VALUES (p_client_id, p_program_id);
  SELECT * FROM enrollments
    WHERE client_id = p_client_id
      AND program_id = p_program_id;
END $$

DELIMITER;