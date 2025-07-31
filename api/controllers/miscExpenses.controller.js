import miscExpenses from '../models/miscExpenses.model.js';

// Create a new miscExpenses
export const createmiscExpenses = async (req, res) => {
  try {
    const newmiscExpenses = new miscExpenses(req.body);
    await newmiscExpenses.save();
    res.status(201).json({
      success: true,
      message: 'miscExpenses created successfully',
      data: newmiscExpenses
    });
  } catch (error) {
    console.error('Error in createmiscExpenses:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create miscExpenses',
      error: error.message
    });
  }
};

// Get all miscExpenses with pagination
export const getAllmiscExpenses = async (req, res) => {
  try {
    const data = await miscExpenses.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllmiscExpenses:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get miscExpenses by ID
export const getmiscExpensesById = async (req, res) => {
  try {
    const miscExpenses = await miscExpenses.findById(req.params.id);

    if (!miscExpenses) {
      return res.status(404).json({
        success: false,
        message: 'miscExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      data: miscExpenses
    });
  } catch (error) {
    console.error('Error in getmiscExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch miscExpenses',
      error: error.message
    });
  }
};

// Update miscExpenses by ID
export const updatemiscExpensesById = async (req, res) => {
  try {
    const updated = await miscExpenses.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'miscExpenses not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'miscExpenses updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updatemiscExpensesById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update miscExpenses',
      error: error.message
    });
  }
};
