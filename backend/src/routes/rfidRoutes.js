import express from "express";

import {
  scanRFID
} from "../controllers/rfidController.js";

const router = express.Router();

router.post(
  "/scan",
  scanRFID
);

export default router;