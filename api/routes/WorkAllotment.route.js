import express from 'express';
import {
  createWorkAllotments,
  getAllWorkAllotments,
  getWorkAllotmentById,
  updateWorkAllotmentsById
} from '../controllers/WorkAllotment.controller.js';

const router = express.Router();

router.post('/WorkAllotments', createWorkAllotments);
router.get('/WorkAllotments', getAllWorkAllotments);
router.get('/WorkAllotments/:id', getWorkAllotmentById);
router.put('/WorkAllotments/:id', updateWorkAllotmentsById);

export default router;
