// routes/leaveCategoryRoutes.js
import express from "express";
import {
  createLeaveCategory,
  getLeaveCategories
} from "../controllers/leaveCategory.Controller.js";

const router = express.Router();

router.post("/", createLeaveCategory);
router.get("/", getLeaveCategories);

export default router;
