import express from "express";

import {
  getActiveSessions,
  getSessionHistory
} from "../controllers/sessionAdminController.js";

import {
  authenticate
} from "../middleware/authMiddleware.js";

import {
  requireAdmin
} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/active",
  authenticate,
  requireAdmin,
  getActiveSessions
);

router.get(
  "/history",
  authenticate,
  requireAdmin,
  getSessionHistory
);

export default router;