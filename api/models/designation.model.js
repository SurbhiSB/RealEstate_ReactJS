import mongoose from 'mongoose';

const designationSchema = new mongoose.Schema({
  designationName: { type: String, required: true },
  status: { type: String, default: 'Active' },
}, {
  timestamps: true,
});

export default mongoose.model('Designation', designationSchema);
