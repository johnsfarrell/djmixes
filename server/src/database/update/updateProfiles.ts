/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database queries to insert, update, and delete user profiles.
 */

import createConnection from "@/database/connection";
import { QueryResult } from "mysql2";

/**
 * Function to insert a new user profile into the database
 * @param userId - The ID of the user
 * @param bio - The bio of the user (can be null)
 * @param avatarUrl - The URL of the user's avatar image (can be null)
 * @returns Promise<QueryResult | null> - Result of the insert query, or null if failed
 */
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

/**
 * Function to update an existing user profile in the database
 * @param profileId - The ID of the profile to be updated
 * @param userId - The ID of the user
 * @param bio - The new bio of the user (can be null)
 * @param avatarUrl - The new URL of the user's avatar image (can be null)
 * @returns Promise<QueryResult | null> - Result of the update query, or null if failed
 */
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

/**
 * Function to update the bio of an existing user profile in the database
 * @param profileId - The ID of the profile to be updated
 * @param bio - The bio of the user (can be null)
 * @returns Promise<QueryResult | null> - Result of the update query, or null if failed
 */
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

/**
 * Function to update the avatar URL of an existing user profile in the database
 * @param profileId - The ID of the profile to be updated
 * @param avatarUrl - The new URL of the user's avatar (can be null)
 * @returns Promise<QueryResult | null> - Result of the update query, or null if failed
 */
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

/**
 * Function to delete a user profile from the database
 * @param userId - The ID of the user
 * @returns Promise<QueryResult | null> - Result of the deletion, or null if failed
 */
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
