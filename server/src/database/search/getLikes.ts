import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';

// Function to get the number of likes for a specific mix
async function getLikes(mixId: number): Promise<number> {
  const connection = await createConnection();

  try {
    // Get the count of likes for the provided mix_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS like_count FROM likes WHERE mix_id = ?',
      [mixId]
    );

    // Return the number of likes
    return rows[0].like_count;
  } catch (error) {
    console.error('Error fetching likes for mix:', error);
    throw error;
  }
}

// Function to get the number of likes for a specific mix
async function getUserLiked(userId: number): Promise<number[]> {
  const connection = await createConnection();

  try {
    // Get the count of likes for the provided mix_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT DISTINCT mix_id FROM likes WHERE user_id = ?',
      [userId]
    );

    // Map rows to a list of mixId numbers
    const likedMixIds: number[] = rows.map((row) => row.mix_id);

    return likedMixIds;
  } catch (error) {
    console.error('Error fetching likes for mix:', error);
    throw error;
  }
}

export { getLikes, getUserLiked };
