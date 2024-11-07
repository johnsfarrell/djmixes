// routes/songRoutes.js
// Place Holders for database for now
// TODO: Update this when implement database
const express = require('express');
const path = require('path');
const {getMixes} = require('../database/search/getMixes');
const {getUser} = require('../database/search/getUser');
const { title } = require('process');

const router = express.Router();
// Place Holders for database for now
// TODO: Update this when implement database
// {
//   "title": "Bouncing Ball",
//   "file_url": "/music/bouncing_ball.mp3",
//   "cover_url": "/cover/bouncing_ball.jpg",
//   "visibility": "public",
//   "allow_download": true,
//   "tags": ["house", "techno"],
//   "upload_user": {
//     "user_id": "1234",
//     "username": "anita"
//   },
// TODO: wait for db for comments
//   "comments": [
//     {
//       "comment_id": "2233",
//       "user": "anita",
//       "comment": "The sound of a bouncing ball."
//     }
//   ]
// }

router.get('/:mixId', async (req, res) => {
  const mixId = req.params.mixId;

  try {
    const mixData = await getMixes(mixId);
    const user = await getUser(mixId.user_id)
    if (mixData) {
      res.json({
        title: mixData.title,
        fileUrl: mixData.file_url,
        coverUrl: mixData.cover_url,
        visibility: mixData.visibility,
        allowDownload: mixData.allow_download,
        tags: mixData.tags,
        updatedAt: mixData.updatedAt,
        createdAt: mixData.createdAt,
        artist: mixData.artist,
        upload_user:{
          user_id: mixId.user_id,
          username: user.username
        },
        comments:[],
        album: mixData.album
      });
    } else {
      res.status(404).send('Mix not found');
    }
  } catch (error) {
    console.error('Error retrieving mix:', error);
    res.status(500).send('Error retrieving mix');
  }
});


module.exports = router;