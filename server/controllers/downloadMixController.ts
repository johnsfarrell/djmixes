import { Request, Response } from 'express';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getMixes } from '../database/search/getMixes';
import { pipeline } from 'stream';
import { s3Client, bucketName } from '../utils/s3Client';

/**
 * Controller for downloading a mix file from S3
 * @param req - Request object, containing the mix ID
 * @param res - Response object, used to send a response back to the client
 * @returns void
 * @throws Error - If the file download fails
 */
export const downloadMix = async (
  req: Request,
  res: Response
): Promise<void> => {
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
