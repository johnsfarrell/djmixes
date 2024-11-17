"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createLikesTableQuery = "\n  CREATE TABLE IF NOT EXISTS likes (\n    like_id INT PRIMARY KEY AUTO_INCREMENT,\n    user_id INT NOT NULL,\n    mix_id INT NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n  );\n";
exports.default = { createLikesTableQuery: createLikesTableQuery };
