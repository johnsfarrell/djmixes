import createConnection from "@/database/connection";
import { QueryResult, ResultSetHeader } from "mysql2";

/**
 * function to create a new user in the database
 * @param username - The username of the user
 * @param email - The email of the user
 * @param password - The user's password
 * @param registrationMethod - The method used to register the user
 * @returns Promise<number | null> - The ID of the new user, or null if failed
 * @throws Error if the creation operation fails
 */
async function createUser(
  username: string,
  email: string,
  password: string,
  registrationMethod: number,
): Promise<number | null> {
  const connection = await createConnection();
  try {
    const [existingUsers] = await connection.query(
      "SELECT * FROM users WHERE username = ? OR email = ?",
      [username, email],
    );

    if ((existingUsers as QueryResult[]).length > 0) {
      console.log("User already exists with the same username or email.");
      return null;
    }
    const [result] = await connection.query(
      "INSERT INTO users (username, email, password, registration_method) VALUES (?, ?, ?, ?)",
      [username, email, password, registrationMethod],
    );
    console.log(
      `User created with ID: ${(result as ResultSetHeader).insertId}`,
    );
    return (result as ResultSetHeader).insertId;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to delete a user from the database by username
 * @param username - The username of the user
 * @returns Promise<boolean> - True if deletion was successful, false if failed
 * @throws Error if the creation operation fails
 */
async function deleteUser(username: string): Promise<boolean> {
  const connection = await createConnection();
  try {
    const [result] = await connection.query(
      "DELETE FROM users WHERE username = ?",
      [username],
    );
    return (result as ResultSetHeader).affectedRows > 0;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  } finally {
    await connection.end(); // Close the connection
  }
}

export { createUser, deleteUser };
