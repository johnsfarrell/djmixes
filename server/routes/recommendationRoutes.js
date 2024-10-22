const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');
const radioController = require('../controllers/radioController');

// Get recommendations based on user preferences
router.get('/api/recommendations', recommendationController.getRecommendations);

// Play radio (stream)
router.get('/api/radio', radioController.playRadio);

module.exports = router;
