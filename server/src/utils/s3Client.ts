import dotenv from "dotenv";
import path from 'path';
import { S3Client } from "@aws-sdk/client-s3";

dotenv.config({path:path.join(__dirname, '..', '..', '.env')});

export const s3Client = new S3Client({
  endpoint: process.env.AWS_ENDPOINT,
  forcePathStyle: false,
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const bucketName = process.env.AWS_BUCKET_NAME;
