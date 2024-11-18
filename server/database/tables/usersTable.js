"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Define the SQL query for creating the 'mix' table
var createUsersTableQuery = "\n  CREATE TABLE IF NOT EXISTS users (\n    user_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,\n    username VARCHAR(100) NOT NULL UNIQUE,\n    email VARCHAR(150) NOT NULL UNIQUE,\n    password VARCHAR(255) NOT NULL,\n    registration_method INT NOT NULL,\n    active TINYINT DEFAULT 0,\n    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n  );\n";
// Export the query so it can be used elsewhere in the application
exports.default = { createUsersTableQuery: createUsersTableQuery };
