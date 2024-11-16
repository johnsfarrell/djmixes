import createConnection from "./connection";
import createTables from "./table";
import { getUserByName } from "./search/getUser";
import { createUser, deleteUser } from "./update/updateUser";
import { getMixes } from "./search/getMixes";
import { insertMixes, updateMixes, deleteMixes } from "./update/updateMixes";

async function runTests(): Promise<void> {
  const connection = await createConnection();
  await createTables();

  const createUserResult = await createUser(
    "testuser",
    "testuser@example.com",
    "securepassword123",
    0,
  );
  console.log("Create User Result:", createUserResult);

  const user = await getUserByName("testuser");
  console.log("Get User Result:", user);

  const insertMixesResult = await insertMixes(
    1,
    1,
    "Title",
    "Artist",
    "Album",
    "2024-11-01",
    "file_url",
    "cover_url",
    "tag",
    "public",
    true,
  );
  console.log("Insert mixes Result:", insertMixesResult);

  const updateResult = await updateMixes(
    1,
    1,
    "Updated Title",
    "Updated Artist",
    "Updated Album",
    "2024-11-02",
    "file_url2",
    "cover_url2",
    "tag1",
    "private",
    false,
  );
  console.log("Update mixes Result:", updateResult);

  const mixes = await getMixes(1);
  console.log("Get Mixes Result:", mixes);

  const deleteMixesResult = await deleteMixes(1);
  console.log("Delete Mixes Result:", deleteMixesResult);

  const checkMixes = await getMixes(1);
  console.log(
    "Deleted Mixes Result:",
    checkMixes ? checkMixes : "Mixes successfully deleted.",
  );

  await connection.execute(`DROP TABLE IF EXISTS mix`);

  const deleteUserResult = await deleteUser("testuser");
  console.log("Delete User Result:", deleteUserResult);

  const deletedUser = await getUserByName("testuser");
  console.log(
    "Deleted User Result:",
    deletedUser ? deletedUser : "User successfully deleted.",
  );

  await connection.execute(`DROP TABLE IF EXISTS users`);
  await connection.end();
}

runTests().catch((error: Error) => {
  console.error("Error running tests:", error);
});
