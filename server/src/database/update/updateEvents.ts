import createConnection from '@/database/connection';
import { Event } from '@/utils/interface';

async function insertEvent(
  title: string,
  date: Date,
  artistId: number,
  userId: number,
  description: string | null
): Promise<any | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO events (title, date, artist_id, user_id, description) VALUES (?, ?, ?, ?, ?)',
      [title, date, artistId, userId, description]
    );
    console.log('event inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting event:', error);
    return null;
  }
}

async function updateEvent(
  eventId: number,
  title: string,
  date: Date,
  artistId: number,
  userId: number,
  description: string | null
): Promise<any | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'UPDATE events SET title = ?, date = ?, artist_id = ?, user_id = ?, description = ? WHERE event_id = ?',
      [title, date, artistId, userId, description, eventId]
    );
    console.log('event uodated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating event:', error);
    return null;
  }
}

export { insertEvent, updateEvent };
