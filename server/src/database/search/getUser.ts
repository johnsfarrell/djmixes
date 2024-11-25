import { Connection, RowDataPacket } from 'mysql2/promise';
import createConnection from '@/database/connection';

export interface User {
  user_id: number; // Primary key, auto-incrementing user ID
  username: string; // Unique username chosen by the user
  email: string; // Unique email address for the user
  password: string; // The password for user authentication
  registration_method: number; // 0 for email registration, 1 for third-party registration
  active: boolean; // 0 - active, 1 - inactive
  create_time: Date; // Timestamp of when the account was created
}

async function getUserByName(username: string): Promise<User | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], any] = await connection.execute(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );

    if (rows.length > 0) {
      // Cast the rows to User type before returning
      return rows[0] as User; // Return the first user
    } else {
      console.log(`User with name ${username} not found or has been deleted.`);
      return null; // Return null if no user is found
    }
  } catch (error) {
    console.error('Get User By Name Error:', error);
    throw error; // Re-throw the error if it occurs
  }
}

async function getUserById(id: number): Promise<User | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], any] = await connection.execute(
      'SELECT * FROM users WHERE user_id = ?',
      [id]
    );

    if (rows.length > 0) {
      // Cast the rows to User type before returning
      return rows[0] as User; // Return the first user
    } else {
      console.log(`User with id ${id} not found or has been deleted.`);
      return null; // Return null if no user is found
    }
  } catch (error) {
    console.error('Get User By Name Error:', error);
    throw error; // Re-throw the error if it occurs
  }
}

export { getUserByName, getUserById };
