/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to create the events table.
 */

// create events table
const createEventsTableQuery: string = `
    CREATE TABLE IF NOT EXISTS events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    artist_id INT NOT NULL,
    user_id INT NOT NULL,
    description TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

export default { createEventsTableQuery };
