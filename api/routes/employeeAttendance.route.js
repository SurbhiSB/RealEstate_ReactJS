import express from "express";
import { saveAttendance, getAttendanceByDate, getAllAttendance } from "../controllers/employeeAttendance.controller.js";

const router = express.Router();

router.post("/", saveAttendance);
router.get("/", getAttendanceByDate);     // ?date=YYYY-MM-DD
router.get("/all", getAllAttendance);

export default router;
