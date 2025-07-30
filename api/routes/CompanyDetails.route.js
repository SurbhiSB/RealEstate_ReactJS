import express from 'express';
import {
  createAddCompany,
  getAllAddCompanys,
  getCompanyById,
  updateCompanyById
} from '../controllers/CompanyDetails.controller.js';

const router = express.Router();

// Create new company
router.post('/AddCompanydtl', createAddCompany);

// Get all companies (with pagination)
router.get('/AddCompanydtl', getAllAddCompanys);

// ✅ Get company by ID
router.get('/AddCompanydtl/:id', getCompanyById);

// ✅ Update company by ID
router.put('/AddCompanydtl/:id', updateCompanyById);

export default router;
