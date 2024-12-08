import dotenv from "dotenv";
import path from "path";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
  GetObjectCommandInput,
} from "@aws-sdk/client-s3";
import { UploadParams, UploadResult } from "./interface";
import { Response } from "express";
import { pipeline } from "stream";
import { promisify } from "util";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

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

// Convert callback-based pipeline to a promise-based one
const pipelinePromise = promisify(pipeline);

/**
 * Downloads a file from S3 and streams it to the HTTP response.
 * @param s3Client - An initialized S3 client
 * @param params - Parameters for the GetObjectCommand
 * @param res - The HTTP response object to stream the file
 * @param filename - The name of the file to send in the response
 * @returns Promise<void>
 */
export const downloadFromS3 = async (
  s3Client: S3Client,
  params: GetObjectCommandInput,
  res: Response,
  filename: string,
): Promise<void> => {
  try {
    // Get the object from S3
    const downloadStream = await s3Client.send(new GetObjectCommand(params));
    const safeFilename = encodeURIComponent(filename);

    // Set headers
    res.setHeader("Content-Disposition", `attachment; filename="${safeFilename}"`);
    res.setHeader(
      "Content-Type",
      downloadStream.ContentType || "application/octet-stream",
    );

    // Stream the file to the response
    await pipelinePromise(downloadStream.Body as NodeJS.ReadableStream, res);
  } catch (error) {
    console.error("Error downloading file:", error);
    throw new Error("Failed to download file");
  }
};

/**
 * Helper function to upload a file to S3
 * @param s3Client - Instance of S3Client
 * @param params - Upload parameters for the file
 * @returns Promise resolving with the upload result
 */
export async function uploadToS3(
  s3Client: S3Client,
  params: UploadParams,
): Promise<UploadResult> {
  try {
    const result = await s3Client.send(new PutObjectCommand(params));
    console.log(`Successfully uploaded: ${params.Bucket}/${params.Key}`);
    return { key: params.Key, result };
  } catch (error) {
    console.error(`Error uploading file: ${params.Key}`, error);
    throw new Error(`Failed to upload file: ${params.Key}`);
  }
}
