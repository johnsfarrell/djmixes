// routes/songRoutes.js
// Place Holders for database for now
// TODO: Update this when implement database
const express = require('express');
const path = require('path');
const getMix= require('../database/search/getMixes');
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
//   "uploader": {
//     "user_id": "1234",
//     "username": "anita"
//   },
//   "comments": [
//     {
//       "comment_id": "2233",
//       "user": "anita",
//       "comment": "The sound of a bouncing ball."
//     }
//   ]
// }

router.get('/:mixId', (req, res) => {
  const mixId = req.params.mixId;

  getMix(mixId, (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving mix');
      return;
    }
    if (result.length > 0 && !result[0].is_deleted) {
      const mixData = result[0]; // Get the first result (assuming it's the correct one)

      // Return the JSON response with the expected structure
      res.json({
        title: mixData.title, // The title of the mix
        fileUrl: mixData.file_url, // The URL of the mix file
        coverUrl: mixData.cover_url, // The URL for the cover image
        visibility: mixData.visibility, // Visibility status (e.g. public/private)
        allowDownload: mixData.allow_download, // Allow download flag
        tags: mixData.tags, // Array of tags associated with the mix
        updatedAt: mixData.updatedAt,
        createdAt: mixData.createdAt,
        artist: mixData.artist,
        album: mixData.album
      });
    }  else {
        res.status(404).send('Mix not found');
    }
  });
});

module.exports = router;