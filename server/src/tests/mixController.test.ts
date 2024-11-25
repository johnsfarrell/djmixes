import request from 'supertest';
import app from '..'; // Adjust the path based on your app's location
import { getMixes } from '@/database/search/getMixes';
import { getUserByName } from '@/database/search/getUser';
import { s3Client } from '../utils/s3Client';

// Mock dependencies
jest.mock('../database/search/getMixes');
jest.mock('../database/search/getUser');
jest.mock('../utils/s3Client');
jest.mock('../database/update/updateMixes');

describe('MixController Tests', () => {
  // Test for getting a mix
  describe('GET /api/mixes/:mixId', () => {
    it('should return mix details for a valid mix ID', async () => {
      const mockMix = {
        id: 1,
        title: 'Mock Mix',
        fileUrl: 'http://example.com/file.mp3',
        coverUrl: 'http://example.com/cover.jpg',
        visibility: 'public',
        allowDownload: true,
        tags: ['tag1', 'tag2'],
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        artist: 'Test Artist',
        userId: 1,
        album: 'Test Album'
      };

      const mockUser = {
        userId: 1,
        username: 'testuser'
      };

      (getMixes as jest.Mock).mockResolvedValue(mockMix);
      (getUserByName as jest.Mock).mockResolvedValue(mockUser);

      const response = await request(app).get('/api/mixes/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('title', 'Mock Mix');
      expect(response.body.uploadUser).toHaveProperty('username', 'mockuser');
    });

    // Uncomment and fix if needed
    // it('should return 404 if mix is not found', async () => {
    //   (getMixes as jest.Mock).mockResolvedValue(null);

    //   const response = await request(app).get('/api/mixes/999999');

    //   expect(response.status).toBe(404);
    //   expect(response.text).toBe('Mix not found');
    // });

    // it('should return 404 if user is not found for a mix', async () => {
    //   const mockMix = {
    //     id: 1,
    //     title: 'Test Mix',
    //     file_url: 'http://example.com/file.mp3',
    //     cover_url: 'http://example.com/cover.jpg',
    //     visibility: 'public',
    //     allow_download: true,
    //     tags: ['tag1', 'tag2'],
    //     updated_at: new Date().toISOString(),
    //     created_at: new Date().toISOString(),
    //     artist: 'Test Artist',
    //     user_id: 1,
    //     album: 'Test Album',
    //   };

    //   (getMixes as jest.Mock).mockResolvedValue(mockMix);
    //   (getUserByName as jest.Mock).mockResolvedValue(null);

    //   const response = await request(app).get('/api/mixes/1');

    //   expect(response.status).toBe(404);
    //   expect(response.text).toBe('User not found');
    // });
  });

  // Test for downloading a mix
  describe('GET /api/mixes/:mixId/download', () => {
    it('should return the file if download is allowed', async () => {
      const mockMix = {
        id: 1,
        fileUrl: 'http://example.com/file.mp3',
        allowDownload: true
      };

      (getMixes as jest.Mock).mockResolvedValue(mockMix);

      const mockS3Response = {
        Body: 'file data',
        ContentType: 'audio/mp3'
      };

      (s3Client.send as jest.Mock).mockResolvedValue(mockS3Response);

      const response = await request(app).get('/api/mixes/1/download');

      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('audio/mp3');
    });

    it('should return 404 if mix not found', async () => {
      (getMixes as jest.Mock).mockResolvedValue(null);

      const response = await request(app).get('/api/mixes/1/download');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('Mix not found');
    });

    it('should return 403 if download is not allowed', async () => {
      const mockMix = {
        id: 1,
        fileUrl: 'http://example.com/file.mp3',
        allowDownload: false
      };

      (getMixes as jest.Mock).mockResolvedValue(mockMix);

      const response = await request(app).get('/api/mixes/1/download');

      expect(response.status).toBe(403);
      expect(response.body.error).toBe('Download not allowed for this mix');
    });

    it('should return 500 if there is an error during download', async () => {
      const mockMix = {
        id: 1,
        fileUrl: 'http://example.com/file.mp3',
        allowDownload: true
      };

      (getMixes as jest.Mock).mockResolvedValue(mockMix);
      (s3Client.send as jest.Mock).mockRejectedValue(
        new Error('S3 download error')
      );

      const response = await request(app).get('/api/mixes/1/download');

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to download file');
    });
  });

  // Test for uploading a mix
  describe('POST /api/mixes/upload', () => {
    // it('should successfully upload a mix', async () => {
    //   const mockFile = {
    //     name: 'mix.mp3',
    //     data: Buffer.from('fake file data'),
    //   };

    //   const mockUploadResult = {
    //     ETag: 'etag',
    //   };

    //   (s3Client.send as jest.Mock).mockResolvedValue(mockUploadResult);
    //   (insertMixes as jest.Mock).mockResolvedValue(true);

    //   const response = await request(app)
    //     .post('/api/mixes/upload')
    //     .field('user_id', 1)
    //     .field('title', 'Test Mix')
    //     .field('artist', 'Test Artist')
    //     .field('album', 'Test Album')
    //     .field('tags', 'rock,pop')
    //     .field('visibility', 'public')
    //     .field('allow_download', true)
    //     .attach('mix', mockFile.data);

    //   expect(response.status).toBe(200);
    //   expect(response.body.message).toBe('File uploaded successfully');
    // });

    it('should return 400 if no file is uploaded', async () => {
      const response = await request(app).post('/api/mixes/upload');

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('No file uploaded');
    });

    it('should return 500 if there is an error during upload', async () => {
      const mockFile = {
        name: 'mix.mp3',
        data: Buffer.from('fake file data')
      };

      (s3Client.send as jest.Mock).mockRejectedValue(
        new Error('S3 upload error')
      );

      const response = await request(app)
        .post('/api/mixes/upload')
        .field('user_id', 1)
        .field('title', 'Test Mix')
        .field('artist', 'Test Artist')
        .field('album', 'Test Album')
        .field('tags', 'rock,pop')
        .field('visibility', 'public')
        .field('allow_download', true)
        .attach('mix', mockFile.data);

      expect(response.status).toBe(500);
      expect(response.body.error).toBe('Failed to upload file');
    });
  });
});
