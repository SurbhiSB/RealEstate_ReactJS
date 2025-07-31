import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
  plotId: { type: mongoose.Schema.Types.ObjectId, ref: "Plot" },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  paymentMode: { type: String },
  amount: { type: Number },
  paymentDate: { type: Date },
  chequeStatus: { type: String },
  depositBank: { type: String },
  fileUrl: { type: String },
  receivedFrom: { type: String },
utrChequeNo: { type: String },
remark: { type: String }
 // file path
}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);
