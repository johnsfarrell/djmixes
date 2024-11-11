import express, { Request, Response } from 'express';
import {Mix, getMixes } from '../database/search/getMixes';
import {User, getUserByName } from '../database/search/getUser'; // assuming a function that fetches by user_id

const router = express.Router();

// Route for fetching a mix by its ID
router.get('/:mixId', async (req: Request, res: Response): Promise<void> => {
  const mixId = req.params.mixId;

  try {
    // Fetch mix data from the database
    const mixData: Mix | null = await getMixes(parseInt(mixId, 10));

    if (!mixData) {
      res.status(404).send('Mix not found');
      return;
    }

    // Fetch the user who uploaded the mix by user_id
    const user: User | null = await getUserByName(`${mixData.user_id}`); // Using user_id instead of username
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    // Return the mix and user data in the response
    res.json({
      title: mixData.title,
      fileUrl: mixData.file_url,
      coverUrl: mixData.cover_url,
      visibility: mixData.visibility,
      allowDownload: mixData.allow_download,
      tags: mixData.tags,
      updatedAt: mixData.updated_at,
      createdAt: mixData.created_at,
      artist: mixData.artist,
      upload_user: {
        user_id: mixData.user_id,
        username: user.username,
      },
      comments: [], // Placeholder for comments
      album: mixData.album,
    });
  } catch (error) {
    console.error('Error retrieving mix:', error);
    res.status(500).send('Error retrieving mix');
  }
});

export default router;
