/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the main server file for the application.
 */

import express, { Request, Response } from "express";
import path from "path";
import mixRoutes from "./routes/mixRoutes";
import searchRoutes from "./routes/searchRoutes";
import profileRoutes from "./routes/profileRoutes";
import eventRoutes from "./routes/eventRoutes";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
import AudioProcessor from "./utils/algorithm";
import initializeDatabase from "./database/db_init";
import cors from "cors";

initializeDatabase();

// Create express app
const app = express();

// Allow cross-origin requests
app.use(cors({ origin: "*" }));

// Load environment variables
dotenv.config();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 4000;

// JSON parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// File upload middleware
app.use(fileUpload());

//Home page includes the README.md file
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../README.md"));
});

// Routes for mixes, profiles, and events
app.use("/api/mixes", mixRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dj", eventRoutes);
app.use("/api/search", searchRoutes);

// 404 route, redirect to home page
app.use((req: Request, res: Response) => {
  res.redirect("/");
});

// Start server on PORT
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export const algorithm: AudioProcessor = new AudioProcessor();

export default app;
