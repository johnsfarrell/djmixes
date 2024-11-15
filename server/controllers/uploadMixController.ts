import { Request, Response } from 'express';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { UploadedFile } from 'express-fileupload';
import * as dotenv from 'dotenv';
import { insertMixes } from '../database/update/updateMixes';
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

// Controller for uploading a file
export const uploadMix = async (req: Request, res: Response): Promise<void> => {
  if (!req.files || !req.files.mix||!req.files.cover) {
    res.status(400).json({ error: 'No file uploaded' });
    return;
  }

  try {
    const mixFile = req.files.mix as UploadedFile;
    const mixFileKey = `${Date.now()}_${mixFile.name}`;
    const coverFile = req.files.cover as UploadedFile;
    const coverFileKey = `${Date.now()}_${mixFile.name}`;

    // Upload parameters
    const mixUploadParams = {
      Bucket: bucketName,
      Key: mixFileKey,
      Body: mixFile.data,
    };
    const coverUploadParams = {
      Bucket: bucketName,
      Key: coverFileKey,
      Body: coverFile.data,
    };

    // Upload file to S3
    const mixUploadResult = await s3Client.send(new PutObjectCommand(mixUploadParams));
    console.log(`Successfully uploaded object: ${bucketName}/${mixFileKey}`);
    const coverUploadResult = await s3Client.send(new PutObjectCommand(coverUploadParams));
    console.log(`Successfully uploaded object: ${bucketName}/${coverFileKey}`);

    // Insert file details into the database
    await insertMixes(
      1, // Assuming this is some mix ID or placeholder
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

    res.status(200).json({
      message: 'Mix uploaded successfully',
      mixFileKey: mixFileKey,
      mixUploadResult: mixUploadResult,
      coverFileKey: coverFileKey,
      coverUploadResult: coverUploadResult,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
