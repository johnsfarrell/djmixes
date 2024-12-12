/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the event routes for the application.
 */

import express from "express";
import EventController from "@/controllers/eventController";

const router = express.Router();
const eventController = new EventController();

// Route for fetching events by DJ ID
router.get("/:djId/events", eventController.getDJEventsMock);

// Route for uploading a new event
router.post("/:djId/events", eventController.uploadEvent);

export default router;
