import WorkTypeList from '../models/WorkTypeList.model.js';

// Create a new WorkTypeList
export const createWorkTypeList = async (req, res) => {
  try {
    const newWorkTypeList = new WorkTypeList(req.body);
    await newWorkTypeList.save();
    res.status(201).json({
      success: true,
      message: 'WorkTypeList created successfully',
      data: newWorkTypeList
    });
  } catch (error) {
    console.error('Error in createWorkTypeList:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create WorkTypeList',
      error: error.message
    });
  }
};

// Get all WorkTypeList with pagination
export const getAllWorkTypeList = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await WorkTypeList.countDocuments();
    const designations = await WorkTypeList.find()
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
    console.error('Error in getAllWorkTypeList:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch WorkTypeList',
      error: error.message
    });
  }
};

// Get WorkTypeList by ID
export const getWorkTypeListById = async (req, res) => {
  try {
    const WorkTypeList = await WorkTypeList.findById(req.params.id);

    if (!WorkTypeList) {
      return res.status(404).json({
        success: false,
        message: 'WorkTypeList not found'
      });
    }

    res.status(200).json({
      success: true,
      data: WorkTypeList
    });
  } catch (error) {
    console.error('Error in getWorkTypeListById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch WorkTypeList',
      error: error.message
    });
  }
};

// Update WorkTypeList by ID
export const updateWorkTypeListById = async (req, res) => {
  try {
    const updated = await WorkTypeList.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'WorkTypeList not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'WorkTypeList updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateWorkTypeListById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update WorkTypeList',
      error: error.message
    });
  }
};
