import express from 'express';
import {
  createBankMaster,
  getAllBankMasters,
  getBankMasterById,
  updateBankMasterById
} from '../controllers/BankMaster.controller.js';

const router = express.Router();

router.post('/BankMaster', createBankMaster);
router.get('/BankMaster', getAllBankMasters);
router.get('/BankMaster/:id', getBankMasterById);
router.put('/BankMaster/:id', updateBankMasterById);

export default router;
