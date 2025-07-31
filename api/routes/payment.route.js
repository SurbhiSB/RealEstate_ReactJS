import express from "express";
import multer from "multer";
import Payment from "../models/payment.model.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/payment/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});
const upload = multer({ storage: storage });

// POST /api/payments/create
router.post("/create", upload.single("file"), async (req, res) => {
  try {
    const {
      plotId,
      receivedFrom,
      amount,
      paymentMode,
      utrChequeNo,
      paymentDate,
      remark,
    } = req.body;

    const fileUrl = req.file ? req.file.path : "";

    const newPayment = new Payment({
      plotId,
      receivedFrom,
      amount,
      paymentMode,
      utrChequeNo,
      paymentDate,
      remark,
      fileUrl,
    });

    await newPayment.save();
    res.status(201).json({ success: true, message: "Payment saved successfully" });
  } catch (error) {
    console.error("Payment save error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
