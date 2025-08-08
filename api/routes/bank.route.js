import express from 'express';
import { createBank, getAllBanks, updateBank } from '../controllers/bank.controller.js';

const router = express.Router();

router.post('/', createBank);
router.get('/', getAllBanks);
router.put('/:id', updateBank);

export default router;
