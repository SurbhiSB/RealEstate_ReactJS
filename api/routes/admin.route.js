import express from 'express';
import { getUsers, deleteUser, getListings, deleteListing, getStats,createListing } from '../controllers/admin.controller.js';
import {verifyAdmin } from '../utils/verifyAdmin.js';
import { verifyUser } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/admin-create', verifyUser, verifyAdmin, createListing); // admin only
router.post('/user-create', verifyUser, createListing); // user or admin

router.get('/stats', verifyAdmin, getStats);
router.get('/users', verifyAdmin, getUsers);
router.delete('/users/:id', verifyAdmin, deleteUser);
router.get('/listings', verifyAdmin, getListings);
router.delete('/listings/:id', verifyAdmin, deleteListing);

export default router;
