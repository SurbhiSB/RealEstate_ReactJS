import express from 'express';
import {
  createofficeExpenses,
  getAllofficeExpenses,
  getofficeExpensesById,
  updateofficeExpensesById
} from '../controllers/officeExpenses.controller.js';

const router = express.Router();

router.post('/officeExpenses', createofficeExpenses);
router.get('/officeExpenses', getAllofficeExpenses);
router.get('/officeExpenses/:id', getofficeExpensesById);
router.put('/officeExpenses/:id', updateofficeExpensesById);

export default router;
