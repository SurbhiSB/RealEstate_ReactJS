import express from "express";
import { createProject, getAllProjects } from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", createProject);   // POST /api/projects/create
router.get("/all", getAllProjects);      // GET  /api/projects/all

export default router;
