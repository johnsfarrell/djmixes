import { GetMixResponse, GetProfileResponse } from "./types";

export const mockMixResponse: GetMixResponse = {
  title: "Test Mix",
  fileUrl: "/mock/track1.mp3",
  coverUrl: "/mock/cover1.jpg",
  visibility: "public",
  allowDownload: true,
  tags: ["tag1", "tag2"],
  updatedAt: new Date(),
  createdAt: new Date(),
  artist: "Test Artist",
  upload_user: {
    user_id: 1,
    username: "testuser",
  },
  comments: ["comment1", "comment2"],
  album: "Test Album",
};

export const mockProfileResponse: GetProfileResponse = {
  username: "testuser",
  bio: "Test bio",
  mixes: [],
  events: [],
  profilePhoto: "/mock/profile1.png",
};
