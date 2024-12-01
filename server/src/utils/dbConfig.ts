import dotenv from 'dotenv';
import { ConnectionOptions } from 'mysql2';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '..', '..', '.env') });

const db: ConnectionOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  database: process.env.DB_DATABASE
};

export default db;
