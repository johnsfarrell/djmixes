/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the integrated test for backend API endpoints, do clear the database and have the server up and running before running the test
 */

import request from 'supertest';

describe('MixController Integration Tests', () => {
  const serverUrl = 'http://localhost:4000';  // Server URL

  test('uploadMix should return 400 if files are missing', async () => {
    const response = await request(serverUrl)
      .post('/api/mixes/upload')  // Assuming the endpoint for upload is /mix/upload
      .field('user_id', '1')
      .field('title', 'Test Mix')
      .field('artist', 'Test Artist');
    
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Required files not uploaded' });
  });

  test('uploadMix should return 200 for valid upload', async () => {
    const mixFile = Buffer.from('mock file content');
    const coverFile = Buffer.from('mock cover content');

    const response = await request(serverUrl)
      .post('/api/mixes/upload') 
      .field('user_id', '1')
      .field('title', 'Test Mix')
      .field('artist', 'Test Artist')
      .attach('mix', mixFile, 'testMix.mp3')  // Attach the mix file
      .attach('cover', coverFile, 'testCover.jpg');  // Attach the cover file

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Files uploaded successfully',
      mixId: expect.any(Object),
      mixFileKey: expect.any(String),  // Match dynamic mixFileKey
      coverFileKey: expect.any(String),  // Match dynamic coverFileKey
    });
  });
});

describe('ProfileController Integration Tests', () => {
  const serverUrl = 'http://localhost:4000';  // Server URL

  test('getProfileDetails should return 400 if userId is invalid', async () => {
    const response = await request(serverUrl)
      .get('/api/profile/invalidId');  // Invalid userId

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid or missing user ID' });
  });

  test('getProfileDetails should return 404 if profile is not found', async () => {
    const response = await request(serverUrl)
      .get('/api/profile/999');  // Non-existing user ID

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'Profile not found' });
  });

  test('getProfileDetails should return 200 for valid user profile', async () => {
    const response = await request(serverUrl)
      .get('/api/profile/1');

    expect(response.status).toBe(200);
  });

  test('updateProfile should return 400 if userId is invalid', async () => {
    const response = await request(serverUrl)
      .put('/api/profile/invalidId')  // Invalid userId
      .send({
        bio: 'Updated bio',
        avatar: 'new-avatar.jpg',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid or missing user ID' });
  });

  test('updateProfile should return 200 for valid profile update', async () => {
    const response = await request(serverUrl)
      .put('/api/profile/1')  // Valid user ID
      .field('bio', 'Updated bio')
    expect(response.status).toBe(200);
  });

  test('deleteProfile should return 400 if userId is invalid', async () => {
    const response = await request(serverUrl)
      .delete('/api/profile/invalidId');  // Invalid userId

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Invalid or missing user ID' });
  });
});

describe('UserController Integration Tests', () => {
  const serverUrl = 'http://localhost:4000'; // Server URL

  test('register should return 400 if username is empty', async () => {
    const response = await request(serverUrl)
      .post('/api/user/register')
      .send({
        username: '',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Username cannot be empty' });
  });

  test('register should return 409 if username already exists', async () => {
    // Assume a user with the username 'existingUser' already exists in the DB
    const response = await request(serverUrl)
      .post('/api/user/register')
      .send({
        username: 'tester',
        email: 'newemail@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ error: 'Username already exist' });
  });

  test('register should return 409 if email already exists', async () => {
    // Assume a user with the email 'existing@example.com' already exists in the DB
    const response = await request(serverUrl)
      .post('/api/user/register')
      .send({
        username: 'newUser',
        email: 'user1@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({ error: 'Email already exist' });
  });

  test('register should return 200 for successful registration', async () => {
    const response = await request(serverUrl)
      .post('/api/user/register')
      .send({
        username: 'newUserTest2',
        email: 'newuser@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Registration successful',
      user_id: expect.any(Number), // The user_id should be dynamic
    });
  });

  test('login should return 400 if email or password is missing', async () => {
    const response = await request(serverUrl)
      .post('/api/user/login')
      .send({
        email: 'test@example.com',
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: 'Email and password are required' });
  });

  test('login should return 401 if password is incorrect', async () => {
    const response = await request(serverUrl)
      .post('/api/user/login')
      .send({
        email: 'user1@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: 'Invalid email or password' });
  });

  test('login should return 200 for successful login', async () => {
    const response = await request(serverUrl)
      .post('/api/user/login')
      .send({
        email: 'user1@example.com',
        password: 'password1',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: 'Login successful',
      token: expect.any(String),
      user_id: expect.any(Number),
    });
  });
});
