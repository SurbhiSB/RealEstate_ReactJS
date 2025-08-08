import mongoose from 'mongoose';

const bankSchema = new mongoose.Schema({
  bankName: { type: String, required: true },
  status: { type: String, default: "Active" },
}, { timestamps: true });

export default mongoose.model('Bank', bankSchema);
