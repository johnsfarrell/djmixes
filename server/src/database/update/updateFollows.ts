import createConnection from '../connection';

/**
 * Function to follow an artist
 * @param userId - The ID of the user
 * @param artistId - The ID of the artist to follow
 * @returns Promise<void>
 * @throws Error if the query fails
 */
export const followArtist = async (userId: number, artistId: number): Promise<void> => {
  const connection = await createConnection();
  try {
    await connection.execute(
      'INSERT INTO follows (user_id, artist_id) VALUES (?, ?)',
      [userId, artistId]
    );
  } catch (error) {
    console.error('Error while following artist:', error);
    throw new Error('Database error occurred');
  } finally {
    await connection.end();
  }
};
