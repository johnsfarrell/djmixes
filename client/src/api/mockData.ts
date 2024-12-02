import cover1 from "../../public/audio/cover1.jpg";
import cover2 from "../../public/audio/cover1.jpg";
import { MixResponse } from "./types";
import { ProfileResponse, ProfileMix, ProfileEvent } from "./types";

export const tracks: Mix[] = [
  {
    mix_id: 1,
    user_id: 1,
    title: "Mix 1",
    file_url: "",
    cover_url: cover1.src,
    tags: ["house", "techno"],
    visibility: "public",
    allow_download: true,
    created_at: new Date(),
    updated_at: new Date(),
    artist: "DJ 1",
    album: "Album 1",
    is_deleted: false,
  },
  {
    mix_id: 2,
    user_id: 2,
    title: "Mix 2",
    file_url: "",
    cover_url: cover2.src,
    tags: ["house", "techno"],
    visibility: "public",
    allow_download: true,
    created_at: new Date(),
    updated_at: new Date(),
    artist: "DJ 2",
    album: "Album 2",
    is_deleted: false,
  },
];

export const mockMixResponse: MixResponse = {
  title: "Test Mix",
  fileUrl: "http://example.com/file.mp3",
  coverUrl: "http://example.com/cover.jpg",
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

import { ProfileResponse } from "@/api/types";

export const mockProfile: ProfileResponse = {
  username: "Mock Creator",
  bio: "This is a mock bio for the creator.",
  mixes: [
    { mixId: 1, title: "Mock Mix 1", visibility: "public" },
    { mixId: 2, title: "Mock Mix 2", visibility: "private" },
  ],
  events: [
    { eventId: 1, title: "Mock Event 1", date: "2024-01-01" },
    { eventId: 2, title: "Mock Event 2", date: "2024-02-01" },
  ],
};
