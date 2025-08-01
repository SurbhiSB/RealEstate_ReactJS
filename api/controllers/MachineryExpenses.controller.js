import MachineryExpenses from '../models/MachineryExpenses.model.js';

// Create a new MachineryExpenses
export const createMachineryExpenses = async (req, res) => {
  try {
    const newMachineryExpenses = new MachineryExpenses(req.body);
    await newMachineryExpenses.save();
    res.status(201).json({
      success: true,
      message: 'MachineryExpenses created successfully',
      data: newMachineryExpenses
    });
  } catch (error) {
    console.error('Error in createMachineryExpenses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create MachineryExpenses',
      error: error.message
    });
  }
};

// Get all MachineryExpenses with pagination
export const getAllMachineryExpenses = async (req, res) => {
  try {
    const data = await MachineryExpenses.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllMachineryExpenses:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get MachineryExpenses by ID
export const getMachineryExpensesById = async (req, res) => {
  try {
    const MachineryExpenses = await MachineryExpenses.findById(req.params.id);

    if (!MachineryExpenses) {
      return res.status(404).json({
        success: false,
        message: 'MachineryExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      data: MachineryExpenses
    });
  } catch (error) {
    console.error('Error in getMachineryExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch MachineryExpenses',
      error: error.message
    });
  }
};

// Update MachineryExpenses by ID
export const updateMachineryExpensesById = async (req, res) => {
  try {
    const updated = await MachineryExpenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'MachineryExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'MachineryExpenses updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateMachineryExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update MachineryExpenses',
      error: error.message
    });
  }
};
