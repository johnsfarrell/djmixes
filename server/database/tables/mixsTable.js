"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define the SQL query for creating the 'mix' table
var createTableQuery = "\n    CREATE TABLE IF NOT EXISTS mix (\n    mix_id INT PRIMARY KEY AUTO_INCREMENT,\n    user_id INT NOT NULL,\n    title VARCHAR(255) NOT NULL,\n    file_url VARCHAR(255) NOT NULL,\n    cover_url VARCHAR(255) NULL,\n    tags TEXT NULL,\n    visibility ENUM('public', 'private', 'unlisted', 'friends') NOT NULL,\n    allow_download BOOLEAN DEFAULT FALSE,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,\n    artist VARCHAR(255) NOT NULL,\n    album VARCHAR(255) NULL,\n    is_deleted TINYINT DEFAULT 0,\n    FOREIGN KEY (user_id) REFERENCES users(user_id)\n    );\n";
exports.default = { createTableQuery: createTableQuery };
