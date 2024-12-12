/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to like a mix.
 */

import createConnection from '@/database/connection';
import { QueryResult } from 'mysql2';

/**
 * Function to insert a like for a specific mix by a user
 * @param userId - The ID of the user liking the mix
 * @param mixId - The ID of the mix being liked
 * @returns Promise<QueryResult | null> - Result of the insert query, or null if failed
 */
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
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to remove a like from a specific mix by a user
 * @param userId - The ID of the user removing the like
 * @param mixId - The ID of the mix from which the like is being removed
 * @returns Promise<QueryResult | null> - Result of the delete query, or null if failed
 */
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
  } finally {
    await connection.end(); // Close the connection
  }
}

export { insertLike, deleteLike };
