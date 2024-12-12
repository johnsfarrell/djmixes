/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to get all mixes uploaded by a user.
 */

import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';
import { Mix } from '@/utils/interface';

/**
 * The function signature for getMixes
 * @param mixId - The ID of the mix
 * @returns Promise<Mix | null> - mix get by mixId
 * @throws Error if the query fails
 */
async function getMixes(mixId: number): Promise<Mix | null> {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT * FROM mixes WHERE mix_id = ? AND is_deleted = 0`,
      [mixId]
    );

    if (rows.length > 0) {
      const row = rows[0];
      const mix: Mix = {
        mixId: row.mix_id,
        userId: row.user_id,
        title: row.title,
        fileUrl: row.file_url,
        coverUrl: row.cover_url || '',
        tags: row.tags ? row.tags.split(',') : undefined,
        visibility: row.visibility,
        allowDownload: Boolean(row.allow_download),
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
        artist: row.artist,
        album: row.album || undefined,
        isDeleted: Boolean(row.is_deleted),
        stemBassUrl: row.stem_bass_url,
        stemDrumUrl: row.stem_drum_url,
        stemVocalUrl: row.stem_vocal_url,
        stemOtherUrl: row.stem_other_url,
        splitJson: row.split_json
      };
      return mix;
    } else {
      console.log(`Mix with id ${mixId} not found or has been deleted.`);
      return null;
    }
  } catch (error) {
    console.error('Retrieving mix Error:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to get a specified number of random mixes
 * @param numberOfMixes - The number of random mixes
 * @returns Promise<number[] | null> - an array of mix IDs, or null if no mixes are found
 * @throws Error if the query fails
 */
async function getRandomMixes(numberOfMixes: number): Promise<number[] | null> {
  const connection = await createConnection();
  try {
    console.log(numberOfMixes);
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT DISTINCT mix_id FROM mixes WHERE visibility = 'public' ORDER BY RAND() LIMIT ${numberOfMixes}`
    );

    const randomMixIds: number[] = rows.map((row) => row.mix_id);
    return randomMixIds;
  } catch (error) {
    console.error('Retrieving random mixes Error:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to get all mix IDs uploaded by user
 * @param userId - The ID of the user
 * @returns Promise<number[] | null> - an array of mix IDs uploaded by the user, or null if no mixes are found
 * @throws Error if the query fails
 */
async function getMixesByUploadedUser(
  userId: number
): Promise<number[] | null> {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT DISTINCT mix_id FROM mixes WHERE user_id = ?`,
      [userId]
    );

    const mixIds: number[] = rows.map((row) => row.mix_id);
    return mixIds;
  } catch (error) {
    console.error('Retrieving mixes by user Error:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to get all mix IDs liked by a user
 * @param userId - The ID of the user
 * @returns Promise<number[] | null> - array of mix IDs liked by the user, or null if no liked mixes are found
 * @throws Error if the query fails
 */
async function getMixesByUserLiked(userId: number): Promise<number[] | null> {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT DISTINCT mixes.mix_id as mix_id 
       FROM mixes 
       JOIN likes ON mixes.mix_id = likes.mix_id
       WHERE likes.user_id = ?`,
      [userId]
    );

    const mixIds: number[] = rows.map((row) => row.mix_id);
    return mixIds;
  } catch (error) {
    console.error('Retrieving liked mixes Error:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to search for mixes based on title
 * @param title - mix titles
 * @returns Promise<number[] | null> - an array of mix IDs that match the title, or null if no mixes are found
 * @throws Error if the query fails
 */
async function searchMixesByTitle(title: string): Promise<number[] | null> {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT DISTINCT mix_id FROM mixes WHERE title LIKE ?`,
      [`%${title}%`]
    );

    const mixIds: number[] = rows.map((row) => row.mix_id);
    return mixIds;
  } catch (error) {
    console.error('Searching mixes by title Error:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

export {
  getMixes,
  getRandomMixes,
  getMixesByUploadedUser,
  getMixesByUserLiked,
  searchMixesByTitle
};
