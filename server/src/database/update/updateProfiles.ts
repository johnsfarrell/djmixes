import createConnection from "@/database/connection";
import { QueryResult } from "mysql2";

async function insertProfile(
  userId: number,
  bio: string | null,
  avatarUrl: string | null,
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      `INSERT INTO user_profiles (user_id, bio, avatar_url, created_at)
            VALUES (?, ?, ?, NOW())`,
      [userId, bio, avatarUrl],
    );
    console.log("profiles inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error inserting profiles:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

async function updateProfile(
  profileId: number,
  userId: number,
  bio: string | null,
  avatarUrl: string | null,
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      `UPDATE user_profiles
            SET bio = ?, avatar_url = ?
            WHERE profile_id = ? AND user_id = ?`,
      [bio, avatarUrl, profileId, userId],
    );
    console.log("profiles updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating profiles:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

async function updateProfileBio(
  profileId: number,
  bio: string | null,
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      `UPDATE user_profiles
            SET bio = ?
            WHERE profile_id = ? `,
      [bio, profileId],
    );
    console.log("profiles updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating profiles:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

async function updateProfileAvatar(
  profileId: number,
  avatarUrl: string | null,
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      `UPDATE user_profiles
            SET avatar_url = ?
            WHERE profile_id = ?`,
      [avatarUrl, profileId],
    );
    console.log("profiles updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating profiles:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

async function deleteProfile(userId: number): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      `DELETE FROM user_profiles
            WHERE user_id = ?`,
      [userId],
    );
    console.log("profile marked as deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting profile:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

export {
  insertProfile,
  updateProfile,
  updateProfileBio,
  updateProfileAvatar,
  deleteProfile,
};
