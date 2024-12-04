import createConnection from "../connection";
import { FieldPacket, RowDataPacket } from "mysql2";

/**
 * Function to get all artists followed by a user
 * @param userId - The ID of the user
 * @returns Promise<RowDataPacket[]> - List of followed artists
 * @throws Error if the query fails
 */
export const getFollowedArtists = async (
  userId: number,
): Promise<RowDataPacket[]> => {
  const connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      `
      SELECT a.artist_id as artistId, a.name, a.profile_url as profileUrl, a.avatar
      FROM follows f
      JOIN artists a ON f.artist_id = a.artist_id
      WHERE f.user_id = ?
      `,
      [userId],
    );
    return rows;
  } catch (error) {
    console.error("Error fetching followed artists:", error);
    throw new Error("Database error occurred");
  } finally {
    await connection.end();
  }
};
