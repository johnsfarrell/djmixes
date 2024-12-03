import createConnection from '@/database/connection';
import { QueryResult } from 'mysql2';

async function insertLike(
  userId: number,
  mixId: number
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO likes (user_id, mix_id) VALUES (?, ?)',
      [userId, mixId]
    );
    console.log('Like inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting like:', error);
    return null;
  }
}

async function deleteLike(
  userId: number,
  mixId: number
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM likes WHERE user_id = ? AND mix_id = ?',
      [userId, mixId]
    );
    console.log('Like deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting like:', error);
    return null;
  }
}

export { insertLike, deleteLike };
