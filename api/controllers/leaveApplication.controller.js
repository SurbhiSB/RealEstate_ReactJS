import LeaveApplication from "../models/LeaveApplication.model.js";

// Create new leave application
export const createLeaveApplication = async (req, res) => {
  try {
    const leaveApp = new LeaveApplication(req.body);
    const saved = await leaveApp.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all leave applications
export const getLeaveApplications = async (req, res) => {
  try {
    const applications = await LeaveApplication.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
