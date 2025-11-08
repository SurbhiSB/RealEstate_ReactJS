import express from 'express';
import { createAddCustomer, getAllAddCustomers,updateCustomer,  getSingleCustomer,  deleteCustomer } from '../controllers/addCustomers.controller.js';

const router = express.Router();

router.post('/AddCustomer', createAddCustomer);
router.get('/AddCustomer', getAllAddCustomers);
router.get('/AddCustomer/:id', getSingleCustomer);
router.put('/AddCustomer/:id', updateCustomer);
router.delete('/AddCustomer/:id', deleteCustomer);

export default router;