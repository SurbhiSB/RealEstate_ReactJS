import mongoose from "mongoose";

const advancePaymentSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",   // assumes you have an Employee model
      required: true
    },
    advanceDate: { type: Date, required: true },
    advanceAmount: { type: Number, required: true },
    paidDayReminder: { type: Number, default: null },
    remark: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.models.AdvancePayment ||
  mongoose.model("AdvancePayment", advancePaymentSchema);

