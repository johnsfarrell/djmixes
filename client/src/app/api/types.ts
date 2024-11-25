/**
 * Interfaces from the server
 */

export interface UploadUser {
  user_id: number;
  username: string;
}

export interface GetMixResponse {
  title: string;
  fileUrl: string;
  coverUrl?: string;
  visibility: string;
  allowDownload: boolean;
  tags: string[];
  updatedAt: Date;
  createdAt: Date;
  artist: string;
  upload_user: UploadUser;
  comments: string[];
  album?: string;
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
}

export interface UploadMixResponse {
  message: string;
  fileKey: string;
  uploadResult: unknown;
}

export interface ProfileResponse {
  username: string;
  bio: string;
  mixes: ProfileMix[];
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
