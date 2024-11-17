"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// create user profiles table
var createProfilesTableQuery = "\n    CREATE TABLE user_profiles (\n        profile_id INT PRIMARY KEY AUTO_INCREMENT,\n        user_id INT NOT NULL,\n        bio TEXT NULL,\n        avatar_url VARCHAR(255) NULL,\n        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP\n    );\n";
exports.default = { createProfilesTableQuery: createProfilesTableQuery };
