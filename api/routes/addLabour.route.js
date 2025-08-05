import express from 'express';
import {
  createaddLabours,
  getAlladdLabours,
  getaddLabourById,
  updateaddLaboursById
} from '../controllers/addLabour.controller.js';

const router = express.Router();

router.post('/addLabours', createaddLabours);
router.get('/addLabours', getAlladdLabours);
router.get('/addLabours/:id', getaddLabourById);
router.put('/addLabours/:id', updateaddLaboursById);

export default router;
