const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User registration
router.post('/api/register', userController.registerUser);

// User login
router.post('/api/login', userController.loginUser);

// User profile
router.get('/api/profile/:userId', userController.getUserProfile);

module.exports = router;