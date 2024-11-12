"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define the SQL query for creating the 'mix' table
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS mix (
    mix_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    file_url VARCHAR(255) NOT NULL,
    cover_url VARCHAR(255) NULL,
    tags TEXT NULL,
    visibility ENUM('public', 'private', 'unlisted', 'friends') NOT NULL,
    allow_download BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    artist VARCHAR(255) NOT NULL,
    album VARCHAR(255) NULL,
    is_deleted TINYINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
    );
`;
exports.default = { createTableQuery };
