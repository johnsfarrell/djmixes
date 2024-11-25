import { Connection, RowDataPacket } from 'mysql2/promise';
import createConnection from '@/database/connection';
import { User } from '@/utils/interface';


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
    console.error('Get User By ID Error:', error);
    throw error; // Re-throw the error if it occurs
  }
}

async function getUserByEmail(email: string): Promise<User | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], any] = await connection.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );

    if (rows.length > 0) {
      // Cast the rows to User type before returning
      return rows[0] as User; // Return the first user
    } else {
      console.log(`User with email ${email} not found or has been deleted.`);
      return null; // Return null if no user is found
    }
  } catch (error) {
    console.error('Get User By Email Error:', error);
    throw error; // Re-throw the error if it occurs
  }
}

export { getUserByName, getUserById, getUserByEmail };
