import Salary from "../models/paySalary.model.js";

// Create Salary
export const createSalary = async (req, res) => {
  try {
    const {
      employeeName,
      salaryDate,
      month,
      year,
      basicSalary,
      grossSalary,
      netSalary,
      totalDays,
      workDays,
      presentDays,
    } = req.body;

    // Validation (backend level)
   if (
      !employeeName ||
      !salaryDate ||
      !month ||
      !year ||
      basicSalary === undefined ||
      grossSalary === undefined ||
      netSalary === undefined ||
      totalDays === undefined ||
      workDays === undefined ||
      presentDays === undefined
    ) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

      const salary = new Salary({
      employeeName,
      salaryDate,
      month,
      year,
      basicSalary,
      grossSalary,
      netSalary,
      totalDays,
      workDays,
      presentDays,
    });

    await salary.save();
    res.status(201).json({ message: "Salary record created successfully", salary });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get All Salaries
export const getSalaries = async (req, res) => {
  try {
    const salaries = await Salary.find().sort({ createdAt: -1 });
    res.status(200).json(salaries);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get Single Salary by ID
export const getSalaryById = async (req, res) => {
  try {
    const salary = await Salary.findById(req.params.id);
    if (!salary) return res.status(404).json({ message: "Salary not found" });
    res.status(200).json(salary);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Salary
export const updateSalary = async (req, res) => {
  try {
    const updated = await Salary.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Salary not found" });
    res.status(200).json({ message: "Salary updated successfully", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Salary
export const deleteSalary = async (req, res) => {
  try {
    const deleted = await Salary.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Salary not found" });
    res.status(200).json({ message: "Salary deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
