import createConnection from './connection';
import createUsersTable from './tables/usersTable';
import createMixsTable from './tables/mixsTable';
import createCommentsTable from './tables/commentsTable';
import createEventsTable from './tables/eventsTable';
import createLikesTable from './tables/likesTable';
import createProfilesTable from './tables/profilesTable';
import {insertUsersQuery, insertRecordsQuery, insertCommentsQuery, insertLikesQuery, insertEventsQuery, insertUserProfilesQuery} from './dumb_data';

async function createTables(): Promise<void> {
  const connection = await createConnection();
  const tableQueries = [
    { name: 'users', query: createUsersTable.createUsersTableQuery },
    { name: 'mixs', query: createMixsTable.createTableQuery },
    { name: 'comments', query: createCommentsTable.createCommentTableQuery},
    { name: 'events', query: createEventsTable.createEventsTableQuery},
    { name: 'likes', query: createLikesTable.createLikesTableQuery},
    { name: 'user_profiles', query: createProfilesTable.createProfilesTableQuery}
  ];

  try {
    const dbName = "test";
    const [databases] = await connection.query("SHOW DATABASES LIKE ?", [
      dbName,
    ]);
    if ((databases as any[]).length === 0) {
      await connection.execute(`CREATE DATABASE \`${dbName}\``);
      console.log(`Database "${dbName}" created.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
    await connection.changeUser({ database: dbName });
  } catch (error) {
    console.error("Database Creation Error:", error);
  }

  try {
    const dbName = "test"; // TOCHECK: if we need another dbname here
    for (const table of tableQueries) {
      await connection.execute(table.query);
      console.log(`Table '${table.name}' created or already exists.`);
    }
  } catch (error) {
    console.error("Tables Creation Error:", error);
  }

  const dumb_data_list = [insertUsersQuery, insertRecordsQuery, insertCommentsQuery, insertLikesQuery, insertEventsQuery, insertUserProfilesQuery];

  try {
    for (const dumb_data of dumb_data_list) {
      await connection.execute(dumb_data);
    }
  } catch (error) {
    console.error('dumb data Error:', error);
  }

  const dumb_data_list = [insertUsersQuery, insertRecordsQuery, insertCommentsQuery, insertLikesQuery, insertEventsQuery, insertUserProfilesQuery];

  try {
    for (const dumb_data of dumb_data_list) {
      await connection.execute(dumb_data);
    }
  } catch (error) {
    console.error('dumb data Error:', error);
  }
}

export default createTables;
