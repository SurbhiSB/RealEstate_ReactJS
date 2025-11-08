import express from "express";
import { createPurchaseOrder, getAllPurchaseOrders } from "../controllers/purchaseOrder.controller.js";

const router = express.Router();

router.post("/", createPurchaseOrder);  // POST /api/purchase-orders
router.get("/", getAllPurchaseOrders);

export default router;
