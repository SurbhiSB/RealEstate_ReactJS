import mongoose from 'mongoose';

const miscExpenseSchema = new mongoose.Schema({
  partyName: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  billDate: {
    type: Date,
    required: true,
  },
  billNo: {
    type: String,
    required: false,
  },
  payBy: {
    type: String,
    enum: ['Cash', 'Cheque', 'Online', 'Other'],
    default: 'Cash',
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  remark: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const MiscExpense = mongoose.model('MiscExpense', miscExpenseSchema);

export default MiscExpense;
