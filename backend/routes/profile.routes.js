import express from "express";
import {
  healthCheck,
  getProfile,
  getProjects,
  getTopSkills,
  searchProfile,
  createProfile,
  updateProfile,
  deleteProfile
} from "../controllers/profile.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.get("/health", healthCheck);
router.get("/profile", getProfile);
router.get("/projects", getProjects);
router.get("/skills/top", getTopSkills);
router.get("/search", searchProfile);

// Protected routes
router.post("/profile", protect, createProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);

export default router;
