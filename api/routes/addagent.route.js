import express from 'express';
import multer from 'multer';
import {
  createAddAgent,
  getAllAddAgents,
  getSingleAgent,
  updateAgent,
  deleteAgent
} from '../controllers/addagent.controller.js';

const router = express.Router();

// Set up multer to use memory storage (stores files in memory as Buffer)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Multer fields for all the file inputs
const fileFields = upload.fields([
  { name: 'profilePic', maxCount: 1 },
  { name: 'idProof', maxCount: 1 },
  { name: 'addressProof', maxCount: 1 },
  { name: 'otherDoc', maxCount: 1 },
]);

// Create a new Agent (with file upload)
router.post('/AddAgent', fileFields, createAddAgent);

// Update Agent by ID (with file upload)
router.put('/AddAgent/:id', fileFields, updateAgent);

// Get all Agents
router.get('/AddAgent', getAllAddAgents);

// Get a single Agent by ID
router.get('/AddAgent/:id', getSingleAgent);

// Delete Agent by ID
router.delete('/AddAgent/:id', deleteAgent);

export default router;