import mongoose from "mongoose";

const leaveApplicationSchema = new mongoose.Schema({
  employeeName: { type: String, required: true },
  leaveCategory: { type: String, required: true },
  fromDate: { type: Date, required: true },
  toDate: { type: Date, required: true },
  reason: { type: String, required: true },
  applyOD: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model("LeaveApplication", leaveApplicationSchema);
