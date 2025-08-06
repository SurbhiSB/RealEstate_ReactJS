// controllers/outStock.controller.js
import OutStock from '../models/outStock.model.js';

export const createOutStock = async (req, res) => {
  try {
    const newStock = new OutStock(req.body);
    await newStock.save();
    res.status(201).json({ success: true, message: 'OutStock added successfully', data: newStock });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to add OutStock', error: err.message });
  }
};

export const getAllOutStocks = async (req, res) => {
  try {
    const stocks = await OutStock.find().sort({ createdAt: -1 });
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching outstocks', error: err.message });
  }
};
