import express from 'express';
import {
  createAdvancePayment,
  getAllAdvancePayments,
  getaddAdvancePaymentById,
  updateAdvancePaymentsById
} from '../controllers/AdvancePayment.controller.js';

const router = express.Router();

router.post('/AdvancePayment', createAdvancePayment);
router.get('/AdvancePayment', getAllAdvancePayments);
router.get('/AdvancePayment/:id', getaddAdvancePaymentById);
router.put('/AdvancePayment/:id', updateAdvancePaymentsById);

export default router;
