import mongoose from "mongoose";

const inStockSchema = new mongoose.Schema({
  projectName: { type: String, required: true },
  vendorName: { type: String, required: true },
  billNumber: { type: String },
  billDate: { type: Date },
  inTime: { type: String },
  vehicleNumber: { type: String },
  itemName: { type: String, required: true },
  quantity: { type: Number, required: true },
  unit: { type: String },
  remarks: { type: String }
}, {
  timestamps: true,
});

export default mongoose.model("InStock", inStockSchema);
