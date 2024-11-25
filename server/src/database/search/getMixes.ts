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
      // Map the first result to the Mix interface
      const row = rows[0];
      const mix: Mix = {
        mixId: row.mix_id,
        userId: row.user_id,
        title: row.title,
        fileUrl: row.file_url,
        coverUrl: row.cover_url || undefined, // Ensure optional field is handled
        tags: row.tags ? row.tags.split(',') : undefined, // Convert tags to array if present
        visibility: row.visibility,
        allowDownload: Boolean(row.allow_download), // Cast to boolean
        createdAt: new Date(row.created_at), // Ensure correct type
        updatedAt: new Date(row.updated_at),
        artist: row.artist,
        album: row.album || undefined,
        isDeleted: Boolean(row.is_deleted),
      };
      
      return mix;
    } else {
      console.log(`Mix with id ${mixId} not found or has been deleted.`);
      return null;
    }
  } catch (error) {
    console.error('Retrieving mix Error:', error);
    throw error;
  }
}

export { getMixes };
