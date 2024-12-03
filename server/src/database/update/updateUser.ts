import createConnection from '@/database/connection';
import { QueryResult, ResultSetHeader } from 'mysql2';

async function createUser(
  username: string,
  email: string,
  password: string,
  registrationMethod: number
): Promise<number | null> {
  const connection = await createConnection();
  try {
    const [existingUsers] = await connection.query(
      'SELECT * FROM users WHERE username = ? OR email = ?',
      [username, email]
    );

    if ((existingUsers as QueryResult[]).length > 0) {
      console.log('User already exists with the same username or email.');
      return null;
    }
    const [result] = await connection.query(
      'INSERT INTO users (username, email, password, registration_method) VALUES (?, ?, ?, ?)',
      [username, email, password, registrationMethod]
    );
    console.log(
      `User created with ID: ${(result as ResultSetHeader).insertId}`
    );
    return (result as ResultSetHeader).insertId;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

async function deleteUser(username: string): Promise<boolean> {
  const connection = await createConnection();
  try {
    const [result] = await connection.query(
      'DELETE FROM users WHERE username = ?',
      [username]
    );
    return (result as ResultSetHeader).affectedRows > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

export { createUser, deleteUser };
