import { Request, Response } from 'express';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import * as dotenv from 'dotenv';
import { getMixes } from '../database/search/getMixes';
import { pipeline } from 'stream';
dotenv.config();

// AWS configuration
const s3Client = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  forcePathStyle: false,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const bucketName = process.env.AWS_BUCKET_NAME!;

// Controller for downloading a file
export const downloadMix = async (req: Request, res: Response): Promise<void> => {
  const mixId = req.params.mix_id;

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
      Key: fileKey,
    };

    // Download file from S3
    const downloadStream = await s3Client.send(new GetObjectCommand(params));

    res.setHeader('Content-Disposition', `attachment; filename="${fileKey}"`);
    res.setHeader('Content-Type', downloadStream.ContentType || 'application/octet-stream');

    // Stream the file to the response
    pipeline(
      downloadStream.Body as NodeJS.ReadableStream,
      res,
      (err) => {
        if (err) {
          console.error('Error streaming file:', err);
          res.status(500).json({ error: 'Failed to download file' });
        }
      }
    );
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).json({ error: 'Failed to download file' });
  }
};
