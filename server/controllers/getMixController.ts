import { Request, Response } from "express";
import { Mix, getMixes } from "../database/search/getMixes";
import { User, getUserByName } from "../database/search/getUser";

interface UploadUser {
  user_id: number;
  username: string;
}

interface MixResponse {
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

/**
 * Fetches a mix by its ID and returns metadata about the mix
 * @param req - Request, includes the mixId
 * @param res - Response, sends the mix data as a JSON MixResponse
 * @returns void
 * @throws Error if the mix or user is not found
 */
export const getMix = async (req: Request, res: Response): Promise<void> => {
  const mixId = req.params.mixId;

  try {
    // Fetch mix data from the database
    const mixData: Mix | null = await getMixes(parseInt(mixId, 10));

    if (!mixData) {
      res.status(404).send("Mix not found");
      return;
    }

    // Fetch the user who uploaded the mix by user_id
    const user: User | null = await getUserByName(`${mixData.user_id}`); // Using user_id instead of username
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    // Return the mix and user data in the response
    const response: MixResponse = {
      title: mixData.title,
      fileUrl: mixData.file_url,
      coverUrl: mixData.cover_url,
      visibility: mixData.visibility,
      allowDownload: mixData.allow_download,
      tags: mixData.tags ?? [],
      updatedAt: mixData.updated_at,
      createdAt: mixData.created_at,
      artist: mixData.artist,
      upload_user: {
        user_id: mixData.user_id,
        username: user.username,
      },
      comments: [], // Placeholder for comments
      album: mixData.album,
    };

    res.json(response);
  } catch (error) {
    console.error("Error retrieving mix:", error);
    res.status(500).send("Error retrieving mix");
  }
};

/**
 * Mock function to return a mock mix data as a JSON MixResponse
 * @param req - Request, includes the mixId
 * @param res - Response, sends a mock mix data as a JSON MixResponse
 */
export const getMixMock = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const mockResponse: MixResponse = {
    title: "Mock Mix",
    fileUrl: "https://example.com/mix.mp3",
    coverUrl: "https://example.com/cover.jpg",
    visibility: "public",
    allowDownload: true,
    tags: ["rock", "pop"],
    updatedAt: new Date(),
    createdAt: new Date(),
    artist: "Mock Artist",
    upload_user: {
      user_id: 1,
      username: "mockuser",
    },
    comments: [],
    album: "Mock Album",
  };

  res.json(mockResponse);
};
