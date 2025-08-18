import LeaveDetail from "../models/LeaveDetail.model.js";

export const getLeaveDetails = async (req, res) => {
  try {
    const details = await LeaveDetail.find();
    res.json(details);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createLeaveDetail = async (req, res) => {
  try {
    const { leaveCategory, departmentName, leaveDays, remark } = req.body;
    const detail = new LeaveDetail({ leaveCategory, departmentName, leaveDays, remark });
    const saved = await detail.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
