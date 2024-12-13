/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the audio processing logic for the application.
 */

import axios from "axios";
import JSZip from "jszip";
import { UploadParams } from "@/utils/interface";
import { s3Client, bucketName, uploadToS3 } from "@/utils/s3Client";
import { updateMixField } from "@/database/update/updateMixes";

export type SplitTimestamps = Record<string, number>;

export type StemmedAudio = Record<string, Buffer>;

class AudioProcessor {
  /**
   * Extracts and uploads the stems from an audio file
   * File input should be a .wav file
   * @param buffer - The audio file to extract the stems from
   * @param s3Client - Instance of S3Client
   * @param bucketName - S3 bucket where stems will be uploaded
   * @returns - An array of uploaded file keys
   */
  public async getStemmedAudio(
    mixId: number | null,
    buffer: Buffer,
  ): Promise<string[]> {
    const formData = new FormData();
    formData.append("file", new Blob([buffer]), "audio-file");

    // Send the POST request to stem
    const response = await axios.post("http://algorithm:5000/stem", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      responseType: "arraybuffer",
    });

    // Load the zip content as a buffer
    const zip = await JSZip.loadAsync(response.data);

    // Array to store the uploaded file keys
    const uploadedKeys: string[] = [];

    // Extract and upload each file
    const uploadPromises = Object.keys(zip.files).map(async (filename) => {
      const fileData = await zip.files[filename].async("nodebuffer");
      const fileKey = `${Date.now()}_${filename}`;

      const params: UploadParams = {
        Bucket: bucketName,
        Key: fileKey,
        Body: fileData,
      };

      try {
        const uploadResult = await uploadToS3(s3Client, params);
        console.log(`Uploaded stem: ${filename} as ${uploadResult.key}`);
        uploadedKeys.push(uploadResult.key);

        if (filename.includes("drum")) {
          await updateMixField(mixId, "stem_drum_url", fileKey);
        } else if (filename.includes("bass")) {
          await updateMixField(mixId, "stem_bass_url", fileKey);
        } else if (filename.includes("vocal")) {
          await updateMixField(mixId, "stem_vocal_url", fileKey);
        } else if (filename.includes("other")) {
          await updateMixField(mixId, "stem_other_url", fileKey);
        }
      } catch (error) {
        console.error(`Error uploading stem: ${filename}`, error);
      }
    });

    await Promise.all(uploadPromises);

    return uploadedKeys;
  }

  /**
   * Splits an audio file into multiple segments
   * File input should be a .wav file
   * @param buffer - The audio file to split
   * @returns A record of the split timestamps
   */
  public async getSplitTimestamps(
    mixId: number | null,
    buffer: Buffer,
  ): Promise<SplitTimestamps> {
    const formData = new FormData();

    formData.append("file", new Blob([buffer]), "audio-file");

    console.log("Sending POST request to split");

    // Send the POST request to split
    const response = await axios.post("http://algorithm:5000/split", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log("Received response from split, updating mix");
    await updateMixField(mixId, "split_json", JSON.stringify(response.data));
    return response.data;
  }
}

export default AudioProcessor;
