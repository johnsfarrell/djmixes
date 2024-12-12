/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the database test for testing database operations.
 */

import createConnection from '@/database/connection';
import createTables from '@/database/table';
import {
  getEventsBasedOnDj,
  getEvent,
  searchEventsByTitle
} from '@/database/search/getEvents';
import { getLikes, getUserLiked } from '@/database/search/getLikes';
import { getComments, getUserCommented } from '@/database/search/getComments';
import { getProfile } from '@/database/search/getProfiles';
import {
  insertComment,
  updateComment,
  deleteComment
} from '@/database/update/updateComments';
import { insertEvent, updateEvent } from '@/database/update/updateEvents';
import { insertLike, deleteLike } from '@/database/update/updateLikes';
import {
  insertProfile,
  updateProfile,
  deleteProfile,
  updateProfileBio,
  updateProfileAvatar
} from '@/database/update/updateProfiles';
import { getFollowedArtists } from '@/database/search/getFollows';
import {
  getMixes,
  getRandomMixes,
  getMixesByUploadedUser,
  getMixesByUserLiked,
  searchMixesByTitle
} from '@/database/search/getMixes';
import {
  getUserByName,
  getUserById,
  getUserByEmail,
  searchUserByName
} from '@/database/search/getUser';
import { followArtist } from '@/database/update/updateFollows';
import { updateMixField } from '@/database/update/updateMixes';

async function testGetFollowedArtists() {
  const testUserId = 2;
  const followedArtists = await getFollowedArtists(testUserId);
  if (followedArtists) {
    console.log(
      `Followed artists for user with ID ${testUserId}:`,
      followedArtists
    );
  } else {
    console.log(`No followed artists found for user with ID ${testUserId}.`);
  }
}

async function testGetMixes() {
  const testMixId = 1;
  const mixResult = await getMixes(testMixId);
  if (mixResult) {
    console.log(`Mix found for ID ${testMixId}:`, mixResult);
  } else {
    console.log(`No mix found with ID ${testMixId}.`);
  }
}

async function testGetRandomMixes() {
  const numberOfMixes = 2;
  const randomMixes = await getRandomMixes(numberOfMixes);
  if (randomMixes) {
    console.log(`Random mixes found:`, randomMixes);
  } else {
    console.log(`No random mixes found.`);
  }
}

async function testGetMixesByUserLiked() {
  const testUserId = 2;
  const likedMixes = await getMixesByUserLiked(testUserId);
  if (likedMixes) {
    console.log(`Mixes liked by user with ID ${testUserId}:`, likedMixes);
  } else {
    console.log(`No mixes liked by user with ID ${testUserId}.`);
  }
}

async function testSearchMixesByTitle() {
  const testTitle = 'DJMix2';
  const mixesByTitle = await searchMixesByTitle(testTitle);
  if (mixesByTitle) {
    console.log(
      `Mixes found with title containing "${testTitle}":`,
      mixesByTitle
    );
  } else {
    console.log(`No mixes found with title containing "${testTitle}".`);
  }
}

async function testGetMixesByUploadedUser() {
  const testUserId = 2;
  const uploadedMixes = await getMixesByUploadedUser(testUserId);
  if (uploadedMixes) {
    console.log(`Mixes uploaded by user with ID ${testUserId}:`, uploadedMixes);
  } else {
    console.log(`No mixes uploaded by user with ID ${testUserId}.`);
  }
}

async function testSearchEventsByTitle() {
  const testTitle = 'Hip Hop Night 10';
  const eventsResult = await searchEventsByTitle(testTitle);
  console.log(`Search Events By Title result:`, eventsResult);
}

async function testGetUserLiked() {
  const testUserId = 1;
  const likedItemsResult = await getUserLiked(testUserId);
  console.log(`Items liked by user with ID ${testUserId}:`, likedItemsResult);
}

async function testGetUserCommented() {
  const testUserId = 2;
  const commentedItemsResult = await getUserCommented(testUserId);
  console.log(
    `Items commented on by user with ID ${testUserId}:`,
    commentedItemsResult
  );
}

async function testUpdateProfileBio() {
  const testProfileId = 1;
  const newBio = 'test UpdateProfileBio';
  const updateResult = await updateProfileBio(testProfileId, newBio);
  if (updateResult) {
    console.log(
      `Profile with ID ${testProfileId} successfully updated with new bio: "${newBio}".`
    );
  } else {
    console.log(`Failed to update profile with ID ${testProfileId}.`);
  }
}

async function testUpdateProfileAvatar() {
  const testProfileId = 1;
  const newAvatarUrl = 'https://testUpdateProfileAvatar.com/avatar.jpg';
  const updateResult = await updateProfileAvatar(testProfileId, newAvatarUrl);
  if (updateResult) {
    console.log(
      `Profile with ID ${testProfileId} successfully updated with new avatar URL: "${newAvatarUrl}".`
    );
  } else {
    console.log(
      `Failed to update avatar for profile with ID ${testProfileId}.`
    );
  }
}

async function testFollowArtist() {
  const testUserId = 20;
  const testArtistId = 1;
  await followArtist(testUserId, testArtistId);
  console.log(
    `User with ID ${testUserId} successfully followed artist with ID ${testArtistId}.`
  );
}

