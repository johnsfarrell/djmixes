import mysql from 'mysql2/promise';
import db from './db_config';

async function createConnection(): Promise<mysql.Connection> {
  const connection = await mysql.createConnection({
    host: db.host,
    user: db.user,
    password: db.password,
    port: db.port,
    database: db.database
  });

  console.log('Connected to the database.');
  return connection;
}

export default createConnection;