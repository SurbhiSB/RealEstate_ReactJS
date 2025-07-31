import officeExpenses from '../models/officeExpenses.model.js';

// Create a new officeExpenses
export const createofficeExpenses = async (req, res) => {
  try {
    const newofficeExpenses = new officeExpenses(req.body);
    await newofficeExpenses.save();
    res.status(201).json({
      success: true,
      message: 'officeExpenses created successfully',
      data: newofficeExpenses
    });
  } catch (error) {
    console.error('Error in createofficeExpenses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create officeExpenses',
      error: error.message
    });
  }
};

// Get all officeExpenses with pagination
export const getAllofficeExpenses = async (req, res) => {
  try {
    const data = await officeExpenses.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllofficeExpenses:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get officeExpenses by ID
export const getofficeExpensesById = async (req, res) => {
  try {
    const officeExpenses = await officeExpenses.findById(req.params.id);

    if (!officeExpenses) {
      return res.status(404).json({
        success: false,
        message: 'officeExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      data: officeExpenses
    });
  } catch (error) {
    console.error('Error in getofficeExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch officeExpenses',
      error: error.message
    });
  }
};

// Update officeExpenses by ID
export const updateofficeExpensesById = async (req, res) => {
  try {
    const updated = await officeExpenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'officeExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'officeExpenses updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateofficeExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update officeExpenses',
      error: error.message
    });
  }
};
