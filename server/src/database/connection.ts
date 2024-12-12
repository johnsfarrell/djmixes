/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database connection function.
 */

import * as mysql from 'mysql2/promise';
import db from '@/utils/dbConfig';

/**
 * Create a new database connection
 * @param timeoutMs - The timeout in milliseconds for the connection (default is 30000ms)
 * @returns Promise<mysql.Connection> - The database connection
 * @throws Error if fail to creat connections after several times
 */
async function createConnection(timeoutMs = 30000): Promise<mysql.Connection> {
  let attempts = 5;

  while (attempts > 0) {
    try {
      console.log('Attempting to connect to the database...');
      console.log('Connection details:', db);

      const connection = await mysql.createConnection({
        host: db.host,
        user: db.user,
        password: db.password,
        port: db.port,
        database: db.database
      });

      console.log('Connected to the database.');

      const timer = setTimeout(() => {
        console.warn('Closing the connection due to timeout.');
        connection
          .end()
          .catch((err) => console.error('Error closing connection:', err));
      }, timeoutMs);

      const originalEnd = connection.end.bind(connection);
      connection.end = async (...args) => {
        clearTimeout(timer);
        return originalEnd(...args);
      };

      return connection;
    } catch (error) {
      console.error(
        `Connection attempt failed. Attempts remaining: ${--attempts}`
      );
      console.error('Connection Error:', error);

      if (attempts === 0) {
        throw new Error(
          'Failed to connect to the database after multiple attempts.'
        );
      }

      // Wait 5 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  throw new Error('Exhausted retries to connect to the database.');
}

export default createConnection;
