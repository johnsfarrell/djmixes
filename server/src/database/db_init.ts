import createConnection from './connection';
import createTables from './table';

export default async function initializeDatabase(): Promise<void> {
  const connection = await createConnection();
  await createTables();
}
