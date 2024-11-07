const mysql = require('mysql2/promise');
const { host, user, password, port, database } = require('./db_config.js');

async function createConnection() {
  const connection = await mysql.createConnection({
    host: host,
    user: user,
    password: password,
    port: port,
    database: database
  });
  
  console.log('Connected to the database.');
  return connection;
}

module.exports = createConnection;