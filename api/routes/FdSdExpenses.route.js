import express from 'express';
import {
  createFdSdExpenses,
  getAllFdSdExpenses,
  getFdSdExpensesById,
  updateFdSdExpensesById
} from '../controllers/FdSdExpenses.controller.js';

const router = express.Router();

router.post('/FdSdExpenses', createFdSdExpenses);
router.get('/FdSdExpenses', getAllFdSdExpenses);
router.get('/FdSdExpenses/:id', getFdSdExpensesById);
router.put('/FdSdExpenses/:id', updateFdSdExpensesById);

export default router;
