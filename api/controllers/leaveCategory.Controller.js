// controllers/leaveCategoryController.js
import LeaveCategory from "../models/LeaveCategory.model.js";

export const createLeaveCategory = async (req, res) => {
  try {
    const { categoryName, isCarryForward } = req.body;
    const newCategory = new LeaveCategory({ categoryName, isCarryForward });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaveCategories = async (req, res) => {
  try {
    const categories = await LeaveCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
