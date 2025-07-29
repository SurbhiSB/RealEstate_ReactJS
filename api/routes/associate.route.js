import express from "express";
import { getAllAssociates, createAssociate } from "../controllers/associate.controller.js";

const router = express.Router();

router.get("/", getAllAssociates);     // ✅ GET /api/associates
router.post("/", createAssociate);     // ✅ POST /api/associates

export default router;
