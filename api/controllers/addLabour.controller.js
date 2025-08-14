import addLabour from '../models/addLabour.model.js';

// Create a new addLabour
export const createaddLabours = async (req, res) => {
  try {
    const newaddLabour = new addLabour(req.body);
    await newaddLabour.save();
    res.status(201).json({
      success: true,
      message: 'addLabour created successfully',
      data: newaddLabour
    });
  } catch (error) {
    console.error('Error in createaddLabours:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create addLabour',
      error: error.message
    });
  }
};

// Get all addLabour with pagination
export const getAlladdLabours = async (req, res) => {
  try {
    const { sitename } = req.query; // read from query params
    let query = {};

    if (sitename) {
      query.SiteName = sitename; // Match the field name in your DB exactly
    }
    const data = await addLabour.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAlladdLabour:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get addLabour by ID
export const getaddLabourById = async (req, res) => {
  try {
    const addLabour = await addLabour.findById(req.params.id);

    if (!addLabour) {
      return res.status(404).json({
        success: false,
        message: 'addLabour not found'
      });
    }

    res.status(200).json({
      success: true,
      data: addLabour
    });
  } catch (error) {
    console.error('Error in getaddLabourById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch addLabour',
      error: error.message
    });
  }
};

// Update addLabour by ID
export const updateaddLaboursById = async (req, res) => {
  try {
    const updated = await addLabour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'addLabour not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'addLabour updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateaddLabourById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update addLabour',
      error: error.message
    });
  }
};
