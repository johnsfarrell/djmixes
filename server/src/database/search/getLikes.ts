/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to get the number of likes for a mix.
 */

import { RowDataPacket } from "mysql2";
import createConnection from "@/database/connection";

/**
 * Function to get the number of likes for a specific mix
 * @param mixId - The ID of the mix
 * @returns Promise<number> - number of likes
 * @throws Error if the query fails
 */
async function getLikes(mixId: number): Promise<number> {
  const connection = await createConnection();

  try {
    // Get the count of likes for the provided mix_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT COUNT(*) AS like_count FROM likes WHERE mix_id = ?",
      [mixId],
    );

    // Return the number of likes
    return rows[0].like_count;
  } catch (error) {
    console.error("Error fetching likes for mix:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to get the number of likes for a specific mix
 * @param userId - The ID of the user
 * @returns Promise<number> - number of likes
 * @throws Error if the query fails
 */
async function getUserLiked(userId: number): Promise<number[]> {
  const connection = await createConnection();

  try {
    // Get the count of likes for the provided mix_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT DISTINCT mix_id FROM likes WHERE user_id = ?",
      [userId],
    );

    // Map rows to a list of mixId numbers
    const likedMixIds: number[] = rows.map((row) => row.mix_id);

    return likedMixIds;
  } catch (error) {
    console.error("Error fetching likes for mix:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

export { getLikes, getUserLiked };
