import { Request, Response } from 'express';
import createConnection from '../database/connection';
import { RowDataPacket } from 'mysql2';

class ProfileController {
  static async showProfile(req: Request, res: Response): Promise<void> {
    try {
      const userId = parseInt(req.params.user_id, 10);
      if (isNaN(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
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
  }
}

export default ProfileController;
