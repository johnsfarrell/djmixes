import express from 'express';
import EventController from '../controllers/eventController';

const router = express.Router();
const eventController = new EventController();

// Route for fetching events by DJ ID
router.get('/:djId', eventController.getDjEvents);

// Route for uploading a new event
router.post('/:djId', eventController.uploadEvent);

export default router;
