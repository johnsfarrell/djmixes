import createConnection from '@/database/connection';
import { Mix } from '@/utils/interface';

async function insertMixes(
  userId: number,
  title: string,
  artist: string,
  album: string | null,
  releaseDate: string,
  fileUrl: string,
  coverUrl: string | null,
  tags: string | null,
  visibility: 'public' | 'private' | 'unlisted' | 'friends',
  allowDownload: boolean
): Promise<any | null> {
  const connection = await createConnection();

  try {
    const query = `
      INSERT INTO mixes (user_id, title, artist, album, created_at, file_url, cover_url, tags, visibility, allow_download)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
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
      allowDownload
    ]);
    console.log('Mix inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting mix:', error);
    return null;
  }
}

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
  visibility: 'public' | 'private' | 'unlisted' | 'friends',
  allowDownload: boolean
): Promise<any | null> {
  const connection = await createConnection();

  try {
    const query = `
      UPDATE mix
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
      mixId
    ]);
    console.log('Mix updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating mix:', error);
    return null;
  }
}

async function deleteMixes(mixId: number): Promise<any | null> {
  const connection = await createConnection();
  try {
    const query = `UPDATE mix SET is_deleted = 1 WHERE mix_id = ?`;
    const [result] = await connection.execute(query, [mixId]);
    console.log('Mix marked as deleted:', result);
    return result;
  } catch (error) {
    console.error('Error deleting mix:', error);
    return null;
  }
}

export { insertMixes, updateMixes, deleteMixes };
