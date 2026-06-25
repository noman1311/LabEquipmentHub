import express from "express";

import {
  getAllEquipment,
  createEquipment,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
  getIssuedEquipment,
  getAvailableEquipment,
  getOverdueEquipment
} from "../controllers/equipmentController.js";

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
  getAllEquipment
);

router.get(
  "/issued",
  authenticate,
  getIssuedEquipment
);

router.get(
  "/available",
  authenticate,
  getAvailableEquipment
);

router.get(
  "/overdue",
  authenticate,
  requireAdmin,
  getOverdueEquipment
);

router.get(
  "/:id",
  authenticate,
  getEquipmentById
);

router.post(
  "/",
  authenticate,
  requireAdmin,
  createEquipment
);

router.put(
  "/:id",
  authenticate,
  requireAdmin,
  updateEquipment
);

router.delete(
  "/:id",
  authenticate,
  requireAdmin,
  deleteEquipment
);

export default router;