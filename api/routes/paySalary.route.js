import express from "express";
import { createSalary, getSalaries, getSalaryById, updateSalary, deleteSalary } from "../controllers/paySalary.controller.js";

const router = express.Router();

router.post("/", createSalary);       // Create Salary
router.get("/", getSalaries);         // Get All Salaries
router.get("/:id", getSalaryById);    // Get Salary by ID
router.put("/:id", updateSalary);     // Update Salary
router.delete("/:id", deleteSalary);  // Delete Salary

export default router;
