import express from "express";
import {
  upload,
  createFullPage,
  getAllFullPage,
  getFullPageById,
  updateFullPageById,
} from "../controllers/FullPage.controller.js";

const router = express.Router();

// Create FullPage with multiple file fields
router.post(
  "/FullPage",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "panFile", maxCount: 1 },
    { name: "otherDoc", maxCount: 1 },
  ]),
  createFullPage
);

// Get all FullPages
router.get("/FullPage", getAllFullPage);

// Get by ID
router.get("/FullPage/:id", getFullPageById);

// Update by ID
router.put(
  "/FullPage/:id",
  upload.fields([
    { name: "aadharFront", maxCount: 1 },
    { name: "aadharBack", maxCount: 1 },
    { name: "passportPhoto", maxCount: 1 },
    { name: "panFile", maxCount: 1 },
    { name: "otherDoc", maxCount: 1 },
  ]),
  updateFullPageById
);

export default router;
