import express from "express";
import ProfileController from "@/controllers/profileController";

const router = express.Router();

const profileController = new ProfileController();

// Route for fetching a profile avatar by its ID
router.get("/:userId/avatar", profileController.getProfileAvatar);

// Route for fetching a profile by its ID
router.get("/:userId", profileController.getProfile);

// Route for create or update a profile by its ID
router.post("/:userId", profileController.updateProfile);

// Route for fetching mixes a user liked by its ID
router.get("/:userId/liked", profileController.getProfileLiked);

// Route for fetching mixes a user commented by its ID
router.get("/:userId/commented", profileController.getProfileCommented);

// Update a user's profile
router.put("/:userId", profileController.updateProfile);

// Delete a user's profile
router.delete("/:userId", profileController.deleteProfile);

export default router;
