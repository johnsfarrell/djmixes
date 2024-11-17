"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// create events table
var createEventsTableQuery = "\n    CREATE TABLE IF NOT EXISTS events (\n    event_id INT PRIMARY KEY AUTO_INCREMENT,\n    title VARCHAR(255) NOT NULL,\n    date DATETIME NOT NULL,\n    artist_id INT NOT NULL,\n    user_id INT NOT NULL,\n    description TEXT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\n    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP\n    );\n";
exports.default = { createEventsTableQuery: createEventsTableQuery };
