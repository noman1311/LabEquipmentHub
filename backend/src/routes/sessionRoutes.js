import express from "express";

import {
  startSession,
  endSession,
  getActiveSession
} from "../controllers/sessionController.js";

import {
  authenticate
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/start",
  authenticate,
  startSession
);

router.post(
  "/end",
  authenticate,
  endSession
);

router.get(
  "/active/:userId",
  authenticate,
  getActiveSession
);

export default router;