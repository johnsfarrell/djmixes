/**
 * Copyright (c) 2024 DJMixes. All Rights Reserved.
 * Licensed under the MIT License.
 * Description: This file contains the function to create a connection to the MySQL database.
 */

import * as mysql from 'mysql2/promise';
import db from '@/utils/dbConfig';

async function createConnection(): Promise<mysql.Connection> {
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
      return connection;
    } catch (error: any) {
      console.error(
        `Connection attempt failed. Attempts remaining: ${--attempts}`
      );
      console.error('Error Details:', error.message);

      if (attempts === 0) {
        throw new Error(
          'Failed to connect to the database after multiple attempts.'
        );
      }

      // Wait 5 seconds before retrying
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }

  // In case retries are exhausted, we throw the error
  throw new Error('Exhausted retries to connect to the database.');
}

export default createConnection;
