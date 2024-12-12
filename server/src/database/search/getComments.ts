/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query functions for fetching comments.
 */

import { FieldPacket, RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';
import { Comment } from '@/utils/interface';

/**
 * Function to map a database row to a Comment object
 * @param row - The row from the database query containing comment data
 * @returns Comment - The mapped Comment object
 */
function mapCommentRow(row: RowDataPacket): Comment {
  return {
    commentId: row.comment_id,
    userId: row.user_id,
    mixId: row.mix_id,
    commentText: row.comment_text,
    createdAt: new Date(row.created_at)
  };
}

/**
 * Function to retrieve all comments for a specific mix
 * @param mixId - The ID of the mix
 * @returns Promise<Comment[]> - array of Comment objects
 * @throws Error if the query fails
 */
async function getComments(mixId: number): Promise<Comment[]> {
  const connection = await createConnection();

  try {
    // Get all the comments related to the provided mix_id
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
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

/**
 * Function to retrieve the list of mix IDs that a user has commented on
 * @param userId - The ID of the user
 * @returns Promise<number[]> - array of mix IDs that the user has commented on
 * @throws Error if the query fails
 */
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
  } finally {
    await connection.end(); // Close the connection
  }
}

export { getComments, getUserCommented };
