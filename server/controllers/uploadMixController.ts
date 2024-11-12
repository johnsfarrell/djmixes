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
      Body: file.data,
    };

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
      req.body.allow_download
    );

    res.status(200).json({
      message: 'Mix uploaded successfully',
      fileKey,
      uploadResult,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
};
