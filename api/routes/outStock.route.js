// routes/outStock.route.js
import express from 'express';
import { createOutStock, getAllOutStocks } from '../controllers/outStock.controller.js';

const router = express.Router();

router.post('/', createOutStock);
router.get('/', getAllOutStocks);

export default router;
