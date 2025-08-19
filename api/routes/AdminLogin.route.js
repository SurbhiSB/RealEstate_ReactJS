import express from 'express';
import {
  createAdminLogin,
  getAllAdminLogins,
  getAdminLoginById,
  updateAdminLoginById
} from '../controllers/AdminLogin.controller.js';

const router = express.Router();

router.post('/AdminLogin', createAdminLogin);
router.get('/AdminLogin', getAllAdminLogins);
router.get('/AdminLogin/:id', getAdminLoginById);
router.put('/AdminLogin/:id', updateAdminLoginById);

export default router;
