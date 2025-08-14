import express from 'express';
import {
  createWorkTypeList,
  getAllWorkTypeList,
  getWorkTypeListById,
  updateWorkTypeListById
} from '../controllers/WorkTypeList.controller.js';

const router = express.Router();

router.post('/WorkTypeList', createWorkTypeList);
router.get('/WorkTypeList', getAllWorkTypeList);
router.get('/WorkTypeList/:id', getWorkTypeListById);
router.put('/WorkTypeList/:id', updateWorkTypeListById);

export default router;
