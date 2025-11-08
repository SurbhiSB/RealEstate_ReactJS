import express from 'express';
import {
  createLbDesignation,
  getAllLbDesignation,
  getLbDesignationById,
  updateLbDesignationById
} from '../controllers/LbDesignation.controller.js';

const router = express.Router();

router.post('/LbDesignation', createLbDesignation);
router.get('/LbDesignation', getAllLbDesignation);
router.get('/LbDesignation/:id', getLbDesignationById);
router.put('/LbDesignation/:id', updateLbDesignationById);

export default router;
