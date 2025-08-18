import express from 'express';
import {
  createSendMessage,
  getAllSendMessage,
  getSendMessageById,
  updateSendMessageById
} from '../controllers/SendMessage.controller.js';

const router = express.Router();

router.post('/SendMessage', createSendMessage);
router.get('/SendMessage', getAllSendMessage);
router.get('/SendMessage/:id', getSendMessageById);
router.put('/SendMessage/:id', updateSendMessageById);

export default router;
