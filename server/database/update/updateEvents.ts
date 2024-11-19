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

async function insertEvent(
  title: string,
  date: Date,
  artist_id: number,
  user_id: number,
  description: string | null
): Promise<any | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'INSERT INTO events (title, date, artist_id, user_id, description) VALUES (?, ?, ?, ?, ?)',
      [title, date, artist_id, user_id, description]
    );
    console.log('event inserted successfully:', result);
    return result;
  } catch (error) {
    console.error('Error inserting event:', error);
    return null;
  }
}

async function updateEvent(
  event_id: number,
  title: string,
  date: Date,
  artist_id: number,
  user_id: number,
  description: string | null
): Promise<any | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      'UPDATE events SET title = ?, date = ?, artist_id = ?, user_id = ?, description = ? WHERE event_id = ?',
      [title, date, artist_id, user_id, description, event_id]
    );
    console.log('event uodated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating event:', error);
    return null;
  }
}

export { insertEvent, updateEvent };
