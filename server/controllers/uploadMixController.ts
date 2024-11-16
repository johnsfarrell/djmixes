import { Request, Response } from 'express';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';
import { insertMixes } from '../database/update/updateMixes';
import { bucketName, s3Client } from '../utils/s3Client';
import { algorithm as algo } from '../app';
import { SplitTimestamps, StemmedAudio } from '../utils/algorithm';

interface UploadMixResponse {
  message: string;
  fileKey: string;
  uploadResult: unknown;
}

/**
 * Controller for uploading a mix file to S3 and inserting its details into the database
 * @param req - Request object, containing the uploaded file and metadata
 * @param res - Response object, used to send a response back to the client
 * @returns void
 * @throws Error - If the file upload fails
 */
export const uploadMix = async (req: Request, res: Response): Promise<void> => {
  if (!req.files || !req.files.mix) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  try {
    const file = req.files.mix as UploadedFile;
    const fileKey = `${Date.now()}_${file.name}`;

    // Upload parameters
    const params = {
      Bucket: bucketName,
      Key: fileKey,
      Body: file.data
    };

    const stamps: SplitTimestamps = await algo.getSplitTimestamps(file.data);
    const stems: StemmedAudio = await algo.getStemmedAudio(file.data);

    // TODO: Remove these console logs (here for debugging)
    console.log('Split timestamps:', stamps);
    console.log('Stemmed audio:', stems);

    // Upload file to S3
    const uploadResult = await s3Client.send(new PutObjectCommand(params));
    console.log(`Successfully uploaded object: ${bucketName}/${fileKey}`);

    // Insert file details into the database
    await insertMixes(
      1, // Assuming this is some mix ID or placeholder
      req.body.user_id,
      req.body.title,
      req.body.artist,
      req.body.album,
      req.body.release_date,
      fileKey,
      req.body.cover_url,
      req.body.tags,
      req.body.visibility,
      req.body.allow_download,
      stamps
    );

    const response: UploadMixResponse = {
      message: 'File uploaded successfully',
      fileKey,
      uploadResult
    };

    res.status(200).json(response);
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
