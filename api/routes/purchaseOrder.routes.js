import express from "express";
import { createPurchaseOrder } from "../controllers/purchaseOrder.controller.js";

const router = express.Router();

router.post("/", createPurchaseOrder);  // POST /api/purchase-orders

export default router;