async function testUpdateMixField() {
  const testMixId = 1;
  const fieldToUpdate = 'title';
  const newValue = 'testUpdateMixField';

  const updateResult = await updateMixField(testMixId, fieldToUpdate, newValue);
  if (updateResult) {
    console.log(
      `Mix with ID ${testMixId} successfully updated. Field "${fieldToUpdate}" set to "${newValue}".`
    );
  } else {
    console.log(`Failed to update mix with ID ${testMixId}.`);
  }
}

async function testGetUserByName() {
  const testUsername = 'oldSchool';
  const userResult = await getUserByName(testUsername);
  if (userResult) {
    console.log(`User found for username "${testUsername}":`, userResult);
  } else {
    console.log(`No user found with username "${testUsername}".`);
  }
}

async function testGetUserById() {
  const testUserId = 1;
  const userResult = await getUserById(testUserId);
  if (userResult) {
    console.log(`User found for userid "${testUserId}":`, userResult);
  } else {
    console.log(`No user found with userud "${testUserId}".`);
  }
}

async function testGetUserByEmail() {
  const testEmail = 'user3@example.com';
  const userResult = await getUserByEmail(testEmail);
  if (userResult) {
    console.log(`User found for email "${testEmail}":`, userResult);
  } else {
    console.log(`No user found with email "${testEmail}".`);
  }
}

async function testSearchUserByName() {
  const testUsername = 'zzz';
  const userIds = await searchUserByName(testUsername);
  if (userIds) {
    console.log(`Users found matching "${testUsername}":`, userIds);
  } else {
    console.log(`No users found matching "${testUsername}".`);
  }
}

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

async function testInsertProfile() {
  const userId = 1;
  const bio = 'This is a test bio';
  const avatarUrl = 'https://example.com/avatar.png';

  const insertResult = await insertProfile(userId, bio, avatarUrl);
  console.log('Insert Profile Test Result:', insertResult);
}

async function testUpdateProfile() {
  const profileId = 1;
  const userId = 1;
  const bio = 'Updated bio for testing';
  const avatarUrl = 'https://example.com/updated-avatar.png';

  const updateResult = await updateProfile(profileId, userId, bio, avatarUrl);
  console.log('Update Profile Test Result:', updateResult);
}

async function testDeleteProfile() {
  const userId = 1;

  const deleteResult = await deleteProfile(userId);
  console.log('Delete Profile Test Result:', deleteResult);
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

async function testGetProfile() {
  const testUserId = 1;
  const profile = await getProfile(testUserId);

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

  // new testing function
  console.log('Starting test for GetMixes...');
  await testGetMixes();

  console.log('Starting test for GetRandomMixes...');
  await testGetRandomMixes();

  console.log('Starting test for GetMixesByUserLiked...');
  await testGetMixesByUserLiked();

  console.log('Starting test for SearchMixesByTitle...');
  await testSearchMixesByTitle();

  console.log('Starting test for GetMixesByUploadedUser...');
  await testGetMixesByUploadedUser();

  console.log('Starting test for SearchEventsByTitle...');
  await testSearchEventsByTitle();

  console.log('Starting test for GetUserLiked...');
  await testGetUserLiked();

  console.log('Starting test for GetUserCommented...');
  await testGetUserCommented();

  console.log('Starting test for UpdateProfileBio...');
  await testUpdateProfileBio();

  console.log('Starting test for UpdateProfileAvatar...');
  await testUpdateProfileAvatar();

  console.log('Starting test for FollowArtist...');
  await testFollowArtist();

  console.log('Starting test for GetFollowedArtists...');
  await testGetFollowedArtists();

  console.log('Starting test for UpdateMixField...');
  await testUpdateMixField();

  console.log('Starting test for GetUserByName...');
  await testGetUserByName();

  console.log('Starting test for GetUserById...');
  await testGetUserById();

  console.log('Starting test for GetUserByEmail...');
  await testGetUserByEmail();

  console.log('Starting test for SearchUserByName...');
  await testSearchUserByName();

  // test insert

  console.log('Starting test for InsertComment...');
  await testInsertComment();

  console.log('Starting test for InsertEvent...');
  await testInsertEvent();

  console.log('Starting test for InsertLike...');
  await testInsertLike();

  console.log('Starting test for InsertProfile...');
  await testInsertProfile();

  // test update

  console.log('Starting test for UpdateProfile...');
  await testUpdateProfile();

  console.log('Starting test for UpdateComment...');
  await testUpdateComment();

  console.log('Starting test for UpdateEvent...');
  await testUpdateEvent();

  // test get

  console.log('Starting test for getComments...');
  await testGetComments();

  console.log('Starting test for getProfile...');
  await testGetProfile();

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

  console.log('Starting test for DeleteProfile...');
  await testDeleteProfile();

  await connection.execute(`DROP TABLE IF EXISTS events`);
  await connection.execute(`DROP TABLE IF EXISTS comments`);
  await connection.execute(`DROP TABLE IF EXISTS likes`);
  await connection.execute(`DROP TABLE IF EXISTS user_Profile`);
  await connection.execute(`DROP TABLE IF EXISTS follows`);
  await connection.execute(`DROP TABLE IF EXISTS mixes`);
  await connection.execute(`DROP TABLE IF EXISTS users`);
  await connection.end();
}

runTests().catch((error: Error) => {
  console.error('Error running tests:', error);
});
