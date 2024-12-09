import { Request, Response } from 'express';
import { getMixes, getRandomMixes } from '@/database/search/getMixes';
import { getLikes } from '@/database/search/getLikes';
import { insertLike, deleteLike } from '@/database/update/updateLikes';
import { getUserById } from '@/database/search/getUser';
import { User, Mix, MixResponse, UploadParams } from '@/utils/interface';
import {
  s3Client,
  bucketName,
  downloadFromS3,
  uploadToS3
} from '@/utils/s3Client';
import { UploadedFile } from 'express-fileupload';
import { algorithm as algo } from '@/index';
import { insertMixes } from '@/database/update/updateMixes';
import { removePrefix } from '@/utils/helpers';

class MixController {
  /**
   * Fetches a mix by its ID and returns metadata about the mix
   * @param req - Request, includes the mixId
   * @param res - Response, sends the mix data as a JSON MixResponse
   * @returns void
   * @throws Error if the mix or user is not found
   */
  getMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;

    try {
      // Fetch mix data from the database
      const mixData: Mix | null = await getMixes(parseInt(mixId, 10));
      console.log(mixData);

      if (!mixData) {
        res.status(404).send('Mix not found');
        return;
      }

      // Fetch the user who uploaded the mix by user_id
      const user: User | null = await getUserById(mixData.userId);
      console.log(user);
      if (!user) {
        res.status(404).send('User not found');
        return;
      }

      // Fetch the number of likes for the mix
      const likeCount = await getLikes(parseInt(mixId, 10));

      // Return the mix and user data in the response
      const response: MixResponse = {
        id: mixData.mixId,
        profileId: mixData.userId,
        title: mixData.title,
        fileUrl: mixData.fileUrl,
        coverUrl: mixData.coverUrl,
        visibility: mixData.visibility,
        allowDownload: mixData.allowDownload,
        tags: mixData.tags ?? [],
        updatedAt: mixData.updatedAt,
        createdAt: mixData.createdAt,
        artist: mixData.artist,
        uploadUser: {
          userId: mixData.userId,
          username: user.username
        },
        comments: [], // Placeholder for comments
        album: mixData.album,
        likeCount: likeCount, // Represent the number of likes
        splitJson: mixData.splitJson
      };

      res.json(response);
    } catch (error) {
      console.error('Error retrieving mix:', error);
      res.status(500).send('Error retrieving mix');
    }
  };

  /**
   * Controller for get random set of mix ids
   * @param req - Request object, optionally contain number mixes wanted
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If retrieve fails
   */
  getRandomMixIds = async (req: Request, res: Response): Promise<void> => {
    try {
      console.log(req.body);
      const number_of_mixes = parseInt(req.params.num, 10);
      let mixesList: number[] | null;

      // Validate username
      if (!number_of_mixes || number_of_mixes === 0) {
        mixesList = await getRandomMixes(1);
      } else {
        mixesList = await getRandomMixes(Math.min(number_of_mixes, 10));
      }

      res.status(200).json({ mix_ids: mixesList });
    } catch (error) {
      console.error('Error retrieving mix:', error);
      res.status(500).send('Error retrieving mix');
    }
  };

  /**
   * Controller for liking a mix
   * @param req - Request object, containing the mix ID and user ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If liking the mix fails
   */
  likeMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const userId = req.body.user_id;

    try {
      // Validate mixId and userId
      if (!mixId || isNaN(Number(mixId)) || !userId || isNaN(Number(userId))) {
        res.status(400).json({ message: 'Invalid mix ID or user ID' });
        return;
      }

      // Check if the mix exists
      const mix = await getMixes(parseInt(mixId, 10));
      if (!mix) {
        res.status(404).json({ message: 'Mix not found' });
        return;
      }

      // Insert like into the database
      const result = await insertLike(
        parseInt(userId, 10),
        parseInt(mixId, 10)
      );
      if (!result) {
        res.status(500).json({ message: 'Failed to like the mix' });
        return;
      }

      // Return success response
      res.status(200).json({ message: 'Mix liked successfully' });
    } catch (error) {
      console.error('Error liking mix:', error);
      res.status(500).json({ message: 'Failed to like mix' });
    }
  };

  /**
   * Controller for unliking a mix
   * @param req - Request object, containing the mix ID and user ID
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If unliking the mix fails
   */
  unlikeMix = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const userId = req.body.user_id;

    try {
      // Validate mixId and userId
      if (!mixId || isNaN(Number(mixId)) || !userId || isNaN(Number(userId))) {
        res.status(400).json({ message: 'Invalid mix ID or user ID' });
        return;
      }

      // Check if the mix exists
      const mix = await getMixes(parseInt(mixId, 10));
      if (!mix) {
        res.status(404).json({ message: 'Mix not found' });
        return;
      }

      // Remove like from the database
      const result = await deleteLike(
        parseInt(userId, 10),
        parseInt(mixId, 10)
      );
      if (!result) {
        res.status(500).json({ message: 'Failed to unlike the mix' });
        return;
      }

      // Return success response
      res.status(200).json({ message: 'Mix unliked successfully' });
    } catch (error) {
      console.error('Error unliking mix:', error);
      res.status(500).json({ message: 'Failed to unlike mix' });
    }
  };

  /**
   * Controller for downloading a file from S3
   * @param req - Request object, containing the mix ID, and part in the url for specific file
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the file download fails
   */
  downloadFile = async (req: Request, res: Response): Promise<void> => {
    const mixId = req.params.mixId;
    const part = req.params.part || 'full';
    console.log(part);

    try {
      // get mix id, and validate
      const mix = await getMixes(parseInt(mixId, 10));
      let fileKey = '';
      if (!mix || !mix.fileUrl) {
        res.status(404).json({ error: 'Mix not found' });
        return;
      }
      if (!mix.allowDownload) {
        res.status(403).json({ error: 'Download not allowed for this mix' });
        return;
      }

      // check which part for download
      console.log(mixId);
      console.log(mix.splitJson);
      console.log(mix.stemDrumUrl);

      if (part === 'drum') {
        fileKey = mix.stemDrumUrl;
      } else if (part === 'bass') {
        fileKey = mix.stemBassUrl;
      } else if (part === 'vocal') {
        fileKey = mix.stemVocalUrl;
      } else if (part === 'other') {
        fileKey = mix.stemOtherUrl;
      } else if (part === 'cover') {
        fileKey = mix.coverUrl;
      } else if (part === 'full') {
        fileKey = mix.fileUrl;
      } else {
        res.status(404).json({ error: "Endpoint doesn't exist" });
        return;
      }

      // validate url
      console.log(fileKey);
      if (!fileKey && fileKey === '') {
        res.status(404).json({ error: "Can't find the file" });
        return;
      }

      //download
      const filename = removePrefix(fileKey);
      const params = {
        Bucket: bucketName,
        Key: fileKey
      };

      await downloadFromS3(s3Client, params, res, filename);
    } catch (error) {
      console.error('Error downloading mix:', error);
      res.status(500).json({ error: 'Failed to download file' });
    }
  };

  uploadMix = async (req: Request, res: Response): Promise<void> => {
    if (!req.files || !req.files.mix || !req.files.cover) {
      res.status(400).json({ error: 'Required files not uploaded' });
      return;
    }

    try {
      // Set file and filekey
      const mixFile = req.files.mix as UploadedFile;
      const coverFile = req.files.cover as UploadedFile;
      const mixFileKey = `${Date.now()}_${mixFile.name}`;
      const coverFileKey = `${Date.now()}_${coverFile.name}`;

      // UploadParam
      const mixParams: UploadParams = {
        Bucket: bucketName,
        Key: mixFileKey,
        Body: mixFile.data
      };
      const coverParams: UploadParams = {
        Bucket: bucketName,
        Key: coverFileKey,
        Body: coverFile.data
      };

      // Upload
      const mixUploadResult = await uploadToS3(s3Client, mixParams);
      const coverUploadResult = await uploadToS3(s3Client, coverParams);
      console.log('Mix file uploaded:', mixUploadResult);
      console.log('Cover file uploaded:', coverUploadResult);

      // Update DB
      const mixId = await insertMixes(
        req.body.user_id || null,
        req.body.title || null,
        req.body.artist || null,
        req.body.album || null,
        req.body.release_date || null,
        mixFileKey,
        coverFileKey,
        req.body.tags || null,
        req.body.visibility || null,
        req.body.allow_download || null
      );

      // Algo part for split and stem
      // TODO: make other functions so we don't have to 'await' for them to finish here
      // "Fire and forget" asynchronous tasks for analysis
      algo
        .getSplitTimestamps(mixId, mixFile.data)
        .catch((err) => console.error('Error in getSplitTimestamps:', err));
      algo
        .getStemmedAudio(mixId, mixFile.data)
        .catch((err) => console.error('Error in getStemmedAudio:', err));
      // // TODO: Remove these console logs (here for debugging)
      // console.log('Split timestamps:', stamps);
      // console.log('Stemmed audio:', stems);

      console.log('test123');
      res.status(200).json({
        message: 'Files uploaded successfully',
        mixId,
        mixFileKey,
        coverFileKey
      });
    } catch (error) {
      console.error('Error uploading files:', error);
      res.status(500).json({ error: 'Failed to upload files' });
    }
  };
}

export default MixController;
