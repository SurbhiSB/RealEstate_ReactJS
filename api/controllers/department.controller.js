import Department from '../models/department.model.js';

// CREATE
export const createDepartment = async (req, res) => {
  try {
    const newDepartment = new Department(req.body);
    await newDepartment.save();
    res.status(201).json({ success: true, data: newDepartment });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating department', error });
  }
};

// READ ALL
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: departments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching departments', error });
  }
};

// UPDATE
export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Department.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating department', error });
  }
};
