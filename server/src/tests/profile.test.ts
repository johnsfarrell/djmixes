import request from 'supertest';
import app from '..';
import createConnection from '@/database/connection';

// Mock dependencies
jest.mock('../database/connection');

describe('ProfileController Tests', () => {
  describe('GET /api/profile/:userId', () => {
    it('should return a profile for a valid user ID', async () => {
      const mockProfile = {
        user_id: 1,
        username: 'testuser',
        bio: 'Test bio',
        mixes: [],
        events: []
      };

      const mockConnection = {
        execute: jest.fn().mockResolvedValue([[mockProfile], null])
      };
      (createConnection as jest.Mock).mockResolvedValue(mockConnection);

      const response = await request(app).get('/api/profile/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('username', 'testuser');
      expect(response.body).toHaveProperty('bio', 'Test bio');
    });

    it('should return 404 if profile is not found', async () => {
      const mockConnection = {
        execute: jest.fn().mockResolvedValue([[], null])
      };
      (createConnection as jest.Mock).mockResolvedValue(mockConnection);

      const response = await request(app).get('/api/profile/999');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Profile not found');
    });

    it('should return 400 if user ID is invalid', async () => {
      const response = await request(app).get('/api/profile/invalidId');

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Invalid user ID');
    });

    it('should return 500 if there is a database error', async () => {
      (createConnection as jest.Mock).mockRejectedValue(
        new Error('Database error')
      );

      const response = await request(app).get('/api/profile/1');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error', 'Internal server error');
    });
  });

  describe('GET /api/profile/1', () => {
    it('should return the mock profile response', async () => {
      const response = await request(app).get('/api/profile/mock');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('username', 'anita');
      expect(response.body).toHaveProperty('bio', 'music producer');
      expect(response.body.mixes).toHaveLength(1);
      expect(response.body.events).toHaveLength(1);
      expect(response.body.mixes[0]).toHaveProperty('mixId', 5678);
      expect(response.body.events[0]).toHaveProperty('eventId', 1012);
    });
  });
});
