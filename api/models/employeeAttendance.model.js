// models/attendance.model.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  records: [
    {
      empId: { type: mongoose.Schema.Types.ObjectId, ref: "Employee", required: true },
      name: { type: String, required: true }, // NEW - store name
      inTime: { type: String, default: "" },
      outTime: { type: String, default: "" },
      status: { type: String, enum: ["Present", "Absent", "Leave"], default: "Absent" },
      remark: { type: String, default: "" }
    }
  ]
}, { timestamps: true });


export default mongoose.model("Attendance", attendanceSchema);

