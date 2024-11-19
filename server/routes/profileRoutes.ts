import express from 'express';
import ProfileController from '@/controllers/profileController';

const router = express.Router();

const profileController = new ProfileController();

// Route for fetching a profile by its ID
router.get('/:userId', profileController.getProfileMock);

export default router;
