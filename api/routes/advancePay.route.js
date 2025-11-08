import express from "express";
import {
  createAdvancePayment,
  getAdvancePayments,
} from "../controllers/advancePay.controller.js";

const router = express.Router();

router.post("/", createAdvancePayment);
router.get("/", getAdvancePayments);

export default router;
