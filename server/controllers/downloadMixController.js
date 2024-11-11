const express = require('express');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const db = require('../database/db_config');

const router = express.Router();

// Configure AWS S3
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

// Route for downloading a mix and saving it to the local Downloads folder
router.get('/api/mixes/:mix_id/download', async (req, res) => {
  try {
    const mixId = parseInt(req.params.mix_id, 10);

    // SQL query to fetch mix details from the database
    const query = `SELECT file_url, allow_download FROM mixes WHERE mix_id = ? AND is_deleted = 0`;
    
    db.get(query, [mixId], (dbErr, mix) => {
      if (dbErr) {
        console.error('Database error:', dbErr);
        return res.status(500).json({ error: 'Failed to retrieve mix details' });
      }

      if (!mix) {
        return res.status(404).json({ error: 'Mix not found' });
      }

      if (!mix.allow_download) {
        return res.status(403).json({ error: 'Download not allowed for this mix' });
      }

      const fileUrl = mix.file_url;
      const fileKey = fileUrl.split('/').pop() || '';
      
      // Set up parameters to fetch the file from S3
      const downloadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileKey,
      };

      // Fetch the file from S3
      s3.getObject(downloadParams, (err, data) => {
        if (err) {
          console.error('Error fetching file from S3:', err);
          return res.status(500).json({ error: 'Failed to download file' });
        }

        // Path to save the file in the local Downloads folder
        const downloadsFolderPath = path.join(__dirname, '..', 'Downloads');
        const filePath = path.join(downloadsFolderPath, fileKey);

        // Ensure the Downloads folder exists
        if (!fs.existsSync(downloadsFolderPath)) {
          fs.mkdirSync(downloadsFolderPath, { recursive: true });
        }

        // Write the file to the local Downloads folder
        fs.writeFile(filePath, data.Body, (writeErr) => {
          if (writeErr) {
            console.error('Error writing file to local Downloads folder:', writeErr);
            return res.status(500).json({ error: 'Failed to save file locally' });
          }

          // File saved successfully
          res.status(201).json({ message: 'File downloaded and saved successfully', filePath });
        });
      });
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An unexpected error occurred' });
  }
});

module.exports = router;
