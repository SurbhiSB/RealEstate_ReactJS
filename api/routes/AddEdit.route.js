import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  createAddEdit,
  getAllAddEdits,
  getAddEditById,
  updateAddEditById,
} from "../controllers/AddEdit.controller.js";

const router = express.Router();

// 📂 Upload folder ka path
const uploadDir = path.join(process.cwd(), "uploads");

// Agar folder nahi hai to create kar do
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Routes
router.post("/AddEdit", upload.single("icon"), createAddEdit);
router.get("/AddEdit", getAllAddEdits);
router.get("/AddEdit/:id", getAddEditById);
router.put("/AddEdit/:id", upload.single("icon"), updateAddEditById);

export default router;
