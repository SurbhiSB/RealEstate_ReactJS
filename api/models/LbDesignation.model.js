import mongoose from 'mongoose';

const LbDesignationSchema = new mongoose.Schema(
  {
    designationName: {
      type: String,
      required: true,
      trim: true,
    },
     status: {
      type: String,
      required: true,
      trim: true,
    },
    remarks: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Avoid OverwriteModelError
const LbDesignations = mongoose.models.LbDesignation || mongoose.model('LbDesignation', LbDesignationSchema);

export default LbDesignations;