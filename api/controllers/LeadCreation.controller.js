import LeadCreation from '../models/LeadCreation.model.js';

// Create a new LeadCreation
export const createLeadCreation = async (req, res) => {
  try {
    const newLeadCreation = new LeadCreation(req.body);
    await newLeadCreation.save();
    res.status(201).json({
      success: true,
      message: 'LeadCreation created successfully',
      data: newLeadCreation
    });
  } catch (error) {
    console.error('Error in createLeadCreation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create LeadCreation',
      error: error.message
    });
  }
};

// Get all LeadCreation with pagination
export const getAllLeadCreation = async (req, res) => {
  try {
    const data = await LeadCreation.find();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Error in getAllLeadCreation:", error);
    res.status(500).json({ success: false, message: "Error fetching office expenses" });
  }
};

// Get LeadCreation by ID
export const getLeadCreationById = async (req, res) => {
  try {
    const LeadCreation = await LeadCreation.findById(req.params.id);

    if (!LeadCreation) {
      return res.status(404).json({
        success: false,
        message: 'LeadCreation not found'
      });
    }

    res.status(200).json({
      success: true,
      data: LeadCreation
    });
  } catch (error) {
    console.error('Error in getLeadCreationById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch LeadCreation',
      error: error.message
    });
  }
};

// Update LeadCreation by ID
export const updateLeadCreationById = async (req, res) => {
  try {
    const updated = await LeadCreation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'LeadCreation not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'LeadCreation updated successfully',
      data: updated
    });
  } catch (error) {
    console.error('Error in updateLeadCreationById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update LeadCreation',
      error: error.message
    });
  }
};
