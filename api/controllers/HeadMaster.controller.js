import HeadMasters from '../models/HeadMaster.model.js';

// Create a new HeadMaster
export const createHeadMaster = async (req, res) => {
  try {
    const newHeadMaster = new HeadMasters(req.body);
    await newHeadMaster.save();
    res.status(201).json({
      success: true,
      message: 'HeadMaster created successfully',
      data: newHeadMaster
    });
  } catch (error) {
    console.error('Error in createHeadMaster:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create HeadMaster',
      error: error.message
    });
  }
};

// Get all HeadMasters with pagination
export const getAllHeadMasters = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await HeadMasters.countDocuments();
    const headMasters = await HeadMasters.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: headMasters,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error in getAllHeadMasters:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch HeadMasters',
      error: error.message
    });
  }
};

// Get HeadMaster by ID
export const getHeadMasterById = async (req, res) => {
  try {
    const headMaster = await HeadMasters.findById(req.params.id);

    if (!headMaster) {
      return res.status(404).json({
        success: false,
        message: 'HeadMaster not found'
      });
    }

    res.status(200).json({
      success: true,
      data: headMaster
    });
  } catch (error) {
    console.error('Error in getHeadMasterById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch HeadMaster',
      error: error.message
    });
  }
};

// Update HeadMaster by ID
export const updateHeadMasterById = async (req, res) => {
  try {
    const updated = await HeadMasters.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'HeadMaster not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'HeadMaster updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateHeadMasterById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update HeadMaster',
      error: error.message
    });
  }
};
