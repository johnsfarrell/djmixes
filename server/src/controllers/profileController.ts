import { Request, Response } from 'express';
import createConnection from '@/database/connection';
import { RowDataPacket } from 'mysql2';
import { ProfileResponse } from '@/utils/interface';
import { getUserLiked } from '@/database/search/getLikes';
import { getUserCommented } from '@/database/search/getComments';

class ProfileController {
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
}

export default ProfileController;
