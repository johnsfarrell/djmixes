/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the helper functions for the application.
 */

/**
 * Removes the prefix (anything before and including the first underscore) from the filename.
 * @param filename - The original filename in the format prefix_b_c.d
 * @returns The filename without the prefix
 */
export function removePrefix(filename: string): string {
  const underscoreIndex = filename.indexOf("_");
  if (underscoreIndex !== -1) {
    return filename.substring(underscoreIndex + 1);
  }
  return filename;
}
