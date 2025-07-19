import express from 'express';
import { createaddMembers, getAlladdMemberss } from '../controllers/addMembers.controller.js';

const router = express.Router();

router.post('/addmembers', createaddMembers);
router.get('/addmembers', getAlladdMemberss);

export default router;