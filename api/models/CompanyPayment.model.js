// models/CompanyPayment.model.js
import mongoose from 'mongoose';

const CompanyPaymentSchema = new mongoose.Schema({
  projectName: String,
  paymentType: String,
  amount: Number,
  amountToPay: Number,
  modeOfPayment: String,
  bankName: String,
  refNo: String,
  issueDate: Date,
  billTransactionDate: Date,
  billNumber: String,
  remarks: String
});

export default mongoose.model('CompanyPayment', CompanyPaymentSchema);
