import mongoose from "mongoose";

const AdvancePaymentSchema = new mongoose.Schema(
  {
    site: { type: String, required: false },
    person: { type: String, required: false },
    amount: { type: Number, default: 0 },
    remark: { type: String, required: false },
    isAdvance: { type: Boolean, default: false },
    paymentDate: { type: Date, required: false }
  },
  { timestamps: true }
);

export default mongoose.model("AdvancePayment", AdvancePaymentSchema);
