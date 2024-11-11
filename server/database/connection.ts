import mysql from 'mysql2/promise';
import { host, user, password, port, database } from './db_config';

async function createConnection(): Promise<mysql.Connection> {
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

export default createConnection;