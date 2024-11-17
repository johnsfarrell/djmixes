// Define the SQL query for creating the 'mix' table
const createUsersTableQuery: string = `
  CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT UNIQUE,
    username VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registration_method INT NOT NULL,
    active TINYINT DEFAULT 0,
    create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

// Export the query so it can be used elsewhere in the application
export default { createUsersTableQuery };