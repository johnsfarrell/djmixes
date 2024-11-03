const createConnection = require('../connection.js');


async function createUser(username, email, password, registration_method) {
  const connection = await createConnection();
  try {
    const [existingUsers] = await connection.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if (existingUsers.length > 0) {
      console.log('User already exists with the same username or email.');
      return null; 
    }
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password, registration_method) VALUES (?, ?, ?, ?)',
      [username, email, password, registration_method]
    );
    console.log(`User created with ID: ${result.insertId}`);
    return result.insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function deleteUser(username) {
  const connection = await createConnection();
  try {
    const [result] = await connection.query('DELETE FROM users WHERE username = ?', [username]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}


module.exports = {
  createUser,
  deleteUser
};
