import express from 'express';
import {
  createmiscExpenses,
  getAllmiscExpenses,
  getmiscExpensesById,
  updatemiscExpensesById
} from '../controllers/miscExpenses.controller.js';

const router = express.Router();

router.post('/miscExpenses', createmiscExpenses);
router.get('/miscExpenses', getAllmiscExpenses);
router.get('/miscExpenses/:id', getmiscExpensesById);
router.put('/miscExpenses/:id', updatemiscExpensesById);

export default router;
