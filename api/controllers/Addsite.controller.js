import Addsite from '../models/Addsite.model.js';

// Create a new Addsite
export const createAddsite = async (req, res) => {
  try {
    const newAddsite = new Addsite(req.body);
    await newAddsite.save();
    res.status(201).json({
      success: true,
      message: 'Addsite created successfully',
      data: newAddsite
    });
  } catch (error) {
    console.error('Error in createAddsite:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create Addsite',
      error: error.message
    });
  }
};

// Get all Addsite with pagination
export const getAllAddsites = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const total = await Addsite.countDocuments();
    const sites = await Addsite.find()  // ✅ renamed from Addsite to sites
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      data: sites,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error('Error in getAllAddsite:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Addsite',
      error: error.message
    });
  }
};

// Get Addsite by ID
export const getAddsiteById = async (req, res) => {
  try {
    const site = await Addsite.findById(req.params.id); // ✅ renamed variable

    if (!site) {
      return res.status(404).json({
        success: false,
        message: 'Addsite not found'
      });
    }

    res.status(200).json({
      success: true,
      data: site
    });
  } catch (error) {
    console.error('Error in getAddsiteById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch Addsite',
      error: error.message
    });
  }
};

// Update Addsite by ID
export const updateAddsiteById = async (req, res) => {
  try {
    const updated = await Addsite.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Addsite not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Addsite updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateAddsiteById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update Addsite',
      error: error.message
    });
  }
};
