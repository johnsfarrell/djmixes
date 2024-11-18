import { RowDataPacket } from 'mysql2';
import createConnection from '../connection';

// Define the type for the user profile data
export interface UserProfile {
  profile_id: number;
  user_id: number;
  bio: string | null;
  avatar_url: string | null;
  created_at: Date;
}

// Function to get profile data for a specific user
async function getProfiles(user_id: number): Promise<UserProfile | null> {
    const connection = await createConnection();

  try {
    // Get the profile data for the provided user_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT profile_id, user_id, bio, avatar_url, created_at FROM user_profiles WHERE user_id = ?',
      [user_id]
    );

    if (rows.length === 0) {
      return null; // No profile found for the given user_id
    }

    return rows[0] as UserProfile;
  } catch (error) {
    console.error('Error fetching profile for user:', error);
    return null; // Return null in case of an error
  } 
}

export { getProfiles };
