// models/LeaveCategory.js
import mongoose from "mongoose";

const leaveCategorySchema = new mongoose.Schema({
  categoryName: { type: String, required: true },
  isCarryForward: { type: String, enum: ["Yes", "No"], default: "No" }
});

export default mongoose.model("LeaveCategory", leaveCategorySchema);
