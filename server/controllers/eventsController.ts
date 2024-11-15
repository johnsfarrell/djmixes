import { Request, Response } from 'express';
import createConnection from '../database/connection';
import { RowDataPacket } from 'mysql2';

class EventsController {
  static async getDjEvents(req: Request, res: Response): Promise<void> {
    try {
      const djId = parseInt(req.params.dj_id, 10);
      if (isNaN(djId)) {
        res.status(400).json({ error: 'Invalid DJ ID' });
        return;
      }

      const connection = await createConnection();
      const [rows]: [RowDataPacket[], any] = await connection.execute(
        'SELECT * FROM events WHERE artist_id = ?',
        [djId]
      );

      if (rows.length === 0) {
        res.status(404).json({ message: 'No events found for this DJ' });
        return;
      }

      res.status(200).json({ events: rows });
    } catch (error) {
      console.error('Error fetching DJ events:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default EventsController;
