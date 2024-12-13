/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to create the profiles table.
 */

// create user profiles table
const createProfilesTableQuery: string = `
    CREATE TABLE IF NOT EXISTS user_profiles (
        profile_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        bio TEXT NULL,
        avatar_url VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default { createProfilesTableQuery };
