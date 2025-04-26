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
END

$$