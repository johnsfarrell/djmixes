import createConnection from './connection';
import createTables from './table';

async function initializeDatabase(): Promise<void> {
  const connection = await createConnection();
  
  // TOCHECK: await createTables(connection);
  await createTables();

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

initializeDatabase().catch((error: Error) => {
  console.error('Error initializing database:', error);
});

