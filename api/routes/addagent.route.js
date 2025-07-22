import express from 'express';
import {
  createAddAgent,
  getAllAddAgents,
  getSingleAgent,
  updateAgent,
  deleteAgent
} from '../controllers/addagent.controller.js';

const router = express.Router();

// Create a new Agent
router.post('/AddAgent', createAddAgent);

// Get all Agents
router.get('/AddAgent', getAllAddAgents);

// Get a single Agent by ID
router.get('/AddAgent/:id', getSingleAgent);

// Update Agent by ID
router.put('/AddAgent/:id', updateAgent);

// Delete Agent by ID
router.delete('/AddAgent/:id', deleteAgent);

export default router;