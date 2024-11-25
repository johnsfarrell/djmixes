import express from 'express';
import UserController from '@/controllers/userController';

const router = express.Router();

const userController = new UserController();

// Route for fetching a profile by its ID
router.post('/register', userController.register);

// Route for user login
router.post('/login', userController.login);

export default router;
