import express from "express";
import { getAllPlots, createPlot, getPlotsByProject } from "../controllers/plot.controller.js";

const router = express.Router();

router.get("/", getAllPlots);         // ✅ GET /api/plots
router.post("/create", createPlot);
router.get("/project/:projectId", getPlotsByProject); // ✅ NEW ROUTE
         // ✅ POST /api/plots

export default router;
