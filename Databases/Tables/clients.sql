-- Active: 1745649794355@@127.0.0.1@3306@cema_his
CREATE TABLE IF NOT EXISTS clients (
    id VARCHAR(36) PRIMARY KEY DEFAULT(UUID()),
    name VARCHAR(255) NOT NULL,
    contact_info VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_clients_name (name),
    INDEX idx_clients_contact (contact_info)
);