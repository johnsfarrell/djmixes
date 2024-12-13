/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database initialization function.
 */

import createTables from "./table";

/**
 * Initialize the database by creating necessary tables
 * @returns Promise<boolean> - True if initialization is successful, false if failed
 */
export default async function initializeDatabase(): Promise<boolean> {
  try {
    await createTables();
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
}
