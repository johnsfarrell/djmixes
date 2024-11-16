import express, { Request, Response } from "express";
import { downloadMix } from "../controllers/downloadMixController";
import { uploadMix } from "../controllers/uploadMixController";
import { getMixMock } from "../controllers/getMixController";

const router = express.Router();

// Route for fetching a mix by its ID
router.get("/:mixId", getMixMock);

// Route for uploading a mix
router.get("/:mix_id/download", downloadMix);

// Route for downloading a mix
router.post("/upload", uploadMix);

export default router;
