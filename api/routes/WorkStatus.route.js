import express from "express";
import multer from "multer";
import WorkStatus from "../models/WorkStatus.model.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/WorkStatus/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// POST /api/WorkStatuss/create
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const {
      plotId,
      receivedFrom,
      amount,
      WorkStatusMode,
      utrChequeNo,
      WorkStatusDate,
      remark,
    } = req.body;

    const fileUrl = req.file ? req.file.path : "";

    const newWorkStatus = new WorkStatus({
      plotId,
      receivedFrom,
      amount,
      WorkStatusMode,
      utrChequeNo,
      WorkStatusDate,
      remark,
      fileUrl,
    });

    await newWorkStatus.save();
    res.status(201).json({ success: true, message: "WorkStatus saved successfully" });
  } catch (error) {
    console.error("WorkStatus save error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
