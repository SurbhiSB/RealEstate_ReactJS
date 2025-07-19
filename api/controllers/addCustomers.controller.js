import AddMember from '../models/AddCustomer.model.js';

// Create a new member
export const createAddCustomer = async (req, res) => {
  try {
    const newMember = new AddMember(req.body);
    await newMember.save();
    res.status(201).json({ success: true, message: 'Member created successfully', data: newMember });
  } catch (error) {
    console.error('Error in createAddCustomer:', error);
    res.status(500).json({ success: false, message: 'Failed to create member', error: error.message });
  }
};

// Get all members
export const getAllAddCustomers = async (req, res) => {
  try {
    const members = await AddMember.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: members });
  } catch (error) {
    console.error('Error in getAllAddCustomers:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch members', error: error.message });
  }
};