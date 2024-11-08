const createConnection = require('./connection.js');
const createUsersTable = require('./tables/usersTable.js');
const createMixsTable = require('./tables/mixsTable.js');
const {insertUsersQuery,insertRecordsQuery} = require('./dumb_data.js');

async function createTables() {
  const connection = await createConnection();
  const tableQueries = [
    { name: 'users', query: createUsersTable },
    { name: 'mixs', query: createMixsTable }
  ];
  const initalQueris = [insertUsersQuery,insertRecordsQuery];
  try {
    const dbName = 'test';
    const [databases] = await connection.query('SHOW DATABASES LIKE ?', [dbName]);
    if (databases.length === 0) {
      await connection.execute(`CREATE DATABASE \`${dbName}\``);
      console.log(`Database "${dbName}" created.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
    await connection.changeUser({ database: dbName });
  } catch (error ) {
    console.error('DataBase Creation Error:', error);
  }
  try {
    for (const table of tableQueries) {
      await connection.query(table.query);
      console.log(`Table '${table.name}' created or already exists.`);
    }
  } catch (error) {
    console.error('Tables Creation Error:', error);
  }
  try {
    for (const insert of initalQueris) {
      await connection.query(insert);
    }
  } catch (error) {
    console.error('Insert Error:', error);
  }
}

module.exports = createTables;