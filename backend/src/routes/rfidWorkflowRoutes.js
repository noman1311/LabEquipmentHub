import express from "express";

import {
  processRFID
} from "../controllers/rfidWorkflowController.js";

const router = express.Router();

router.post(
  "/process",
  processRFID
);

export default router;