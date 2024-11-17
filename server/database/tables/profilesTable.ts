// create user profiles table
const createProfilesTableQuery:string = `
    CREATE TABLE user_profiles (
        profile_id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT NOT NULL,
        bio TEXT NULL,
        avatar_url VARCHAR(255) NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

export default { createProfilesTableQuery };