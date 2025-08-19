import mongoose from "mongoose";

const advanceReceivedSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to Employee collection
    required: true,
  },
  advanceDate: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  remark: {
    type: String,
    default: "",
  },
}, { timestamps: true });

export default mongoose.model("AdvanceReceived", advanceReceivedSchema);
