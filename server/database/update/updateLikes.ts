import createConnection from '@/database/connection';

export interface Like {
  like_id: number;
  user_id: number;
  mix_id: number;
  created_at: Date;
}

async function insertLike(
  user_id: number,
  mix_id: number
): Promise<any | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO likes (user_id, mix_id) VALUES (?, ?)',
      [user_id, mix_id]
    );
    console.log('Like inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting like:', error);
    return null;
  }
}

async function deleteLike(
  user_id: number,
  mix_id: number
): Promise<any | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM likes WHERE user_id = ? AND mix_id = ?',
      [user_id, mix_id]
    );
    console.log('Like deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting like:', error);
    return null;
  }
}

export { insertLike, deleteLike };
