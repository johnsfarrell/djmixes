const express = require('express');
const router = express.Router();
const db = require('../database'); // Using the existing database connection

// Endpoint: POST /api/mixes/upload
router.post('/upload', async (req, res) => {
  try {
    // Extracting data from request body
    const {
      title,
      file_url,
      cover_url,
      tags,
      visibility,
      allow_download,
      artist,
      album,
    } = req.body;

    // Assuming user_id is passed in the request body for simplicity
    const user_id = req.body.user_id;

    // Validating essential fields
    if (!title || !file_url || !visibility || !user_id) {
      return res.status(400).json({ message: 'Title, file URL, visibility, and user ID are required.' });
    }

    // Convert tags array to a comma-separated string for database
    const tagsString = tags ? tags.join(',') : null;

    // Insert the mix into the database
    const query = `
      INSERT INTO mixes (
        user_id, title, artist, album, created_at, file_url, cover_url, tags, visibility, allow_download
      ) VALUES (?, ?, ?, ?, NOW(), ?, ?, ?, ?, ?)
    `;
    const values = [
      user_id,
      title,
      artist || 'Unknown Artist', // Default to 'Unknown Artist' if not provided
      album || null,
      file_url,
      cover_url || null,
      tagsString,
      visibility,
      allow_download || false
    ];

    db.query(query, values, (error, results) => {
      if (error) {
        console.error('Error uploading mix:', error);
        return res.status(500).json({ message: 'Internal server error' });
      }

      // Sending response back to client
      res.status(201).json({
        message: 'Mix uploaded successfully',
        mix_id: results.insertId,
      });
    });
  } catch (error) {
    console.error('Error uploading mix:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
