import createConnection from '@/database/connection';
import createTables from '@/database/table';
import { getEventsBasedOnDj, getEvent } from '@/database/search/getEvents';
import { getLikes } from '@/database/search/getLikes';
import { getComments } from '@/database/search/getComments';
import { getProfiles } from '@/database/search/getProfiles';
import {
  insertComment,
  updateComment,
  deleteComment
} from '@/database/update/updateComments';
import { insertEvent, updateEvent } from '@/database/update/updateEvents';
import { insertLike, deleteLike } from '@/database/update/updateLikes';
import {
  insertProfiles,
  updateProfiles,
  deleteProfiles
} from '@/database/update/updateProfiles';

async function testInsertComment() {
  const userId = 1;
  const mixId = 101;
  const commentText = 'This is a test comment.';

  const insertResult = await insertComment(userId, mixId, commentText);
  console.log('Insert Comment Test Result:', insertResult);
}

async function testUpdateComment() {
  const commentId = 1;
  const userId = 1;
  const mixId = 101;
  const commentText = 'Updated test comment.';

  const updateResult = await updateComment(
    commentId,
    userId,
    mixId,
    commentText
  );
  console.log('Update Comment Test Result:', updateResult);
}

async function testDeleteComment() {
  const commentId = 1;

  const deleteResult = await deleteComment(commentId);
  console.log('Delete Comment Test Result:', deleteResult);
}

async function testInsertEvent() {
  const title = 'Music Festival';
  const date = new Date('2024-12-01');
  const artistId = 42;
  const userId = 7;
  const description = 'A grand music festival featuring top artists.';

  const insertResult = await insertEvent(
    title,
    date,
    artistId,
    userId,
    description
  );
  console.log('Insert Event Test Result:', insertResult);
}

async function testUpdateEvent() {
  const eventId = 1;
  const title = 'Updated Music Festival';
  const date = new Date('2024-12-02');
  const artistId = 42;
  const userId = 7;
  const description = 'An updated description for the music festival.';

  const updateResult = await updateEvent(
    eventId,
    title,
    date,
    artistId,
    userId,
    description
  );
  console.log('Update Event Test Result:', updateResult);
}

async function testInsertLike() {
  const userId = 1;
  const mixId = 101;

  const insertResult = await insertLike(userId, mixId);
  console.log('Insert Like Test Result:', insertResult);
}

async function testDeleteLike() {
  const userId = 1;
  const mixId = 101;

  const deleteResult = await deleteLike(userId, mixId);
  console.log('Delete Like Test Result:', deleteResult);
}

async function testInsertProfiles() {
  const userId = 1;
  const bio = 'This is a test bio';
  const avatarUrl = 'https://example.com/avatar.png';

  const insertResult = await insertProfiles(userId, bio, avatarUrl);
  console.log('Insert Profiles Test Result:', insertResult);
}

async function testUpdateProfiles() {
  const profileId = 1;
  const userId = 1;
  const bio = 'Updated bio for testing';
  const avatarUrl = 'https://example.com/updated-avatar.png';

  const updateResult = await updateProfiles(
    profileId,
    userId,
    bio,
    avatarUrl
  );
  console.log('Update Profiles Test Result:', updateResult);
}

async function testDeleteProfiles() {
  const userId = 1;

  const deleteResult = await deleteProfiles(userId);
  console.log('Delete Profiles Test Result:', deleteResult);
}

//--------------------------------------------------------

async function testGetComments() {
  const testMixId = 1;

  const commentsResult = await getComments(testMixId);
  console.log(`Comments for mix_id ${testMixId}:`, commentsResult);
}

async function testGetLikes() {
  const testMixId = 1;

  const likeCount = await getLikes(testMixId);
  console.log(`Number of likes for mix_id ${testMixId}: ${likeCount}`);
}

async function testGetEventsBasedOnDj() {
  const testArtistId = 1;
  const events = await getEventsBasedOnDj(testArtistId);

  if (events) {
    console.log(`Found ${events.length} events for artist_id ${testArtistId}:`);
    events.forEach((event, index) => {
      console.log(`Event ${index + 1}: ${event.title} on ${event.date}`);
    });
  } else {
    console.log(`No events found for artist_id ${testArtistId}`);
  }
}

async function testGetEvent() {
  const testEventId = 1;

  const event = await getEvent(testEventId);
  if (event) {
    console.log(`Found event: ${event.title} on ${event.date}`);
  } else {
    console.log(`No event found with event_id ${testEventId}`);
  }
}

async function testGetProfiles() {
  const testUserId = 1;
  const profile = await getProfiles(testUserId);

  if (profile) {
    console.log(`Found profile for user_id ${testUserId}:`);
    console.log(`Bio: ${profile.bio}`);
    console.log(`Avatar URL: ${profile.avatarUrl}`);
  } else {
    console.log(`No profile found for user_id ${testUserId}`);
  }
}

async function runTests(): Promise<void> {
  const connection = await createConnection();
  await createTables();

  // test insert

  console.log('Starting test for InsertComment...');
  await testInsertComment();

  console.log('Starting test for InsertEvent...');
  await testInsertEvent();

  console.log('Starting test for InsertLike...');
  await testInsertLike();

  console.log('Starting test for InsertProfiles...');
  await testInsertProfiles();

  // test update

  console.log('Starting test for UpdateProfiles...');
  await testUpdateProfiles();

  console.log('Starting test for UpdateComment...');
  await testUpdateComment();

  console.log('Starting test for UpdateEvent...');
  await testUpdateEvent();

  // test get

  console.log('Starting test for getComments...');
  await testGetComments();

  console.log('Starting test for getProfiles...');
  await testGetProfiles();

  console.log('Starting tests for getEventsBasedOnDj and getEvent...');
  await testGetEventsBasedOnDj();
  await testGetEvent();

  console.log('Starting test for getLikes...');
  await testGetLikes();

  // test delete

  console.log('Starting test for DeleteComment...');
  await testDeleteComment();

  console.log('Starting test for DeleteLike...');
  await testDeleteLike();

  console.log('Starting test for DeleteProfiles...');
  await testDeleteProfiles();

  await connection.execute(`DROP TABLE IF EXISTS events`);
  await connection.execute(`DROP TABLE IF EXISTS comments`);
  await connection.execute(`DROP TABLE IF EXISTS likes`);
  await connection.execute(`DROP TABLE IF EXISTS user_profiles`);
  await connection.end();
}

runTests().catch((error: Error) => {
  console.error('Error running tests:', error);
});
