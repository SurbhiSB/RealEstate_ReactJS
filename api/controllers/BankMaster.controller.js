import BankMasters from '../models/BankMaster.model.js';

// Create a new BankMaster
export const createBankMaster = async (req, res) => {
  try {
    const newBankMaster = new BankMasters(req.body);
    await newBankMaster.save();
    res.status(201).json({
      success: true,
      message: 'BankMaster created successfully',
      data: newBankMaster
    });
  } catch (error) {
    console.error('Error in createBankMaster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create BankMaster',
      error: error.message
    });
  }
};

// Get all BankMasters with pagination
export const getAllBankMasters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await BankMasters.countDocuments();
    const results = await BankMasters.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: results,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error in getAllBankMasters:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch BankMasters',
      error: error.message
    });
  }
};

// Get BankMaster by ID
export const getBankMasterById = async (req, res) => {
  try {
    const bankMaster = await BankMasters.findById(req.params.id);

    if (!bankMaster) {
      return res.status(404).json({
        success: false,
        message: 'BankMaster not found'
      });
    }

    res.status(200).json({
      success: true,
      data: bankMaster
    });
  } catch (error) {
    console.error('Error in getBankMasterById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch BankMaster',
      error: error.message
    });
  }
};

// Update BankMaster by ID
export const updateBankMasterById = async (req, res) => {
  try {
    const updated = await BankMasters.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'BankMaster not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'BankMaster updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateBankMasterById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update BankMaster',
      error: error.message
    });
  }
};
