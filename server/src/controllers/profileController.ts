import { Request, Response } from 'express';
import createConnection from '@/database/connection';
import { RowDataPacket } from 'mysql2';
import { ProfileResponse } from '@/utils/interface';
import { getUserLiked } from '@/database/search/getLikes';
import { getUserCommented } from '@/database/search/getComments';
import { updateProfiles, deleteProfiles } from '@/database/update/updateProfiles';

class ProfileController {
  /**
   * Fetch a user's profile by user ID
   */
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: 'Invalid or missing user ID' });
        return;
      }

      const connection = await createConnection();
      const [rows]: [RowDataPacket[], any] = await connection.execute(
        'SELECT * FROM user_profiles WHERE user_id = ?',
        [userId]
      );

      if (rows.length === 0) {
        res.status(404).json({ message: 'Profile not found' });
        return;
      }

      const profile = rows[0];
      res.status(200).json(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Fetch mixes liked by the user
   */
  getProfileLiked = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: 'Invalid or missing user ID' });
        return;
      }

      const likedList: number[] | null = await getUserLiked(userId);
      res.status(200).json({mix_ids: likedList});
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Fetch mixes commented on by the user
   */
  getProfileCommented = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: 'Invalid or missing user ID' });
        return;
      }

      const commentedList: number[] | null = await getUserCommented(userId);
      res.status(200).json({mix_ids: commentedList});

    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Update a user's profile
   */
  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { profile_id, bio, avatar_url } = req.body;

      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: 'Invalid or missing user ID' });
        return;
      }

      if (!profile_id) {
        res.status(400).json({ error: 'Missing profile ID' });
        return;
      }

      const result = await updateProfiles(profile_id, userId, bio, avatar_url);

      if (!result || result.affectedRows === 0) {
        res.status(404).json({ message: 'Profile not found or not updated' });
        return;
      }

      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Delete a user's profile
   */
  deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);

      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: 'Invalid or missing user ID' });
        return;
      }

      const result = await deleteProfiles(userId);

      if (!result || result.affectedRows === 0) {
        res.status(404).json({ message: 'Profile not found or already deleted' });
        return;
      }

      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error('Error deleting user profile:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default ProfileController;
