/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to get a user by their username, ID, or email.
 */

import { Connection, FieldPacket, RowDataPacket } from "mysql2/promise";
import createConnection from "@/database/connection";
import { User } from "@/utils/interface";

/**
 * Function to map database row fields to the User interface
 * @param row - A row of user data
 * @returns User - An User object
 */
function mapUserRow(row: RowDataPacket): User {
  return {
    userId: row.user_id,
    username: row.username,
    email: row.email,
    password: row.password,
    registrationMethod: row.registration_method,
    active: row.active === 1, // Convert 0/1 to boolean
    createTime: new Date(row.create_time),
  };
}

/**
 * Function to get a user by their username
 * @param username - The username of the user
 * @returns Promise<User | null> - User object if the user is found, or null if not found
 * @throws Error if the query fails
 */
async function getUserByName(username: string): Promise<User | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      "SELECT user_id, username, email, password, registration_method, active, create_time FROM users WHERE username = ?",
      [username],
    );

    if (rows.length > 0) {
      return mapUserRow(rows[0]); // Map the first row to User
    } else {
      console.log(
        `User with username "${username}" not found or has been deleted.`,
      );
      return null;
    }
  } catch (error) {
    console.error("Get User By Name Error:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to get a user by their ID
 * @param id - The ID of the user to be fetched
 * @returns Promise<User | null> - User object if the user is found, or null if not found
 * @throws Error if the query fails
 */
async function getUserById(id: number): Promise<User | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      "SELECT user_id, username, email, password, registration_method, active, create_time FROM users WHERE user_id = ?",
      [id],
    );

    if (rows.length > 0) {
      return mapUserRow(rows[0]); // Map the first row to User
    } else {
      console.log(`User with ID ${id} not found or has been deleted.`);
      return null;
    }
  } catch (error) {
    console.error("Get User By ID Error:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to get a user by their email
 * @param email - The email of the user to be fetched
 * @returns Promise<User | null> - User object if the user is found, or null if not found
 * @throws Error if the query fails
 */
async function getUserByEmail(email: string): Promise<User | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      "SELECT user_id, username, email, password, registration_method, active, create_time FROM users WHERE email = ?",
      [email],
    );

    if (rows.length > 0) {
      return mapUserRow(rows[0]); // Map the first row to User
    } else {
      console.log(`User with email "${email}" not found or has been deleted.`);
      return null;
    }
  } catch (error) {
    console.error("Get User By Email Error:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to search for users by their username
 * @param username - The username to search for
 * @returns Promise<number[] | null> - Array of user IDs, or null if no users are found
 * @throws Error if the query fails
 */
async function searchUserByName(username: string): Promise<number[] | null> {
  const connection: Connection = await createConnection();
  try {
    const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
      "SELECT user_id FROM users WHERE username LIKE ?",
      [`%${username}%`],
    );

    if (rows.length > 0) {
      return rows.map((row) => row.user_id);
    } else {
      console.log(
        `User with username "${username}" not found or has been deleted.`,
      );
      return null;
    }
  } catch (error) {
    console.error("Get User By Name Error:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

export { getUserByName, getUserById, getUserByEmail, searchUserByName };
