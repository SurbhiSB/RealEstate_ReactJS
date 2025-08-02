import express from 'express';
import { createLandPurchase, getAllLandPurchases } from '../controllers/LandPurchase.controller.js';

const router = express.Router();

router.post('/LandPurchase', createLandPurchase);
router.get('/LandPurchase', getAllLandPurchases);

export default router;