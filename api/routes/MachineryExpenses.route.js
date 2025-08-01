import express from 'express';
import {
  createMachineryExpenses,
  getAllMachineryExpenses,
  getMachineryExpensesById,
  updateMachineryExpensesById
} from '../controllers/MachineryExpenses.controller.js';

const router = express.Router();

router.post('/MachineryExpenses', createMachineryExpenses);
router.get('/MachineryExpenses', getAllMachineryExpenses);
router.get('/MachineryExpenses/:id', getMachineryExpensesById);
router.put('/MachineryExpenses/:id', updateMachineryExpensesById);

export default router;
