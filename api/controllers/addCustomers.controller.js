import AddCustomer from '../models/addCustomers.model.js';

// Create a new Customer
export const createAddCustomer = async (req, res) => {
  try {
    const newCustomer = new AddCustomer(req.body);
    await newCustomer.save();
    res.status(201).json({
      success: true,
      message: 'Customer created successfully',
      data: newCustomer
    });
  } catch (error) {
    console.error('Error in createAddCustomer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create customer',
      error: error.message
    });
  }
};

// Get all Customers with pagination
export const getAllAddCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await AddCustomer.countDocuments();
    const customers = await AddCustomer.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: customers,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error in getAllAddCustomers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch customers',
      error: error.message
    });
  }
};

// Get single customer
export const getSingleCustomer = async (req, res) => {
  try {
    const customer = await AddCustomer.findById(req.params.id);
    if (!customer) {
      return res.status(404).json({ success: false, message: 'Customer not found' });
    }
    res.status(200).json({ success: true, data: customer });
  } catch (error) {
    console.error('Error in getSingleCustomer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get customer',
      error: error.message
    });
  }
};

// Update customer
export const updateCustomer = async (req, res) => {
  try {
    const updated = await AddCustomer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Customer not found for update' });
    }
    res.status(200).json({ success: true, message: 'Customer updated successfully', data: updated });
  } catch (error) {
    console.error('Error in updateCustomer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update customer',
      error: error.message
    });
  }
};

// Delete customer
export const deleteCustomer = async (req, res) => {
  try {
    const deleted = await AddCustomer.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Customer not found for deletion' });
    }
    res.status(200).json({ success: true, message: 'Customer deleted successfully' });
  } catch (error) {
    console.error('Error in deleteCustomer:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete customer',
      error: error.message
    });
  }
};
