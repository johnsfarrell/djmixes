import createTables from "./table";

export default async function initializeDatabase(): Promise<boolean> {
  try {
    await createTables();
    return true;
  } catch (error) {
    console.error("Error initializing database:", error);
    return false;
  }
}
