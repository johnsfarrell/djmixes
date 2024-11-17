import { RowDataPacket } from 'mysql2';
import createConnection from '../connection';

// Define the type for the comment data
export interface Comment {
  comment_id: number;
  user_id: number;
  mix_id: number;
  comment_text: string;
  created_at: Date;
}

// get comments for a specific mix
async function getComments(mix_id: number): Promise<Comment[]> {
    const connection = await createConnection();
    
    try {
      // get all the comments related to the provided mix_id
      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT comment_id, user_id, comment_text, created_at FROM comments WHERE mix_id = ? ORDER BY created_at DESC',
        [mix_id]
      );
      
      return rows as Comment[];
    } catch (error) {
      console.error('Error fetching comments:', error);
      throw error;
    } 
  }
  
  export { getComments };