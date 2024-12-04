import express from "express";
import EventController from "@/controllers/eventController";

const router = express.Router();
const eventController = new EventController();

// Route for fetching events by DJ ID
router.get("/:djId/events", eventController.getDJEventsMock);

// Route for uploading a new event
router.post("/:djId/events", eventController.uploadEvent);

export default router;
