import express from "express";
import { createLeaveApplication, getLeaveApplications } from "../controllers/leaveApplication.controller.js";

const router = express.Router();

router.post("/", createLeaveApplication);
router.get("/", getLeaveApplications);

export default router;
