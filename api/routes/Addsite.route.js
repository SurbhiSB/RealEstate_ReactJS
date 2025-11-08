import express from 'express';
import {
  createAddsite,
  getAllAddsites,
  getAddsiteById,
  updateAddsiteById
} from '../controllers/Addsite.controller.js';

const router = express.Router();

router.post('/Addsite', createAddsite);
router.get('/Addsite', getAllAddsites);
router.get('/Addsite/:id', getAddsiteById);
router.put('/Addsite/:id', updateAddsiteById);

export default router;
