import createConnection from './connection';
import createUsersTable from './tables/usersTable';
import createMixesTable from './tables/mixesTable';
import createCommentsTable from './tables/commentsTable';
import createEventsTable from './tables/eventsTable';
import createLikesTable from './tables/likesTable';
import createProfilesTable from './tables/profilesTable';
import createFollowsTable from './tables/followsTable';
import {
  insertUsersQuery,
  insertRecordsQuery,
  insertCommentsQuery,
  insertLikesQuery,
  insertFollowsQuery,
  insertEventsQuery,
  insertUserProfilesQuery
} from './dummy_data';

async function createTables(): Promise<void> {
  const connection = await createConnection();
  const tableQueries = [
    { name: 'users', query: createUsersTable.createUsersTableQuery },
    { name: 'mixes', query: createMixesTable.createTableQuery },
    { name: 'comments', query: createCommentsTable.createCommentTableQuery },
    { name: 'events', query: createEventsTable.createEventsTableQuery },
    { name: 'likes', query: createLikesTable.createLikesTableQuery },
    { name: 'follows', query: createFollowsTable.createFollowsTableQuery },
    {
      name: 'user_profiles',
      query: createProfilesTable.createProfilesTableQuery
    }
  ];

  try {
    const dbName = 'app_database';
    const [databases] = await connection.query('SHOW DATABASES LIKE ?', [
      dbName
    ]);
    if ((databases as any[]).length === 0) {
      await connection.execute(`CREATE DATABASE \`${dbName}\``);
      console.log(`Database "${dbName}" created.`);
    } else {
      console.log(`Database "${dbName}" already exists.`);
    }
    await connection.changeUser({ database: dbName });
  } catch (error) {
    console.error('Database Creation Error:', error);
  }

  try {
    // const dbName = 'app_database'; // TOCHECK: if we need another dbname here
    await connection.query('USE app_database;');
    for (const table of tableQueries) {
      await connection.execute(table.query);
      console.log(`Table '${table.name}' created or already exists.`);
    }
  } catch (error) {
    console.error('Tables Creation Error:', error);
  }

  const dummy_data_list = [
    insertUsersQuery,
    insertRecordsQuery,
    insertCommentsQuery,
    insertLikesQuery,
    insertFollowsQuery,
    insertEventsQuery,
    insertUserProfilesQuery
  ];

  try {
    for (const dummy_data of dummy_data_list) {
      await connection.execute(dummy_data);
    }
  } catch (error) {
    console.error('dummy data Error:', error);
  }
}

export default createTables;
