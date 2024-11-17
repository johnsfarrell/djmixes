import createConnection from '../connection';

// Define the type for the user profile data
export interface UserProfile {
  profile_id: number;
  user_id: number;
  bio: string | null;
  avatar_url: string | null;
  created_at: Date;
}

async function insertProfiles(user_id: number, bio: string | null, avatar_url: string | null): Promise<any | null> {
    const connection = await createConnection();
    try{
        const [result] = await connection.execute(
            `INSERT INTO user_profiles (user_id, bio, avatar_url, created_at)
            VALUES (?, ?, ?, NOW())`,
            [user_id, bio, avatar_url]
        );
        console.log('profiles inserted successfully:', result);
        return result;
    }catch (error) {
        console.error('Error inserting profiles:', error);
        return null;
    }
}

async function updateProfiles(profile_id: number, user_id: number, bio: string | null, avatar_url: string | null): Promise<any | null> {
    const connection = await createConnection();
    try{
        const [result] = await connection.execute(
            `UPDATE user_profiles
            SET bio = ?, avatar_url = ?
            WHERE profile_id = ? AND user_id = ?`,
            [bio, avatar_url, profile_id, user_id]
        );
        console.log('profiles updated successfully:', result);
        return result;
    } catch (error) {
        console.error('Error updating profiles:', error);
        return null;
    }
}

async function deleteProfiles(user_id: number): Promise<any | null> {
    const connection = await createConnection();
    try{
        const [result] = await connection.execute(
            `DELETE FROM user_profiles
            WHERE user_id = ?`,
            [user_id]
        );
        console.log('profile marked as deleted:', result);
        return result;
    } catch (error) {
        console.error('Error deleting profile:', error);
        return null;
    }
}

export { insertProfiles, updateProfiles, deleteProfiles };