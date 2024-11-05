const createConnection = require('../connection.js');

async function getMixes(mix_id) {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute(
      `SELECT * FROM mix WHERE mix_id = ? AND is_deleted = 0`, 
      [mix_id]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      console.log(`Mix with id ${mix_id} not found or has been deleted.`);
      return null;
    }
  } catch (error) {
    console.error('Retrieving mix Error:', error);
    throw error;
  }
}

module.exports = {
  getMixes
};