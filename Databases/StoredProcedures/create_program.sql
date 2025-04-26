DELIMITER $$

CREATE PROCEDURE CreateProgram(
  IN p_name VARCHAR(100),
  IN p_description TEXT
)
BEGIN
  INSERT INTO programs (name, description)
  VALUES (p_name, p_description);
  SELECT * FROM programs WHERE id = LAST_INSERT_ID();
END $$

DELIMITER;