import express from 'express';
import {
  createAddMember,
  getAllAddMembers,
  getSingleMember,
  updateMember,
  deleteMember
} from '../controllers/addMembers.controller.js';


const router = express.Router();

// Create a new member
router.post('/addmembers', createAddMember);

// Get all members
router.get('/addmembers', getAllAddMembers);

// Get a single member by ID
router.get('/addmembers/:id', getSingleMember);

// Update member by ID
router.put('/addmembers/:id', updateMember);

// Delete member by ID
router.delete('/addmembers/:id', deleteMember);

export default router;