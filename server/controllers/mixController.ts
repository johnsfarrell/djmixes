import { Request, Response } from 'express';
import { getMixes } from '@/database/search/getMixes';
import { Mix, MixResponse, UploadMixResponse } from '@/utils/interface';
import { User, getUserByName } from '@/database/search/getUser';
import { s3Client, bucketName } from '@/utils/s3Client';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { pipeline } from 'stream';
import { UploadedFile } from 'express-fileupload';
import { SplitTimestamps, StemmedAudio } from '@/utils/algorithm';
import { algorithm as algo } from '@/app';
import { insertMixes } from '@/database/update/updateMixes';

class MixController {
  /**
   * Fetches a mix by its ID and returns metadata about the mix
   * @param req - Request, includes the mixId
   * @param res - Response, sends the mix data as a JSON MixResponse
   * @returns void
   * @throws Error if the mix or user is not found
   */
  getMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;

    try {
      // Fetch mix data from the database
      const mixData: Mix | null = await getMixes(parseInt(mixId, 10));

      if (!mixData) {
        res.status(404).send('Mix not found');
        return;
      }

      // Fetch the user who uploaded the mix by user_id
      const user: User | null = await getUserByName(`${mixData.user_id}`); // Using user_id instead of username
      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      // Return the mix and user data in the response
      const response: MixResponse = {
        title: mixData.title,
        fileUrl: mixData.file_url,
        coverUrl: mixData.cover_url,
        visibility: mixData.visibility,
        allowDownload: mixData.allow_download,
        tags: mixData.tags ?? [],
        updatedAt: mixData.updated_at,
        createdAt: mixData.created_at,
        artist: mixData.artist,
        upload_user: {
          user_id: mixData.user_id,
          username: user.username
        },
        comments: [], // Placeholder for comments
        album: mixData.album
      };

      res.json(response);
    } catch (error) {
      console.error('Error retrieving mix:', error);
      res.status(500).send('Error retrieving mix');
    }
  };

  /**
   * Mock function to return a mock mix data as a JSON MixResponse
   * @param req - Request, includes the mixId
   * @param res - Response, sends a mock mix data as a JSON MixResponse
   */
  getMixMock = async (req: Request, res: Response): Promise<void> => {
    const mockResponse: MixResponse = {
      title: 'Mock Mix',
      fileUrl: 'https://example.com/mix.mp3',
      coverUrl: 'https://example.com/cover.jpg',
      visibility: 'public',
      allowDownload: true,
      tags: ['rock', 'pop'],
      updatedAt: new Date(),
      createdAt: new Date(),
      artist: 'Mock Artist',
      upload_user: {
        user_id: 1,
        username: 'mockuser'
      },
      comments: [],
      album: 'Mock Album'
    };

    res.json(mockResponse);
  };

  /**
   * Controller for downloading a mix file from S3
   * @param req - Request object, containing the mix ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the file download fails
   */
  downloadMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;

    try {
      // Retrieve mix details from the database
      const mix = await getMixes(parseInt(mixId, 10));

      if (!mix || !mix.file_url) {
        res.status(404).json({ error: 'Mix not found' });
        return;
      }

      if (!mix.allow_download) {
        res.status(403).json({ error: 'Download not allowed for this mix' });
        return;
      }

      const fileKey = mix.file_url.split('/').pop() || '';

      // Download parameters
      const params = {
        Bucket: bucketName,
        Key: fileKey
      };

      // Download file from S3
      const downloadStream = await s3Client.send(new GetObjectCommand(params));

      res.setHeader('Content-Disposition', `attachment; filename="${fileKey}"`);
      res.setHeader(
        'Content-Type',
        downloadStream.ContentType || 'application/octet-stream'
      );

      // Stream the file to the response
      pipeline(downloadStream.Body as NodeJS.ReadableStream, res, (err) => {
        if (err) {
          console.error('Error streaming file:', err);
          res.status(500).json({ error: 'Failed to download file' });
        }
      });
    } catch (error) {
      console.error('Error downloading file:', error);
      res.status(500).json({ error: 'Failed to download file' });
    }
  };

  /**
   * Controller for uploading a mix file to S3 and inserting its details into the database
   * @param req - Request object, containing the uploaded file and metadata
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the file upload fails
   */
  uploadMix = async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !req.files.mix) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    try {
      const mixFile = req.files.mix as UploadedFile;
      const coverFile = req.files.cover as UploadedFile;
      const mixFileKey = `${Date.now()}_${mixFile.name}`;
      const coverFileKey = `${Date.now()}_${coverFile.name}`;

      // Upload parameters
      const mixParams = {
        Bucket: bucketName,
        Key: mixFileKey,
        Body: mixFile.data
      };
      const coverParams = {
        Bucket: bucketName,
        Key: coverFileKey,
        Body: coverFile.data
      };
      const stamps: SplitTimestamps = await algo.getSplitTimestamps(
        mixFile.data
      );
      const stems: StemmedAudio = await algo.getStemmedAudio(mixFile.data);

      // // TODO: Remove these console logs (here for debugging)
      // console.log('Split timestamps:', stamps);
      // console.log('Stemmed audio:', stems);

      // Upload file to S3
      const mixUploadResult = await s3Client.send(
        new PutObjectCommand(mixParams)
      );
      const coverUploadResult = await s3Client.send(
        new PutObjectCommand(coverParams)
      );
      console.log(`Successfully uploaded object: ${bucketName}/${mixFileKey}`);
      console.log(
        `Successfully uploaded object: ${bucketName}/${coverFileKey}`
      );

      // Insert file details into the database
      await insertMixes(
        req.body.user_id,
        req.body.title,
        req.body.artist,
        req.body.album,
        req.body.release_date,
        mixFileKey,
        coverFileKey,
        req.body.tags,
        req.body.visibility,
        req.body.allow_download
      );

      const response: UploadMixResponse = {
        message: 'File uploaded successfully',
        fileKey: mixFileKey,
        uploadResult: mixUploadResult
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  };
}

export default MixController;
