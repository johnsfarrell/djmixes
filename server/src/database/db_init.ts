import createTables from './table';

export default async function initializeDatabase(): Promise<boolean> {
  try {
    await createTables();
    return true;
  } catch (error) {
    return false;
  }
}
