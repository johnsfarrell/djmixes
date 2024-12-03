import createConnection from '@/database/connection';
import { QueryResult } from 'mysql2';

async function insertComment(
  userId: number,
  mixId: number,
  commentText: string
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO comments (user_id, mix_id, comment_text) VALUES (?, ?, ?)',
      [userId, mixId, commentText]
    );
    console.log('Comment inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting comment:', error);
    return null;
  }
}

// update comment text based on comment id
async function updateComment(
  commentId: number,
  userId: number,
  mixId: number,
  commentText: string | null
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'UPDATE comments SET user_id = ?, mix_id = ?, comment_text = ? WHERE comment_id = ?',
      [userId, mixId, commentText, commentId]
    );
    console.log('comment updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating comment:', error);
    return null;
  }
}

async function deleteComment(commentId: number): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'DELETE FROM comments WHERE comment_id = ?',
      [commentId]
    );
    console.log('comment deleted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return null;
  }
}
export { insertComment, updateComment, deleteComment };
