import express from "express";
import { getLeaveDetails, createLeaveDetail } from "../controllers/leaveDetail.Controller.js";

const router = express.Router();

router.get("/", getLeaveDetails);
router.post("/", createLeaveDetail);

export default router;
