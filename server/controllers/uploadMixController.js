const express = require('express');
const AWS = require('aws-sdk');
const fileUpload = require('express-fileupload');
const db = require('../database/db_config'); // Using the existing database connection

const router = express.Router();

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

// Use fileUpload middleware
router.use(fileUpload());

// Route for uploading a file
router.post('/upload', (req, res) => {
  try {
    if (!req.files || !req.files.mix) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = req.files.mix; // Get the uploaded file
    const fileKey = `${Date.now()}_${file.name}`; // Generate a unique file key

    // Create upload parameters
    const uploadParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: fileKey,
      Body: file.data // Use file.data to get the file buffer
    };

    // Upload file to S3
    s3.upload(uploadParams, (err, data) => {
      if (err) {
        console.error('Error uploading file:', err);
        return res.status(500).json({ error: 'Failed to upload file' });
      }

      // File uploaded successfully, get the file URL
      const file_url = data.Location;

      // Save the file URL and other details to the database
      const {
        title,
        cover_url,
        tags,
        visibility,
        allow_download,
        artist,
        album,
        user_id
      } = req.body;

      // Default values for optional fields
      const values = [
        title,
        file_url,
        cover_url || null,
        tags || '',
        visibility || 'private',
        allow_download || 'false',
        artist || 'Unknown Artist',
        album || null,
        user_id
      ];

      // SQL query to insert data into the mixes table
      const query = `
        INSERT INTO mixes (title, file_url, cover_url, tags, visibility, allow_download, artist, album, user_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.run(query, values, (dbErr) => {
        if (dbErr) {
          console.error('Database error:', dbErr);
          return res.status(500).json({ error: 'Failed to save mix details' });
        }
        res.status(200).json({ message: 'Mix uploaded successfully', file_url });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
