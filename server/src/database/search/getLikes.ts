import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';

export interface Like {
  like_id: number;
  user_id: number;
  mix_id: number;
  created_at: Date;
}

// Function to get the number of likes for a specific mix
async function getLikes(mix_id: number): Promise<number> {
  const connection = await createConnection();

  try {
    // Get the count of likes for the provided mix_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT COUNT(*) AS like_count FROM likes WHERE mix_id = ?',
      [mix_id]
    );

    // Return the number of likes
    return rows[0].like_count;
  } catch (error) {
    console.error('Error fetching likes for mix:', error);
    throw error;
  }
}

export { getLikes };
