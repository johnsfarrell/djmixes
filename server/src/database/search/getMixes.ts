import { RowDataPacket } from 'mysql2';
import createConnection from '@/database/connection';
import { Mix } from '@/utils/interface';

// The function signature for getMixes
async function getMixes(mix_id: number): Promise<Mix | null> {
  const connection = await createConnection();
  try {
    const [rows] = await connection.execute<RowDataPacket[]>(
      `SELECT * FROM mix WHERE mix_id = ? AND is_deleted = 0`,
      [mix_id]
    );

    if (rows.length > 0) {
      return rows[0] as Mix; // Cast to the Mix interface
    } else {
      console.log(`Mix with id ${mix_id} not found or has been deleted.`);
      return null;
    }
  } catch (error) {
    console.error('Retrieving mix Error:', error);
    throw error;
  }
}

export { getMixes };
