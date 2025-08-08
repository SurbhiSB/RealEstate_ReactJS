import Designation from '../models/designation.model.js';

// Create Designation
export const createDesignation = async (req, res) => {
  try {
    const newDesignation = new Designation(req.body);
    await newDesignation.save();
    res.status(201).json(newDesignation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Designations
export const getAllDesignations = async (req, res) => {
  try {
    const designations = await Designation.find().sort({ createdAt: -1 });
    res.json(designations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Designation
export const getDesignationById = async (req, res) => {
  try {
    const designation = await Designation.findById(req.params.id);
    res.json(designation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Designation
export const updateDesignation = async (req, res) => {
  try {
    const updated = await Designation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
