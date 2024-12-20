/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the mix routes for the application.
 */

import express from "express";
import MixController from "@/controllers/mixController";

const router = express.Router();
const mixController = new MixController();

// Route for get random mixes
router.get("/random", mixController.getRandomMixIds);
router.get("/random/:num", mixController.getRandomMixIds);

// Route for downloading a file
router.get("/:mixId/download/:part?", mixController.downloadFile);

// Route for fetching a mix by its ID
router.get("/:mixId", mixController.getMix);

// Route for downloading a mix
router.post("/upload", mixController.uploadMix);

// Route for liking a mix
router.post("/:mixId/like", mixController.likeMix);

// Route for unliking a mix
router.post("/:mixId/unlike", mixController.unlikeMix);

// Route for commenting a mix
router.post("/:mixId/comment", mixController.commentMix);

// Route for deleting a mix
router.delete("/:mixId", mixController.deleteMix);

export default router;
