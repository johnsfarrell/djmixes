/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database query to create the comments table.
 */

import createConnection from "@/database/connection";
import { QueryResult } from "mysql2";

/**
 * Function to insert a comment for a specific mix by a user
 * @param userId - The ID of the user
 * @param mixId - The ID of the mix
 * @param commentText - The text content of the comment being posted
 * @returns Promise<QueryResult | null> - Query result after inserted, or null if the insertion fails
 */
async function insertComment(
  userId: number,
  mixId: number,
  commentText: string,
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      "INSERT INTO comments (user_id, mix_id, comment_text) VALUES (?, ?, ?)",
      [userId, mixId, commentText],
    );
    console.log("Comment inserted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error inserting comment:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to update a comment's text based on its ID
 * @param commentId - The ID of the comment to be updated
 * @param userId - The ID of the user updating the comment
 * @param mixId - The ID of the mix the comment belongs to
 * @param commentText - The new comment text, or null to remove the comment
 * @returns Promise<QueryResult | null> - Result of the update query, or null if failed
 */
async function updateComment(
  commentId: number,
  userId: number,
  mixId: number,
  commentText: string | null,
): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      "UPDATE comments SET user_id = ?, mix_id = ?, comment_text = ? WHERE comment_id = ?",
      [userId, mixId, commentText, commentId],
    );
    console.log("comment updated successfully:", result);
    return result;
  } catch (error) {
    console.error("Error updating comment:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}

/**
 * Function to delete a comment by its ID
 * @param commentId - The ID of the comment to be deleted
 * @returns Promise<QueryResult | null> - Result of the delete query, or null if failed
 */
async function deleteComment(commentId: number): Promise<QueryResult | null> {
  const connection = await createConnection();
  try {
    const [result] = await connection.execute(
      "DELETE FROM comments WHERE comment_id = ?",
      [commentId],
    );
    console.log("comment deleted successfully:", result);
    return result;
  } catch (error) {
    console.error("Error deleting comment:", error);
    return null;
  } finally {
    await connection.end(); // Close the connection
  }
}
export { insertComment, updateComment, deleteComment };
