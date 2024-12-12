/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to create the mixes table.
 */

// Define the SQL query for creating the 'mix' table
const createTableQuery: string = `
    CREATE TABLE IF NOT EXISTS mixes (
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
    stem_bass_url VARCHAR(255) NULL,
    stem_drum_url VARCHAR(255) NULL,
    stem_vocal_url VARCHAR(255) NULL,
    stem_other_url VARCHAR(255) NULL,
    split_json TEXT NULL,
    is_deleted TINYINT DEFAULT 0
    );
`;

export default { createTableQuery };
