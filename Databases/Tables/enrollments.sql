-- Active: 1745649794355@@127.0.0.1@3306@cema_his
-- Active: 1745595213179@@127.0.0.1@3306
CREATE TABLE IF NOT EXISTS enrollments (
    client_id VARCHAR(36),
    program_id VARCHAR(36),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (client_id, program_id),
    FOREIGN KEY (client_id) REFERENCES clients (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (program_id) REFERENCES programs (id) ON DELETE CASCADE ON UPDATE CASCADE,
    INDEX idx_enrollments_client (client_id),
    INDEX idx_enrollments_program (program_id)
);