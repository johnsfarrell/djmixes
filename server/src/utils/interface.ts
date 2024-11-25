export interface UploadUser {
  user_id: number;
  username: string;
}

export interface MixResponse {
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
  likeCount: number; // Represent the number of likes
}

// Define the type for the mix data
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

export interface User {
  user_id: number; // Primary key, auto-incrementing user ID
  username: string; // Unique username chosen by the user
  email: string; // Unique email address for the user
  password: string; // The password for user authentication
  registration_method: number; // 0 for email registration, 1 for third-party registration
  active: boolean; // 0 - active, 1 - inactive
  create_time: Date; // Timestamp of when the account was created
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
  eventId: string; // Unique identifier for the event
  title: string; // Title of the event
  description: string; // Description of the event
  date: string; // Date of the event in ISO format (YYYY-MM-DD)
}

export interface EventsResponse {
  events: Event[]; // List of events
}

export interface UploadEventResponse {
  message: string; // Success or informational message about the event
  eventId: string; // Unique identifier for the created event
}
