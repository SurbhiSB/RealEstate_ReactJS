import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  itemName: String,
  quantity: Number,
  unit: String,
  rate: Number,
  amount: Number,
});

const PurchaseOrderSchema = new mongoose.Schema({
  vendorName: String,
  purchaseOrderNo: String,
  purchaseOrderDate: String,
  paymentTerms: String,
  deliveryDate: String,
  subTotal: Number,
  discountAmount: Number,
  adjustmentAmount: Number,
  igstRate: Number,
  igstAmount: Number,
  cgstRate: Number,
  cgstAmount: Number,
  sgstRate: Number,
  sgstAmount: Number,
  totalAmount: Number,
  items: [ItemSchema],
});

export default mongoose.model("PurchaseOrder", PurchaseOrderSchema);
