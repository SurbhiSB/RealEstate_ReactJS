import LbDesignation from '../models/LbDesignation.model.js';

// Create a new LbDesignation
export const createLbDesignation = async (req, res) => {
  try {
    const newLbDesignation = new LbDesignation(req.body);
    await newLbDesignation.save();
    res.status(201).json({
      success: true,
      message: 'LbDesignation created successfully',
      data: newLbDesignation
    });
  } catch (error) {
    console.error('Error in createLbDesignation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create LbDesignation',
      error: error.message
    });
  }
};

// Get all LbDesignation with pagination
export const getAllLbDesignation = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await LbDesignation.countDocuments();
    const designations = await LbDesignation.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: designations,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error in getAllLbDesignation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch LbDesignation',
      error: error.message
    });
  }
};

// Get LbDesignation by ID
export const getLbDesignationById = async (req, res) => {
  try {
    const LbDesignation = await LbDesignation.findById(req.params.id);

    if (!LbDesignation) {
      return res.status(404).json({
        success: false,
        message: 'LbDesignation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: LbDesignation
    });
  } catch (error) {
    console.error('Error in getLbDesignationById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch LbDesignation',
      error: error.message
    });
  }
};

// Update LbDesignation by ID
export const updateLbDesignationById = async (req, res) => {
  try {
    const updated = await LbDesignation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'LbDesignation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'LbDesignation updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateLbDesignationById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update LbDesignation',
      error: error.message
    });
  }
};
