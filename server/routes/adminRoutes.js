const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Remove mix or comment
router.delete('/api/admin/:resourceType/:resourceId/remove', adminController.removeResource);

// Flag mix or comment for review
router.post('/api/mixes/:resourceType/:resourceId/flag', adminController.flagResource);

module.exports = router;
