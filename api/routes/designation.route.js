import express from 'express';
import {
  createDesignation,
  getAllDesignations,
  getDesignationById,
  updateDesignation
} from '../controllers/designation.controller.js';

const router = express.Router();

router.post('/', createDesignation);               // Create
router.get('/', getAllDesignations);              // Read All
router.get('/:id', getDesignationById);           // Read One
router.put('/:id', updateDesignation);            // Update

export default router;
