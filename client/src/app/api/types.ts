/**
 * Interfaces from the server
 */

export interface UploadUser {
  user_id: number;
  username: string;
}

export interface Split {
  name: string;
  timestamp: number;
}

export interface GetMixResponse {
  mix_id: number;
  title: string;
  file_url?: string;
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
  // stems
  vocalsUrl?: string;
  drumsUrl?: string;
  bassUrl?: string;
  otherUrl?: string;
  // splits
  split_json?: string;
  splits?: Split[];
}

export interface Mix {
  mix_id: number;
  user_id: number;
  title: string;
  file_url: string;
  cover_url?: string;
  tags?: string[];
  visibility: 'public' | 'private' | 'unlisted' | 'friends';
  allow_download: boolean;
  created_at: Date;
  updated_at: Date;
  artist: string;
  album?: string;
  is_deleted: boolean;
}

export interface ProfileMix {
  mixId: number;
  title: string;
  visibility: string;
}

export interface ProfileEvent {
  eventId: number;
  title: string;
  date: string;
  artistId: number;
  userId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface UploadMixResponse {
  mixId: number;
  message: string;
  fileKey: string;
  uploadResult: unknown;
}

export interface GetProfileResponse {
  profileId: number;
  userId: number;
  bio: string;
  avatarUrl: string;
  createdAt: string;
  username: string;
  uploadedMixIds: number[];
  likedMixIds: number[];
  events: ProfileEvent[];
}

export interface Event {
  eventId: string;
  title: string;
  description: string;
  date: string;
}

export interface EventsResponse {
  events: Event[];
}

export interface UploadEventResponse {
  message: string;
  eventId: string;
}

/**
 * Interfaces for server requests
 */

export interface MixUploadRequest {
  cover: File;
  mix: File;
  userId: number;
  title: string;
  artist: string;
  album: string;
  releaseDate: string;
  tags: string[];
  visibility: string;
  allowDownload: boolean;
}

export interface MixUploadResponse {}

export interface GetSavedMixesRequest {
  userId: number;
}

export interface GetFollowedDJsRequest {
  userId: number;
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

export interface UploadUserResponse {
  user_id: number;
  username: string;
}
