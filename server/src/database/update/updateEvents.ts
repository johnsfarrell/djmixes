/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to create the events table.
 */

import createConnection from '@/database/connection';
import { QueryResult } from 'mysql2';

/**
 * Function to insert a new event
 * @param title - The title of the event
 * @param date - The date of the event
 * @param artistId - The ID of the artist hosting the event
 * @param userId - The ID of the user creating the event
 * @param description - Optional description of the event
 * @returns Promise<QueryResult | null> - Result of the insert query, or null if failed
 */
async function insertEvent(
  title: string,
  date: Date,
  artistId: number,
  userId: number,
  description: string | null
): Promise<QueryResult | null> {
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
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to update an existing event
 * @param eventId - The ID of the event to be updated
 * @param title - The new title of the event
 * @param date - The new date of the event
 * @param artistId - The new artist ID for the event
 * @param userId - The ID of the user updating the event
 * @param description - The new description of the event, or null to remove the description
 * @returns Promise<QueryResult | null> - Result of the update query, or null if failed
 */
async function updateEvent(
  eventId: number,
  title: string,
  date: Date,
  artistId: number,
  userId: number,
  description: string | null
): Promise<QueryResult | null> {
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
  } finally {
    await connection.end(); // Close the connection
  }
}

export { insertEvent, updateEvent };
