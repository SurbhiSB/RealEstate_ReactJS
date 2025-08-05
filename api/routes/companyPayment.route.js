// routes/companyPayment.route.js
import express from 'express';
import { createCompanyPayment, getAllPayments } from '../controllers/companyPayment.controller.js';

const router = express.Router();

router.post('/', createCompanyPayment);
router.get("/", getAllPayments);

export default router;
