import FdSdExpenses from '../models/FdSdExpenses.model.js';

// Create a new FdSdExpenses
export const createFdSdExpenses = async (req, res) => {
  try {
    const newFdSdExpenses = new FdSdExpenses(req.body);
    await newFdSdExpenses.save();
    res.status(201).json({
      success: true,
      message: 'FdSdExpenses created successfully',
      data: newFdSdExpenses
    });
  } catch (error) {
    console.error('Error in createFdSdExpenses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create FdSdExpenses',
      error: error.message
    });
  }
};

// Get all FdSdExpenses with pagination
export const getAllFdSdExpenses = async (req, res) => {
  try {
    const data = await FdSdExpenses.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllFdSdExpenses:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get FdSdExpenses by ID
export const getFdSdExpensesById = async (req, res) => {
  try {
    const FdSdExpenses = await FdSdExpenses.findById(req.params.id);

    if (!FdSdExpenses) {
      return res.status(404).json({
        success: false,
        message: 'FdSdExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      data: FdSdExpenses
    });
  } catch (error) {
    console.error('Error in getFdSdExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch FdSdExpenses',
      error: error.message
    });
  }
};

// Update FdSdExpenses by ID
export const updateFdSdExpensesById = async (req, res) => {
  try {
    const updated = await FdSdExpenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'FdSdExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'FdSdExpenses updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateFdSdExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update FdSdExpenses',
      error: error.message
    });
  }
};
