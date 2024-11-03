// server/controllers/mixController.js
const path = require('path');
const db = require('../database/connection');

exports.uploadMix = async (req, res) => {
    const { title, tags, visibility, allow_download } = req.body;
    const fileUrl = req.file ? `/uploads/${req.file.filename}` : null; // Path to the uploaded file

    try {
        // Insert mix data into the database
        const [result] = await db.query(
            'INSERT INTO mixes (title, file_url, tags, visibility, allow_download) VALUES (?, ?, ?, ?, ?)',
            [title, fileUrl, tags ? tags.join(',') : '', visibility, allow_download ? 1 : 0]
        );

        res.status(201).json({
            message: 'Mix uploaded successfully',
            mix_id: result.insertId
        });
    } catch (error) {
        console.error('Error uploading mix:', error);
        res.status(500).json({ error: 'Failed to upload mix' });
    }
};
