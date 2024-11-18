import { SplitTimestamps } from "../../utils/algorithm";
import createConnection from "../connection";

export interface Mix {
  mix_id: number;
  user_id: number;
  title: string;
  artist: string;
  album: string | null;
  release_date: string;
  file_url: string;
  cover_url: string | null;
  tags: string | null;
  visibility: "public" | "private" | "unlisted" | "friends";
  allow_download: boolean;
}

async function insertMixes(
  user_id: number,
  title: string,
  artist: string,
  album: string | null,
  release_date: string,
  file_url: string,
  cover_url: string | null,
  tags: string | null,
  visibility: "public" | "private" | "unlisted" | "friends",
  allow_download: boolean
): Promise<any | null> {
  const connection = await createConnection();

  try {
    const query = `
      INSERT INTO mix (user_id, title, artist, album, created_at, file_url, cover_url, tags, visibility, allow_download)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await connection.execute(query, [
      user_id, title, artist, album, release_date, file_url, cover_url, tags, visibility, allow_download
    ]);
    console.log("Mix inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error inserting mix:", error);
    return null;
  }
}

async function updateMixes(
  mix_id: number,
  user_id: number,
  title: string,
  artist: string,
  album: string | null,
  release_date: string,
  file_url: string,
  cover_url: string | null,
  tags: string | null,
  visibility: "public" | "private" | "unlisted" | "friends",
  allow_download: boolean,
): Promise<any | null> {
  const connection = await createConnection();

  try {
    const query = `
      UPDATE mix
      SET user_id = ?, title = ?, artist = ?, album = ?, created_at = ?, file_url = ?, cover_url = ?, tags = ?, visibility = ?, allow_download = ?
      WHERE mix_id = ? AND is_deleted = 0
    `;
    const [result] = await connection.execute(query, [
      user_id,
      title,
      artist,
      album,
      release_date,
      file_url,
      cover_url,
      tags,
      visibility,
      allow_download,
      mix_id,
    ]);
    console.log("Mix updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating mix:", error);
    return null;
  }
}

async function deleteMixes(mix_id: number): Promise<any | null> {
  const connection = await createConnection();
  try {
    const query = `UPDATE mix SET is_deleted = 1 WHERE mix_id = ?`;
    const [result] = await connection.execute(query, [mix_id]);
    console.log("Mix marked as deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting mix:", error);
    return null;
  }
}

export { insertMixes, updateMixes, deleteMixes };
