import mongoose from "mongoose";

const leaveDetailSchema = new mongoose.Schema({
  leaveCategory: { type: String, required: true },
  departmentName: { type: String, required: true },
  leaveDays: { type: Number, required: true },
  remark: { type: String }
}, { timestamps: true });

export default mongoose.model("LeaveDetail", leaveDetailSchema);
