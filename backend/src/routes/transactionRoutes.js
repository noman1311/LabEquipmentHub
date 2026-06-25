import express from "express";

import {
  getAllTransactions,
  getUserTransactions
} from "../controllers/transactionController.js";

import {
  authenticate
} from "../middleware/authMiddleware.js";

import {
  requireAdmin
} from "../middleware/adminMiddleware.js";

const router = express.Router();

router.get(
  "/",
  authenticate,
  requireAdmin,
  getAllTransactions
);

router.get(
  "/user/:id",
  authenticate,
  // requireAdmin,
  getUserTransactions
);

export default router;