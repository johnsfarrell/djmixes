import { GetMixResponse, GetProfileResponse } from "./types";

export const mockMixResponse: GetMixResponse = {
  id: 1,
  title: "Test Mix",
  file_url: "/mock/track1.mp3",
  cover_url: "/mock/cover1.jpg",
  visibility: "public",
  allow_download: true,
  tags: ["tag1", "tag2"],
  updated_at: new Date(),
  created_at: new Date(),
  artist: "Test Artist",
  upload_user: {
    user_id: 1,
    username: "testuser",
  },
  comments: [
    {
      comment_id: 2233,
      mix_id: 2,
      user_id: 1,
      comment_text: "The sound of a bouncing ball.",
      created_at: new Date("2024-12-10T00:28:15.000Z"),
    },
  ],
  album: "Test Album",
  vocalsUrl: "/mock/vocals.mp3",
  drumsUrl: "/mock/drums.mp3",
  bassUrl: "/mock/bass.mp3",
  otherUrl: "/mock/other.mp3",
  splits: [
    {
      name: "Intro",
      timestamp: 0,
    },
    {
      name: "Verse 1",
      timestamp: 45,
    },
    {
      name: "Chorus",
      timestamp: 90,
    },
    {
      name: "Outro",
      timestamp: 180,
    },
  ],
};

export const mockProfileResponse: GetProfileResponse = {
  username: "testuser",
  bio: "Test bio",
  avatarUrl: "/mock/profile1.jpg",
  createdAt: new Date().toISOString(),
  profileId: 1,
  userId: 1,
  uploadedMixIds: [],
  likedMixIds: [],
  events: [],
};
