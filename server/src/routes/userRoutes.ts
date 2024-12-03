import express from "express";
import UserController from "@/controllers/userController";

const router = express.Router();

const userController = new UserController();

// Route for fetching a profile by its ID
router.post("/register", userController.register);

// Route for user login
router.post("/login", userController.login);

// Route to follow an artist
router.post("/:userId/follow", userController.followArtist);

// Route to get all followed artists
router.get("/:userId/following", userController.getFollowedArtists);

export default router;
