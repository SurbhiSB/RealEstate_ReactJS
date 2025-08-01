import express from 'express';
import {
  createSiteFeesExpenses,
  getAllSiteFeesExpenses,
  getSiteFeesExpensesById,
  updateSiteFeesExpensesById
} from '../controllers/SiteFeesExpenses.controller.js';

const router = express.Router();

router.post('/SiteFeesExpenses', createSiteFeesExpenses);
router.get('/SiteFeesExpenses', getAllSiteFeesExpenses);
router.get('/SiteFeesExpenses/:id', getSiteFeesExpensesById);
router.put('/SiteFeesExpenses/:id', updateSiteFeesExpensesById);

export default router;
