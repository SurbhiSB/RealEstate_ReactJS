import express from "express";
import {
  createProject,
  getAllProjects,
  updateProject, // ✅ this should now work
} from "../controllers/project.controller.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/all", getAllProjects);
router.put("/:id", updateProject); // ✅ Add update route

export default router;
