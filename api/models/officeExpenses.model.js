import mongoose from 'mongoose';

const officeExpenseSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0.0,
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
      enum: ['Cash', 'Card', 'UPI', 'Bank Transfer'],
      default: 'Cash',
    },
    remark: {
      type: String,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const OfficeExpense = mongoose.model('OfficeExpense', officeExpenseSchema);

export default OfficeExpense;
