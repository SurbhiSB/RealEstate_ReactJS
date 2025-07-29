import express from 'express';
import { createAddCustomer, getAllAddCustomers } from '../controllers/addCustomers.controller.js';

const router = express.Router();

router.post('/AddCustomer', createAddCustomer);
router.get('/AddCustomer', getAllAddCustomers);

export default router;