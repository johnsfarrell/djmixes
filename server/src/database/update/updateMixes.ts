/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to update mixes.
 */

import createConnection from "@/database/connection";
import { QueryResult, ResultSetHeader } from "mysql2";

/**
 * Function to insert a new mix into the database
 * @param userId - The ID of the user uploading the mix
 * @param title - The title of the mix
 * @param artist - The artist of the mix
 * @param album - The album of the mix
 * @param releaseDate - The release date of the mix
 * @param fileUrl - The URL of the mix file
 * @param coverUrl - The URL of the cover image
 * @param tags - The tags associated with the mix
 * @param visibility - The visibility setting for the mix ("public", "private", "unlisted", or "friends")
 * @param allowDownload - Whether downloading the mix is allowed
 * @returns Promise<number | null> - The ID of the newly inserted mix, or null if the insert fails
 */
async function insertMixes(
  userId: number,
  title: string,
  artist: string,
  album: string | null,
  releaseDate: string,
  fileUrl: string,
  coverUrl: string | null,
  tags: string | null,
  visibility: "public" | "private" | "unlisted" | "friends",
  allowDownload: boolean,
): Promise<number | null> {
  const connection = await createConnection();

  try {
    const query = `
      INSERT INTO mixes (user_id, title, artist, album, created_at, file_url, cover_url, tags, visibility, allow_download)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.execute<ResultSetHeader>(query, [
      userId,
      title,
      artist,
      album,
      releaseDate,
      fileUrl,
      coverUrl,
      tags,
      visibility,
      allowDownload,
    ]);
    console.log("Mix inserted successfully:", result);
    return result.insertId;
  } catch (error) {
    console.error("Error inserting mix:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to update an existing mix in the database
 * @param mixId - The ID of the mix to be updated
 * @param userId - The ID of the user updating the mix
 * @param title - The new title of the mix
 * @param artist - The new artist of the mix
 * @param album - The new album of the mix
 * @param releaseDate - The new release date of the mix
 * @param fileUrl - The new URL of the mix file
 * @param coverUrl - The new URL of the cover image
 * @param tags - The new tags associated with the mix
 * @param visibility - The new visibility setting for the mix ("public", "private", "unlisted", or "friends")
 * @param allowDownload - Whether downloading the mix is allowed
 * @returns Promise<QueryResult | null> - Result of the update query, or null if failed
 */
async function updateMixes(
  mixId: number,
  userId: number,
  title: string,
  artist: string,
  album: string | null,
  releaseDate: string,
  fileUrl: string,
  coverUrl: string | null,
  tags: string | null,
  visibility: "public" | "private" | "unlisted" | "friends",
  allowDownload: boolean,
): Promise<QueryResult | null> {
  const connection = await createConnection();

  try {
    const query = `
      UPDATE mixes
      SET user_id = ?, title = ?, artist = ?, album = ?, created_at = ?, file_url = ?, cover_url = ?, tags = ?, visibility = ?, allow_download = ?
      WHERE mix_id = ? AND is_deleted = 0
    `;
    const [result] = await connection.execute(query, [
      userId,
      title,
      artist,
      album,
      releaseDate,
      fileUrl,
      coverUrl,
      tags,
      visibility,
      allowDownload,
      mixId,
    ]);
    console.log("Mix updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating mix:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * function to updates a specific field of a mix in the database
 * @param mixId - The ID of the mix to update
 * @param field - The field to update (e.g., 'title', 'artist')
 * @param value - The new value for the field
 * @returns Promise<QueryResult | null> - Update result or null if failed
 */
async function updateMixField(
  mixId: number | null,
  field: string,
  value: string,
): Promise<QueryResult | null> {
  const connection = await createConnection();

  try {
    // Dynamically insert the field into the query to avoid syntax issues
    const query = `UPDATE mixes SET ${field} = ? WHERE mix_id = ? AND is_deleted = 0`;
    const [result] = await connection.execute(query, [value, mixId]);
    console.log("Mix updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating mix:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to delete a mix from the database
 * @param mixId - The ID of the mix to be deleted
 * @returns Promise<QueryResult | null> - Result of the delete query, or null if failed
 */
async function deleteMixes(mixId: number): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const query = `UPDATE mixes SET is_deleted = 1 WHERE mix_id = ?`;
    const [result] = await connection.execute(query, [mixId]);
    console.log("Mix marked as deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting mix:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

export { insertMixes, updateMixes, updateMixField, deleteMixes };
