import express from 'express';
import {
  createHeadMaster,
  getAllHeadMasters,
  getHeadMasterById,
  updateHeadMasterById
} from '../controllers/HeadMaster.controller.js';

const router = express.Router();

router.post('/HeadMaster', createHeadMaster);
router.get('/HeadMaster', getAllHeadMasters);
router.get('/HeadMaster/:id', getHeadMasterById);
router.put('/HeadMaster/:id', updateHeadMasterById);

export default router;
