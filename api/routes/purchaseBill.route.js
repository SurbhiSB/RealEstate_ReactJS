import express from "express";
import { createpurchaseBill, getAllPurchaseBills } from "../controllers/purchaseBill.controller.js";

const router = express.Router();

router.post("/", createpurchaseBill);  // POST /api/purchase-orders
router.get("/", getAllPurchaseBills);

export default router;