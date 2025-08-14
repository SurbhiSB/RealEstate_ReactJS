import express from 'express';
import {
  createLeadCreation,
  getAllLeadCreation,
  getLeadCreationById,
  updateLeadCreationById
} from '../controllers/LeadCreation.controller.js';

const router = express.Router();

router.post('/LeadCreation', createLeadCreation);
router.get('/LeadCreation', getAllLeadCreation);
router.get('/LeadCreation/:id', getLeadCreationById);
router.put('/LeadCreation/:id', updateLeadCreationById);

export default router;
