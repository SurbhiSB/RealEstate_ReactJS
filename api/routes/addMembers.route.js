import express from 'express';
import {
  createAddMember,
  getAllAddMembers,
  getSingleMember,
  updateMember,
  deleteMember
} from '../controllers/addMembers.controller.js';
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

// Create a new member
router.post('/addmembers', verifyToken, createAddMember);

// Get all members
router.get('/addmembers', verifyToken, getAllAddMembers);

// Get a single member by ID
router.get('/addmembers/:id', verifyToken, getSingleMember);

// Update member by ID
router.put('/addmembers/:id', verifyToken, updateMember);

// Delete member by ID
router.delete('/addmembers/:id', verifyToken, deleteMember);

export default router;