import express from 'express';

import { createGroup, getAllGroups,updateGroup } from '../controllers/group.controller.js';
import { createGroup, getAllGroups, updateGroup } from '../controllers/group.controller.js';

const router = express.Router();

// @route   POST /api/group/create
// @desc    Create a new group
router.post('/create', createGroup);

// @route   GET /api/group/all
// @desc    Get all groups
router.get('/all', getAllGroups);
router.put('/update/:id', updateGroup);


export default router;
