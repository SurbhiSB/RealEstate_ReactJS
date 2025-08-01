import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  unit: { type: String },
  gst: { type: String },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
}, { timestamps: true });

export default mongoose.model("Item", itemSchema);
