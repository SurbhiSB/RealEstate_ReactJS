import express from "express";
import { createItem, getAllItems } from "../controllers/itemMaster.controller.js";

const router = express.Router();

router.post("/", createItem);     // POST /api/items
router.get("/", getAllItems);     // GET /api/items

export default router;
