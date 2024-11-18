import express from 'express';
import MixController from '../controllers/mixController';

const router = express.Router();

const mixController = new MixController();

// Route for fetching a mix by its ID
router.get('/:mixId', mixController.getMix);

// Route for uploading a mix
router.get('/:mixId/download', mixController.downloadMix);

// Route for downloading a mix
router.post('/upload', mixController.uploadMix);

export default router;
