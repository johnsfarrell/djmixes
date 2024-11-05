const createConnection = require('./connection.js');
const createTables = require('./table.js');

async function initializeDatabase() {
  const connection = await createConnection();
  
  await createTables(connection);

  
  process.on('exit', async () => {
    await connection.end();
    console.log('Database connection closed');
  });
  
  process.on('SIGINT', async () => {
    await connection.end();
    console.log('Database connection closed due to program interruption');
    process.exit();
  });
  
}

initializeDatabase().catch((error) => {
  console.error('Error initializing database:', error);
});
