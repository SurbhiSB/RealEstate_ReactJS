import express from 'express';
import {
  createDepartment,
  getAllDepartments,
  updateDepartment
} from '../controllers/department.controller.js';

const router = express.Router();

router.post('/', createDepartment);        // POST /api/departments
router.get('/', getAllDepartments);        // GET /api/departments
router.put('/:id', updateDepartment);      // PUT /api/departments/:id

export default router;
