import express from "express";

import { getAllUsers, 
  getUserById, 
  updateUser, 
  deleteUser, 
  getUserEquipment, 
  clearUserFine } from "../controllers/userController.js";

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
  getAllUsers
);

router.get(
  "/:id/equipment",
  authenticate,
  // requireAdmin,
  getUserEquipment
);

router.get(
  "/:id",
  authenticate,
  requireAdmin,
  getUserById
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateUser
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteUser
);

router.patch(
  "/:id/clear-fine", 
  requireAdmin, 
  clearUserFine);

export default router;