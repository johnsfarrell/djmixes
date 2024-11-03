const createConnection = require('../connection.js');

async function getUserByName(username) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(
      'SELECT * FROM users WHERE username = ?', 
      [username]
      );

      if (rows.length > 0) {
        return rows[0];
      } else {
        console.log(`User with name ${username} not found or has been deleted.`);
        return null;
      }
  } catch (error) {
    console.error('Get User By Name Error:', error);
    throw error; 
  }
}

module.exports = {
  getUserByName
};
