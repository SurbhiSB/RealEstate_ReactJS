import AddCustomers from '../models/addCustomers.model.js';

// Create a new Customers
export const createAddCustomer = async (req, res) => {
  try {
    const newCustomers = new AddCustomers(req.body);
    await newCustomers.save();
    res.status(201).json({ success: true, message: 'Customers created successfully', data: newCustomers });
  } catch (error) {
    console.error('Error in createAddCustomer:', error);
    res.status(500).json({ success: false, message: 'Failed to create Customers', error: error.message });
  }
};

// Get all Customerss
export const getAllAddCustomers = async (req, res) => {
  try {
    const Customerss = await AddCustomers.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: Customerss });
  } catch (error) {
    console.error('Error in getAllAddCustomers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch Customerss', error: error.message });
  }
};