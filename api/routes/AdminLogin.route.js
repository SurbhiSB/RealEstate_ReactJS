import express from "express";
import { loginAdmin } from "../controllers/AdminLogin.controller.js";



const router = express.Router();

// Route: POST /api/AdminLogin
router.post("/loginAdmin",  loginAdmin);

export default router;