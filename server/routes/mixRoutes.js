const express = require('express');
const router = express.Router();
const mixController = require('../controllers/mixController');

// Upload mix
router.post('/api/mixes/upload', mixController.uploadMix);

// Get mix details
router.get('/api/mixes/:mixId', mixController.getMix);

// Download mix
router.get('/api/mixes/:mixId/download', mixController.downloadMix);

// Share mix via link
router.post('/api/mixes/:mixId/share', mixController.shareMix);

// Add comment to mix
router.post('/api/mixes/:mixId/comment', mixController.addComment);

// Like mix
router.post('/api/mixes/:mixId/like', mixController.likeMix);

module.exports = router;
