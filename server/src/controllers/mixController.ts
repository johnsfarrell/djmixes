/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the mix controller for handling mix-related operations.
 */

import { Request, Response } from "express";
import { getMixes, getRandomMixes } from "@/database/search/getMixes";
import { getLikes } from "@/database/search/getLikes";
import { insertLike, deleteLike } from "@/database/update/updateLikes";
import { insertComment } from "@/database/update/updateComments";
import { getComments } from "@/database/search/getComments";
import { getUserById } from "@/database/search/getUser";
import {
  User,
  Mix,
  MixResponse,
  UploadParams,
  Comment,
  CommentResponse,
} from "@/utils/interface";
import {
  s3Client,
  bucketName,
  downloadFromS3,
  uploadToS3,
  deleteFromS3,
} from "@/utils/s3Client";
import { UploadedFile } from "express-fileupload";
import { algorithm as algo } from "@/index";
import { insertMixes, deleteMixes } from "@/database/update/updateMixes";
import { removePrefix } from "@/utils/helpers";

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
      console.log(mixData);

      if (!mixData) {
        res.status(404).send("Mix not found");
        return;
      }

      // Fetch the user who uploaded the mix by user_id
      const user: User | null = await getUserById(mixData.userId);
      console.log(user);
      if (!user) {
        res.status(404).send("User not found");
        return;
      }

      // Fetch the number of likes for the mix
      const likeCount = await getLikes(parseInt(mixId, 10));
      const comments = await getComments(parseInt(mixId, 10));
      const mappedComments = mapCommentsToResponse(comments);

      // Return the mix and user data in the response
      const response: MixResponse = {
        id: mixData.mixId,
        title: mixData.title,
        file_url: mixData.fileUrl,
        cover_url: mixData.coverUrl,
        visibility: mixData.visibility,
        allow_download: mixData.allowDownload,
        tags: mixData.tags ?? [],
        updated_at: mixData.updatedAt,
        created_at: mixData.createdAt,
        artist: mixData.artist,
        upload_user: {
          user_id: mixData.userId,
          username: user.username,
        },
        comments: mappedComments, // Placeholder for comments
        album: mixData.album,
        like_count: likeCount, // Represent the number of likes
        split_json: mixData.splitJson,
      };

      res.json(response);
    } catch (error) {
      console.error("Error retrieving mix:", error);
      res.status(500).send("Error retrieving mix");
    }
  };

  /**
   * Controller for get random set of mix ids
   * @param req - Request object, optionally contain number mixes wanted
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If retrieve fails
   */
  getRandomMixIds = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const number_of_mixes = parseInt(req.params.num, 10);
      let mixesList: number[] | null;

      // Validate username
      if (!number_of_mixes || number_of_mixes === 0) {
        mixesList = await getRandomMixes(1);
      } else {
        mixesList = await getRandomMixes(Math.min(number_of_mixes, 10));
      }

      res.status(200).json({ mix_ids: mixesList });
    } catch (error) {
      console.error("Error retrieving mix:", error);
      res.status(500).send("Error retrieving mix");
    }
  };

  /**
   * Controller for liking a mix
   * @param req - Request object, containing the mix ID and user ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If liking the mix fails
   */
  likeMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const userId = req.body.user_id;

    try {
      // Validate mixId and userId
      if (!mixId || isNaN(Number(mixId)) || !userId || isNaN(Number(userId))) {
        res.status(400).json({ message: "Invalid mix ID or user ID" });
        return;
      }

      // Check if the mix exists
      const mix = await getMixes(parseInt(mixId, 10));
      if (!mix) {
        res.status(404).json({ message: "Mix not found" });
        return;
      }

      // Insert like into the database
      const result = await insertLike(
        parseInt(userId, 10),
        parseInt(mixId, 10),
      );
      if (!result) {
        res.status(500).json({ message: "Failed to like the mix" });
        return;
      }

      // Return success response
      res.status(200).json({ message: "Mix liked successfully" });
    } catch (error) {
      console.error("Error liking mix:", error);
      res.status(500).json({ message: "Failed to like mix" });
    }
  };

  /**
   * Controller for liking a mix
   * @param req - Request object, containing the mix ID and user ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If liking the mix fails
   */
  commentMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const userId = req.body.user_id;
    const comment = req.body.comment;

    try {
      // Validate mixId and userId
      if (!mixId || isNaN(Number(mixId)) || !userId || isNaN(Number(userId))) {
        res.status(400).json({ message: "Invalid mix ID or user ID" });
        return;
      }

      // Check if the mix exists
      const mix = await getMixes(parseInt(mixId, 10));
      if (!mix) {
        res.status(404).json({ message: "Mix not found" });
        return;
      }

      // Insert like into the database
      const result = await insertComment(
        parseInt(userId, 10),
        parseInt(mixId, 10),
        comment,
      );
      if (!result) {
        res.status(500).json({ message: "Failed to insert comment" });
        return;
      }

      // Return success response
      res.status(200).json({ message: "Mix commented successfully" });
    } catch (error) {
      console.error("Error commenting mix:", error);
      res.status(500).json({ message: "Failed to comment on mix" });
    }
  };

  /**
   * Controller for unliking a mix
   * @param req - Request object, containing the mix ID and user ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If unliking the mix fails
   */
  unlikeMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const userId = req.body.user_id;

    try {
      // Validate mixId and userId
      if (!mixId || isNaN(Number(mixId)) || !userId || isNaN(Number(userId))) {
        res.status(400).json({ message: "Invalid mix ID or user ID" });
        return;
      }

      // Check if the mix exists
      const mix = await getMixes(parseInt(mixId, 10));
      if (!mix) {
        res.status(404).json({ message: "Mix not found" });
        return;
      }

      // Remove like from the database
      const result = await deleteLike(
        parseInt(userId, 10),
        parseInt(mixId, 10),
      );
      if (!result) {
        res.status(500).json({ message: "Failed to unlike the mix" });
        return;
      }

      // Return success response
      res.status(200).json({ message: "Mix unliked successfully" });
    } catch (error) {
      console.error("Error unliking mix:", error);
      res.status(500).json({ message: "Failed to unlike mix" });
    }
  };

  /**
   * Controller for deleting a mix
   * @param req - Request object, containing the mix ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the deletion fails
   */
  deleteMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;

    try {
      // Get mix ID and validate
      const mix = await getMixes(parseInt(mixId, 10));
      if (!mix || !mix.fileUrl) {
        res.status(404).json({ error: "Mix not found" });
        return;
      }

      // Prepare delete actions for all file URLs
      const fileUrls = [
        mix.fileUrl,
        mix.coverUrl,
        mix.stemBassUrl,
        mix.stemDrumUrl,
        mix.stemVocalUrl,
        mix.stemOtherUrl,
      ];
      const deletePromises = fileUrls.map((fileUrl: string) =>
        deleteFromS3(s3Client, {
          Bucket: bucketName,
          Key: fileUrl,
        }).catch((error) =>
          console.error(`Error deleting file ${fileUrl}:`, error),
        ),
      );

      //  delete promises
      const dbDeletePromise = deleteMixes(parseInt(mixId, 10)).catch((error) =>
        console.error("Error deleting mix from database:", error),
      );

      // Trigger all deletions asynchronously (files and database)
      Promise.all([...deletePromises, dbDeletePromise]).catch((error) =>
        console.error("Error during deletion process:", error),
      );

      res.status(200).json({ message: "Mix deletion initiated" });
    } catch (error) {
      console.error("Error initiating mix deletion:", error);
      res.status(500).json({ error: "Failed to initiate mix deletion" });
    }
  };

  /**
   * Controller for downloading a file from S3
   * @param req - Request object, containing the mix ID, and part in the url for specific file
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the file download fails
   */
  downloadFile = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const part = req.params.part || "full";
    console.log(part);

    try {
      // get mix id, and validate
      const mix = await getMixes(parseInt(mixId, 10));
      let fileKey = "";
      if (!mix || !mix.fileUrl) {
        res.status(404).json({ error: "Mix not found" });
        return;
      }
      if (!mix.allowDownload) {
        res.status(403).json({ error: "Download not allowed for this mix" });
        return;
      }

      // check which part for download
      if (part === "drum") {
        fileKey = mix.stemDrumUrl;
      } else if (part === "bass") {
        fileKey = mix.stemBassUrl;
      } else if (part === "vocal") {
        fileKey = mix.stemVocalUrl;
      } else if (part === "other") {
        fileKey = mix.stemOtherUrl;
      } else if (part === "cover") {
        fileKey = mix.coverUrl;
      } else if (part === "full") {
        fileKey = mix.fileUrl;
      } else {
        res.status(404).json({ error: "Endpoint doesn't exist" });
        return;
      }

      // validate url
      console.log(fileKey);
      if (!fileKey && fileKey === "") {
        res.status(404).json({ error: "Can't find the file" });
        return;
      }

      //download
      const filename = removePrefix(fileKey);
      const params = {
        Bucket: bucketName,
        Key: fileKey,
      };

      await downloadFromS3(s3Client, params, res, filename);
    } catch (error) {
      console.error("Error downloading mix:", error);
      res.status(500).json({ error: "Failed to download file" });
    }
  };

  /**
   * Controller for uploading a mix
   * @param req - Request object, containing the mix file and cover file
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If uploading fails
   */
  uploadMix = async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !req.files.mix || !req.files.cover) {
      res.status(400).json({ error: "Required files not uploaded" });
      return;
    }

    const MAX_MIX_FILE_SIZE_MB = 500; // max file size in MB
    const MAX_COVER_FILE_SIZE_MB = 250; // max file size in MB
    const MAX_MIX_FILE_SIZE_BYTES = MAX_MIX_FILE_SIZE_MB * 1024 * 1024; // convert to bytes
    const MAX_COVER_FILE_SIZE_BYTES = MAX_COVER_FILE_SIZE_MB * 1024 * 1024; // convert to bytes

    try {
      // Set file and filekey
      const mixFile = req.files.mix as UploadedFile;
      const coverFile = req.files.cover as UploadedFile;

      // Check if file size is too large
      if (mixFile.size > MAX_MIX_FILE_SIZE_BYTES) {
        res.status(400).json({
          error: `Mix file size exceeds limit of ${MAX_MIX_FILE_SIZE_MB} MB`,
        });
        return;
      }
      if (coverFile.size > MAX_COVER_FILE_SIZE_BYTES) {
        res.status(400).json({
          error: `Cover file size exceeds limit of ${MAX_COVER_FILE_SIZE_MB} MB`,
        });
        return;
      }

      // UploadParam
      const mixFileKey = `${Date.now()}_${mixFile.name}`;
      const coverFileKey = `${Date.now()}_${coverFile.name}`;
      const mixParams: UploadParams = {
        Bucket: bucketName,
        Key: mixFileKey,
        Body: mixFile.data,
      };
      const coverParams: UploadParams = {
        Bucket: bucketName,
        Key: coverFileKey,
        Body: coverFile.data,
      };

      // Upload
      const mixUploadResult = await uploadToS3(s3Client, mixParams);
      const coverUploadResult = await uploadToS3(s3Client, coverParams);
      console.log("Mix file uploaded:", mixUploadResult);
      console.log("Cover file uploaded:", coverUploadResult);

      // Update DB
      const mixId = await insertMixes(
        req.body.user_id || null,
        req.body.title || null,
        req.body.artist || null,
        req.body.album || null,
        req.body.release_date || null,
        mixFileKey,
        coverFileKey,
        req.body.tags || null,
        req.body.visibility || null,
        req.body.allow_download || null,
      );

      // Algo part for split and stem
      algo
        .getSplitTimestamps(mixId, mixFile.data)
        .catch((err) => console.error("Error in getSplitTimestamps:", err));
      algo
        .getStemmedAudio(mixId, mixFile.data)
        .catch((err) => console.error("Error in getStemmedAudio:", err));

      res.status(200).json({
        message: "Files uploaded successfully",
        mixId,
        mixFileKey,
        coverFileKey,
      });
    } catch (error) {
      console.error("Error uploading files:", error);
      res.status(500).json({ error: "Failed to upload files" });
    }
  };
}

/**
   * Helper functions to map Comment interface to json api reponse format
   * @param req - list of Comment interface
   * @returns void - list of CommentResponse interfaces after conversion
   */
function mapCommentsToResponse(comments: Comment[]): CommentResponse[] {
  return comments.map((comment) => ({
    comment_id: comment.commentId,
    user_id: comment.userId,
    mix_id: comment.mixId,
    comment_text: comment.commentText,
    created_at: comment.createdAt,
  }));
}

export default MixController;
