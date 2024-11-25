import { Request, Response } from 'express';
import createConnection from '@/database/connection';
import { RowDataPacket } from 'mysql2';
import { ProfileResponse } from '@/utils/interface';

class ProfileController {
  getProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request body
      const { userId } = req.body;

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

  getProfileMock = async (req: Request, res: Response): Promise<void> => {
    const mockResponse: ProfileResponse = {
      username: 'anita',
      bio: 'music producer',
      mixes: [
        {
          mixId: 5678,
          title: 'sound of music',
          visibility: 'public'
        }
      ],
      events: [
        {
          eventId: 1012,
          title: 'upcoming music festival',
          date: '2024-11-08'
        }
      ]
    };
    res.json(mockResponse);
  };
}

export default ProfileController;
