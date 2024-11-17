import createConnection from '../connection';

// Define the type for the comment data
export interface Comment {
  comment_id: number;
  user_id: number;
  mix_id: number;
  comment_text: string;
  created_at: Date;
}

async function insertComment(user_id: number, mix_id: number, comment_text: string): Promise<any | null> {
    const connection = await createConnection();
    try{
        const [result] = await connection.execute(
            'INSERT INTO comments (user_id, mix_id, comment_text) VALUES (?, ?, ?)',
            [user_id, mix_id, comment_text]
        );
        console.log('Comment inserted successfully:', result);
        return result;
    }catch (error) {
        console.error('Error inserting comment:', error);
        return null;
    }
}

// update comment text based on comment id
async function updateComment(comment_id: number, user_id: number, mix_id: number, comment_text: string | null): Promise<any | null> {
    const connection = await createConnection();
    try{
        const [result] = await connection.execute(
            'UPDATE comments SET user_id = ?, mix_id = ?, comment_text = ? WHERE comment_id = ?',
            [user_id, mix_id, comment_text, comment_id]
        );
        console.log('comment updated successfully:', result);
        return result;
    }catch (error) {
        console.error('Error updating comment:', error);
        return null;
    }
}

async function deleteComment(comment_id: number): Promise<any | null> {
    const connection = await createConnection();
    try{
        const [result] = await connection.execute(
            'DELETE FROM comments WHERE comment_id = ?',
            [comment_id]
        );
        console.log('comment deleted successfully:', result);
        return result;
    }catch (error) {
        console.error('Error deleting comment:', error);
        return null;
    }
}
export { insertComment,updateComment,deleteComment };