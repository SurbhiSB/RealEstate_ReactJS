import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  rate: Number,
  amount: Number,
});

const purchaseBillSchema = new mongoose.Schema({
  memberName: String,
  vendorName: String,
  projectName: String,
  poNumber: String,
  vehicleNumber: String,
  workType: String,
  siteEngineer: String,
  billNumber: Number,
  contactNumber: String,
  poDate: Date,          // (OPTIONAL: not present in frontend right now)
  billDate: Date,
  dueDate: Date,         // ✅ ADD THIS
  discountAmount: Number, // ✅ Also missing but used in frontend
  adjustmentAmount: Number,
  igstRate: Number,
  igstAmount: Number,
  cgstRate: Number,
  cgstAmount: Number,
  sgstRate: Number,
  sgstAmount: Number,
  subTotal: Number,
  totalAmount: Number,
  remarks: String,
  items: [itemSchema],
  fileTitle: String,
  file: String, // file name or URL
}, { timestamps: true });


export default mongoose.models.PurchaseBill || mongoose.model("PurchaseBill", purchaseBillSchema);
