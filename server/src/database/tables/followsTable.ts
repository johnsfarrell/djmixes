/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to create the follows table.
 */

const createFollowsTableQuery: string = `
  CREATE TABLE IF NOT EXISTS follows (
    follow_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    artist_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (artist_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
  );
`;

export default { createFollowsTableQuery };
