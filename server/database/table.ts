import createConnection from "./connection";
import createUsersTable from "./tables/usersTable";
import createMixsTable from "./tables/mixsTable";

async function createTables(): Promise<void> {
  const connection = await createConnection();
  const tableQueries = [
    { name: "users", query: createUsersTable.createTableQuery },
    { name: "mixs", query: createMixsTable.createTableQuery },
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
}

export default createTables;
