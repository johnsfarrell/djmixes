import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';
import { Comment } from '@/utils/interface';

// Map database fields to the Comment interface
function mapCommentRow(row: RowDataPacket): Comment {
  return {
    commentId: row.comment_id,
    userId: row.user_id,
    mixId: row.mix_id,
    commentText: row.comment_text,
    createdAt: new Date(row.created_at),
  };
}

// Get comments for a specific mix
async function getComments(mixId: number): Promise<Comment[]> {
  const connection = await createConnection();

  try {
    // Get all the comments related to the provided mix_id
    const [rows]: [RowDataPacket[], any] = await connection.execute(
      'SELECT comment_id, user_id, mix_id, comment_text, created_at FROM comments WHERE mix_id = ? ORDER BY created_at DESC',
      [mixId]
    );

    // Map each row to the Comment interface
    return rows.map(mapCommentRow);
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

// Function to get the number of likes for a specific mix
async function getUserCommented(userId: number): Promise<number[]> {
  const connection = await createConnection();

  try {
    // Get the count of likes for the provided mix_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT DISTINCT mix_id FROM comments WHERE user_id = ?',
      [userId]
    );

    // Map rows to a list of mixId numbers
    const commentedMixIds: number[] = rows.map((row) => row.mix_id);

    return commentedMixIds;
  } catch (error) {
    console.error('Error fetching likes for mix:', error);
    throw error;
  }
}

export { getComments, getUserCommented };
