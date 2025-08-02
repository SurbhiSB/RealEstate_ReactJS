import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  rate: Number,
  amount: Number,
});

const purchaseOrderSchema = new mongoose.Schema({
  memberName: String,
  vendorName: String,
  projectName: String,
  poNumber: String,
  workType: String,
  siteEngineer: String,
  contactNumber: String,
  poDate: Date,
  deliveryDate: Date,
  discountAmount: Number,
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

export default mongoose.model("PurchaseOrder", purchaseOrderSchema);
