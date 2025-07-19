import express from 'express';
import { createAddCustomer, getAllAddCustomers } from '../controllers/AddCustomer.controller.js';

const router = express.Router();

router.post('/AddCustomer', createAddCustomer);
router.get('/AddCustomer', getAllAddCustomers);

export default router;