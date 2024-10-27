// routes/songRoutes.js
// Place Holders for database for now
// TODO: Update this when implement database
const express = require('express');
const path = require('path');
const db = require('../config/db');

const router = express.Router();

// Place Holders for database for now
// TODO: Update this when implement database
router.get('/mix/:mixId', (req, res) => {
  const mixId = req.params.mixId;
  const query = 'SELECT file_url FROM mixes WHERE id = ?';

  db.query(query, [mixId], (err, result) => {
    // TODO: remove this when implement database, only for test
    // result[0]= 'https://www.youtube.com/watch?v=rkqqBA6ohc0'
    if (err) {
      res.status(500).send('Error retrieving mix');
      return;
    }

    if (result.length > 0) {
        const fileUrl = result[0].file_url;
        res.render('mixPlayer', { fileUrl });
      } else {
        res.status(404).send('Mix not found');
      }
  });
});

module.exports = router;