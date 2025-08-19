import express from "express";
import { createAdvanceReceived, getAdvanceReceived } from "../controllers/AdvanceReceived.controller.js";

const router = express.Router();

router.post("/advancereceived", createAdvanceReceived);
router.get("/advancereceived", getAdvanceReceived);

export default router;
