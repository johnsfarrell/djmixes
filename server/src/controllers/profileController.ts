/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the profile controller for handling user profile operations.
 */

import { Request, Response } from "express";
import createConnection from "@/database/connection";
import { FieldPacket, RowDataPacket } from "mysql2";
import { getUserLiked } from "@/database/search/getLikes";
import { getUserCommented } from "@/database/search/getComments";
import { getUserById } from "@/database/search/getUser";
import {
  getMixesByUploadedUser,
  getMixesByUserLiked,
} from "@/database/search/getMixes";
import { getEvent } from "@/database/search/getEvents";
import { getProfile } from "@/database/search/getProfiles";
import {
  s3Client,
  bucketName,
  deleteFromS3,
  uploadToS3,
  downloadFromS3,
} from "@/utils/s3Client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { pipeline } from "stream";
import { UploadedFile } from "express-fileupload";
import { User, UploadParams, ProfileResponse } from "@/utils/interface";
import { removePrefix } from "@/utils/helpers";
import {
  deleteProfile,
  insertProfile,
  updateProfileAvatar,
  updateProfileBio,
} from "@/database/update/updateProfiles";

class ProfileController {
  /**
   * Controller for get user profile
   * @param req - Request object, containing the user id in param
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the retrieve fails
   */
  getProfileDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: "Invalid or missing user ID" });
        return;
      }

      // username
      const user: User | null = await getUserById(userId);
      const username = user?.username;

      // get all mixes created
      const uploadedMixIds = await getMixesByUploadedUser(userId);

      // get all mixes liked
      const likedMixIds = await getMixesByUserLiked(userId);

      // get all events
      const events = await getEvent(userId);

      // Geting the rest
      const connection = await createConnection();
      const [rows]: [RowDataPacket[], FieldPacket[]] = await connection.execute(
        "SELECT * FROM user_profiles WHERE user_id = ?",
        [userId],
      );

      if (rows.length === 0) {
        res.status(404).json({ message: "Profile not found" });
        return;
      }

      const profile = rows[0];
      profile["username"] = username;
      profile["uploaded_mixes"] = uploadedMixIds;
      profile["liked_mixes"] = likedMixIds;
      profile["events"] = events;

      res.status(200).json(profile);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Controller for getting profile avatar
   * @param req - Request object, contains userId in the param
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the file download fails
   */
  getProfileAvatar = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: "Invalid or missing user ID" });
        return;
      }

      const userProfile = await getProfile(userId);
      if (!userProfile || !userProfile.avatarUrl) {
        res.status(404).json({ error: "Avatar not exist" });
        return;
      }

      // Download parameters
      const filename = removePrefix(userProfile.avatarUrl);
      const params = {
        Bucket: bucketName,
        Key: userProfile.avatarUrl,
      };

      // Download file from S3
      await downloadFromS3(s3Client, params, res, filename);
    } catch (error) {
      console.error("Error fetching user profile avatar:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Controller for updating profile
   * @param req - Request object, contains userID in param, optionaly bio or avatar in body
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the update fails
   */
  updateProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);
      const oldProfile = await getProfile(userId);
      let { bio } = req.body;
      let avatarFileKey = "";
      let result = "";

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: "Invalid or missing user ID" });
        return;
      }

      // case we do update avatar
      if (req.files && req.files.avatar) {
        const MAX_AVATAR_FILE_SIZE_MB = 5; // max file size in MB
        const MAX_AVATAR_FILE_SIZE_BYTES =
          MAX_AVATAR_FILE_SIZE_MB * 1024 * 1024; // convert to bytes
        const avatarFile = req.files.avatar as UploadedFile;

        if (avatarFile.size > MAX_AVATAR_FILE_SIZE_BYTES) {
          res.status(400).json({
            error: `Avatar file size exceeds limit of ${MAX_AVATAR_FILE_SIZE_MB} MB`,
          });
          return;
        }
        avatarFileKey = `${Date.now()}_${avatarFile.name}`;

        // Upload
        const avatarParams: UploadParams = {
          Bucket: bucketName,
          Key: avatarFileKey,
          Body: avatarFile.data,
        };
        const avatarUploadResult = await uploadToS3(s3Client, avatarParams);

        console.log(
          `Successfully uploaded object: ${bucketName}/${avatarFileKey}`,
        );
        result += "Avatar Uploaded. ";
      }

      // Case where we creating a new profile
      if (!oldProfile) {
        if (bio === undefined) {
          bio = ""; // Set bio to an empty string if undefined
        }
        const insertResult = await insertProfile(userId, bio, avatarFileKey);
        result += "Profile Created. ";
      } else {
        // Case where we updating old profile
        // Upload avatar if exists
        if (req.files && req.files.avatar) {
          const url: string | undefined = oldProfile.avatarUrl ?? undefined;
          // Prepare delete actions
          const s3DeletePromise = deleteFromS3(s3Client, {
            Bucket: bucketName,
            Key: url,
          });
          s3DeletePromise.catch((error) =>
            console.error("Error deleting from S3:", error),
          );
          // update db
          const avatarUpdateResult = await updateProfileAvatar(
            oldProfile.profileId,
            avatarFileKey,
          );
          result += "Updated Avatar. ";
        }
        // Update bio if exists
        if (bio !== undefined) {
          const bioUpdateResult = await updateProfileBio(
            oldProfile.profileId,
            bio,
          );
          result += "Updated Bio. ";
        }
      }

      res.status(200).json({ message: result });
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Controller for getting liked mix ids
   * @param req - Request object, contains userID in param
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the retrieve fails
   */
  getProfileLiked = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: "Invalid or missing user ID" });
        return;
      }

      const likedList: number[] | null = await getUserLiked(userId);
      res.status(200).json({ mix_ids: likedList });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Controller for getting commented mix ids
   * @param req - Request object, contains userID in param
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the retrieve fails
   */
  getProfileCommented = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const userId = parseInt(req.params.userId, 10);

      // Validate the userId
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: "Invalid or missing user ID" });
        return;
      }

      const commentedList: number[] | null = await getUserCommented(userId);
      res.status(200).json({ mix_ids: commentedList });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  /**
   * Controller for delete user's profile
   * @param req - Request object, contains userID in param
   * @param res - Response object, send back msg to indicate the result
   * @returns void
   * @throws Error - If the deletion fails
   */
  deleteProfile = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);
      if (!userId || isNaN(userId)) {
        res.status(400).json({ error: "Invalid or missing user ID" });
        return;
      }

      // delete avatar if exists
      const profile = await getProfile(userId);
      const url: string | undefined = profile?.avatarUrl ?? undefined;
          // Prepare delete actions
          const s3DeletePromise = deleteFromS3(s3Client, {
            Bucket: bucketName,
            Key: url,
          });
          s3DeletePromise.catch((error) =>
            console.error("Error deleting from S3:", error),
          );

      // update db
      const result = await deleteProfile(userId);
      if (!result) {
        res
          .status(404)
          .json({ message: "Profile not found or already deleted" });
        return;
      }

      res.status(200).json({ message: "Profile deleted successfully" });
    } catch (error) {
      console.error("Error deleting user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default ProfileController;
