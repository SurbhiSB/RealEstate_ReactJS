import WorkAllotment from '../models/WorkAllotment.model.js';

// Create a new WorkAllotment
export const createWorkAllotments = async (req, res) => {
  try {
    const newWorkAllotment = new WorkAllotment(req.body);
    await newWorkAllotment.save();
    res.status(201).json({
      success: true,
      message: 'WorkAllotment created successfully',
      data: newWorkAllotment
    });
  } catch (error) {
    console.error('Error in createWorkAllotments:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create WorkAllotment',
      error: error.message
    });
  }
};

// Get all WorkAllotment with optional sitename filter
export const getAllWorkAllotments = async (req, res) => {
  try {
    const { sitename } = req.query;
    let query = {};
    if (sitename) {
      query.SiteName = sitename;
    }
    const data = await WorkAllotment.find(query);
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllWorkAllotment:", error);
    res.status(500).json({ success: false, message: "Error fetching WorkAllotment" });
  }
};

// Get WorkAllotment by ID
export const getWorkAllotmentById = async (req, res) => {
  try {
    const workAllotment = await WorkAllotment.findById(req.params.id);

    if (!workAllotment) {
      return res.status(404).json({ success: false, message: 'WorkAllotment not found' });
    }

    res.status(200).json({ success: true, data: workAllotment });
  } catch (error) {
    console.error('Error in getWorkAllotmentById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch WorkAllotment',
      error: error.message
    });
  }
};

// Update WorkAllotment by ID
export const updateWorkAllotmentsById = async (req, res) => {
  try {
    const updated = await WorkAllotment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'WorkAllotment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'WorkAllotment updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateWorkAllotmentById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update WorkAllotment',
      error: error.message
    });
  }
};
