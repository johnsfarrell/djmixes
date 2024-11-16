import express from 'express';
import EventController from '../controllers/eventController';

const router = express.Router();

const eventController: EventController = new EventController();

// Route for fetching events by DJ ID
router.get('/:djId', eventController.getDjEvents);

export default router;
