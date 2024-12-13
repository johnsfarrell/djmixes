/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains helper functions for the frontend
 * application.
 */

/**
 * Formats a date object into a string in the format "YYYY-MM-DD HH:MM:SS", or
 * the current date if no date object is provided.
 *
 * @param date The date object to format (optional).
 *
 * @returns The formatted date string.
 */
export const formatDateTime = (date?: Date): string => {
  const d = date || new Date();

  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const seconds = String(d.getSeconds()).padStart(2, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const formatTimeSeconds = (timeSeconds: number) => {
  const minutes = Math.floor(timeSeconds / 60);
  const seconds = Math.floor(timeSeconds % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
