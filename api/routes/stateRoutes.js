import express from 'express';
import State from '../models/States.model.js';

const router = express.Router();

// GET /api/states
router.get('/', async (req, res) => {
  try {
    const states = await State.find();
    res.json(states);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;