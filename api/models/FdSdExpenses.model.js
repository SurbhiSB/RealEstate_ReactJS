import mongoose from 'mongoose';

const FdSdExpenseschema = new mongoose.Schema({
   fdNumber: {
    type: String,
    required: false,
  },
  depositDate: {
    type: Date,
    required: false,
  },
  maturityDate: {
    type: Date,
    required: false,
  },
  depositAmount: {
    type: Number,
    required: false,
    min: 0,
  },
  maturityAmount: {
    type: Number,
    required: false,
    min: 0,
  },
  interestRate: {
    type: Number,
    required: false,
    min: 0,
  },
  paymentMode: {
    type: String,
    enum: ["Cash", "Cheque", "Online"],
    required: false,
  },
  bankAccount: {
    type: String,
    required: false,
  },
  depositType: {
    type: String,
    enum: ["EXISTING", "LIQUIDATED", "EXTENDED"],
    required: false,
  },
  liquidateDate: {
    type: Date,
    required: false,
  },
  liquidateAmount: {
    type: Number,
    required: false,
    min: 0,
  },
  rlDone: {
    type: Boolean,
    default: false,
  },
  gpLetterDate: {
    type: Date,
    required: false,
  },
  gpHandoverDate: {
    type: Date,
    required: false,
  },
  remark: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FdSdExpenses = mongoose.model('FdSdExpenses', FdSdExpenseschema);

export default FdSdExpenses;
