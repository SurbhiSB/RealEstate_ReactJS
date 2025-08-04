// routes/companyPayment.route.js
import express from 'express';
import { createCompanyPayment } from '../controllers/companyPayment.controller.js';

const router = express.Router();

router.post('/', createCompanyPayment);

export default router;
