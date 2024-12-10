import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';
import { Mix } from '@/utils/interface';

// The function signature for getMixes
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

async function getRandomMixes(numberOfMixes: number): Promise<number[] | null> {
  const connection = await createConnection();
  try {
    console.log(numberOfMixes)
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
