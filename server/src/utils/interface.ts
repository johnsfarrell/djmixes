/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the interfaces for the application.
 */

import { PutObjectCommandOutput } from "@aws-sdk/client-s3";

export interface UploadUser {
  userId: number;
  username: string;
}

export interface UploadUserResponse {
  user_id: number;
  username: string;
}

export interface LoginResponse {
  message: string;
  token: string; // JWT token for authentication
  userId: number; // User ID for frontend storage
}

export interface MixResponse {
  id: number;
  title: string;
  file_url: string;
  cover_url?: string;
  visibility: string;
  allow_download: boolean;
  tags: string[];
  updated_at: Date;
  created_at: Date;
  artist: string;
  upload_user: UploadUserResponse;
  comments: CommentResponse[];
  album?: string;
  like_count: number; // Represent the number of likes
  split_json: string;
}

// Define the type for the mix data
export interface Mix {
  mixId: number;
  userId: number;
  title: string;
  fileUrl: string;
  coverUrl: string;
  tags?: string[];
  visibility: "public" | "private" | "unlisted" | "friends";
  allowDownload: boolean;
  createdAt: Date;
  updatedAt: Date;
  artist: string;
  album: string;
  isDeleted: boolean;
  stemDrumUrl: string;
  stemVocalUrl: string;
  stemBassUrl: string;
  stemOtherUrl: string;
  splitJson: string;
}

export interface User {
  userId: number; // Primary key, auto-incrementing user ID
  username: string; // Unique username chosen by the user
  email: string; // Unique email address for the user
  password: string; // The password for user authentication
  registrationMethod: number; // 0 for email registration, 1 for third-party registration
  active: boolean; // 0 - active, 1 - inactive
  createTime: Date; // Timestamp of when the account was created
}

export interface FollowedArtist {
  artistId: number; // Unique identifier for the artist
  name: string; // Name of the artist
  profileUrl: string; // URL of the artist's profile
  avatar: string; // Avatar image for the artist
}

// Define the type for the user profile data
export interface UserProfile {
  profileId: number;
  userId: number;
  bio: string | null;
  avatarUrl: string | null;
  createdAt: Date;
}

export interface UserProfileResponse {
  profile_id: number;
  user_id: number;
  bio: string | null;
  avatar_url: string | null;
  created_at: Date;
}

export interface Like {
  likeId: number;
  userId: number;
  mixId: number;
  createdAt: Date;
}

// Define the type for the comment data
export interface Comment {
  commentId: number;
  userId: number;
  mixId: number;
  commentText: string;
  createdAt: Date;
}

export interface CommentResponse {
  comment_id: number;
  user_id: number;
  mix_id: number;
  comment_text: string;
  created_at: Date;
}

export interface ProfileMix {
  mixId: number; // Unique identifier for the mix
  title: string; // Title of the mix
  visibility: string; // Visibility of the mix (e.g., "public" or "private")
}

export interface ProfileEvent {
  eventId: number; // Unique identifier for the event
  title: string; // Title of the event
  date: string; // Date of the event in ISO format (YYYY-MM-DD)
}

export interface UploadMixResponse {
  message: string;
  fileKey: string;
  uploadResult: unknown;
}

export interface ProfileResponse {
  username: string; // User's username
  bio: string; // User's biography
  mixes: ProfileMix[]; // List of mixes uploaded by the user
  events: ProfileEvent[]; // List of events associated with the user
}

export interface Event {
  eventId: number; // Unique identifier for the event
  title: string; // Title of the event
  description: string; // Description of the event
  date: string; // Date of the event in ISO format (YYYY-MM-DD)
}

export interface EventResponse {
  event_id: number;
  title: string;
  description: string;
  date: string;
}

export interface UploadEventResponse {
  message: string; // Success or informational message about the event
  event_id: number; // Unique identifier for the created event
}

export type UploadParams = {
  Bucket: string | undefined;
  Key: string;
  Body: Buffer | Uint8Array | Blob | string;
};

export type UploadResult = {
  key: string;
  result: PutObjectCommandOutput;
};
