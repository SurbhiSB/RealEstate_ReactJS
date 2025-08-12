import EmployeeAttendance from "../models/employeeAttendance.model.js";
import Employee from "../models/employee.model.js";
import Attendance from "../models/employeeAttendance.model.js";



/**
 * Normalize date to midnight UTC (so comparisons by date are consistent)
 */
function normalizeDateToUTC(dateInput) {
  const d = new Date(dateInput);
  if (Number.isNaN(d.getTime())) return null;
  d.setUTCHours(0, 0, 0, 0);
  return d;
}

// POST /api/attendance
export const saveAttendance = async (req, res) => {
  try {
    const { date, records } = req.body;

    if (!date || !records || !Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ message: "Invalid data. Date and records are required." });
    }

    for (let record of records) {
      if (!record.empId || !record.name) {
        return res.status(400).json({ message: "Each record must have empId and name." });
      }
    }

    const attendance = new Attendance({ date, records });
    await attendance.save();
    res.status(201).json({ message: "Attendance saved successfully", attendance });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// GET /api/attendance?date=YYYY-MM-DD  (optional)
export const getAttendanceByDate = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "date query param required" });

    const normalizedDate = normalizeDateToUTC(date);
    if (!normalizedDate) return res.status(400).json({ message: "invalid date format" });

    const attendance = await EmployeeAttendance.findOne({ date: normalizedDate }).lean();
    if (!attendance) return res.status(404).json({ message: "No attendance found for date" });

    res.json(attendance);
  } catch (err) {
    console.error("getAttendanceByDate error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/attendance/all
export const getAllAttendance = async (req, res) => {
  try {
    const list = await EmployeeAttendance.find().sort({ date: -1 }).lean();
    res.json(list);
  } catch (err) {
    console.error("getAllAttendance error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
