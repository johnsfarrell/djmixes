/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database search functions for retrieving events.
 */

import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';
import { Event } from '@/utils/interface';

/**
 * Function to retrieve all events related to a specific artist (DJ)
 * @param artistId - The ID of the artist (DJ)
 * @returns Promise<Event[] | null> - an array of Event objects, or null if no events are found
 * @throws Error if the query fails
 */
async function getEventsBasedOnDj(artistId: number): Promise<Event[] | null> {
  const connection = await createConnection();

  try {
    // Get all the events related to the provided artist_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT event_id, title, date, artist_id, user_id, description, created_at, updated_at FROM events WHERE artist_id = ? ORDER BY date DESC',
      [artistId]
    );

    if (rows.length === 0) {
      return null; // No event found with the provided artist_id
    }
    return rows as Event[];
  } catch (error) {
    console.error('Error fetching events for artist:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to retrieve a specific event by its event ID
 * @param eventId - The ID of the event
 * @returns Promise<Event | null> - Event object if found, or null if no event is found
 * @throws Error if the query fails
 */
async function getEvent(eventId: number): Promise<Event | null> {
  const connection = await createConnection();

  try {
    // Get the event related to the provided event_id
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT event_id, title, date, artist_id, user_id, description, created_at, updated_at FROM events WHERE event_id = ?',
      [eventId]
    );

    if (rows.length === 0) {
      return null; // No event found with the provided event_id
    }

    // Return the event data
    return rows[0] as Event;
  } catch (error) {
    console.error('Error fetching event:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to search for events where the title contains a specified keyword
 * @param title - event titles
 * @returns Promise<number[] | null> - array of event IDs, or null if no events are found
 * @throws Error if the query fails
 */
async function searchEventsByTitle(title: string): Promise<number[] | null> {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT DISTINCT event_id FROM events WHERE title like ?`,
      [`%${title}%`]
    );

    // Map rows to a list of mixId numbers
    const eventIds: number[] = rows.map((row) => row.event_id);
    return eventIds;
  } catch (error) {
    console.error('Retrieving events Error:', error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

export { getEventsBasedOnDj, getEvent, searchEventsByTitle };
