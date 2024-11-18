const createConnection = require('../connection.js');
const createTables = require('../table.js');



async function runTests() {
  const connection = await createConnection();
  await createTables();
  try {
    const [usersRows] = await connection.query('SELECT * FROM users');
    console.log('Users Table Rows:', usersRows);
    const [mixsRows] = await connection.query('SELECT * FROM mix');
    console.log('Mixs Table Rows:', mixsRows);
    await connection.execute(`DROP TABLE IF EXISTS mix`);
    await connection.execute(`DROP TABLE IF EXISTS users`);
    await connection.end();
  } catch (error) {
    console.error('Fetch Rows Error:', error);
  }
}


runTests().catch((error) => {
  console.error('Error running tests:', error);
});