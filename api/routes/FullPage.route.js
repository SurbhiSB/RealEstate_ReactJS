import express from "express";
import {
  createFullPage,
  getAllFullPage,
  getFullPageById,
  updateFullPageById,
} from "../controllers/FullPage.controller.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Multiple file fields
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

router.get("/FullPage", getAllFullPage);
router.get("/FullPage/:id", getFullPageById);
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
