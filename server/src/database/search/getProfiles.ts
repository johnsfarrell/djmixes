/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to get a user's profile data.
 */

import { RowDataPacket } from "mysql2";
import createConnection from "@/database/connection";
import { UserProfile } from "@/utils/interface";

/**
 * Function to get profile data for a specific user
 * @param userId - The ID of the user
 * @returns Promise<UserProfile | null> - UserProfile object if found, or null if no profile found
 */
async function getProfile(userId: number): Promise<UserProfile | null> {
  const connection = await createConnection();

  try {
    // Query the profile data for the provided user_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      "SELECT profile_id, user_id, bio, avatar_url, created_at FROM user_profiles WHERE user_id = ?",
      [userId],
    );

    if (rows.length === 0) {
      return null; // No profile found for the given user_id
    }

    const row = rows[0];

    // Map the database fields to the UserProfile interface
    const userProfile: UserProfile = {
      profileId: row.profile_id,
      userId: row.user_id,
      bio: row.bio || null, // Handle optional or nullable fields
      avatarUrl: row.avatar_url || null, // Handle optional or nullable fields
      createdAt: new Date(row.created_at), // Parse date field
    };

    return userProfile;
  } catch (error) {
    console.error("Error fetching profile for user:", error);
    return null; // Return null in case of an error
  } finally {
    await connection.end(); // Ensure the connection is closed
  }
}

export { getProfile };
