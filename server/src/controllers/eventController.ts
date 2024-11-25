import { Request, Response } from 'express';
import createConnection from '@/database/connection';
import { RowDataPacket } from 'mysql2';
import { EventsResponse, UploadEventResponse } from '@/utils/interface';

class EventController {
  /**
   * Fetches events for a specific DJ and returns them as JSON
   * @param req - Request object, includes the DJ ID
   * @param res - Response object, sends the event data
   * @returns void
   * @throws Error if there are issues fetching the events
   */
  getDjEvents = async (req: Request, res: Response): Promise<void> => {
    try {
      const djId = parseInt(req.params.djId, 10);
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
  };

  getDJEventsMock = async (req: Request, res: Response): Promise<void> => {
    const mockResponse: EventsResponse = {
      events: [
        {
          eventId: 3344,
          title: 'Upcoming Music Event',
          description: 'The latest music festival will be held in New York!',
          date: '2024-11-08'
        }
      ]
    };
    res.json(mockResponse);
  };

  /**
   * Uploads a new event and saves it in the database
   * @param req - Request object, containing event details
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error if there are issues uploading the event
   */
  uploadEvent = async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, description, date } = req.body;
      const djId = parseInt(req.params.djId, 10);
      const userId = req.body.user_id; // Assuming `user_id` is sent in the request body

      if (!title || !description || !date || isNaN(djId) || !userId) {
        res.status(400).json({ error: 'Missing or invalid event data' });
        return;
      }

      const connection = await createConnection();
      const [result]: any = await connection.execute(
        `INSERT INTO events (title, date, artist_id, user_id, description) VALUES (?, ?, ?, ?, ?)`,
        [title, new Date(date), djId, userId, description]
      );

      res.status(201).json({
        message: 'Event posted successfully',
        event_id: result.insertId
      });
    } catch (error) {
      console.error('Error uploading event:', error);
      res.status(500).json({ error: 'Failed to upload event' });
    }
  };

  uploadEventMock = async (req: Request, res: Response): Promise<void> => {
    const mockResponse: UploadEventResponse = {
      message: 'Event posted successfully',
      eventId: 3344
    };
    res.json(mockResponse);
  };
}

export default EventController;
