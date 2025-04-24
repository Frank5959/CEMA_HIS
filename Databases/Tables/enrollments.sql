CREATE TABLE enrollments (
    client_id VARCHAR(36),
    program_id VARCHAR(36),
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (client_id, program_id),
    FOREIGN KEY (client_id) REFERENCES clients (id),
    FOREIGN KEY (program_id) REFERENCES programs (id)
);