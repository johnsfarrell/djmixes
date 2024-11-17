"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var createCommentTableQuery = "\n  CREATE TABLE IF NOT EXISTS comments (\n    comment_id INT PRIMARY KEY AUTO_INCREMENT,\n    user_id INT NOT NULL,\n    mix_id INT NOT NULL,\n    comment_text TEXT NOT NULL,\n    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n  );\n";
exports.default = { createCommentTableQuery: createCommentTableQuery };
