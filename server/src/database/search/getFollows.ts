/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to get all users followed by a user.
 */

import createConnection from '../connection';
import { FieldPacket, RowDataPacket } from 'mysql2';

/**
 * Function to get all users (acting as artists) followed by a user
 * @param userId - The ID of the user
 * @returns Promise<RowDataPacket[]> - List of followed users
 * @throws Error if the query fails
 */
export const getFollowedArtists = async (
  userId: number
): Promise<RowDataPacket[]> => {
  const connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      `
      SELECT u.user_id as artistId, u.username as name, u.email as profileUrl, u.create_time as avatar
      FROM follows f
      JOIN users u ON f.artist_id = u.user_id
      WHERE f.user_id = ?
      `,
      [userId]
    );
    return rows;
  } catch (error) {
    console.error('Error fetching followed users:', error);
    throw new Error('Database error occurred');
  } finally {
    await connection.end();
  }
};
