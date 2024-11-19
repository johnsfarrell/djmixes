import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';

// Define the type for the event data
export interface Event {
  event_id: number;
  title: string;
  date: Date;
  artist_id: number;
  user_id: number;
  description: string | null;
  created_at: Date;
  updated_at: Date;
}

async function getEventsBasedOnDj(artist_id: number): Promise<Event[] | null> {
  const connection = await createConnection();

  try {
    // Get all the events related to the provided artist_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT event_id, title, date, artist_id, user_id, description, created_at, updated_at FROM events WHERE artist_id = ? ORDER BY date DESC',
      [artist_id]
    );

    if (rows.length === 0) {
      return null; // No event found with the provided artist_id
    }
    return rows as Event[];
  } catch (error) {
    console.error('Error fetching events for artist:', error);
    throw error;
  }
}

// Function to get a specific event by event_id
async function getEvent(event_id: number): Promise<Event | null> {
  const connection = await createConnection();

  try {
    // Get the event related to the provided event_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT event_id, title, date, artist_id, user_id, description, created_at, updated_at FROM events WHERE event_id = ?',
      [event_id]
    );

    if (rows.length === 0) {
      return null; // No event found with the provided event_id
    }

    // Return the event data
    return rows[0] as Event;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  }
}

export { getEventsBasedOnDj, getEvent };
