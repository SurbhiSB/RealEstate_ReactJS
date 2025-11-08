import express from "express";
import { createStock, getAllStock } from "../controllers/inStock.controller.js";

const router = express.Router();

router.post("/", createStock);
router.get("/", getAllStock);

export default router;
